let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener("submit", event => {
        addNewToy(event)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetchToys();
});

function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toysObject => {
    toysObject.forEach(toy =>{
      renderToy(toy)
    })
  })
}

function renderToy(toyObject) {
  const toyCollectionDiv = document.getElementById('toy-collection');

  const toyCard = document.createElement('div');
  toyCard.setAttribute('class', 'card');

  const toyName = document.createElement('h2');
  toyName.innerText = toyObject.name;
  toyCard.appendChild(toyName);

  const toyImage = document.createElement('img');
  toyImage.src = toyObject.image;
  toyImage.setAttribute('class', 'toy-avatar');
  toyCard.appendChild(toyImage);

  const toyLikes = document.createElement('p');
  toyLikes.innerText = `${toyObject.likes} Likes`;
  toyCard.appendChild(toyLikes);

  const likeBtn = document.createElement('button');
  likeBtn.setAttribute('class', 'like-btn');

  likeBtn.setAttribute('id', toyObject.id)
  likeBtn.innerText = 'Like <3';

  likeBtn.addEventListener('click', event => {
    likeToy(event)
  })

  toyCard.appendChild(likeBtn);

  toyCollectionDiv.appendChild(toyCard);
}

function addNewToy(event) {
  event.preventDefault()
  const toyFormContainer = document.querySelector(".container");

  let formData = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0
  };

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch("http://localhost:3000/toys", configObj)
    .then(response => response.json())
    .then(object => {
      renderToy(object),
        toyFormContainer.style.display = "none"
    });
}

function likeToy(event) {
  event.preventDefault()

  let newLikes = parseInt(event.target.previousElementSibling.innerText) + 1

  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      'likes': newLikes
    })
  };

  fetch(`http://localhost:3000/toys/${event.target.id}`, configObj)
    .then(response => response.json())
    .then(
      event.target.previousElementSibling.innerText = `${newLikes} Likes`
    );
} 