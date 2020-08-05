let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      // submit button event listener
      toyFormContainer.addEventListener('submit', event => {
        addNewToy(event)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  // Fetch Andy's Toys
  fetchToys();
});

// When the page loads, make a 'GET' request to fetch all the toy objects. 
function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toysObject => {
    toysObject.forEach(toy => {
      renderToy(toy)
    })
  });
}
/*
  With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.
  Each card should have the following child elements:
    [x] h2 tag with the toy's name
    [x] img tag with the src of the toy's image attribute and the class name "toy-avatar"
    [x] p tag with how many likes that toy has
    [x] button tag with a class "like-btn"
*/
function renderToy(toyObject) {
  const toyCollectionDiv = document.getElementById('toy-collection');

  const toyCard = document.createElement('div');
  toyCard.setAttribute('class', 'card');
  // h2 tag with the toy's name
  const toyName = document.createElement('h2');
  toyName.innerText = toyObject.name;
  toyCard.appendChild(toyName);
  // img tag with the src of the toy's image attribute and the class name "toy-avatar"
  const toyImage = document.createElement('img');
  toyImage.src = toyObject.image;
  toyImage.setAttribute('class', 'toy-avatar');
  toyCard.appendChild(toyImage);
  // p tag with how many likes that toy has
  const toyLikes = document.createElement('p');
  toyLikes.innerText = `${toyObject.likes} Likes`;
  toyCard.appendChild(toyLikes);
  // button tag with a class "like-btn"
  const likeBtn = document.createElement('button');
  likeBtn.setAttribute('class', 'like-btn');
  // set button to toy's id
  likeBtn.setAttribute('id', toyObject.id)
  likeBtn.innerText = 'Like <3';
  // like button event listener
  likeBtn.addEventListener('click', event => {
    likeToy(event)
  })
  // add like button to toy card
  toyCard.appendChild(likeBtn);
  // add toy card to collection
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
  // preventDefault action
  event.preventDefault()
  // get number from <p> and add 1
  let newLikes = parseInt(event.target.previousElementSibling.innerText) + 1
  
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      'likes' : newLikes
    })
  };
  
  fetch(`http://localhost:3000/toys/${event.target.id}`, configObj)
  .then(response => response.json())
  .then(
    // display updated likes value
    event.target.previousElementSibling.innerText = `${newLikes} Likes`
  );
}l