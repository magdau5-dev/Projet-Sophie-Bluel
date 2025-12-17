const authLink = document.getElementById("auth-link");
const token = localStorage.getItem("token");

if (authLink && token) {
	authLink.textContent = "logout";
	authLink.href = "#";

	authLink.addEventListener("click", () => {
		localStorage.removeItem("token");
		window.location.href = "index.html";
	});
}
