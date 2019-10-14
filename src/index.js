const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
const toysUrl = "http://localhost:3000/toys"

document.addEventListener("DOMContentLoaded", function(event) {
  fetchToys();
})

function fetchToys() {
  return fetch(toysUrl)
    .then(response => response.json())
    .then(json => renderToys(json));
}

function renderToys(toys) {
  const toyCollection = document.getElementById("toy-collection")
  toys.forEach(toy => {
    renderToy(toy);
  })
}

function renderToy(toy) {
  const toyCollection = document.getElementById("toy-collection")
  const div = document.createElement("div")
  div.className = "card"

  const h2 = document.createElement("h2")
  h2.innerHTML = `${toy.name}`

  const img = document.createElement("img")
  img.className = "toy-avatar"
  img.setAttribute("src", `${toy.image}`);

  const p = document.createElement("p")
  p.innerHTML = `${toy.likes} Likes`

  const button = document.createElement("button")
  button.className = "like-btn"
  button.innerHTML = "Like <3"

  div.append(h2, img, p, button)
  toyCollection.append(div);
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

function newToy(toyName, imageUrl) {
  return fetch(toysUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: toyName,
      image: imageUrl,
      likes: 0
    })
  })
  .then(response => response.json())
  .then(json => renderToy(json));
}

document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault();
  let toyName = document.getElementsByClassName("input-text")[0];
  let imageUrl = document.getElementsByClassName("input-text")[1];
  newToy(toyName.value, imageUrl.value);
  toyName.value = "";
  imageUrl.value = "";
  toyForm.style.display = "none";
})


document.addEventListener("DOMContentLoaded", function(event) {
  likeToy();
})




function likeToy() {
  let likeButtons = document.getElementsByClassName("like-btn");
  // let likeButtonsArray = Array.from(likeButtons);

  for (let i = 0; i < likeButtons.length; i++) {
    likeButtons[i].addEventListener("click", function(event) {
      console.log(`You liked toy #${i + 1}`)
    })
  }
}

function increaseLikes(toy) {
  return fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: toy.likes + 1
    })
  })
}




// const likeBtn = document.getElementsByClassName("like-btn")[0]
// likeBtn.addEventListener("click", () => {
//   likeBtn.style.color = "blue"
// })

// add an event listener so that when a user clicks on the like button for a toy the likes for that toy increase by 1.
// the index of the like button for a toy is one less than the toy id

// Conditional increase to the toy's like count
// A patch request sent to the server at http://localhost:3000/toys/:id updating the number of likes that the specific toy has
