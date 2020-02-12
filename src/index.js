document.addEventListener("DOMContentLoaded", () => {

    const toyCollection = document.querySelector('#toy-collection')
    const addBtn = document.querySelector('#new-toy-btn')
    const toyForm = document.querySelector('.container')
    let addToy = false



    // STEP 1 - FETCH TOYS

    // On the index.html page, there is a div with the id "toy-collection."

    // When the page loads, make a 'GET' request to fetch all the toy objects. With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.

    function loadToys() {

        fetch(toyCollection)
            .then(function(response) {
                return response.json();
            }).then(function(json) {
                json.message.forEach(toy => addCard(toy));
            });
    }

    // STEP 2 - ADD TOY INFO TO CARD

    // Each card should have the following child elements:

    //     h2 tag with the toy's name
    //     img tag with the src of the toy's image attribute and the class name "toy-avatar"
    //     p tag with how many likes that toy has
    //     button tag with a class "like-btn"

    function addCard(toy) {
        let container = document.querySelector('#toy-collection');
        let newDiv = document.createElement('div');
        newDiv.className = "card"
        container.appendChild(newDiv);

        let h2 = document.createElement('h2');
        h2 = newToy.name;

        let img = document.createElement('img');
        img.src = newToy.image;
        img.className = "toy-avatar";

        let p = document.createElement('p');
        p = newToy.likes;

        let button = document.createElement('button');
        button.class = "like-btn"

        newDiv.appendChild(h2, img, p, button)
    }


    // STEP 3 - ADD NEW TOY

    // When a user clicks on the add new toy button, a POST request is sent to http://localhost:3000/toys and the new toy is added to Andy's Toy Collection.
    // The toy should conditionally render to the page.
    // In order to send a POST request via Fetch, give the Fetch a second argument of an object. This object should specify the method as POST and also provide the appropriate headers and the JSON-ified data for the request. If your request isn't working, make sure your header and keys match the documentation.

    function postToy(toy) {
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
                    toyCollection.append(new_toy)
                })
        });
    }

    // addBtn.addEventListener('click', alert("Hello world!"));

    addBtn.addEventListener('click', () => {
        // hide & seek with the form
        addToy = !addToy
        if (addToy) {
            toyForm.style.display = 'block'
            toyForm.addEventListener('submit', event => {
                event.preventDefault()
                postToy(event.target)
            })
        } else {
            toyForm.style.display = 'none'
        }
    })




    // STEP 4 - INCREASE TOY likes

    // When a user clicks on a toy's like button, two things should happen:

    //     Conditional increase to the toy's like count
    //     A patch request sent to the server at http://localhost:3000/toys/:id updating the number of likes that the specific toy has
    //     Headers and body are provided below (If your request isn't working, make sure your header and keys match the documentation.)

    function likes(e) {
        e.preventDefault()
        let more = parseInt(e.target.previousElementSibling.innerText) + 1

        fetch(`http://localhost:3000/toys/${e.target.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"

                },
                body: JSON.stringify({
                    "likes": more
                })
            })
            .then(res => res.json())
            .then((like_obj => {
                e.target.previousElementSibling.innerText = `${more} likes`;
            }))



        loadToys().then(toys => {
            toys.forEach(toy => {
                addCard(toy)
            })
        })

    }
});