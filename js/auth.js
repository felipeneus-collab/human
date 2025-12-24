// const USUARIO_CORRETO = "admin";
// const SENHA_CORRETA = "1234";

// // limpa login antigo ao abrir a tela de login
// if (window.location.pathname.includes("login")) {
//   localStorage.removeItem("logado");
// }

// function login() {
//   const user = document.getElementById("user").value;
//   const pass = document.getElementById("pass").value;

//   if (!user || !pass) {
//     alert("Preencha usuário e senha");
//     return;
//   }

//   if (user === USUARIO_CORRETO && pass === SENHA_CORRETA) {
//     localStorage.setItem("logado", "true");
//     window.location.href = "dashboard.html";
//   } else {
//     alert("Usuário ou senha inválidos");
//   }
// }

// // protege a dashboard
// if (window.location.pathname.includes("dashboard")) {
//   if (!localStorage.getItem("logado")) {
//     window.location.href = "login.html";
//   }

const API_URL = "https://backend-login-java.onrender.com";

async function login() {
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario: user, senha: pass })
  });

  if (res.ok) {
    const data = await res.json();
    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
  } else {
    alert("Usuário ou senha inválidos");
  }
}

// protege dashboard
if (window.location.pathname.includes("dashboard")) {
  if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
  }
}


