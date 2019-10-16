const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const collection = document.querySelector("div#toy-collection");

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

document.addEventListener('DOMContentLoaded', () => {
  fetchToys();
})

// OR HERE!
// function fetchToys() {
//   return fetch('http://localhost:3000/toys')
//   .then(resp => resp.json())
//   .then(toys => {
//     const collection = document.querySelector("div#toy-collection");
//     toys.forEach(toy => {
//       let div = document.createElement("div");
//       let h2 = document.createElement("h2");
//       let img = document.createElement("img");
//       let p = document.createElement("p");
//       let button = document.createElement("button");
//       div.className = "card";
//       button.className = "like-btn";
//       h2.innerHTML = `${toy.name}`;
//       img.src = `${toy.image}`;
//       img.className = "toy-avatar";
//       p.innerHTML = `${toy.likes} Likes`;
//       button.innerHTML = "Like <3";
//
//       div.append(h2, img, p, button);
//       collection.appendChild(div);
//     })
//   })
// }

function fetchToys() {
  return fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys => {
    toys.forEach(toy => {
      const card = buildCard(toy)
      card.append(buildH2(toy), buildImg(toy), buildP(toy), buildButton(toy));
      collection.appendChild(card);
    })
  })
}

function buildCard(toy) {
  const div = document.createElement("div");
  div.className = "card";
  return div;
}

function buildH2(toy) {
  const h2 = document.createElement("h2");
  h2.innerHTML = `${toy.name}`;
  return h2;
}

function buildImg(toy) {
  const img = document.createElement("img");
  img.src = `${toy.image}`;
  img.className = "toy-avatar";
  return img;
}

function buildP(toy) {
  const p = document.createElement("p");
  p.innerHTML = `${toy.likes} Likes`;
  return p;
}

function buildButton(toy) {
  const button = document.createElement("button");
  button.className = "like-btn";
  button.innerHTML = "Like <3";
  return button;
}
