const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let toyCollection = document.querySelector('#toy-collection')

// YOUR CODE HERE

document.addEventListener("DOMContentLoaded", function() {
  getAllTheToys()
  //all toys are received from the database as 'toys', then each iteration is 
  //ran through postToys as the parameter

  // .then(function(toys){
  // toys.forEach(function(toy){
  //     postToys(toy)
  //   })
  // })

  .then(toys => {
    toys.forEach(toy => {
      postToys(toy)
    })
  })
});

//This function gathers the toys object from the localhost and returns it
function getAllTheToys() {
  return fetch('http://localhost:3000/toys')
  .then(function(response) {
    return response.json();
  }) 
}

function postNewToys(new_toy_object) {
  fetch("http://localhost:3000/toys", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    
    "name": new_toy_object.name.value,
    "image": new_toy_object.image.value,
    "likes": 0
  })
})
.then(results => results.json())
    .then((obj_toy) => {
      let new_toy = postToys(obj_toy)
      toyCollection.append(new_toy)
    })
}

function postToys(toy) {
  //variables are declared and initialized with elements and attributes
  //let element = document.createElement(tagName);
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  //Element.setAttribute(name, value);
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let b = document.createElement('button')
  b.setAttribute('class', 'like-btn')
  b.innerText = "Like <3"

  let divparentcard = document.createElement('div')
  divparentcard.setAttribute('class', 'card')
  // div card is created and all newly created elements with their
  //associated attributes are appended
  divparentcard.append(h2, img, p, b)
  toyCollection.append(divparentcard)
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
      event.preventDefault()
      postNewToys(event.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})
// OR HERE!
