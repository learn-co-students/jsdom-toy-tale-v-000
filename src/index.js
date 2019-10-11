const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const addToyForm = document.querySelector('form')
let addToy = false

window.addEventListener('DOMContentLoaded', function(){
  fetch('http://localhost:3000/toys')
  .then((response) => response.json())
  .then(function(json) {
    json.forEach(toyCard)
  });
});

function toyCard(data) {
  let name = data.name
  let likes = data.likes
  let imageURL = data.image

  let el = document.querySelector('#toy-collection');
  let div = document.createElement('div');
  let h = document.createElement('h2');
  let t = document.createTextNode(name);
  let img = document.createElement('img');
  img.src = imageURL
  let p = document.createElement('p')
  let pText = document.createTextNode(likes + ' likes')
  let btn = document.createElement('button')
  btn.innerText = "Like"

  el.append(div)
  div.setAttribute("id", "card");
  div.append(h);
  h.appendChild(t);
  img.setAttribute("class", "toy-avatar")
  div.append(img)
  p.appendChild(pText)
  p.setAttribute("id", data.name)
  div.append(p)
  btn.setAttribute("class", "like-btn")
  btn.setAttribute("id", "btn-" + data.id)
  div.append(btn)
  attachListeners();
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

addToyForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let characterName = document.querySelector('#name').value
    let characterImage = document.querySelector('#image').value

    const data = {
      name: characterName,
      image: characterImage,
      likes: 0
    }
    const url = 'http://localhost:3000/toys'
    const req = {
      method: 'POST',
      headers: 
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      body: JSON.stringify(data)
    };
    fetch(url, req)
    .then((response) => response.json())
    .then(function(json) {
      toyCard(json);
    });
})


function attachListeners() {
  let buttons = document.querySelectorAll('.like-btn');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', increaseLikes); 
  }
}

function increaseLikes() {
  let id = this.id.split('-')[1]
  fetch('http://localhost:3000/toys')
  .then((response) => response.json())
  .then(function(json) {
    let char = json.filter(obj => {return obj.id === parseInt(id)})
    char[0].likes += 1
    const data = { 
      name: char[0].name,
      image: char[0].image,
      likes: char[0].likes 
    };
    const url = 'http://localhost:3000/toys/'
    const req = {
      method: 'PUT',
      headers: 
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      body: JSON.stringify(data)
    };
    fetch(url + id, req)
    .then((response) => response.json())
    .then(function(json) {
      let likes = document.getElementById(json.name);
      likes.textContent = json.likes;
    });
  });
  
}