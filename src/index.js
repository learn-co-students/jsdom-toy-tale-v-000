const allToysListUrl = 'http://localhost:3000/toys'
// When the page loads, make a 'GET' request to fetch all the toy objects.
window.onload = () => {
  fetchAllToys();
}


let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  // Add New Toy Button Event Listener
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
    const button = document.createElement("button")
    // const newToyButton = document.getElementById("new-toy-btn")
    // button with a class name of "like"
    button.className = "like-btn"

    // newToyButton.value = "submit"
    // document.querySelector('new-toy-btn').appendChild(button)

    // Sets likeButton
    likeButton = button

    // Adds the innerHTML to the blikeButton to button
    // likeButton.formAction = button // nothing displayed
    // likeButton.innerHTML = button //[object HTMLElement]
    likeButton.innerHTML = "Like"
    // likeButton.src = button // nothing displayed

     // Sets img attribute "src" to toyImage
    button.src = likeButton

    // button.setAttribute("src", toyImage) 
    //  button.setAttribute(formAction, likeButton) //index.js:129 Uncaught (in promise) ReferenceError: formAction is not defined

    // Appends child "button" to the parent "card"
    card.appendChild(button)
}  
  
// function addNewToy(event) {
  function addNewToy() {
  // debugger //HIT
  // console.log(event)
  // event.preventDefault(); 
  // debugger //NOT HIT
  const e = []
  // debugger //HITS
  //  a POST request is sent to http://localhost:3000/toys
  fetch("http://localhost:3000/toys", {
    // fetch(fetchAllToys(), {
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
      .then(resp => renderToys).toyName("input-text")
      .then(resp => renderToys).toyImage("input-text")
      .then(resp => renderToys).toyLikes("input-text")
      .catch(fetchAllToys)

  })
}
        // arr.forEach(callback(currentValue [, index [, array]])[, thisArg])
        // event.forEach(input.value)
        //event.forEach(element => console.log(element)); //index.js:157 Uncaught SyntaxError: Unexpected token '.'
        // event.forEach(element => console.log(element)); //index.js:158 Uncaught SyntaxError: Unexpected token '.'

        // for (let i = 0; i < items.length; i++) {
        //   copyItems.push(items[i])
        // }
        // for (let i = 0; i < event.length; i ++) {
        //   e.push(event[i])
        // }

        // event.forEach(function(toy){
        //   e.push(toy)

//         })
        
//     // })
//   })
//   // })
// }
// debugger //HITS

      // "name": renderToys(toy).name.value,        //add the initial data IE THE FORM
      // "image": renderToys(toy).image.value,      //"https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
      // "likes": renderToys(toy).toyLikes.value    //0
        // "name": renderToys(toyName),
        // "image": renderToys(toyImage), 
        // "likes": renderToys(toyLikes)
        // event.forEach(input.value)
        // e.forEach(element => console.log(element)); //index.js:158 Uncaught SyntaxError: Unexpected token '.'
        //event.forEach(element => console.log(element)); //index.js:159 Uncaught SyntaxError: Unexpected token '.'
    // })  

    // .then(resp => resp.json())
      // .then(json => json.forEach(toy => {
      // .then(resp =>renderToys(toy)

      // .then(resp => renderToys).toyName("input-text")
      // .then(resp => renderToys).toyImage("input-text")
      // .then(resp => renderToys).toyLikes("input-text")
      // .catch(fetchAllToys)


    // ADD TO THE DOM
  
    // })
  // })
// }

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