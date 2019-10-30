const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then((json) => renderToys(json));
}

function renderToys(json) {
  const toyCollection = document.getElementById('toy-collection');
  let jsonKeys = Object.keys(json)
  jsonKeys.forEach(toy => {
    const div = document.createElement('div')
    div.className = 'card'
    const h2 = document.createElement('h2')
    h2.innerHTML = toy.name
    const img = document.createElement('img')
    img.setAttribute('src', toy.image)
    img.className = 'toy-avatar'
    const p = document.createElement('p')
    p.innerHTML = `${toy.likes} likes`
    const button = document.createElement('button')
    button.className = 'like-btn'
    button.innerText = 'Like <3'
    button.id = toy.id
    button.addEventListener('click', function(e) {
      increaseLikes(e)
    })

    div.append(h2, img, p, button)
    toyCollection.appendChild(div)
  })
}

function getNewToy() {
  toyForm.children[0].addEventListener("submit", function() {
    debugger;
    let values = document.getElementsByClassName("input-text")
    newToy(values[0].value, values[1].value)
  })
}

function newToy(name, image, likes = 0) {
  return fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name,
      image,
      likes
    })
  })
  .then(response => response.json())
  .then((json) => renderToys(json))
}

function increaseLikes(e) {
  let addedLike = document.getElementById(event.target.id)
}

