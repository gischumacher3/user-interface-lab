// --- Alternar tema claro/escuro ---
const toggleThemeBtn = document.getElementById("toggle-theme");
toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  toggleThemeBtn.textContent = document.body.classList.contains("light")
    ? "Tema Escuro"
    : "Tema Claro";
});

// --- Alternância entre abas ---
const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    contents.forEach((c) => c.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");

    validateActiveTab();
  });
});

// --- Mostrar/ocultar senha (Criar Senha) ---
const input = document.getElementById("password");
const toggleIcon = document.getElementById("toggleIcon");

toggleIcon?.addEventListener("click", () => {
  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";

  toggleIcon.innerHTML = isPassword
    ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" height="24" viewBox="0 0 24 24" width="24" stroke="#e0e0e0"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 012.592-4.263m3.16-1.878A9.969 9.969 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.965 9.965 0 01-1.257 2.592M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18" /></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" height="24" viewBox="0 0 24 24" width="24" stroke="#e0e0e0"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>`;
});

// --- Força da senha ---
const feedbackText = document.getElementById("feedbackText");
const passwordStrength = document.getElementById("password-strength");
const saveButton = document.getElementById("save-password");
const repeatPassword = document.getElementById("repeat-password");

const rules = [
  { name: "low-upper-case", pattern: /(?=.*[a-z])(?=.*[A-Z])/ },
  { name: "number", pattern: /(?=.*\d)/ },
  { name: "special-char", pattern: /(?=.*[!@#$%^&*])/ },
  { name: "min-length", pattern: /.{8,}/ },
];

const levels = [
  { maxStrength: 1, width: "25%", class: "progress-bar-danger", text: "Senha fraca" },
  { maxStrength: 2, width: "50%", class: "progress-bar-warning", text: "Senha média" },
  { maxStrength: 3, width: "75%", class: "progress-bar-warning", text: "Quase lá" },
  { maxStrength: 4, width: "100%", class: "progress-bar-success", text: "Senha forte" },
];

function checkPasswordStrength(password) {
  let strength = 0;

  rules.forEach((rule) => {
    const el = document.querySelector(`.${rule.name}`);
    if (rule.pattern.test(password)) {
      strength++;
      el.textContent = "✅ " + el.textContent.slice(2);
    } else {
      el.textContent = "❌ " + el.textContent.slice(2);
    }
  });

  const level = levels.find((l) => strength <= l.maxStrength) || levels[levels.length - 1];
  passwordStrength.className = `progress-bar ${level.class}`;
  passwordStrength.style.width = level.width;
  feedbackText.textContent = level.text;

  return strength;
}

// --- Validação dos campos da aba Login ---
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginButton = document.querySelector("#login .save-button");

// --- Validação dos campos da aba Register ---
const registerName = document.getElementById("register-name");
const registerEmail = document.getElementById("register-email");
const registerPassword = document.getElementById("register-password");
const registerButton = document.querySelector("#register .save-button");

// Função para marcar o campo com cor da mensagem e borda
function setFieldState(field, isValid) {
  const wrapper = field.closest(".input_wrapper");
  const criteria = wrapper.querySelector(".field-criteria");

  if (isValid) {
    criteria.classList.remove("invalid");
    criteria.classList.add("valid");
    field.classList.remove("invalid");
    field.classList.add("valid");
  } else {
    criteria.classList.remove("valid");
    criteria.classList.add("invalid");
    field.classList.remove("valid");
    field.classList.add("invalid");
  }
}

// --- Validações específicas ---

// Valida e-mail simples usando regex básica
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

// Valida nome completo (2 ou mais palavras)
function isValidFullName(name) {
  return name.trim().split(/\s+/).length >= 2;
}

// Valida senha com letras, números e pelo menos 8 caracteres
function isValidRegisterPassword(pw) {
  return /[A-Z]/.test(pw) && /[a-z]/.test(pw) && /\d/.test(pw) && pw.length >= 8;
}

// Valida senha login (mínimo 8 caracteres)
function isValidLoginPassword(pw) {
  return pw.length >= 8;
}

// Valida repetir senha igual
function isPasswordMatch(pw1, pw2) {
  return pw1 === pw2 && pw1.length > 0;
}

// --- Validação geral para ativar botões ---

function validateLogin() {
  const emailValid = isValidEmail(loginEmail.value);
  setFieldState(loginEmail, emailValid);

  const passwordValid = isValidLoginPassword(loginPassword.value);
  setFieldState(loginPassword, passwordValid);

  loginButton.disabled = !(emailValid && passwordValid);
}

function validateRegister() {
  const nameValid = isValidFullName(registerName.value);
  setFieldState(registerName, nameValid);

  const emailValid = isValidEmail(registerEmail.value);
  setFieldState(registerEmail, emailValid);

  const passwordValid = isValidRegisterPassword(registerPassword.value);
  setFieldState(registerPassword, passwordValid);

  registerButton.disabled = !(nameValid && emailValid && passwordValid);
}

function validateCreatePassword() {
  const pw = input.value;
  const repeatPw = repeatPassword.value;

  const strength = checkPasswordStrength(pw);

  // Marca mensagem da repetição da senha
  const repeatValid = isPasswordMatch(pw, repeatPw);
  setFieldState(repeatPassword, repeatValid);

  // Botão habilita se força >= 3 e senhas iguais
  saveButton.disabled = !(strength >= 3 && repeatValid);
}

// --- Eventos inputs login ---
loginEmail.addEventListener("input", validateLogin);
loginPassword.addEventListener("input", validateLogin);

// --- Eventos inputs register ---
registerName.addEventListener("input", validateRegister);
registerEmail.addEventListener("input", validateRegister);
registerPassword.addEventListener("input", validateRegister);

// --- Eventos inputs create password ---
input.addEventListener("input", () => {
  validateCreatePassword();
});
repeatPassword.addEventListener("input", () => {
  validateCreatePassword();
});

// --- Função para validar aba ativa ao mudar abas ---
function validateActiveTab() {
  const activeTab = document.querySelector(".tab-content.active").id;
  if (activeTab === "login") {
    validateLogin();
  } else if (activeTab === "register") {
    validateRegister();
  } else if (activeTab === "create") {
    validateCreatePassword();
  }
}

// --- Inicializa validação ---
validateActiveTab();

// --- Botões para simular submit ---
loginButton.addEventListener("click", () => {
  alert("Login efetuado com sucesso!");
});

registerButton.addEventListener("click", () => {
  alert("Cadastro efetuado com sucesso!");
});

saveButton.addEventListener("click", () => {
  alert("Senha salva com sucesso!");
});
