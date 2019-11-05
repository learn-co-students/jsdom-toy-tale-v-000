let addToy = false

function postToy(toy_data) {
  fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json"
      },
      body: JSON.stringify({
        "name": toy_data.name.value,
        "image": toy_data.image.value,
        "likes": 0

      })
    })
    .then(res => res.json())
    .then((json) => {
      const newToy = addingToys(json)
      divCollect.append(newToy)
    })
}

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  loadToyCollection();

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      toyForm.addEventListener('submit', event => {
        event.preventDefault()
        postToy(event.target)
      })
    } else {
      toyForm.style.display = 'none'
    }
  })
})




function loadToyCollection() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(json => addingToys(json));
}

function addingToys(json) {
  for(const toy of json) {
    console.log(toy);
    const toyCollection = document.getElementById('toy-collection')
    const card = document.createElement('div')
    const h2 = document.createElement('h2')
    const img = document.createElement('img')
    const p = document.createElement('p')
    const button = document.createElement('button')

    h2.textContent = toy.name
    img.className = 'toy-avatar'
    img.src = toy.image
    p.textContent = toy.likes + " Likes"
    button.className = 'like-btn'
    button.textContent = "Like <3"
    // img.textContent = toy.
    // img.textContent = toy.

    card.className = 'card';
    toyCollection.appendChild(card);
    card.appendChild(h2);
    card.appendChild(img);
    card.appendChild(p);
    card.appendChild(button);
  }
}
