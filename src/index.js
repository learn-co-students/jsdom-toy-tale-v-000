let addToy = false
function renderToys(json){
  let toyCollection = document.getElementById('toy-collection')
  Array.from(json).forEach(toy => {
    let div = document.createElement("div");
    div.className = "card";

    let h2 = document.createElement("h2");
    h2.innerText = toy.name;
    div.appendChild(h2);

    let img = document.createElement("img");
    img.src = toy.image;
    img.className = "toy-avatar"
    div.appendChild(img);

    let p = document.createElement("p");
    p.innerText = toy.likes + " Likes ";
    p.dataset.likes = toy.likes;
    div.appendChild(p);

    let button = document.createElement("button");
    button.className = "like-btn";
    button.innerText = "Like <3"
    button.dataset.number = toy.id;
    div.appendChild(button);
    button.addEventListener("click", function(event){
      postLike(event);
    })

    toyCollection.appendChild(div);
  })
}

function postLike(event){
  let toyCard = event.target.closest(".card")
  let currentLikes = parseInt(toyCard.childNodes[2].dataset.likes)
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({"likes": currentLikes + 1})
  }
  fetch("http://localhost:3000/toys/" + event.target.dataset.number, configObj)
  .then(response => response.json())
  .then(function(json){
    updateLikes(json, toyCard);
  })
}

function updateLikes(json, toyCard){
  console.log(json)
  console.log(toyCard)
  let toysLikes = toyCard.childNodes[2]
  toysLikes.innerText = json.likes + " Likes "
  toysLikes.dataset.likes = json.likes
}

function postNewToy (){
  let name = document.getElementById("new-name").value;
  let img = document.getElementById("new-img").value;
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
            "name": name,
            "image": img,
            "likes": 0
          })
  }

  fetch("http://localhost:3000/toys", configObj)
    .then(response => response.json())
    .then(function(json){
      renderToys(json);
    })
}


document.addEventListener("DOMContentLoaded", ()=>{

  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(function(json){
      renderToys(json);
    })
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

  let newToyForm = document.querySelector(".submit")

  newToyForm.addEventListener("click", function(event){
    event.preventDefault();
    postNewToy();
  })


})

// <div class="card">
//     <h2>Woody</h2>
//     <img src=toy_image_url class="toy-avatar" />
//     <p>4 Likes </p>
//     <button class="like-btn">Like <3</button>
//   </div>
