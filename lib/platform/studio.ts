import { getSupabase } from "@/lib/supabase/client";
import { listJournalEntries } from "@/lib/twilda/journal";
import { listNovels, type DbNovelSummary } from "@/lib/twilda/service";

export type StudioContinue = {
  novel: DbNovelSummary | null;
  journal: { id: string; title: string; updated_at: string } | null;
  aftercareNote: string | null;
};

export async function loadStudioContinue(userId: string): Promise<StudioContinue> {
  const supabase = getSupabase();
  if (!supabase) {
    return { novel: null, journal: null, aftercareNote: null };
  }

  let novel: DbNovelSummary | null = null;
  let journal: StudioContinue["journal"] = null;
  let aftercareNote: string | null = null;

  try {
    const novels = await listNovels(supabase as never, userId);
    novel = novels[0] ?? null;
  } catch {
    /* soft */
  }

  try {
    const entries = await listJournalEntries(supabase as never, userId);
    const first = entries[0];
    journal = first
      ? { id: first.id, title: first.title, updated_at: first.updated_at }
      : null;
  } catch {
    /* soft */
  }

  try {
    const { data } = await supabase
      .from("aftercare_journal_entries")
      .select("id, title, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (data) {
      aftercareNote = (data.title as string) || "Recent journal entry";
    }
  } catch {
    /* soft — table may differ */
  }

  return { novel, journal, aftercareNote };
}
