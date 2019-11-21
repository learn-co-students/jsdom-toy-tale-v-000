let addToy

const pageBody = document.querySelector("body")
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById("toy-collection")
const createButton = document.querySelector("#create-toy-btn")
const nameInput = document.querySelector("#name-input")
const imageInput = document.querySelector("#image-input")
const toyUrl = 'http://localhost:3000/toys'

function createToyCard(object){
  let newCard = document.createElement("div")
  let header = document.createElement("h2")
  let image = document.createElement("img")
  let numLikes = document.createElement("p")
  let likeButton = document.createElement("button")

  likeButton.addEventListener("click", function(){
    postLike(object, numLikes)
  })

  header.innerText = object.name
  image.src = object.image
  image.classList.add("toy-avatar")
  numLikes.innerText = `${object.likes} likes`
  likeButton.innerText = "Like"
  likeButton.classList.add("like-btn")

  newCard.appendChild(header)
  newCard.appendChild(image)
  newCard.appendChild(numLikes)
  newCard.appendChild(likeButton)
  toyCollection.appendChild(newCard)
}

function postLike(object, numLikes){
  object.likes++
  numLikes.innerText = `${object.likes} likes`

  fetch(toyUrl + '/' + object.id, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": object.likes
    })
  })
}

fetch(toyUrl)
.then(function(response){
  return response.json()
})
.then(function(object){
  for(const key in object){
    createToyCard(object[key])
  }
})

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

createButton.addEventListener("click", function(event){
  event.preventDefault()

  formData = {
    name: nameInput.value,
    image: imageInput.value,
    likes: 0
  }

  configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }

  fetch(toyUrl, configObj)
  .then(function(response){
    return response.json()
  })
  .then(function(object){
    createToyCard(object)
  })
  .catch(function(error){
    alert(error)
  })
})
