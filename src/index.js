let addToy = false;

// This is the very first event that is happening in my application
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
    //call this function once the DOM loads
   
  })
  getFetch()
});


// STEP 1 ~ write a function that fetches all of the toys
function getFetch() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(json => {
    //interate over each toy and call the function display toy
    json.forEach(toy => {
      render(toy)
    })
  })
};


// STEP 2 ~ write a function that renders the toys for the user to see
function render(toy) {
  let renderData = 
  `<div class="card">
  <h2> ${toy.name} </h2>
  <img src =${toy.image} class= "toy-avatar">
  <p id="p-tag-${toy.id}"> ${toy.likes} Likes</p>
  <button id= 'like-${toy.id}' class="like-btn">Like <3</button>
  </div>`
  // this line adds the data and displays it to the user.
  document.getElementById('toy-collection').innerHTML += renderData

  // button that lets the user add likes.
   likesButtonHandler()
};


//STEP 3A ~ Add a new toy
function createClickHandler(event) {
  event.preventDefault()
  let inputName = document.getElementById('input-name').value
  let inputUrl = document.getElementById('input-url').value
  let numOfLikes = 0
  
  postFetch(inputName, inputUrl, numOfLikes)
}



//Step 3B ~ Write a function that lets you add a toy
function postFetch(name, image, likes) {
  let bodyData = {name, image, likes}

  fetch('http://localhost:3000/toys', {
    // This is where the POST request happens
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
  })
  .then(response => response.json())
  .then(json => {
      render(json)
  })
}


function likesButtonHandler(event) {
  document.addEventListener('click', (event) => {
    if(event.target.className == "like-btn") {
      let id = parseInt(event.target.id.split('-')[1])
      let likesNumber = event.target.parentNode.querySelector('p').innerText
      let likes = parseInt(likesNumber) + 1
      patchFetch(likes, id)
    }
  })
}



// Step 4 ~  Write a function that lets you edit/patch a toy

function patchFetch(likes, id) {
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH", 
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({likes})
  })
  .then(response => response.json())
  .then(json => {
    let updateLikes = document.getElementById(`p-tag-${id}`)
    updateLikes.innerHTML = `${likes} likes`
  })
}


// Write a function that deletes a toy
