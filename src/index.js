const allToysListUrl = 'http://localhost:3000/toys'
// When the page loads, make a 'GET' request to fetch all the toy objects.
window.onload = () => {
  fetchAllToys();
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


function fetchAllToys() {
  // const allToysListUrl = 'http://localhost:3000/toys' //MADE GLOBAL VARIABLE
  //on page load, fetch all the toys using the url above 
  return fetch(allToysListUrl)
  
  .then(resp => resp.json())
  
  .then(json => json.forEach(toy => {
    renderToys(toy)
  }))

}

// function renderToys(json) {
//   allToys = document.getElementById("toy-collection")
//     originalToyList = Object.keys(json) //Original Toy List
//     // iterate over the array
//     for(let i = 0; i < originalToyList.length; i++) {
//       allToys.innerHTML +=`<li>${originalToyList[i]}</li>`
//     }
    
// }


function renderToys(toy) {
  // debugger //HIT
  console.log(toy)


    // create Toy Elements
    const card = document.createElement("div")
    card.className = "card"
    // CARD HAS TO BE APPENDED TO THE NODE ON THE WEBPAGE
    document.getElementById("toy-collection").appendChild(card)

    // h2 tag with the toy's name
    const h2 = document.createElement("h2")
    // card.className = "card"
    //  Displays toy name
    toyName = toy.name
    card.appendChild(h2).toyName
    // img tag with class name "toy-avatar"
    const img = document.createElement("toy-avatar")
    img.className = "toy-avatar"
    // img tag with the src of the toy's image attribute
    toyImage = toy.image
    card.appendChild(img).toyImage
    // p tag with how many likes that toy has
    const p = document.createElement("p")
    // p tag with how many likes that toy has
    toyLikes = toy.likes
    card.appendChild(p).toyLikes
    // button tag with a class "like-btn"
    const button = document.createElement("like-btn")
    button.className = "like=btn"
    likeButton = button.innerHTML
    card.appendChild(button).likeButton 

    //document.getElementById("new-toy-btn").addEventListener('click', function)// function()), updateList()), addNewToy(toy))
    // document.getElementById("breed-dropdown").addEventListener('change', removeBreeds) 
}  
  
//   function updateList()
//     // document.querySelector("toy-collection")
//     // Set to updateToyList
//     // updateToyList = document.querySelector("toy-collection")
//     updateToyList = allToyListUrl.append('card')
//     return updateToyList
// }



 
//   for (let i = 0; i < toy.length; i++) {
//     // debugger //HIT.
//     toyInfo(json[i])
//   // ==debugger //HIT.
//  // console.log(json)
// //  console.log("what is i", json[i])
//   return fetch(allToysListUrl)
// .then(resp => resp.json())
// .then(json => renderToys(json))
//   // toyCollection.innerHTML += `<li>${json[i].name}</li>`
//     // toyCollection.innerHTML += `<li>${originalToyList[i]}</li>`
//   } 
  // toyCollection = document.getElementById("toy-collection")
  //   toyCollection.innerHTML += `<li>${json[i].name}</li>` //index.js:49 Uncaught (in promise) ReferenceError: i is not defined
  //   toyCollection.innerHTML += `<li>${originalToyList[i]}</li>`
  // // debugger //HIT
  // originalToyList = Object.keys(json) //Original Toy List
  // // debugger //HIT 
  //   // iterate over array
  //   console.log(json)

    //  debugger //Hit
// }

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

// function addCard() {
//     // Add class name to the div
//     card.className = "card"
// }

// function addButton() {
//   // Add class name to the button
//   button.className = "like=btn"
// }

// function addImage() {
//   // Add class name to the image
//   card.className = "toy-avatar"
// }

function addNewToy(toy) {
  //  a POST request is sent to http://localhost:3000/toys
  fetch("http://localhost:3000/toys", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": renderToys(toy).name.value,        //add the initial data IE THE FORM
      "image": renderToys(toy).image.value,      //"https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
      "likes": renderToys(toy).toyLikes.value    //0
    })  
    // .then(resp => ).the name("input-text")
    // .then(resp => ). the image("input-text")

    // ADD TO THE DOM
  })
}

// function toyInfo(toy){
//   // create Toy Elements
//   const card = document.createElement("div")
//   // h2 tag with the toy's name
//   const h2 = document.createElement("h2")

//   const img = document.createElement("toy-avatar")
//   const p = document.createElement("p")
//   const button = document.createElement("like-btn")

//   // h2 tag with the toy's name
//     //  Displays toy name
//     toyName = toy.name
//     card.appendChild(h2).toyName
 
//   // img tag with the src of the toy's image attribute and the class name "toy-avatar"
//   toyImage = toy.image
//   card.appendChild(img).toyImage
   
//   // p tag with how many likes that toy has
//   toyLikes = toy.likes
 
//   card.appendChild(p).toyLikes
 
//   // button tag with a class "like-btn"
//   likeButton = button.innerHTML
//   card.appendChild(button).likeButton 
 
//   // document.querySelector("toy-collection")
//   // Set to updateToyList
//   return updateToyList = document.querySelector("toy-collection")
//   // return updateToyList()

// }