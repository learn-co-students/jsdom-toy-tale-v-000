document.addEventListener("DOMContentLoaded", () => {

    const toyCollection = document.querySelector('#toy-collection')
    const addBtn = document.querySelector('#new-toy-btn')
    const toyForm = document.querySelector('.add-toy-form')
    const toyFormSubmit = document.querySelector('.submit')
    const likeBtn = document.querySelector('button')


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
        button.setAttribute('id', toy.id)
        button.innerText = "Like <3"
        button.addEventListener('click', (e) => {
            console.log(e.target.dataset);
            increaseLikes(e)
        })

        card.appendChild(h2)
        card.appendChild(img)
        card.appendChild(p)
        card.appendChild(button)

    }

    addBtn.addEventListener('click', showForm);

    function showForm() {
        var form = document.querySelector('.container')
        form.style.display = "block";
    }

    toyForm.addEventListener('submit', newToy);


    function newToy(event) {
        event.preventDefault();

        var toy = document.getElementsByTagName('input')
        console.log(toy[0].value);

        fetch('http://localhost:3000/toys', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": 'application/json'
                },
                body: JSON.stringify({
                    "name": toy[0].value,
                    "image": toy[1].value,
                    "likes": 0
                })
            })
            .then((response) => response.json())
            .then((toyObj) => {
                console.log(toyObj)
                return addToy(toyObj);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    function increaseLikes(e) {
        e.preventDefault();

        let more = parseInt(e.target.previousElementSibling.innerText) + 1

        fetch(`http://localhost:3000/toys/${e.target.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": 'application/json'
                },
                body: JSON.stringify({
                    "likes": more
                })
            })
            .then((response) => response.json())
            .then((toyObj) => {
                e.target.previousElementSibling.innerText = `${more} likes`;
            })
    }




    fetchToys();

});