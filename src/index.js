let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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
      for (const toy of toyData) {
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

        // Put everything together
        for (const cardPart of [toyName, toyImage, numberOfLikes, likeButton]) {
          card.appendChild(cardPart);
        }
        toyCollection.appendChild(card);
      };
    })
});
