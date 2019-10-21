document.addEventListener('DOMContentLoaded', function () {
  fetchToys();
})


const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  // click will make addToy true
  addToy = !addToy
  // if true the toyForm will display
  if (addToy) {
    toyForm.style.display = 'block'
  // if false the toyForm will not display
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!

const fetchToys = () => {
  const toyUrl = "http://localhost:3000/toys";
  fetch(toyUrl)
    .then((response) => response.json())
    .then((json) => renderToys(json))
}

const renderToys = (toys) => {
  const toyCollection = document.getElementById('toy-collection');
  console.log("toys", toys);
  toys.map((toy) => {
    // console.log("toy", toy)
    const toyDivCard = document.createElement('div');
    toyDivCard.classList.add('card');
    toyDivCard.style.backgroundColor = "red";

    const h2ToyName = document.createElement('h2');
    h2ToyName.textContent = toy.name;
    toyDivCard.appendChild(h2ToyName);

    const imgAvatar = document.createElement('img');
    imgAvatar.setAttribute("src", toy.image);
    imgAvatar.classList.add('toy-avatar');
    toyDivCard.appendChild(imgAvatar);

    const pLikes = document.createElement('p');
    pLikes.textContent = toy.likes;
    toyDivCard.appendChild(pLikes);

    const likeButton = document.createElement('button');
    likeButton.classList.add('like-btn');
    likeButton.innerText =  "❤️";
    likeButton.addEventListener("click", addLike);
    toyDivCard.appendChild(likeButton);

    toyCollection.appendChild(toyDivCard);
  })
  // Object.keys(json).forEach((toy) => {
  //   console.log(toy); //logs 0 in console or if toy["name"] or toy.name, it's undefined
    // 
    // toy = 
}

const addLike = function (likes) {
  console.log("clicked");

  const requestBody = {likes: likes};

  const configLikes = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(requestBody)
  }

  return fetch("http://localhost:3000/toys/:id", configLikes)
    .then((response) => response.text())
    .then((json) => {
      console.log(document.getElementById("p"));
    })
}
