document.addEventListener('DOMContentLoaded', function () {
  fetchToys();
})


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

const fetchToys = () => {
  const toyUrl = "http://localhost:3000/toys";
  fetch(toyUrl)
    .then((response) => response.json())
    .then((json) => renderToys(json))
}

const renderToys = (json) => {
  const div = document.getElementById('toy-collection');
  Object.keys(json).forEach((toy) => {
    console.log(toy); //logs 0 in console or if toy["name"] or toy.name, it's undefined
    const toyDivCard = document.createElement('div');
    toy = toyDivCard.classList.add('toy-card');

    const h2ToyName = document.createElement('h2');
    h2ToyName.textContent = toy.name;
    toyDivCard.appendChild(h2ToyName);

    const imgAvatar = document.createElement('img');
    imgAvatar.setAttribute("src", toy);
    imgAvatar.classList.add('toy-avatar') = toy.image;
    toyDivCard.appendChild(imgAvatar);

    const pLikes = document.createElement('p');
    pLikes.textContent = toy.likes;
    toyDivCard.appendChild(pLikes);

    const likeButton = document.createElement('button');
    likeButton.classList.add('like-btn');
    toyDivCard.appendChild(likeButton);

    div.appendChild(toyDivCard);

  })
}