import { getStore } from "@netlify/blobs";
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import { drawSpread, type SpreadType } from "./_shared/aftercare/tarot";
import {
  adminSupabase,
  corsPreflight,
  json,
  userFromAuthHeader,
} from "../lib/shared";

type TarotPullCard = {
  cardId: string;
  name: string;
  reversed: boolean;
  position?: string;
  imageUrl?: string | null;
};

async function getOrCreateCardArt(
  cardId: string,
  name: string,
  artPrompt: string,
) {
  const supabase = adminSupabase();
  const { data: cached } = await supabase
    .from("card_art_cache")
    .select("blob_key, mime_type")
    .eq("card_id", cardId)
    .maybeSingle();

  const store = getStore({ name: "tarot-art", consistency: "strong" });
  const artUrl = `/api/aftercare-tarot-art?cardId=${cardId}`;

  if (cached) {
    const data = await store.get(cached.blob_key, { type: "arrayBuffer" });
    if (data) {
      return { blobKey: cached.blob_key, url: artUrl };
    }
  }

  try {
    const ai = new GoogleGenAI({});
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: `${artPrompt}. Vertical tarot card composition, ornate soft border, no text, no watermark, Aftercare soft pink aesthetic.`,
    });
    const imagePart = response.candidates?.[0]?.content?.parts?.find(
      (p) => p.inlineData,
    );
    if (!imagePart?.inlineData?.data) {
      return { blobKey: null, url: null };
    }
    const mimeType = imagePart.inlineData.mimeType || "image/png";
    const bytes = Buffer.from(imagePart.inlineData.data, "base64");
    const blobKey = `card/${cardId}.png`;
    await store.set(blobKey, bytes, {
      metadata: { contentType: mimeType, cardName: name },
    });

    if (cached) {
      await supabase
        .from("card_art_cache")
        .update({ blob_key: blobKey, mime_type: mimeType })
        .eq("card_id", cardId);
    } else {
      await supabase.from("card_art_cache").insert({
        card_id: cardId,
        blob_key: blobKey,
        mime_type: mimeType,
      });
    }
    return { blobKey, url: artUrl };
  } catch {
    // Soft-fail: reading still works without generated art.
    return { blobKey: null, url: null };
  }
}

async function interpretPull(
  question: string | undefined,
  cards: {
    name: string;
    reversed: boolean;
    position: string;
    upright: string;
    reversedMeaning: string;
  }[],
) {
  try {
    const openai = new OpenAI();
    const cardLines = cards
      .map(
        (c) =>
          `${c.position}: ${c.name}${c.reversed ? " (reversed)" : ""} — ${c.reversed ? c.reversedMeaning : c.upright}`,
      )
      .join("\n");
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are Aftercare, a gentle tarot guide. Write warm, reflective interpretations in 2 short paragraphs. No fear-mongering. Soft, intimate tone.",
        },
        {
          role: "user",
          content: `Question: ${question || "What soft guidance do I need today?"}\n\nCards:\n${cardLines}`,
        },
      ],
    });
    return (
      completion.choices[0]?.message?.content?.trim() ||
      "Sit with these cards and notice what softens in you."
    );
  } catch {
    return cards
      .map(
        (c) =>
          `${c.position}: ${c.name}${c.reversed ? " reversed" : ""} invites ${c.reversed ? c.reversedMeaning : c.upright}.`,
      )
      .join(" ");
  }
}

export default async (request: Request) => {
  if (request.method === "OPTIONS") return corsPreflight();

  const user = await userFromAuthHeader(request);
  if (!user) return json({ error: "Unauthorized" }, 401);

  const supabase = adminSupabase();

  if (request.method === "GET") {
    const { data, error } = await supabase
      .from("tarot_pulls")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(30);
    if (error) return json({ error: error.message }, 500);
    return json({ pulls: data ?? [] });
  }

  if (request.method === "POST") {
    let body: {
      spreadType?: SpreadType;
      question?: string;
      withArt?: boolean;
    };
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON" }, 400);
    }

    const spreadType: SpreadType =
      body.spreadType === "three" ? "three" : "single";
    const drawn = drawSpread(spreadType);

    const cards: TarotPullCard[] = [];
    for (const item of drawn) {
      let imageUrl: string | null = null;
      if (body.withArt !== false) {
        const art = await getOrCreateCardArt(
          item.card.id,
          item.card.name,
          item.card.artPrompt,
        );
        imageUrl = art.url;
      }
      cards.push({
        cardId: item.card.id,
        name: item.card.name,
        reversed: item.reversed,
        position: item.position,
        imageUrl,
      });
    }

    const interpretation = await interpretPull(
      body.question,
      drawn.map((d) => ({
        name: d.card.name,
        reversed: d.reversed,
        position: d.position,
        upright: d.card.upright,
        reversedMeaning: d.card.reversed,
      })),
    );

    const { data: pull, error } = await supabase
      .from("tarot_pulls")
      .insert({
        user_id: user.id,
        spread_type: spreadType,
        cards,
        interpretation,
        question: body.question || null,
      })
      .select("*")
      .single();
    if (error) return json({ error: error.message }, 500);
    return json({ pull }, 201);
  }

  return json({ error: "Method not allowed" }, 405);
};

