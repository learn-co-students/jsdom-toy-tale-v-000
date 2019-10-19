const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const collection = document.querySelector("div#toy-collection");

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
      event.preventDefault();
      postToy(event.target);
    })
  } else {
    toyForm.style.display = 'none'
  }
})

getToys().then(toys => {
  toys.forEach(toy =>{
    renderToys(toy);
  })
})

// OR HERE!
function likes(e) {
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
    .then(res => res.json())
    .then((likeObj => {
      e.target.previousElementSibling.innerText = `${more} Likes`;
    }))
}

function postToy(toyData) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: toyData.name.value,
      image: toyData.image.value,
      likes: 0
    })
  })
  .then(resp => resp.json())
  .then(toyObj => {
    const newToy = renderToys(toyObj);
    collection.append(newToy);
  })
}

function getToys() {
  return fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
}

function renderToys(toy) {
  const h2 = document.createElement('h2');
  h2.innerHTML = `${toy.name}`;

  const img = document.createElement('img');
  img.setAttribute('src', toy.image);
  img.setAttribute('class', 'toy-avatar');

  const p = document.createElement('p');
  p.innerHTML = `${toy.likes} Likes`;

  const button = document.createElement('button');
  button.setAttribute('class', 'like-btn');
  button.setAttribute('id', toy.id);
  button.innerHTML = "Like <3";
  button.addEventListener('click', e => {
    likes(e);
  })

  const divCard = document.createElement('div');
  divCard.setAttribute('class', 'card');
  divCard.append(h2, img, p, button);
  collection.appendChild(divCard);
}
