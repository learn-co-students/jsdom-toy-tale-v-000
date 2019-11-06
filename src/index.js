let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')

  loadToyCollection();
  addBtn.addEventListener('click', addNewToy)
})

function addNewToy() {
  const toyForm = document.querySelector('.container')
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
      event.preventDefault();

      const formWithValues = event.target;
      const formData = {
        name: formWithValues.name.value,
        image: formWithValues.image.value,
        likes: 0
      };

      const objectForPost = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(formData)
      };

      fetch('http://localhost:3000/toys', objectForPost)
      .then(response => response.json())
      .then(data => loadToy(data))
      .catch(error => console.log(error));

      formWithValues.reset();
    })
  } else {
    toyForm.style.display = 'none';
  }
}

function loadToyCollection() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(json => addingToys(json));
}

function addingToys(json) {
  for(const toy of json) {
    loadToy(toy);
  }
}

function loadToy(toy) {
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
  button.setAttribute('id', toy.id);
  button.textContent = "Like <3"
  button.addEventListener('click', (event)=>{
    event.preventDefault();
    
    const addOne = parseInt(event.target.previousElementSibling.innerText) + 1 
    const objectForPatch ={
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        likes: addOne
      })
    }
    fetch(`http://localhost:3000/toys/${event.target.id}`, objectForPatch)
    .then(response => response.json())
    .then(obj => p.textContent = obj.likes + " Likes")
  })

  card.className = 'card';
  toyCollection.appendChild(card);
  card.appendChild(h2);
  card.appendChild(img);
  card.appendChild(p);
  card.appendChild(button);
}