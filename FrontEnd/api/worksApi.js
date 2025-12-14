// async function getWorks() {
// 	try {
// 		const response = await fetch("http://localhost:5678/api/works");

// 		const works = await response.json();

// 		const gallery = document.getElementById("gallery");

// 		works.forEach((work) => {
// 			const figure = document.createElement("figure");

// 			const img = document.createElement("img");
// 			img.src = work.imageUrl;
// 			img.alt = work.title;

// 			const figcaption = document.createElement("figcaption");
// 			figcaption.textContent = work.title;

// 			figure.appendChild(img);
// 			figure.appendChild(figcaption);
// 			gallery.appendChild(figure);
//             console.log("Tableau de mes objets fetch :", works)
// 		});
// 	} catch (error) {
// 		console.error("Erreur lors du chargement des works :", error);
// 	}
// }
// getWorks();



async function getWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        const works = await response.json();
        
        const gallery = document.getElementById("gallery");

        const html = works.map((work) =>
            `<figure>
                <img src="${work.imageUrl}" alt="${work.title}" />
                <figcaption>${work.title}</figcaption>
            </figure>`).join("");

        console.log("Tableau de mes objets .map :", works)

        gallery.innerHTML = html;
    } catch (error) {
        console.error("Erreur lors du chargement des works :", error);
    }	
}
getWorks();

/*
<figure>
	<img
		src="http://localhost:5678/images/abajour-tahina1651286843956.png"
		alt="Abajour Tahina"
	/>
	<figcaption>Abajour Tahina</figcaption>
</figure>
*/
