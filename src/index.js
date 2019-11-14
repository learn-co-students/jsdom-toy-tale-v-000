let addToy = false
const toysUrl = "http://localhost:3000/toys";

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  fetchToys(); //fetch all the toys

  addBtn.addEventListener('click', () => {
     //hide & seek with the form
    addToy = !addToy //addToy = true if addBtn clicked
    if (addToy) {
      toyForm.style.display = 'block' //Form displayed
      toyForm.addEventListener('submit', event => {
        event.preventDefault()
        submitData(event)
      }) //Form submitted
    } else {
      toyForm.style.display = 'none'
    }
  })
})

//sending form data for new toy to the server
function submitData(event) {
  fetch(toysUrl,{
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
  })
  .then(function(object) {
    renderToy(object) //sending new tody data to the function that will display it
  })

}

//get all the toys from the database
function fetchToys() {
  return fetch(toysUrl)
  .then(resp => resp.json())
  .then(json => allToys(json))
}

//iterate through the toys array and send each toy object individually to the display function
function allToys(json) {
  json.forEach(toy => {
    renderToy(toy)
  })
}

//create a card for each toy to be displayed
 function renderToy(object){
  let toyCollection = document.getElementById('toy-collection')

  let div = document.createElement('div')
  div.className = 'card'

  let h2 = document.createElement('h2')
  h2.innerHTML = `${object.name}`

  let img = document.createElement('img')
  img.src = object.image
  img.className = 'toy-avatar'//will give it toy-avatar css styling

  let p = document.createElement('p')
  p.innerHTML = `${object.likes} Likes`

  let likeBtn = document.createElement('button')
  likeBtn.className = 'like-btn'
  likeBtn.innerHTML = 'Like <3'
  likeBtn.setAttribute('id', object.id) //links button to toy id
  likeBtn.addEventListener("click", event => {
    event.preventDefault()
    increaseLikes(event)
  })

  div.append(h2, img, p, likeBtn)

  toyCollection.appendChild(div)
 }

//add 1 to the toy's number of likes
function increaseLikes(event) {
  let currentLikes = parseInt(event.target.previousElementSibling.textContent)
  //identify likes counters as prevousElementSibling of likeBtn (the event target)
  let newLikes = currentLikes + 1
  //send update to database
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
  })
  .then(function(likes) {
    event.target.previousElementSibling.textContent = `${newLikes} likes`
  })
}
