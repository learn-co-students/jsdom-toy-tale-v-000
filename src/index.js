let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  getToys()
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


});

function getToys() {
  fetch('http://localhost:3000/toys')
  .then(function(response) {
    return response.json()
  })
  .then(function(json) {
    const toyArray = json
    for (const toy of toyArray) {
      createToys(toy)
    }
  })
}

const toyCollection = document.getElementById('toy-collection')

function createToys(toyObject) {
  let toyCard = document.createElement('div');
  toyCard.className = 'card';

  let toyName = document.createElement('h2');
  toyName.innerText = toyObject['name'];
  toyCard.appendChild(toyName);

  let toyImg = document.createElement('img');
  toyImg.src = toyObject['image'];
  toyImg.className = 'toy-avatar'
  toyCard.appendChild(toyImg);

  let toyLikes = document.createElement('p')
  toyLikes.innerHTML = toyObject['likes'] + " Likes"
  toyCard.appendChild(toyLikes)

  let toyButton = document.createElement('button')
  toyButton.className = 'like-btn'
  toyButton.innerText = 'Like <3'
  toyCard.appendChild(toyButton)

  toyCollection.appendChild(toyCard)
}

