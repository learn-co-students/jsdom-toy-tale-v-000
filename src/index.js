
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  getToys();
  getNewToy();
  increaseLikes();

  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    }
    else {
      toyFormContainer.style.display = "none";
    }
  })
})

function getToys() {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => {
    toys.forEach(toy => createCard(toy));
  });
};

function getNewToy() {
  const realForm = document.querySelector('.add-toy-form')
    realForm.addEventListener("submit", function(e) {
      e.preventDefault()

      let name = e.target[0].value 
      let image = e.target[1].value

      fetch("http://localhost:3000/toys", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json"
        },
        body: JSON.stringify({
          "name": name,
          "image": image,
          "likes": 0
          })
        })

      .then(response => response.json())
      .then(newToy => createCard(newToy))
    })
}

function createCard(toy) {
  let c = document.createElement("div")
  c.className = "card";
  c.id = toy.id
  let name = document.createElement("h2")
  name.innerText = toy.name
  let image = document.createElement("img")
  image.className = "toy-avatar"
  image.src = toy.image
  let likes = document.createElement("p")
  likes.innerHTML = toy.likes + " likes"
  let button = document.createElement("button")
  button.className = "like-btn"
  button.innerHTML = "Like <3"
  button.dataset.toyid = toy.id
  c.append(name, image, likes, button)
  const toyColl = document.getElementById("toy-collection");
  toyColl.append(c)
};

function increaseLikes() {
  
  let toyId = toy.id;
  let likes = toy.likes;
  let newLikes = likes + 1 ;

  
  fetch(`http://localhost:3000/toys/${toyId}`), {
    method: "PATCH",
    headers: 
    {
    "Content-Type": "application/json",
    Accept: "application/json"
    },

    body: JSON.stringify({
    "likes": newLikes
    })
  }

}

