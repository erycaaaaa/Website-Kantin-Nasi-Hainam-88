 async function login() {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const body = { email, password };

            try {
                const response = await fetch("http://localhost:5000/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });

                const data = await response.json();
                console.log(data);
                if (response.ok) {
                    localStorage.setItem("token", data.token); 
                    localStorage.setItem("role", data.role);   
                    localStorage.setItem("username", data.username);
                    alert("Login berhasil!");

                    if (data.role === "admin") {
                        window.location.href = "profilPenjual.html";
                    } else if (data.role === "customer") {
                        window.location.href = "index.html";
                    } else {
                        alert("Role tidak dikenali.");
                    }
                } else {
                    alert(data.message || "Login gagal");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Terjadi kesalahan!");
            }
        }

        async function register() {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("username");
            localStorage.removeItem("cart");
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('registerEmail').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('registerPassword').value;

            const body = { fullName, email, phone, password };

            try {
                const response = await fetch("http://localhost:5000/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });

                const data = await response.json();
                if (response.ok) {
                    alert("Registrasi berhasil, silakan login!");
                    document.getElementById('login-tab').click(); // Pindah ke tab login
                } else {
                    alert(data.error || "Registrasi gagal");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Terjadi kesalahan!");
            }
            location.reload();
        }