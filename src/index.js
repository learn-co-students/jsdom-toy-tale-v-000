let addToy = false
const toysUrl = "http://localhost:3000/toys";

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  fetchToys();

  addBtn.addEventListener('click', () => {
     //hide & seek with the form
    addToy = !addToy //addToy = true if addBtn clicked
    if (addToy) {
      toyForm.style.display = 'block'
      toyForm.addEventListener('submit', event => {
        event.preventDefault()
        //debugger;
        submitData(event.target)
      })
    } else {
      toyForm.style.display = 'none'
    }
  })

})

function submitData(name, image) {
  fetch("http://localhost:3000/toys",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": `${event.target.name.value}`,
      "image": `${event.target.image.value}`,
      "likes": 0
    })
  })
  .then(function(response) {
    return response.json()
    //console.log(response)
  })
  .then(function(object) {

    renderToy(object)
    //toyCollection.append(added_toy)
    //console.log(added_toy)
  })

}

function fetchToys() {
  return fetch(toysUrl)
  .then(resp => resp.json())
  .then(json => allToys(json))

  //.then(json => renderToy(json))
  //console.log(json)
}

function allToys(json) {
  json.forEach(toy => {
    renderToy(toy)
  })
}

 function renderToy(object){
   //console.log(json)
  let toyCollection = document.getElementById('toy-collection')

  let div = document.createElement('div')
  div.className = 'card'

  let h2 = document.createElement('h2')
  h2.innerHTML = `${object.name}`

  let img = document.createElement('img')
  img.src = object.image
  img.className = 'toy-avatar'

  let p = document.createElement('p')
  p.innerHTML = `${object.likes} Likes`

  let likeBtn = document.createElement('button')
  likeBtn.className = 'like-btn'
  likeBtn.textContent = 'Like <3'
  //debugger;
  likeBtn.setAttribute('id', object.id)
  //debugger;
  likeBtn.addEventListener("click", event => {
    //debugger;
    increaseLikes(event)
  })

    //event.preventDefault();



  div.append(h2, img, p, likeBtn)
     //div.appendChild(img)
     //div.appendChild(p)
  toyCollection.appendChild(div)

 }

function increaseLikes(event) {
  //console.log(event.target.id)
  let currentLikes = parseInt(event.target.previousElementSibling.textContent)
  console.log(currentLikes)
  let newLikes = currentLikes + 1
  fetch(`http://localhost:3000/toys/${event.target.id}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({

      "likes": newLikes
    })
  })
  .then(function(response) {
    return response.json()
    //console.log(response)
  })
  .then(function(liked_object) {
    event.target.previousElementSibling.textContent = `${newLikes} likes`
    //toyCollection.append(added_toy)
    //console.log(added_toy)
  })

}
