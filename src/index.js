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

  getToys();

  const form = document.getElementsByClassName('add-toy-form')[0];
  form.addEventListener('submit', function(event){
    const name = event.currentTarget.elements.name.value;
    const imageURL = event.currentTarget.elements.image.value;

    const json = postToy(name, imageURL);
  });
});

function postToy(name, imageURL){
  let formData = {
    name: name,
    image: imageURL,
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

  return fetch("http://localhost:3000/toys", configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
    })
    .catch(function(error) {
      console.log(error);
    });
}

function getToys(){
  return fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(json => renderToys(json))
    .catch(function(error) {
      console.log(error)
    })
}

function renderToys(json) {
  const toyCollection = document.getElementById('toy-collection');
  json.forEach(toy => {
    const div = document.createElement('div')
    div.className = "card"
    div.innerHTML = `
      <h2>${toy.name}</h2>
      <img src = "${toy.image}" class="toy-avatar" />
      <p>${toy.likes} Likes</p>
    `

      let button = document.createElement('button')
      button.innerHTML = `Like <3`
      button.setAttribute('id', toy.id)
      button.className = "like-btn"
      button.addEventListener("click", likeButtonListener)
    div.appendChild(button)

    toyCollection.appendChild(div)
  })
}

function likeButtonListener(){
  let currentLikes = parseInt(event.target.previousElementSibling.innerText)
  let id = event.target.id

  // update likes number on the page
  event.target.previousElementSibling.innerText = `${currentLikes+1} Likes`

  // update likes in the db
  likeUpdater(id, currentLikes+1)
}

function likeUpdater(id, likes){
  let configObj = {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": likes
    })
  };

  return fetch(`http://localhost:3000/toys/${id}`, configObj)
    .catch(function(error) {
      console.log(error);
    });
}
