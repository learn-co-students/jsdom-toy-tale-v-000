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
  // DISPLAYS EACH TOY SEPERATELY
  console.log(toy)


    // create card for each toy
    const card = document.createElement("div")
    card.className = "card"
    // CARD HAS TO BE APPENDED TO THE NODE ON THE WEBPAGE
    document.getElementById("toy-collection").appendChild(card)


    // CREATE TOY ELEMENTS

    // h2 tag with the toy's name
    //Create  h2 tag 
    const h2 = document.createElement("h2")

    //  Set toyName
    toyName = toy.name

    // Adds the innerHTML of the h2 to toyName
    // h2.setAttribute("innerHTML", toyName)

    // Sets the innerHTML of h2 to toyName
    h2.innerHTML = toyName
    // Appends child "h2" to the parent "card"
    card.appendChild(h2)

    // img tag with the src of the toy's image attribute and the class name "toy-avatar"
    // Create img tag
    const img = document.createElement("img")
   
     // img tag with class name "toy-avatar"
    img.className = "toy-avatar"

    // Sets toyImage
    toyImage = toy.image

    // Sets img attribute "src" to toyImage
     img.src = toyImage

    //  Sets img attribute "src" to toyImage
     // img.setAttribute("src", toyImage) //toy-avatar section on card

    // Appends child "img" to the parent "card"
    card.appendChild(img)

    // p tag with how many likes that toy has
    // Creates p tag
    const p = document.createElement("p")

    // Sets toyLikes
    toyLikes = toy.likes

    // Adds the innerHTML to the p tag to toyLikes
    p.innerHTML = toyLikes

    // Appends child "p" to the parent "card"-btn
    card.appendChild(p)
    
    // button tag with a class "like-btn"
    // Create button
    const button = document.createElement("like-btn")

    // button with a class name of "like"
    button.className = "like-btn"

    // Sets likeButton
    likeButton = button

    // Adds the innerHTML to the blikeButton to button
    likeButton.innerHTML = button //[object HTMLElement]

     // Sets img attribute "src" to toyImage
    //  button.src = likeButton

    // Appends child "button" to the parent "card"
    card.appendChild(button)
}  
  
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