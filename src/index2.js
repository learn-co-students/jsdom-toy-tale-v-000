document.addEventListener("DOMContentLoaded", () => {

    const toyCollection = document.querySelector('#toy-collection')
    const addBtn = document.querySelector('#new-toy-btn')
    const toyForm = document.querySelector('.container')

    function fetchToys() {
        fetch('http://localhost:3000/toys')
            .then(res => res.json())
            .then(function(json) {
                json.forEach(toy => addToy(toy));
            });

    }

    function addToy(toy) {
        card = document.createElement('div');
        card.className = 'card';
        toyCollection.appendChild(card);

        h2 = document.createElement('h2');
        img = document.createElement('img');
        p = document.createElement('p');
        button = document.createElement('button');

        h2.innerText = toy.name
        img.src = toy.image
        img.className = "toy-avatar"
        p.innerText = toy.likes + ' Likes'
        button.className = "like-btn"
        button.innerText = "Like <3"

        card.appendChild(h2)
        card.appendChild(img)
        card.appendChild(p)
        card.appendChild(button)

    }

    addBtn.addEventListener('click', newToy);

    function newToy(toy) {
        //display the toy form, on submit take the input, set the values, run addToy

        fetch('http://localhost:3000/toys', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json'
            },
            body: JSON.stringify({
                    "name": toy.name.value,
                    "image": toy.image.value,
                    "likes": 0
                })
                .then(function(response) {
                    return response.json();
                })
                .then((obj_toy) => {
                    let new_toy = addCard(obj_toy)
                })
        });
    }

    //Increase toys likes

    fetchToys();

});