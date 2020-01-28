let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  // Assign to toyCollection since it is used multiple times
  const toyCollection = document.querySelector('#toy-collection')
  console.log("%c DOM is loaded", "color :purple")

  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toys => {
      let toysHTML = toys.map(function(toy) {
        return `
        <div class="card">
        <h2> ${toy.name}</h2>
        <img src= ${toy.image} class="toy-avatar" />
        <p> ${toy.likes} Likes </p>
        <button data-id="${toy.id}" class="like-btn">Like <3</button>
        <button data-id="${toy.id}" class="delete-btn">Back in the toy chest <3</button>
        </div>
        `
      })
      toyCollection.innerHTML =
      toysHTML.join('')
    })

  toyForm.addEventListener("submit", function(event) {
    event.preventDefault()
    console.log(event.target.name)
    const toyName = event.target.name.value
    const toyImage = event.target.image.value

    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: toyName,
        image: toyImage,
        likes: 10
      })
    })
    .then(response => response.json())
    .then(newToy => console.log(newToy))

      let newToyHTML = `
        <div class="card">
          <h2> ${newToy.name}</h2>
          <img src= ${newToy.image} class="toy-avatar" />
          <p> ${newToy.likes} Likes </p>
          <button data-id="${newToy.id}" class="like-btn">Like <3</button>
        </div>
      `
      toyCollection.innerHTML += newToyHTML
      // resets back to original
      console.log(event.target.reset())
  })

  toyCollection.addEventListener('click', (event) => {
    if (event.target.className === "like-btn") {

      let currentLikes = 
      parseInt(event.target.previousElementSibling.innerText)
      let newLikes = currentLikes + 1
      event.target.previousElementSibling.innerText = newLikes + " likes"

      fetch(`http://localhost:3000/toys/${event.target.dataset.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: newLikes
        })
      })
    }

    if (event.target.className === "delete-btn") {
      fetch(`http://localhost:3000/toys/${event.target.dataset.id}`, {
        method: "DELETE"
      })
      .then(response => {
        console.log(event.target.parentElement.remove())
      })
    }
  })

  

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

})
