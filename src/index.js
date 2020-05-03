// Compare solutions here: https://github.com/learn-co-curriculum/jsdom-toy-tale/blob/solution/src/index.js

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  function addErrorMessage(error) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = error.message;
    document.body.prepend(errorMessage);
  }

  function incrementLikes(toy, numberOfLikes) {
    let toyUrl = `http://localhost:3000/toys/${toy.id}`;

    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": toy.likes + 1
      })
    }

    fetch(toyUrl, configObj)
      .then(response => response.json())
      .then(function(obj) {
        numberOfLikes.textContent = `${obj.likes} Likes `;
      })
      .catch(addErrorMessage);
  }
  
  function createToyCard(toy) {
    // Create the card
    const card = document.createElement("div");
    card.className = "card";

    // Create the parts of the card
    const toyName = document.createElement('h2'); // Name
    toyName.textContent = toy.name;

    const toyImage = document.createElement('img'); // Image
    toyImage.src = toy.image;
    toyImage.className = "toy-avatar";
    toyImage.alt = `${toy.name}`; // I added this part; images need alts.

    const numberOfLikes = document.createElement('p'); // Likes
    numberOfLikes.textContent = `${toy.likes} Likes `;

    const likeButton = document.createElement('button'); // Like button
    likeButton.className = "like-btn";
    likeButton.textContent = "Like <3";

    // Add an event listener to the Like Button
    likeButton.addEventListener("click", function() { incrementLikes(toy, numberOfLikes) });

    // Put everything together
    for (const cardPart of [toyName, toyImage, numberOfLikes, likeButton]) {
      card.appendChild(cardPart);
    }
    toyCollection.appendChild(card); // toyCollection is defined outside of this function.
  }

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const toyCollection = document.getElementById('toy-collection');
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(function(toyData) {
      for (const toy of toyData) { createToyCard(toy); };
    });

  const toyForm = toyFormContainer.querySelector('.add-toy-form');
  const nameInput = toyForm.querySelector("input[name='name']");
  const imageInput = toyForm.querySelector("input[name='image']");
  toyForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let formData = {
      name: nameInput.value,
      image: imageInput.value,
      likes: 0
    };

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
      .then(function(toy) { createToyCard(toy) })
      .catch(addErrorMessage);
  });
});
