let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      addToyForm.addEventListener("submit", function(e){
        e.preventDefault
        postNewToy(e.target);
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys();
});

function getToys() {
  const url = 'http://localhost:3000/toys';
  return fetch(url)
    .then(function(response) {
      return response.json;
    })
    .then(json => makeCards(json));
}

function makeCards(json) {
  const toyContainer = document.getElementById('toy-collection');
  for (const element of json) {
    let card = document.createElement('div');
    card.className = "card";
    toyContainer.appendChild(card);
    for (const key in element) {
      const heading = document.createElement('h2');
      heading.innerHTML = key['name'];
      card.appendChild(heading);
      const image = document.createElement('img');
      image.className = "toy-avatar";
      image.src = key['image'];
      image.height = 150;
      card.appendChild(image);
      const pTag = document.createElement('p');
      const likes = key['likes'];
      pTag.innerHTML = `${likes} likes`;
      card.appendChild(pTag)
      const button = document.createElement('button');
      button.className = 'like-btn'
      button.innerHTML = 'Like <3';
      card.appendChild(button)
      button.addEventListener('click', function(e) {
        e.preventDefault;
        increaseLikes(e);
      })
    }
  }
}

function increaseLikes(e) {
  let addLikes = parseInt(e.target.prviousElementSibling.innerText) + 1
  fetch('http://localhost:3000/toys/:id', {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": addLikes
    })
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    e.target.previousElementSibling.innerText = `${addLikes} likes`;
  });
}

function postNewToy(newToy){
  fetch('http://localhost:3000/toys', {
    method: 'POST', 
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": newToy.name.value,
      "image": newToy.image.value,
      "likes": 0
    })  
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    let objectArray = [];
    objectArray.push(object); 
    renderToys(objectArray)
  });
}