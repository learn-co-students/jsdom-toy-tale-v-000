const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
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
  h2.innerHTML = toy.name

  const img = document.createElement("img")
  img.className = "toy-avatar"
  img.setAttribute("src", toy.image);

  const p = document.createElement("p")
  if (toy.likes === 1) {
    p.innerHTML = "1 Like"
  }
  else {
    p.innerHTML = toy.likes + " Likes"
  }

  const button = document.createElement("button")
  button.className = "like-btn"
  button.innerHTML = "Like <3"
  button.addEventListener("click", function(event) {
    increaseLikes(toy);
  })

  div.append(h2, img, p, button)
  toyCollection.append(div);
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener("submit", function(event) {
      event.preventDefault();
      fillForm();
    })
  } else {
    toyForm.style.display = 'none'
  }
})

function fillForm() {
  let toyName = document.getElementsByClassName("input-text")[0];
  let imageUrl = document.getElementsByClassName("input-text")[1];
  newToy(toyName.value, imageUrl.value);
  toyName.value = "";
  imageUrl.value = "";
  toyForm.style.display = "none";
}

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

function increaseLikes(toy) {
  let p = document.querySelectorAll(".card p")[toy.id - 1]
  let toyLikes = toy.likes += 1

  fetch(toysUrl + `/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: toyLikes
    })
  })
  .then(response => response.json())
  .then((json => {
    p.innerHTML = `${toyLikes} Likes`;
    return false;
  }))
}
