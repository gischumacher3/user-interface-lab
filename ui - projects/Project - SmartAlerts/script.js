const alertContainer = document.getElementById("alert-container");
const toggleBtn = document.getElementById("toggleMode");

// Função para criar alertas dinamicamente
function createAlert(type, message) {
  const alert = document.createElement("div");
  alert.classList.add("alert", type);

  alert.innerHTML = `
    <span class="icon">${getIcon(type)}</span>
    <span class="text">${message}</span>
    <button class="close-btn" title="Fechar alerta">&times;</button>
    <div class="line"></div>
  `;

  // Adiciona a animação de entrada
  setTimeout(() => {
    alert.classList.add("show");
  }, 50);

  // Botão de fechar
  alert.querySelector(".close-btn").addEventListener("click", () => {
    alert.classList.remove("show");
    setTimeout(() => alert.remove(), 300);
  });

  alertContainer.appendChild(alert);
}

// Função que retorna o ícone SVG para cada tipo
function getIcon(type) {
  switch (type) {
    case "success":
      return `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>`;
    case "error":
      return `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
            10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59
            17 12 13.41 8.41 17 7 15.59 10.59 12
            7 8.41 8.41 7 12 10.59 15.59 7
            17 8.41 13.41 12 17 15.59z"/>
        </svg>`;
    case "warning":
      return `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
        </svg>`;
    case "info":
      return `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path fill="currentColor" d="M11 17h2v-6h-2v6zm0-8h2V7h-2v2zm1-7C6.48 2 2 6.48
            2 12s4.48 10 10 10 10-4.48 10-10S17.52
            2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8
            8-8 8 3.59 8 8-3.59 8-8 8z"/>
        </svg>`;
    case "complete":
      return `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path fill="currentColor" d="M20 6h-4.18C15.4 4.84 14.3 4
            13 4h-2c-1.3 0-2.4.84-2.82 2H4c-1.1 0-2
            .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9
            2-2V8c0-1.1-.9-2-2-2zm-8 0h2v2h-2V6z"/>
        </svg>`;
    default:
      return `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path fill="currentColor" d="M12 22c5.52 0 10-4.48 10-10S17.52 2
            12 2 2 6.48 2 12s4.48 10 10 10z"/>
        </svg>`;
  }
}

// Botões de disparo dos alertas
document.getElementById("successBtn").onclick = () =>
  createAlert("success", "Sua conta foi criada com sucesso! 🚀");

document.getElementById("errorBtn").onclick = () =>
  createAlert("error", "Falha ao criar a conta! 😟");

document.getElementById("warningBtn").onclick = () =>
  createAlert("warning", "Uma nova atualização está disponível.");

document.getElementById("infoBtn").onclick = () =>
  createAlert("info", "Você recebeu uma nova mensagem.");

document.getElementById("completeBtn").onclick = () =>
  createAlert("complete", "Exportação de dados concluída!");

// Alternância de modo claro/escuro
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = document.body.classList.contains("dark")
    ? "☀️ Modo Claro"
    : "🌙 Modo Escuro";
});
