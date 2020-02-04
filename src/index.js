let addToy = false;
let toysEndpoint = "http://localhost:3000/toys"

function executeGet(f, url){
  fetch(url)
  .then(r => r.json())
  .then(json => f(json))
}

function formSetup(){
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
}

function createToyCard(toy){
  let toyCard = document.createElement('div');
  let toyId = document.createElement('span');
  let toyName = document.createElement('h2');
  let toyImg = document.createElement('img');
  let toyLikes = document.createElement('p');
  let likeButton = document.createElement('button');

  toyId.innerText = toy.id;
  toyId.style.display = 'none';
  toyCard.classList.add('card');
  toyName.innerText = toy.name;
  toyImg.classList.add('toy-avatar');
  toyImg.src = toy.image;
  toyLikes.innerText = `${toy.likes} Likes`;
  likeButton.classList.add('like-btn');
  likeButton.innerHTML = 'Like &hearts;';

  const children = [toyId, toyName, toyImg, toyLikes, likeButton];

  for(child of children){
    toyCard.appendChild(child);
  }

  return toyCard;
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
