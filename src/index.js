let addToy = false
const toyForm = document.getElementById('add-toy-form')
const toyCollection = document.getElementById('toy-collection')
//Baby Yoda - https://target.scene7.com/is/image/Target/GUEST_16a613aa-90af-4631-8f8c-9dfe6d079d6a?wid=488&hei=488&fmt=pjpeg

document.addEventListener("DOMContentLoaded", () => {
  displayToys()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container")
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyFormContainer.style.display = "block"
      toyForm.style.display = "block"
    } else {
      toyFormContainer.style.display = "none"
      toyForm.style.display = "none"
    }
  })
})

function displayToys(){
  fetch("http://localhost:3000/toys").then(resp => resp.json())
  .then( data => {
      data.forEach( toy => printToy(toy) )
    })
}

function printToy(toy){
  const collection = document.getElementById('toy-collection')

  let wrapper = Object.assign(document.createElement('div'),{ className: 'card', id: toy.id })
  let title = Object.assign(document.createElement('h2'),{ textContent: toy.name })
  let image = Object.assign(document.createElement('img'),{className: 'toy-avatar', src: toy.image })
  let likes = Object.assign(document.createElement('p'),{ textContent: "Likes: " })
  let count = Object.assign(document.createElement('span'),{ textContent: toy.likes })
  let likeButton = Object.assign(document.createElement('button'),{ className: "like-btn", textContent: "Like" })

  collection.append(wrapper)
  wrapper.append(title, image, likes, likeButton)
  likes.append(count)
}

toyForm.addEventListener("submit", (event) => {
  event.preventDefault()

  let toyName = document.getElementById('toy-name').value
  let toyUrl = document.getElementById('toy-image-url').value
  let newToyData = { name: toyName , image: toyUrl, likes: 0 }

  if (!!toyName.trim() && !!toyUrl.trim()) {
    return fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json' 
      },
      body: JSON.stringify(newToyData) 
    })
    .then(resp => resp.json()).then(data => printToy(data)).catch(err => console.log(err.message))
  }
})

toyCollection.addEventListener("click", (event) => {
  if (event.target.className == "like-btn") {
    let toy = event.target.parentNode
    let likeCount = toy.querySelector("p span").innerText
    likeCount = parseInt(likeCount) + 1
    updateToy(toy.id, likeCount)
  }
})

function updateToy(id, likeCount) {
  let newData = {id: id, likes: likeCount}

  return fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json' 
    },
    body: JSON.stringify(newData) 
  })
  .then(resp => resp.json())
  .then(json => {
    document.getElementById(`${id}`).querySelector("p span").innerText = json.likes
  })
  .catch(err => console.log(err.message))
}