const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let divCollect = document.querySelector('#toy-collection')


function getToys() {
  return fetch('http://localhost:3000/toys')
    .then(res => res.json())
}

function postToy(toy_data) {
  fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toy_data.name.value,
        "image": toy_data.image.value,
        "likes": 0

      })
    })
    .then(res => res.json())
    .then((obj_toy) => {
      let new_toy = renderToys(obj_toy)
      divCollect.append(new_toy)
    })
}

function likes(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": more
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
}

function renderToys(toy) {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "like"
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likes(e)
  })

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn)
  divCollect.append(divCard)
}


// add listener to 'Add Toy' button to show or hide form
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
      event.preventDefault()
      postToy(event.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})

// start by getting all toys

getToys().then(toys => {
  toys.forEach(toy => {
    //function to render toys goes here or something
    renderToys(toy)
  })
})






// let addToy = false;

// let formData = {  
// 	name: "Jessie",  
//   image: "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist"
// }; 

// let configObjPost = {  
// 	method: "POST",  
// 	headers: {    
// 		"Content-Type": "application/json",    
// 		"Accept": "application/json"  
// 	},  
// 	body: JSON.stringify(formData)
// }; 

// function sendData() {
//   fetch("http://localhost:3000/toys", configObjPost)  
//   .then(function(response) {    
// 	  return response.json();  
//   })  
//   .then(function(object) {    
// 	  renderData(object);  
//   });
// }

// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyFormContainer = document.querySelector(".container");
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });
// });

// let configObj = {  
// 	method: "GET",  
// 	headers: {    
// 		"Content-Type": "application/json",    
// 		"Accept": "application/json"  
// 	},  
// }; 

// function getData() {
//   fetch("http://localhost:3000/toys", configObj)  
//   .then(function(response) {    
// 	  return response.json();  
//   })  
//   .then(function(object) {    
// 	  renderData(object);  
//   });
// }

// function renderData(object) {
//   const toyCollection = document.querySelector('div#toy-collection')
//   object.forEach(toy => {
//     const toyCard = document.createElement('div')
//     toyCard.className = "card"
//     toyCard.innerHTML = `<h2>${toy.name}</h2>
//       <img src=${toy.image} class='toy-avatar'/>
//       <p>${toy.likes} Likes</p>
//       <button class='like-btn'>Like <3</button>
//     `;
//     toyCollection.appendChild(toyCard);
//   })
  
// }

// document.addEventListener('DOMContentLoaded', function() {
//   getData()
// })

// let patchObj = {  
// 	method: "PATCH",  
// 	headers: {    
// 		"Content-Type": "application/json",    
// 		"Accept": "application/json"  
//   },
//   body: JSON.stringify({
//     "likes": `${likes}`
//   })
// }; 

// function addLikes() {
//   fetch("http://localhost:3000/toys/:id", patchObj) 
//   .then(function(response) {    
// 	  return response.json();  
//   })  
//   .then(function(object) {    
// 	  object.forEach(toy => {
//       const toyCard = document.createElement('div')
//       toyCard.className = "card"
//       toyCard.innerHTML = `<h2>${toy.name}</h2>
//         <img src=${toy.image} class='toy-avatar'/>
//         <p>${toy.likes} Likes</p>
//         <button class='like-btn'>Like <3</button>
//       `; 
//   });
// }
