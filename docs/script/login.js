const form = document.getElementById("login-form");
const errorMessage = document.getElementById("login-error");

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	try {
		const data = await loginUser(email, password);

        // f12 => application => localStorage
        // le token est enregistré dedans avec sa valeur
		localStorage.setItem("token", data.token);

		// redirection vers l'accueil après login
		window.location.href = "../index.html";

	} catch (error) {
		errorMessage.style.display = "block";
	}
});