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
(function () {
  const params = new URLSearchParams(window.location.search);
  const tema = (params.get("tema") || "noiva").toLowerCase();

  const root = document.documentElement;
  const bg = document.querySelector(".bg");

  // Helper: aplicar variáveis CSS
  function setVar(name, value) {
    root.style.setProperty(name, value);
  }

  // Helper: aplicar fundo
  function setBackground(url) {
    if (!bg) return;
    bg.style.backgroundImage = `url("${url}")`;
    bg.style.backgroundSize = "cover";
    bg.style.backgroundPosition = "center";
  }

  // Remove classe anterior e seta classe do tema no body (pra você customizar depois se quiser)
  document.body.classList.remove("tema-noivo", "tema-noiva");
  document.body.classList.add(tema === "noivo" ? "tema-noivo" : "tema-noiva");

  // ===== Tema NOIVO: preto + vermelho (Vader) =====
  if (tema === "noivo") {
    setVar("--bg", "#202020");
    setVar("--text", "#f4f4f6");
    setVar("--muted", "rgba(244,244,246,0.72)");

    setVar("--card", "rgba(14,14,18,0.78)");
    setVar("--card2", "rgba(14,14,18,0.88)");
    setVar("--border", "rgba(255,255,255,0.14)");
    setVar("--shadow", "0 18px 60px rgba(0,0,0,0.55)");

    // Fundo do noivo (coloque a imagem aqui)
    // Crie o arquivo: assets/img/fundo-noivo.jpg
    setBackground("assets/img/fundo-noivo.png");

    // Overlay mais escuro (se existir, dá pra reforçar com CSS; aqui fica só no tema)
    const overlay = document.querySelector(".bg-overlay");
    if (overlay) {
      overlay.style.background =
        "radial-gradient(1200px 800px at 20% 10%, rgba(0,0,0,0.35), rgba(0,0,0,0.86))";
    }
  }

  // ===== Tema NOIVA: branco + rosa floral =====
  if (tema !== "noivo") {
    setVar("--bg", "#ffffff");
    setVar("--text", "#1a1a1a");
    setVar("--muted", "rgba(26,26,26,0.70)");

    setVar("--card", "rgba(255,255,255,0.92)");
    setVar("--card2", "rgba(255,255,255,0.96)");
    setVar("--border", "rgba(26,26,26,0.14)");
    setVar("--shadow", "0 14px 45px rgba(0,0,0,0.12)");

    // Fundo da noiva (coloque a imagem aqui)
    // Crie o arquivo: assets/img/fundo-noiva.jpg
    setBackground("assets/img/fundo-noiva.png");

    const overlay = document.querySelector(".bg-overlay");
    if (overlay) {
      overlay.style.background =
        "radial-gradient(1200px 800px at 20% 10%, rgba(255,255,255,0.60), rgba(255,255,255,0.88))";
    }
  }
})();
async function enviarPix() {

    const presente = document.getElementById("presenteEscolhido").value.trim();
    const valor = document.getElementById("valorEscolhido").value.trim();
    const nome = document.getElementById("nomePix").value.trim();
    const mensagem = document.getElementById("mensagemPix").value.trim();

    if (presente === "") {
        alert("Escolha um presente.");
        return;
    }

    if (nome === "") {
        alert("Informe seu nome.");
        return;
    }

    try {

        const resposta = await fetch("https://script.google.com/macros/s/AKfycbygQ2aZKRi3OOokwWdjZ84-7Njosq6rXoqW7uy7MXY4kwwP71OEOnGzYY-wkicT1uII3g/exec", {
    method: "POST",
    mode: "cors",
    headers: {
        "Content-Type": "text/plain;charset=UTF-8"
    },
    body: JSON.stringify({
        nome,
        presente,
        valor,
        mensagem
    })
});

       console.log("Status:", resposta.status);
console.log("Resposta:", await resposta.text()); 

        document.getElementById("formPresente").style.display = "none";
        document.getElementById("pixFinal").style.display = "block";

    } catch (e) {

    console.error(e);

    alert(e.message);

}

}

function atualizarPresente() {

    const select = document.getElementById("presenteSelect");

    if (select.value === "") {

        document.getElementById("presenteEscolhido").value = "";
        document.getElementById("valorEscolhido").value = "";
        return;

    }

    const [presente, valor] = select.value.split("|");

    document.getElementById("presenteEscolhido").value = presente;
    document.getElementById("valorEscolhido").value = `R$ ${valor}`;

}

function copiarPix() {

    const chave = document.getElementById("pixKey").innerText.trim();

    navigator.clipboard.writeText(chave);

    alert("Chave Pix copiada!");

}