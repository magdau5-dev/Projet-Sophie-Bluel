document.addEventListener('DOMContentLoaded', function () {
	// Exécute ce code seulement quand le HTML  est complètement chargé
	const modalOverlay = document.getElementById('modal-overlay');
	const closeModalBtn = document.getElementById('close-modal');
	const btnModify = document.getElementById('btn-modify');

	const galleryView = document.getElementById('modal-gallery-photo');
	const addPhotoView = document.getElementById('modal-add-photo');

	const addPhotoBtn = document.getElementById('add-photo-btn');
	const backBtn = document.getElementById('back-to-gallery');

	//  Ouvre la modale
	btnModify.addEventListener('click', () => {
		openGalleryView();
		modalOverlay.classList.remove('hidden');
		getWorksForModal();
	});

	// Fermer avec le X
	closeModalBtn.addEventListener('click', closeModal);

	modalOverlay.addEventListener('click', (event) => {
		if (event.target === modalOverlay) {
			closeModal();
		}
	});

	// PASSER À "AJOUT PHOTO"
	addPhotoBtn.addEventListener('click', () => {
		openAddPhotoView();
	});

	//  RETOUR GALERIE
	backBtn.addEventListener('click', () => {
		openGalleryView();
	});

	// FONCTIONS

	function openGalleryView() {
		galleryView.classList.remove('hidden');
		addPhotoView.classList.add('hidden');
		backBtn.classList.add('hidden'); // flèche cachée
	}

	function openAddPhotoView() {
		galleryView.classList.add('hidden');
		addPhotoView.classList.remove('hidden');
		backBtn.classList.remove('hidden'); // flèche visible
	}

	function closeModal() {
		modalOverlay.classList.add('hidden');
		openGalleryView(); // reset obligatoire
	}
});


