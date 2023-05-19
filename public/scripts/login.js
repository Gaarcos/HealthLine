document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();
  
    var email = document.getElementById("login").value;
    var password = document.getElementById("senha").value;
  
    fetch("/auth/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        senha: password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          window.location.href = "/home.html";
        } else {
          alert("Erro de login");
        }
      })
      .catch(error => {
        console.error("Erro:", error);
      });
  });
  