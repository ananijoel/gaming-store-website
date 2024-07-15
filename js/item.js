let item;
let nom = document.querySelector('.nom');
let creation = document.querySelector('.date');
let description = document.querySelector('.description');
let types = document.querySelector('.types');
let quantite = document.querySelector('.quantite input');
let prix = document.querySelector('.prix p:nth-child(2)');
let button = document.querySelector('.button');
let alltypes = ''
let options = document.querySelectorAll('.buttonOption')
document.querySelector('.boutique').classList.add('active')
let pictures = document.querySelectorAll('.img')
let mainPicture = document.querySelector('.image img')
mainPicture.setAttribute('src', document.querySelector('.img.active').getAttribute('src'))
function convertirDate(dateString) {
    // Créer un objet Date à partir de la chaîne de caractères
    const dateParts = dateString.split('/');
    const date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

    // Tableau des noms de mois en français
    const mois = [
        'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 
        'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];

    // Obtenir le jour, le mois et l'année
    const jour = date.getDate();
    const moisNom = mois[date.getMonth()];
    const annee = date.getFullYear();

    // Retourner la date formatée
    return `${jour} ${moisNom} ${annee}`;
}

fetch("https://node-game-store-api-e25abde5221a.herokuapp.com/api/Item/45", {
    method: 'GET',
    headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
    }
})
.then(response => response.json())
.then(data => {
    //console.log(data)
    item = data.data;
    nom.innerHTML = item.name;
    creation.innerHTML =convertirDate(new Date(item.updatedAt).toLocaleDateString())
    description.innerHTML = item    .description
    
    item.category.forEach(type => {
        console.log(type);
        types.innerHTML += `<div class="${type}">${type}</div>`; 
    });
    quantite.max = item.quantity;
    prix.innerHTML = item.price;

    // Calcul initial du prix total
    updatePrixTotal();

    // Ajouter un écouteur d'événement pour la mise à jour de la quantité
    quantite.addEventListener('input', updatePrixTotal);
    button.setAttribute('href',`https://wa.me/70076829?text= ${item.name} ${item.price} ${quantite.value} ${prixTotale} ${document.querySelector('.buttonOption.active').innerText} ${window.location.href}`)
    
})
.catch(error => console.error('Error:', error));

// Fonction pour mettre à jour le prix total
let prixTotale
function updatePrixTotal() {
    prixTotale = parseInt(quantite.value) * parseFloat(item.price)
    button.innerHTML = `acheter au total de ${prixTotale} FCFA`;
}

//modification de l'image pricipale au clic de l'utillisateur

pictures.forEach(picture => {
    picture.addEventListener('click', (e) => {
        // Supprimer la classe 'active' de tous les éléments
        pictures.forEach(p => p.classList.remove('active'));
        
        // Ajouter la classe 'active' à l'élément cliqué
        picture.classList.add('active');
        mainPicture.setAttribute('src', picture.getAttribute('src'))
    });
});

options.forEach(option =>{
    option.addEventListener('click', (e) =>{
        options.forEach(o =>o.classList.remove('active'))
        option.classList.toggle('active')
    })
})

