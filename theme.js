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
