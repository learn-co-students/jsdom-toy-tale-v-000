const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
const createBtn = document.querySelector('.submit');

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

createBtn.addEventListener('click', function(event) {
  event.preventDefault();
  createNewToy();
})

function createNewToy() {
  let formData = getFormData()
  let configObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch("http://localhost:3000/toys", configObject)
    .then(response => response.json())
    .then(object => addToyCard(object))
}

function getFormData() {
  const toyNameInput = document.querySelector("[name = 'name']");
  const toyUrlInput = document.querySelector("[name = 'image']");

  let formData = {
    name: toyNameInput.value,
    image: toyUrlInput.value,
    likes: 0
  }
  return formData;
}


// OR HERE!
document.addEventListener('DOMContentLoaded', function() {
   loadToys();
});

function loadToys() {
  const imgUrl = "http://localhost:3000/toys"
  fetch(imgUrl)
    .then(response => response.json())
    .then(results => results.forEach(toy => addToyCard(toy)))
}

// calling this function with any toy argument will run through all the necessary 
// steps and add the toy to the collection. 
function addToyCard(toy) {
  let newToyEl = createBlankCard();
  populateToyCard(newToyEl, toy);
  addToToyCollection(newToyEl);
}

function createBlankCard() {
  let newCardEl = document.createElement("div");
  newCardEl.class = "card"
  return newCardEl;
}

function populateToyCard(card, toy) {
  let toyHeader = document.createElement("h2");
  toyHeader.innerHTML = toy["name"]
  card.appendChild(toyHeader)

  let toyImg = document.createElement("img");
  toyImg.src = toy["image"];
  toyImg.class = "toy-avatar";
  card.appendChild(toyImg)

  let toyLikes = document.createElement("p");
  toyLikes.innerHTML = toy["likes"];
  card.appendChild(toyLikes)

  let likeBtn = document.createElement("button");
  likeBtn.addEventListener('click', event => likeButton(toy))
  likeBtn.class = "like-btn";
  likeBtn.innerHTML = "Like <3";
  card.appendChild(likeBtn)

  return card;
}

function addToToyCollection(completeToyCard) {
  let toyCollection = document.querySelector('#toy-collection');
  toyCollection.appendChild(completeToyCard);
}

function likeButton(toy) {
  let formData = toy;
  formData.likes ++;
  let configObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch(`http://localhost:3000/toys/${toy.id}`, configObject)
    .then(response => response.json())
    .then(object => console.log(object))
}


// create the card 
// populate the card with information 
// inject that card into a specific DOM location

// add an event listener to the "Create New Toy" button
// once that is clicked, you should fire the fetch that posts a new toy.
// you might also want to call the function that creates a new toy container. 


// add an event listener on all like buttons. so perhaps when the card is created. 
// the callback should be a function that initiates the sequence of events 
// that goes on to update the likes. 

