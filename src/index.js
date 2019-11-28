const card = toy =>  ` <div class="card" data-toy-id=${toy.id}>
                        <h2>${toy.name}</h2>
                        <img src=${toy.image} class="toy-avatar" />
                        <p>${toy.likes} Likes </p>
                        <button class="like-btn">Like <3</button>
                      </div> `


let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const createForm = document.querySelector('.add-toy-form')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  createForm.addEventListener('submit', createToy)

  fetch('http://localhost:3000/toys')
    .then(r => r.json())
    .then(makeCards)  

})

function makeCards(data) {
  for (toy of data) {makeCard(toy)}
  const likes = document.querySelectorAll(".like-btn")
  for (const btn of likes){btn.addEventListener("click", likeMe)}
}

function makeCard(toy){
  document.querySelector("#toy-collection").innerHTML += card(toy)
}

function likeMe(e){
  e.preventDefault();
  const card = e.target.parentNode
  const toyId = card.dataset.toyId
  const likesDiv = card.children[2]
  const currentLikes = parseInt(likesDiv.textContent)
  likesDiv.textContent = `${currentLikes + 1} Likes`
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ likes: currentLikes + 1})
  })
}

function createToy(e){
  e.preventDefault();
  const name = document.querySelector("#name").value 
  const image = document.querySelector("#image").value 
  const likes = 0
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({name, image, likes})
  })
  .then(r => r.json())
  .then(makeCard)
}
