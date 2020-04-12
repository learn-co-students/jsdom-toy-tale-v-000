// When the page loads, make a 'GET' request to fetch all the toy objects.
window.onload = () => {
  fetchAllToys();
  // toyInfo()

}

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
});

// TEMPLATE
// fetch("string representing a URL to a data source")
// fetch("http://localhost:3000/toys") 
//   //  .then(function(response) {
//   .then(function fetchAllToys(response) {
//     // return response.json();
//     return response.json();
//   })
//   .then(function(json){
//     // Use this data inside of `json` to do DOM manipulation
//     // With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.
//     document.getElementById("toy-collection").container.add("card");
//   })

function fetchAllToys() {
  const allToysListUrl = 'http://localhost:3000/toys'
  //on page load, fetch all the toys using the url above 
  fetch(allToysListUrl)
  .then(resp => resp.json())
      .then(json => renderToys(json))
      // console.log(json)
}

// function renderToys(json) {
//   allToys = document.getElementById("toy-collection")
//     originalToyList = Object.keys(json) //Original Toy List
//     // iterate over the array
//     for(let i = 0; i < originalToyList.length; i++) {
//       allToys.innerHTML +=`<li>${originalToyList[i]}</li>`
//     }
    
// }

function toyInfo(){
  // create Toy Elements
  const card = document.createElement("div")
  const h2 = document.createElement("h2")
  const img = document.createElement("img").src
  const p = document.createElement("p")
  const button = document.createElement("btn")
  // h2 tag with the toy's name
  let toyName = h2
  card.appendChild(toyName)
  // img tag with the src of the toy's image attribute and the class name "toy-avatar"
  let toyImage = img 
  card.appendChild(toyImage)
  // p tag with how many likes that toy has
  let toyLikes = p
  card.appendChild(toyLikes)
  // button tag with a class "like-btn"
  let likeButton = button
  card.appendChaild(likeButton)

  document.querySelector("toy-collection")
  // Set to updateToyList
  updateToyList = document.querySelector("toy-collection")

}


function renderToys(json) {
  // debugger //HIT
  toyCollection = document.getElementById("toy-collection")
  // debugger //HIT
  originalToyList = Object.keys(json) //Original Toy List
  // debugger //HIT 
    // iterate over array
    for (let i = 0; i < originalToyList.length; i++) {
    // debugger //HIT
      toyCollection.innerHTML += `<li>${originalToyList[i]}</li>`
    } 
    // debugger //Hit
}

//   const toysUrl = "http:localhost:3000/toys"
//     fetch(toysUrl)
//       .then(resp => resp.json())
//       .then(json => {
        // toyCollection = document.getElementById("toy-collection")
  
  // Add class name to the div
  // card.className = "card"
  // const h2 = document.createElement('h2')

//         toysList = document.getElementById("toy-collection")
//           for (let i = 0; i < json.json.length; i++) {
//             document.getElementById("toy-collection").container.add("card");




// function addClass(selector, card) {

//   // get all elements that match our selector
//   elements = document.querySelectorAll("toy-collection");

//   // add class to all chosen elements
//   for (var i=0; i<elements.length; i++) {
//     elements[i]."toy-collection".add(card);
//   }
// }

function addCard() {
    // Add class name to the div
    card.className = "card"
}

function addButton() {
  // Add class name to the button
  button.className = "like=btn"
}

function addNewToy(toyInfo) {
  //  a POST request is sent to http://localhost:3000/toys
  fetch("http://localhost:3000/toys", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })

 
  body: JSON.stringify({
    "name": toyInfo.name.value,        //"Jessie",
    "image": toyInfo.image.value,      //"https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
    "likes": toyInfo.tooyLikes.value    //0
  })  
} 