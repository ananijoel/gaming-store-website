let ps5section = document.querySelector('.subcontainer.PlayStation5 .subconBody');

fetch("https://node-game-store-api-e25abde5221a.herokuapp.com/api/Items", {
    method: 'GET',
    headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
    }
})
.then(response => response.json())
.then(items => {
    items.data.forEach(item => {
        console.log(item.name);
        if(item.category.includes('ps5')) {
            // Créer une nouvelle div pour chaque élément
            let itemdiv = document.createElement('div');
            itemdiv.className = 'item';
            itemdiv.innerHTML = item.name;
            ps5section.append(itemdiv);
        }
    });
})
.catch(error => console.error('Error:', error));
