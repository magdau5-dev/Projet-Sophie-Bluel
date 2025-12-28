// Tous les works
// Méthode fetch
async function getWorks() {
	try {
		const response = await fetch('http://localhost:5678/api/works');

		const works = await response.json();

		const gallery = document.getElementById('gallery');

		works.forEach((work) => {
			const figure = document.createElement('figure');

			const img = document.createElement('img');
			img.src = work.imageUrl;
			img.alt = work.title;

			const figcaption = document.createElement('figcaption');
			figcaption.textContent = work.title;

			figure.appendChild(img);
			figure.appendChild(figcaption);
			gallery.appendChild(figure);
			console.log('Tableau de mes objets fetch :', works);
		});
	} catch (error) {
		console.error('Erreur lors du chargement des works :', error);
	}
}
getWorks();

// Méthode .map
// async function getWorks() {
//     try {
//         const response = await fetch("http://localhost:5678/api/works");
//         const works = await response.json();

//         const gallery = document.getElementById("gallery");

//         const html = works.map((work) =>
//             `<figure>
//                 <img src="${work.imageUrl}" alt="${work.title}" />
//                 <figcaption>${work.title}</figcaption>
//             </figure>`).join("");

//         console.log("Tableau de mes objets .map :", works)

//         gallery.innerHTML = html;
//     } catch (error) {
//         console.error("Erreur lors du chargement des works :", error);
//     }
// }
// getWorks();

/*
<figure>
	<img
		src="http://localhost:5678/images/abajour-tahina1651286843956.png"
		alt="Abajour Tahina"
	/>
	<figcaption>Abajour Tahina</figcaption>
</figure>
*/

// Toutes les catégories depuis les works
async function getWorksByCategory(categoryId) {
	try {
		const response = await fetch('http://localhost:5678/api/works');
		const works = await response.json();

		const filteredWorks = works.filter(function (work) {
			return work.category.id === categoryId;
		});

		const gallery = document.getElementById('gallery');

		const html = filteredWorks
			.map(
				(work) =>
					`<figure>
                <img src="${work.imageUrl}" alt="${work.title}">
                <figcaption>${work.title}</figcaption>
            </figure>`
			)
			.join('');

		gallery.innerHTML = html;
	} catch (error) {
		console.error('Erreur lors du filtrage :', error);
	}
}

async function loginUser(email, password) {
	const response = await fetch('http://localhost:5678/api/users/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: email,
			password: password,
		}),
	});

	if (!response.ok) {
		throw new Error('Identifiants incorrects');
	}

	return await response.json(); // { token: "..." }
}

async function getWorksForModal() {
	try {
		const response = await fetch('http://localhost:5678/api/works');
		const works = await response.json();

		const modalGallery = document.getElementById('modal-gallery');
		modalGallery.innerHTML = '';

		works.forEach((work) => {
			const figure = document.createElement('figure');

			const img = document.createElement('img');
			img.src = work.imageUrl;
			img.alt = work.title;

			const deleteIcon = document.createElement('i');
			deleteIcon.classList.add('fa-solid', 'fa-trash-can', 'delete-icon');

			// on stocke l'id du work
			deleteIcon.dataset.id = work.id;

			// clic sur la poubelle 
			deleteIcon.addEventListener('click', async () => {
				const token = localStorage.getItem('token');

				// A DEMANDER
				const confirmDelete = confirm(
					'Voulez-vous vraiment supprimer ce projet ?'
				);
				if (!confirmDelete) return; // si l'alert est non ou fermée, return rien = fait aucune action 

				try {
					const deleteResponse = await fetch(
						`http://localhost:5678/api/works/${work.id}`,
						{
							method: 'DELETE',
							headers: {
								Authorization: `Bearer ${token}`, // important d'envoyer la requete avec le token, si pas de token, pas de suppression
							},
						}
					);

					if (!deleteResponse.ok) {
						throw new Error('Erreur suppression');
					}

					// suppression du DOM
					figure.remove();

					// mise à jour galerie principale
					document.getElementById('gallery').innerHTML = '';
					getWorks();// rappel de l'api pour visualiser les works
				} catch (error) {
					console.error('Erreur lors de la suppression :', error);
				}
			});

			figure.appendChild(img);
			figure.appendChild(deleteIcon);
			modalGallery.appendChild(figure);
		});
	} catch (error) {
		console.error('Erreur chargement galerie modale :', error);
	}
}

