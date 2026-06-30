import { apiFetch } from "@/lib/supabase/browser";

export async function initMemberGate() {
  const gate = document.getElementById("memberEpisodeGate");
  if (!gate) return;

  const slug = gate.dataset.episodeSlug;
  if (!slug) return;

  const res = await apiFetch(`member-episode?slug=${encodeURIComponent(slug)}`);
  if (!res.ok) return;

  const data = await res.json();
  const target = document.getElementById("memberEpisodeBody");
  if (!target || !data.html) return;

  const container = document.getElementById("memberEpisodeContent");
  gate.classList.add("hidden");
  container?.classList.remove("hidden");
  target.innerHTML = data.html;

  document.getElementById("memberEpisodeAudio")?.classList.remove("hidden");
}
