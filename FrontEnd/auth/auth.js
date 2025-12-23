const authLink = document.getElementById('auth-link');
const token = localStorage.getItem('token');

const editionSection = document.getElementById('edition-section');
const btnModify = document.getElementById('btn-modify');
const filters = document.getElementById('filters');

if (token) {
	// utilisateur est connecté

	// afficher édition en flex
	if (editionSection) editionSection.style.display = 'flex';
	if (btnModify) btnModify.style.display = 'flex';

	// cacher filtres (display none)
	if (filters) filters.style.display = 'none';

	// lien login en logout (deconnexion + redirection)
	if (authLink) {
		authLink.textContent = 'logout';
		authLink.href = '#'; // href enlevé

		authLink.addEventListener('click', function () {
			localStorage.removeItem('token');
			window.location.href = 'index.html';
		});
	}
} else {
	// utilisateur non connecté

	// n'affiche pas filtres etc...
	if (editionSection) editionSection.style.display = 'none';
	if (btnModify) btnModify.style.display = 'none';
	if (filters) filters.style.display = 'flex';
}
