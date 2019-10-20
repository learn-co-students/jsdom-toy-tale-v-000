const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

// render existing toys as cards on page load
window.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys => {
    toys.forEach(toy => {
      addToyCard(toy);
    })
  })
})

// create a new toy
toyForm.querySelector('.submit').addEventListener('click', () => {
  event.preventDefault();
  let formData = {
    name: toyForm.querySelector('input[name="name"]').value,
    image: toyForm.querySelector('input[name="image"]').value,
    likes: 0
  };
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  toyForm.querySelector('input[name="name"]').value = ""
  toyForm.querySelector('input[name="image"]').value = ""
  fetch('http://localhost:3000/toys', configObj)
  .then(resp => resp.json())
  .then(toy => addToyCard(toy));
}, false);

// like button
function like(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": more
    })
  })
  .then(resp => resp.json())
  .then(likeObj => {
    e.target.previousElementSibling.innerText = `${more} Likes`;
  })
};

// create a new toy card and add to page
function addToyCard(toy) {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.src = toy.image
  img.className = 'toy-avatar'

  let p = document.createElement('p')
  p.innerText = `${toy.likes} Likes`
  
  let btn = document.createElement('button')
  btn.className = 'like-btn'
  btn.id = toy.id
  btn.innerText = 'Like'
  btn.addEventListener('click', (e) => {
    like(e);
  })

  let card = document.createElement('div')
  card.className = "card"
  card.append(h2, img, p, btn)
  document.getElementById("toy-collection").appendChild(card)
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
});