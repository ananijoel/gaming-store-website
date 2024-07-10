let item;
let nom = document.querySelector('.nom');
let creation = document.querySelector('.creation');
let description = document.querySelector('.description');
let type = document.querySelector('.type');
let quantite = document.querySelector('.quantite input');
let prix = document.querySelector('.prix');
let button = document.querySelector('.button');
let alltypes = ''

fetch("https://node-game-store-api-e25abde5221a.herokuapp.com/api/Item/1", {
    method: 'GET',
    headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
    }
})
.then(response => response.json())
.then(data => {
    console.log(data)
    item = data.data;
    nom.innerHTML = item.name;
    creation.innerHTML =`<span>Article en vente depuis</span> : ${new Date(item.updatedAt).toLocaleDateString()}`
    description.innerHTML = item    .description
    item.category.split(' ').forEach(element => {
        alltypes += `<div>${element}</div>`
        console.log(alltypes)
    });
    
    type.innerHTML = alltypes
   
    
    quantite.max = item.quantity;
    prix.innerHTML = item.price;

    // Calcul initial du prix total
    updatePrixTotal();

    // Ajouter un écouteur d'événement pour la mise à jour de la quantité
    quantite.addEventListener('input', updatePrixTotal);
})
.catch(error => console.error('Error:', error));

// Fonction pour mettre à jour le prix total
function updatePrixTotal() {
    let prixTotale = parseInt(quantite.value) * parseFloat(item.price);
    button.innerHTML = `acheter au total de ${prixTotale} €`;
}
