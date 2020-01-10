let addToy = false

function createToyList(toysObj) {
  let toyCollectionDiv = document.getElementById("toy-collection");
  for(toy in toysObj) {
    let divElement = document.createElement("div");
    let h2Element = document.createElement("h2");
    let imgElement = document.createElement("img");
    let pTag = document.createElement("p");
    let buttonElement = document.createElement("button");
    let hiddenElement = document.createElement("hidden")
    divElement.setAttribute("class", "card");
    toyCollectionDiv.appendChild(divElement);
    h2Element.textContent = toysObj[toy]["name"];
    imgElement.src = toysObj[toy]["image"];
    imgElement.setAttribute("class","toy-avatar");
    pTag.innerHTML = toysObj[toy]["likes"] + " Likes";
    buttonElement.setAttribute("class", "like-btn")
    buttonElement.textContent = "Like <3"
    hiddenElement.id = toysObj[toy]["id"]
    divElement.appendChild(h2Element);
    divElement.appendChild(imgElement);
    divElement.appendChild(pTag);
    divElement.appendChild(buttonElement);
    divElement.appendChild(hiddenElement);
  }
}

function getAllToys() {
  return fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(json => {
    createToyList(json);
    monitorToyLikes();
  })
}

function submitNewToy(name, imgUrl, num_of_likes) {
  let toy = {
    name: name,
    image: imgUrl,
    likes: num_of_likes
  };

  let toyObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toy)
  }

  return fetch("http://localhost:3000/toys", toyObj)
  .then(resp => resp.json())
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

function monitorToyLikes() {
  all_likes = document.querySelectorAll(".like-btn");
  for (like of all_likes) {
      like.addEventListener("click", function() {
        increaseLikes(this.parentNode.childNodes[4].id, this.parentNode.childNodes[2].textContent)
      })
  }
}
document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')

  getAllToys();
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

})
