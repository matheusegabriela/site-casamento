// =========================
// Navegação por abas
// =========================

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

function openTab(tabId) {
  panels.forEach(p => p.classList.remove("active"));
  tabs.forEach(t => t.classList.remove("active"));

  const panel = document.getElementById(tabId);
  const tabBtn = document.querySelector(`.tab[data-tab="${tabId}"]`);

  if (panel) panel.classList.add("active");
  if (tabBtn) tabBtn.classList.add("active");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

tabs.forEach(btn => {
  btn.addEventListener("click", () => openTab(btn.dataset.tab));
});

// Botões internos (Home)
document.querySelectorAll("[data-go]").forEach(btn => {
  btn.addEventListener("click", () => openTab(btn.dataset.go));
});

// =========================
// Copiar Pix
// =========================

const copyBtn = document.getElementById("copyPix");
const pixKeyEl = document.getElementById("pixKey");

if (copyBtn && pixKeyEl) {
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(pixKeyEl.textContent.trim());
      copyBtn.textContent = "Copiado!";
      setTimeout(() => (copyBtn.textContent = "Copiar"), 1400);
    } catch (e) {
      alert("Não consegui copiar automaticamente. Selecione e copie a chave manualmente.");
    }
  });
}
// =========================
// SAVE THE DATE - ICS
// =========================

const icsBtn = document.getElementById("downloadICS");

if (icsBtn) {
  icsBtn.addEventListener("click", () => {

    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Casamento Mateus & Gabriela//PT
BEGIN:VEVENT
UID:casamento-mateus-gabriela-2026
DTSTAMP:20260830T120000Z
DTSTART;TZID=America/Sao_Paulo:20260830T123000
DTEND;TZID=America/Sao_Paulo:20260830T190000
SUMMARY:Casamento Mateus & Gabriela 💍❤️
LOCATION:Espaço & Buffet Sfaciotti - R. São Maurício, 423 - Osasco - SP
DESCRIPTION:Casamento Mateus & Gabriela 💍❤️
END:VEVENT
END:VCALENDAR
    `.trim();

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "casamento-mateus-gabriela.ics";
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
}
// =========================
// Contagem regressiva (Save the Date)
// =========================

(function () {
  const el = document.getElementById("countdown");
  if (!el) return;

  // 30/08/2026 12:30 (America/Sao_Paulo)
  // Como o navegador do usuário provavelmente está no mesmo fuso (Brasil),
  // usamos data local. Se alguém abrir fora do Brasil, pode variar.
  const target = new Date(2026, 7, 30, 12, 30, 0); // mês 7 = agosto

  function pad(n) { return String(n).padStart(2, "0"); }

  function tick() {
    const now = new Date();
    let diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      el.textContent = "É hoje! 🎉 Nos vemos às 12:30 — seja pontual 💛";
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);

    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    el.textContent = `Faltam ${days} dias, ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
  }

  tick();
  setInterval(tick, 1000);
  
})();
