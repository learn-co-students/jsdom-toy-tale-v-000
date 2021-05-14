let addToy = false;
const toyForm = document.querySelector('.add-toy-form');
const toyCollection = document.getElementById('toy-collection');

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyForm.addEventListener('submit', function(event){
        event.preventDefault();
        postToy(event.target);
      });
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  addToys();
});

function addToys() {
  return fetch('http://localhost:3000/toys')
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      const toys = object;
      addToyCard(toys);
    })
}

function addToyCard(toys) {
  for (const key in toys) {
    addToyCardDetail(toys[key]);
  }
};

function addToyCardDetail(toy) {
  const card = document.createElement('div');
  const h2 = document.createElement('h2');
  const img = document.createElement('img');
  const p = document.createElement('p');
  const btn = document.createElement('button');
  // {id: 7, name: "Hamm", image: "https://cdn140.picsart.com/244090226021212.png?r1024x1024", likes: 0}
  h2.innerText = toy["name"];
  card.appendChild(h2);

  img.src = toy["image"]
  img.classList.add("toy-avatar");
  card.appendChild(img);

  p.innerText = `${toy["likes"]} likes`;
  card.appendChild(p);

  btn.innerText = "Like <3";
  btn.id = toy["id"];
  btn.classList.add("like-btn");
  btn.addEventListener('click',function(event){
    increaseLikes(event);
  })
  card.appendChild(btn);

  card.classList.add("card");
  toyCollection.appendChild(card);
}

function postToy(newToy) {

  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": newToy.name.value,
      "image": newToy.image.value,
      "likes": 0
    })
  })
    .then(function(response){
      return response.json();
    })
    .then(function(object){
      addToyCardDetail(object);
      toyForm.reset();
      toyForm.parentElement.style.display = "none";
    })
};

function increaseLikes(event) {
  let cardLikes = event.target.parentElement.querySelector('p');
  let moreLikes = parseInt(cardLikes.innerText) + 1;

  fetch(`http://localhost:3000/toys/${event.target.id}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": moreLikes
    })
  })
    .then(function(response){
      return response.json();
    })
    .then(function(object){
      cardLikes.innerText = `${moreLikes} likes`;
    })
};