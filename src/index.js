let addToy = false;
const toysUrl = 'http://localhost:3000/toys';

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const form = document.getElementsByClassName('add-toy-form')[0]

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  form.addEventListener('submit', function(e) {
    const toy = {
      name: `${e.target[0].value}`,
      image: `${e.target[1].value}`,
      likes: 0
    }
    createToy(toy);
  })

  addToysToCollection();
})


function addToysToCollection() {
  return fetch(toysUrl)
    .then(function(resp) {
      return resp.json();
    })
    .then(function(toys) {
      for (const toy of toys) {
        displayToyCard(toy);
      }
    });
}

function displayToyCard(toy) {
  const toyCollection = document.getElementById('toy-collection');

  let div = document.createElement('div');
  div.className = 'card';

  let name = document.createElement('h2');
  name.innerText = toy.name;

  let image = document.createElement('img');
  image.src = toy.image;
  image.className = 'toy-avatar';

  let likes = document.createElement('p');
  likes.innerText = `${toy.likes} likes`;

  let button = document.createElement('button');
  button.innerText = 'Like <3';
  button.className = 'like-btn';
  button.id = toy.id;

  addEventListenerForLikeButton(button);

  for (item of [name, image, likes, button]) {
    div.appendChild(item);
  }

  toyCollection.appendChild(div);
}

function createToy(toy) {
  const toyObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toy)
  }

  fetch(toysUrl, toyObject)
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    return object;
  })
}

function addEventListenerForLikeButton(button) {
  button.addEventListener('click', function(e) {
    const toyElement = this.parentNode;
    const updatedLikes = parseInt(toyElement.getElementsByTagName('p')[0].innerText.replace(' likes', '')) + 1;
    const toyUrl = `http://localhost:3000/toys/${e.target.id}`;

    const toyObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": updatedLikes
      })
    }

    fetch(toyUrl, toyObject)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      e.target.previousElementSibling.innerText = `${updatedLikes} likes`;
    })
  })
}
