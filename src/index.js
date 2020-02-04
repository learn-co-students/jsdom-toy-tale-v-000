let addToy = false;
let toysEndpoint = "http://localhost:3000/toys"

function formSetup(){
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      toyForm.addEventListener('submit', e => {
        e.preventDefault();
        postToy(e.target);
      });
    } else {
      toyForm.style.display = "none";
    }
  });
}

function executeGet(f, url){
  fetch(url)
  .then(r => r.json())
  .then(json => f(json))
}

function likes(e){
  e.preventDefault();
  let numLikes = parseInt(e.target.previousElementSibling.innerText) + 1;
  let url = `http://localhost:3000/toys/${e.target.id}`;
  let body = {
    "likes": numLikes
  }

  const cobject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(body)
  }

  fetch(url, cobject)
  .then(r => r.json())
  .then(o => {
    e.target.previousElementSibling.innerText = `${numLikes} likes`;
  });
}

function createToyCard(toy){
  let toyCard = document.createElement('div');
  let toyName = document.createElement('h2');
  let toyImg = document.createElement('img');
  let toyLikes = document.createElement('p');
  let likeButton = document.createElement('button');

  toyCard.classList.add('card');
  toyName.innerText = toy.name;
  toyImg.classList.add('toy-avatar');
  toyImg.src = toy.image;
  toyLikes.innerText = `${toy.likes} Likes`;
  likeButton.classList.add('like-btn');
  likeButton.innerHTML = 'Like &hearts;';
  likeButton.setAttribute('id', toy.id);
  likeButton.addEventListener('click', (e) => {
    likes(e);
  });

  const children = [toyName, toyImg, toyLikes, likeButton];

  for(const child of children){
    toyCard.appendChild(child);
  }

  return toyCard;
}

function postToy(toyData){
  let toyCollection = document.getElementById('toy-collection');
  const url = "http://localhost:3000/toys"

  let body = {
    "name": toyData.name.value,
    "image": toyData.image.value,
    "likes": 0
  }

  const cobject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(body)
  }

  fetch(url, cobject)
  .then(r => r.json())
  .then(toy => {
    let toyCard = createToyCard(toy);
    toyCollection.appendChild(toyCard);
  })
}

function listToys(json){
  const toyCollection = document.getElementById('toy-collection');
  for(const toy of json){
    let toyCard = createToyCard(toy);
    toyCollection.appendChild(toyCard);
  }
}


document.addEventListener("DOMContentLoaded", () => {
  formSetup();
  executeGet(listToys, toysEndpoint);
});
