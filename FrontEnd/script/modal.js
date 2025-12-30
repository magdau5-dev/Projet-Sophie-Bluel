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
		getCategories(); 
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

// preview img

const imageInput = document.getElementById('image-upload');
const preview = document.getElementById('preview');
const uploadLabel = document.querySelector('.upload-label');

imageInput.addEventListener('change', () => {
	const file = imageInput.files[0];
	if (!file) return;

	preview.src = URL.createObjectURL(file);
	preview.style.display = 'block';
	uploadLabel.style.display = 'none';
});

// Envoi du formulaire rempli

const form = document.getElementById('form-validation');
const titleInput = document.getElementById('title');
const categorySelect = document.getElementById('category');
const errorMessage = document.getElementById('form-error');
const successMessage = document.getElementById('form-valid');

const submitBtn = document.getElementById('validation');

// check form validation

function checkFormValidity() {
	const imageOk = imageInput.files.length > 0;
	const titleOk = titleInput.value.trim() !== '';
	const categoryOk = categorySelect.value !== '';

	if (imageOk && titleOk && categoryOk) {
		submitBtn.classList.add('active');
	} else {
		submitBtn.classList.remove('active');
	}
}

imageInput.addEventListener('change', checkFormValidity);
titleInput.addEventListener('input', checkFormValidity);
categorySelect.addEventListener('change', checkFormValidity);

form.addEventListener('submit', async (e) => {
	e.preventDefault();
	errorMessage.textContent = '';
	successMessage.textContent = '';

	const image = imageInput.files[0];
	const title = titleInput.value.trim();
	const category = categorySelect.value;

	if (!image || !title || !category) {
		errorMessage.textContent = "L'image et les champs sont obligatoires.";
		return;
	}

	const token = localStorage.getItem('token');

	const formData = new FormData();
	formData.append('image', image);
	formData.append('title', title);
	formData.append('category', category);

	try {
		const response = await fetch('http://localhost:5678/api/works', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		});

		if (!response.ok) {
			throw new Error('Erreur API');
		}

		successMessage.textContent = 'Formulaire envoyé avec succès.';

		form.reset();
		submitBtn.classList.remove('active');
		preview.style.display = 'none';
		uploadLabel.style.display = 'block';

		getWorks();
		getWorksForModal();
	} catch (error) {
		errorMessage.textContent = "Erreur lors de l'envoi du formulaire.";
	}
});
