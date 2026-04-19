const authLink = document.getElementById('auth-link');
const token = localStorage.getItem('token');

const editionSection = document.getElementById('edition-section');
const btnModify = document.getElementById('btn-modify');
const filters = document.getElementById('filters');

if (token) {
	// utilisateur est connecté

	// afficher édition en flex
	editionSection.style.display = 'flex';
	btnModify.style.display = 'flex';

	// cacher filtres (display none)
	filters.style.display = 'none';

	// lien login en logout (deconnexion + redirection)
	
	authLink.textContent = 'logout';
	authLink.href = '#'; // href enlevé

	authLink.addEventListener('click', function () {
		localStorage.removeItem('token');
		window.location.href = 'index.html';
	});
	
} else {
	// utilisateur non connecté

	// affiche filtres etc...
	editionSection.style.display = 'none';
	btnModify.style.display = 'none';
	filters.style.display = 'flex';
}
