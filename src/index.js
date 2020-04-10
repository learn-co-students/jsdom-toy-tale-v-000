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
  const allToysListUrl = 'http://localhost:3000/toys'
  //on page load, fetch all the dog breeds using the url above 
  fetch(allToysListUrl)
  .then(resp => resp.json())
      .then(json => renderToys(json.message))
      console.log(message)
}

// function renderToys(message) {
//   allToys = document.getElementById("toy-collection")
//     originalToyList = Object.keys(message) //Original Toy List
//     // iterate over the array
//     for(let i = 0; i < originalToyList.length; i++) {
//       allToys.innerHTML +=`<li>${originalToyList[i]}</li>`
//     }
    
// }


// function fetchAllToys() {
//   return fetch("http://localhost:3000/toys")
//     .then(resp =>resp.json)
// }      
// fetchAllToys()


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



// function fetchAllToys() {
//   const toysUrl = "http:localhost:3000/toys"
//     fetch(toysUrl)
//       .then(resp => resp.json())
//       .then(json => {
//         document.getElementById("toy-collection")
//         toysList = document.getElementById("toy-collection")
//           for (let i = 0; i < json.message.length; i++) {
//             document.getElementById("toy-collection").container.add("card");
// }

// function fetchAllToys() {
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(json){
//       // Use this data inside of `json` to do DOM manipulation
//     })
//   // With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.
//   document.getElementById("toy-collection")
// document.getElementById("toy-collection").container.add("card");
// }


// function addClass(selector, card) {

//   // get all elements that match our selector
//   elements = document.querySelectorAll("toy-collection");

//   // add class to all chosen elements
//   for (var i=0; i<elements.length; i++) {
//     elements[i]."toy-collection".add(card);
//   }
// }