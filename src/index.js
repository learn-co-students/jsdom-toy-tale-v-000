const allToysListUrl = 'http://localhost:3000/toys'
// When the page loads, make a 'GET' request to fetch all the toy objects.
window.onload = () => {
  fetchAllToys();
}


let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn"); //ADD NEW TOY BUTTON
  const toyForm = document.querySelector(".container");
  // Add New Toy Button Event Listener
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      // Add Create New Toy Event Listener
      toyForm.addEventListener("submit", event => { //ADDED
        event.preventDefault()                      //ADDED
          addNewToy(event)                          //ADDED
      })                                            //ADDED
    } else {
      toyForm.style.display = "none";
    }
  });
});

function fetchAllToys() {
  //on page load, fetch all the toys using the url above 
  fetch(allToysListUrl)
    .then(resp => resp.json() )
    .then(json => json.forEach(toy => renderToy(toy)))
}

function renderToy(toy) {
  // create card for each toy
    const card = document.createElement("div")
      card.className = "card"

  // CREATE TOY ELEMENTS
  // h2 tag with the toy's name
    //Create  h2 tag 
    const h2 = document.createElement("h2")

    //  Set toyName
    toyName = toy.name

    // Adds the innerHTML of the h2 to toyName
    h2.innerHTML = toyName
    // Appends child "h2" to the parent "card"
      card.appendChild(h2)

  // Create img tag
    const img = document.createElement("img")
   
     // img tag with class name "toy-avatar"
    img.className = "toy-avatar"

      // Sets toyImage
      toyImage = toy.image

      // Sets img attribute "src" to toyImage
      img.src = toyImage

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

      // button with a class name of "like"
      button.className = "like-btn"

      // Sets likeButton
      likeButton = button
    
        // Adds the innerHTML of the likeButton to "Like"
        likeButton.innerHTML = "Like"

        // Sets img attribute "src" to toyImage
        button.src = likeButton

          // Appends child "button" to the parent "card"
          card.appendChild(button)

      // CARD HAS TO BE APPENDED TO THE NODE ON THE WEBPAGE
       document.getElementById("toy-collection").appendChild(card)
}  
  
  function addNewToy(event) {
  //  a POST request is sent to http://localhost:3000/toys
  fetch("http://localhost:3000/toys", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: event.target[0].value, // Test
      image: event.target[1].value, // https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist"
      likes: 0 // 0
    })
  })
    .then(resp => resp.json())
    .then(resp => renderToy(resp))
}


// When a user clicks on a toy's like button, two things should happen:
// Conditional increase to the toy's like count without reloading the page

// A patch request sent to the server at http://localhost:3000/toys/:id updating the number of likes that the specific toy has
// Headers and body are provided below (If your request isn't working, make sure your header and keys match the documentation.)

  document.querySelector("#toy-collection > div:nth-child(1) > p") // JS PATH for WOODY LIKES
// document.addEventListener("DOMContentLoaded", () => {
//   const likeBtn = document.querySelector("#like-btn"); //Like button selector
//   let originalLike = addNewToy(event).target[2].value + 1
//   let updatedLike = originalLike 
//     likeBtn.addEventListener("click", () => {
  
//      })
// }

        // for (let i = 0; i < items.length; i++) {
        //   copyItems.push(items[i])
        // }
        // for (let i = 0; i < event.length; i ++) {
        //   e.push(event[i])
        // }
//     // })
//   })
//   // })
// }