

document.addEventListener("DOMContentLoaded", () => {
const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
var divs = document.querySelector("#toy-collection");

let addToy = false



function outputToy(toyObj) {
    let divElement = document.createElement("div");
    let h2Element = document.createElement("h2");
    let imgElement = document.createElement("img");
    let pTag = document.createElement("p");
    let buttonElement = document.createElement("button");
    let hiddenElement = document.createElement("hidden")
    divElement.setAttribute("class", "card");
    console.log(divs)
    divs.appendChild(divElement);
    h2Element.textContent = toyObj["name"];
    imgElement.src = toyObj["image"];
    imgElement.setAttribute("class","toy-avatar");
    pTag.innerHTML = toyObj["likes"] + " Likes";
    buttonElement.setAttribute("class", "like-btn")
    buttonElement.textContent = "Like <3"
    buttonElement.addEventListener("click", function() {
      increaseLikes(this.parentNode.childNodes[4].id, this.parentNode.childNodes[2].textContent)
    })
    hiddenElement.id = toyObj["id"]
    divElement.appendChild(h2Element);
    divElement.appendChild(imgElement);
    divElement.appendChild(pTag);
    divElement.appendChild(buttonElement);
    divElement.appendChild(hiddenElement);
    console.log(divElement)
  }

function getAllToys() {
  return fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toyObj => {
    console.log(toyObj)
    for (toy of toyObj) {
      outputToy(toy);
    }
  })
}

function submitNewToy(toy_data) {
  let toyObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: toy_data.name.value,
      image: toy_data.image.value,
      likes: 0
    })
  }

  return fetch("http://localhost:3000/toys", toyObj)
  .then(resp => resp.json())
  .then(toyObj => {
    outputToy(toyObj)
  })
}

function outputLikes(json) {
  cards = document.querySelectorAll(".card")
  for (card of cards) {
    if (card.childNodes[4].id == json.id) {
      card.childNodes[2].innerHTML = json.likes + " Likes";
    }
  }
}
function increaseLikes(id, likes) {
  like = parseInt(likes.split("Likes")[0])+1;
  console.log(like)
  return fetch("http://localhost:3000/toys/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: like
    })
  }).then(resp => resp.json())
  .then(json => {
    outputLikes(json)
  })
}

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.addEventListener("submit", event => {
        event.preventDefault()
        submitNewToy(event.target);
      })
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  getAllToys();
})


