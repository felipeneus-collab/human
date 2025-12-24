const API_URL = "https://backend-login-java.onrender.com"; // 👈 troque pela sua URL do Render

async function login() {
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  if (!user || !pass) {
    alert("Preencha usuário e senha");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        usuario: user,
        senha: pass
      })
    });

    if (res.ok) {
      // login aceito pelo backend
      localStorage.setItem("logado", "true");
      window.location.href = "dashboard.html";
    } else {
      alert("Usuário ou senha inválidos");
    }
  } catch (error) {
    alert("Erro ao conectar com o servidor");
    console.error(error);
  }
}

// protege a dashboard
if (window.location.pathname.includes("dashboard")) {
  if (!localStorage.getItem("logado")) {
    window.location.href = "login.html";
  }
}

