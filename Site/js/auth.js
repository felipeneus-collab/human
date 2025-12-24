function login() {
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  if (user && pass) {
    // simula login
    localStorage.setItem("logado", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Preencha usuário e senha");
  }
}

// protege a dashboard
if (window.location.pathname.includes("dashboard")) {
  if (!localStorage.getItem("logado")) {
    window.location.href = "login.html";
  }
}
