document.addEventListener('DOMContentLoaded', function () {
	// Exécute ce code seulement quand le HTML  est complètement chargé
	const modalOverlay = document.getElementById('modal-overlay');
	const closeModal = document.getElementById('close-modal');
	const btnModify = document.getElementById('btn-modify');

	// Ouvre la modale
	btnModify.addEventListener('click', () => {
		modalOverlay.classList.remove('hidden');
		getWorksForModal();
	});

	// Fermer avec le X
	closeModal.addEventListener('click', () => {
		modalOverlay.classList.add('hidden');
	});

	// Fermer en cliquant à l'extérieur
	modalOverlay.addEventListener('click', (event) => {
		if (event.target === modalOverlay) {
			modalOverlay.classList.add('hidden');
		}
	});
});
