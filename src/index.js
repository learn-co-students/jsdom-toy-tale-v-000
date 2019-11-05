let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
  fetchToys();

  toyForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const toyName = event.target.name.value;
    const toyImg = event.target.image.value;
    submitData(toyName, toyImg);
  })

})

function fetchToys() {
  const toyUrl = "http://localhost:3000/toys"
  const toys = fetch(toyUrl)
    .then(resp => resp.json())
    .then(json => json.forEach(toy => {
      renderToy(toy)
    }));
};

function renderToy(toy) {
  const toyCollection = document.getElementById('toy-collection');
  const toyCard = document.createElement('div');
  toyCard.classList.add('card');
    toyCard.innerHTML +=
      `
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
      `
  toyCollection.appendChild(toyCard);
  const toyLikes = document.createElement("p");
  toyLikes.innerText = `${toy.likes} Likes`;
  toyCard.appendChild(toyLikes);
  const likeBtn = document.createElement('button');
  likeBtn.innerText = "like <3";
  toyCard.appendChild(likeBtn);

  likeBtn.addEventListener('click', () => {
    increaseLikes(toy, toyLikes)
  })
}

function submitData(name, image) {

  let formData = {
    name: name,
    image: image,
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
    .then(function (response) {
      return response.json();
    })
    .then(function (object) {
      renderToy(object)
    })
    .catch(function (error) {
      let h1 = document.createElement('h1');
      h1.innerHTML = "Unauthorized Access";
      document.body.appendChild(h1);
      alert("Unauthorized Access");
      console.log(error.message);
    });
}

function increaseLikes(toy, toyLikes) {
  console.log(toy);
  let likeObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": ++toy.likes 
    })
  };

  return fetch(`http://localhost:3000/toys/${toy.id}`, likeObj)
    .then(function (response) {
      return response.json();
    })
    .then(function (updatedToy) {
      console.log(updatedToy);
      toyLikes.innerText = `${updatedToy.likes} Likes`;
    });
}