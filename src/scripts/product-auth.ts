import { getSupabaseBrowser, apiFetch } from "@/lib/supabase/browser";
import {
  bindSaveButtons,
  renderContinueReadingCard,
  renderSavedReportsList,
  initHomeContinueReading,
  initReadingProgressTracking,
} from "@/scripts/reading-list";
import { initPwa, bindInstallButtons } from "@/scripts/pwa";

function setText(id: string, text: string) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function show(id: string, visible: boolean) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle("hidden", !visible);
}

async function refreshAuthNav() {
  const supabase = getSupabaseBrowser();
  if (!supabase) return;

  const { data } = await supabase.auth.getSession();
  const loggedIn = Boolean(data.session);
  show("navAuthGuest", !loggedIn);
  show("navAuthUser", loggedIn);
  if (loggedIn && data.session?.user.email) {
    setText("navAuthEmail", data.session.user.email);
  }
}

function renderInstallPrompt(root: HTMLElement) {
  const block = document.createElement("section");
  block.className = "mt-8 rounded-lg border border-base-200 bg-white p-6";
  block.dataset.pwaInstall = "";
  block.hidden = true;
  block.innerHTML = `
    <h2 class="text-xs font-semibold uppercase tracking-widest text-base-500">Install app</h2>
    <p class="mt-3 text-sm text-base-600">Add Artometrics to your home screen for faster access to reports and your reading list.</p>
    <button type="button" data-pwa-install-btn class="mt-4 inline-flex rounded-sm bg-base-900 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white hover:bg-accent-800">Add to home screen</button>
  `;
  root.appendChild(block);
  bindInstallButtons();
}

async function loadAccountPage() {
  const root = document.getElementById("accountApp");
  if (!root) return;

  const supabase = getSupabaseBrowser();
  const continueSlot = document.createElement("div");
  continueSlot.id = "accountContinueReading";
  continueSlot.className = "mb-8";

  if (!supabase) {
    root.innerHTML = "";
    root.append(continueSlot);
    renderContinueReadingCard(continueSlot);

    const localSection = document.createElement("section");
    localSection.className = "rounded-lg border border-base-200 bg-white p-6";
    localSection.innerHTML = `
      <h2 class="text-xs font-semibold uppercase tracking-widest text-base-500">Saved reports</h2>
      <p class="mt-2 text-sm text-base-600">Stored on this device. Sign in later to sync across devices when membership is enabled.</p>
      <div id="localSavedList"></div>
      <a href="/login/" class="mt-6 inline-flex text-xs font-semibold uppercase tracking-widest text-accent-700 hover:text-accent-900">Sign in to sync →</a>
    `;
    root.appendChild(localSection);
    const list = localSection.querySelector("#localSavedList");
    if (list instanceof HTMLElement) renderSavedReportsList(list, { showEmpty: true });

    renderInstallPrompt(root);
    bindInstallButtons();
    return;
  }

  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) {
    root.innerHTML = `
      <div class="rounded-lg border border-base-200 bg-white p-6">
        <p class="text-sm text-base-700">Sign in to manage membership and sync your saved reports.</p>
        <a href="/login/?redirect=${encodeURIComponent("/account/")}" class="mt-4 inline-flex rounded-sm bg-base-900 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white">Sign in</a>
      </div>
    `;
    root.append(continueSlot);
    renderContinueReadingCard(continueSlot);

    const localSection = document.createElement("section");
    localSection.className = "mt-8 rounded-lg border border-base-200 bg-white p-6";
    localSection.innerHTML = `
      <h2 class="text-xs font-semibold uppercase tracking-widest text-base-500">On this device</h2>
      <div id="localSavedList"></div>
    `;
    root.appendChild(localSection);
    const list = localSection.querySelector("#localSavedList");
    if (list instanceof HTMLElement) renderSavedReportsList(list, { showEmpty: true });

    renderInstallPrompt(root);
    bindInstallButtons();
    return;
  }

  const statusRes = await apiFetch("subscription-status");
  const status = statusRes.ok ? await statusRes.json() : null;

  const planLabel = status?.planTier
    ? status.planTier.charAt(0).toUpperCase() + status.planTier.slice(1)
    : "Free";
  const active = Boolean(status?.active);

  root.innerHTML = `
    <div id="accountContinueReading" class="mb-8"></div>
    <div class="grid gap-8 md:grid-cols-2">
      <section class="rounded-lg border border-base-200 bg-white p-6">
        <h2 class="text-xs font-semibold uppercase tracking-widest text-base-500">Account</h2>
        <p class="mt-3 text-sm text-base-800">${sessionData.session.user.email ?? ""}</p>
        <button id="signOutBtn" type="button" class="mt-4 text-xs font-semibold uppercase tracking-widest text-accent-700 hover:text-accent-900">Sign out</button>
      </section>
      <section class="rounded-lg border border-base-200 bg-white p-6">
        <h2 class="text-xs font-semibold uppercase tracking-widest text-base-500">Membership</h2>
        <p class="mt-3 text-2xl font-serif font-light text-base-900">${active ? planLabel : "Not subscribed"}</p>
        <p class="mt-1 text-sm text-base-600">${active ? "Your subscription is active." : "Subscribe to unlock podcast episodes and member features."}</p>
        <div class="mt-4 flex flex-wrap gap-2">
          ${active ? `<button id="billingPortalBtn" type="button" class="inline-flex rounded-sm bg-base-900 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white">Manage billing</button>` : `<a href="/pricing/" class="inline-flex rounded-sm bg-base-900 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white">View plans</a>`}
        </div>
      </section>
    </div>
    <section class="mt-8 rounded-lg border border-base-200 bg-white p-6">
      <h2 class="text-xs font-semibold uppercase tracking-widest text-base-500">Saved reports</h2>
      <div id="accountSavedList"></div>
    </section>
  `;

  const continueEl = document.getElementById("accountContinueReading");
  if (continueEl) renderContinueReadingCard(continueEl);

  const savedList = document.getElementById("accountSavedList");
  if (savedList) renderSavedReportsList(savedList, { showEmpty: true });

  renderInstallPrompt(root);
  bindInstallButtons();

  document.getElementById("signOutBtn")?.addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  });

  document.getElementById("billingPortalBtn")?.addEventListener("click", async () => {
    const res = await apiFetch("create-portal", { method: "POST", body: "{}" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  });
}

async function bindLoginForm() {
  const form = document.getElementById("loginForm") as HTMLFormElement | null;
  if (!form) return;
  const errorEl = document.getElementById("authError");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const supabase = getSupabaseBrowser();
    if (!supabase) return;
    const fd = new FormData(form);
    const email = String(fd.get("email") ?? "");
    const password = String(fd.get("password") ?? "");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      if (errorEl) errorEl.textContent = error.message;
      return;
    }
    const params = new URLSearchParams(window.location.search);
    window.location.href = params.get("redirect") || "/account/";
  });
}

async function bindSignupForm() {
  const form = document.getElementById("signupForm") as HTMLFormElement | null;
  if (!form) return;
  const errorEl = document.getElementById("authError");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const supabase = getSupabaseBrowser();
    if (!supabase) return;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "");
    const email = String(fd.get("email") ?? "");
    const password = String(fd.get("password") ?? "");
    const confirm = String(fd.get("confirm-password") ?? "");
    if (password !== confirm) {
      if (errorEl) errorEl.textContent = "Passwords do not match.";
      return;
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
    if (error) {
      if (errorEl) errorEl.textContent = error.message;
      return;
    }
    window.location.href = "/account/?welcome=1";
  });
}

async function bindPricingButtons() {
  document.querySelectorAll<HTMLButtonElement>("[data-checkout-tier]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const tier = btn.dataset.checkoutTier;
      if (!tier) return;
      btn.disabled = true;
      const res = await apiFetch("create-checkout", {
        method: "POST",
        body: JSON.stringify({ tier }),
      });
      if (res.status === 401) {
        window.location.href = `/login/?redirect=${encodeURIComponent("/pricing/")}`;
        return;
      }
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      btn.disabled = false;
      alert(data.error ?? "Unable to start checkout. Try signing in first.");
    });
  });
}

export function initProductAuth() {
  void refreshAuthNav();
  void loadAccountPage();
  void bindLoginForm();
  void bindSignupForm();
  void bindPricingButtons();
  bindSaveButtons();
  initReadingProgressTracking();
  initHomeContinueReading();
  initPwa();

  const supabase = getSupabaseBrowser();
  supabase?.auth.onAuthStateChange(() => {
    void refreshAuthNav();
  });
}
