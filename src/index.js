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
    // console.log("callForm", toyForm) //ADDED
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      toyForm.addEventListener("submit", event => { //ADDED
        event.preventDefault()      //ADDED
          addNewToy(event)
      }) //ADDED
    } else {
      toyForm.style.display = "none";
    }
  });
});

// document.getElementById("create-new-toy-button").addEventListener("click", addNewToy);
// document.querySelector("create-new-toy-button").addEventListener("click", addNewToy);

// document.addEventListener("DOMContentLoaded", () => {
//   const createNewToyButton = document.querySelector("create-new-toy-button"); //CREATE NEW TOY BUTTON
//   // <input type="submit" onclick="addNewToy()" name="submit" value="Create New Toy" class="submit">
//   // <button id="new-toy-btn">Add a new toy!</button>
//   // => MISSING button id so added it to the index.html
//   createNewToyButton.addEventListener("click", () => {
//     console.log(event)
//   })
// })

// function createNewToySubmit(event) {
//   // log.textContent = `Form Submitted! Time stamp: ${event.timeStamp}`;
//   event.preventDefault();
//   // index.js:38 Uncaught TypeError: Cannot read property 'preventDefault' of undefined
//   //   at createNewToySubmit (index.js:38)
//   //   at <anonymous>:1:1
//   const createNewToyButton = document.getElementById('"create-new-toy-button"');
//   // const submit = document.getElementById('submit');
//   // createNewToyButton.addEventListener('submit', submit);
//   const toyCollection = document.getElementById("toy-collection")
//     createNewToyButton.addEventListener("submit", createNewToySubmit)
// }




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
      name: event.target[0].value, // Test
      image: event.target[1].value // https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist"
    })

// THIS POPULATES THE db.json WITH THE NEW TOY BUT DOES NOT DISPLAY THE TOY ON THE WEBPAGE ORINALLY!
// UPON REFRESH THE NEW TOY DISPLAYS ON THE WEBPAGE
    
    

  })
    .then(resp => resp.json())
    .then(resp => renderToy(resp))
}


    //.then(resp => renderToy(name))
//   })
// }
      // .then(function(response) { //// Uncaught TypeError: JSON.stringify(...).then is not a function
      //   return response.json();
      // })
     
      // .then(resp => (name)) // Uncaught TypeError: JSON.stringify(...).then is not a function
      // .then return response.json() //Uncaught SyntaxError: Unexpected token 'return'
//       .catch(function(error) {
//         alert("Bad things! Ragnarők!");
//         console.log(error.message);
//       })
//     })
// }
    // .then(resp => renderToy(name) {//DOES NOT DISPLAY INITIAL TOYS 
    //   return (name);
    // }, 
    // .then(resp => renderToy(image)

    //   .then(function(response) { //Create New Toy Button not working
    //     return response.json();
    // })
//   })
// }

    // .then(resp => renderToy(h2))
    // .then(resp => renderToy(img))
    // .then(resp => renderToy(p))
    // .then(resp =>renderToy(button))
    // .catch(fetchAllToys)

    // .then(resp => renderToy).toyName
    // .then(resp => renderToy).toyImage
    // .then(resp => renderToy).toyLikes
    // .catch(fetchAllToys)

      // .then(resp => renderToy).toyName("input-text")
      // .then(resp => renderToy).toyImage("input-text")
      // .then(resp => renderToy).toyLikes("input-text")
      // .catch(fetchAllToys)
      //.then(resp => renderToy(toy))
  // })
// }
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

      // "name": renderToy(toy).name.value,        //add the initial data IE THE FORM
      // "image": renderToy(toy).image.value,      //"https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
      // "likes": renderToy(toy).toyLikes.value    //0
        // "name": renderToy(toyName),
        // "image": renderToy(toyImage), 
        // "likes": renderToy(toyLikes)
        // event.forEach(input.value)
        // e.forEach(element => console.log(element)); //index.js:158 Uncaught SyntaxError: Unexpected token '.'
        //event.forEach(element => console.log(element)); //index.js:159 Uncaught SyntaxError: Unexpected token '.'
    // })  

    // .then(resp => resp.json())
      // .then(json => json.forEach(toy => {
      // .then(resp =>renderToy(toy)

      // .then(resp => renderToy).toyName("input-text")
      // .then(resp => renderToy).toyImage("input-text")
      // .then(resp => renderToy).toyLikes("input-text")
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
