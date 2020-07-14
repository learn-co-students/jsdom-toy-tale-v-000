let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const newToyForm = document.querySelector(".add-toy-form")

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  newToyForm.addEventListener("submit", (event) => {
    event.preventDefault()
    let formData = {
      name: event.target[0].value,
      image: event.target[1].value,
      likes: 0
    }

    postToy(formData)
  })

  loadToys() 
});

function postToy(data) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(json => console.log(json))
}

function loadToys() {
  fetch("http://localhost:3000/toys")
      .then(res => res.json())
      .then(json => renderToys(json))
}

function renderToys(data) {
  const toyCollectionContainer = document.querySelector("#toy-collection")

  data.forEach( toy => {
    let div = document.createElement("div")
        div.className = "card"
    let h2 = document.createElement("h2")
        h2.innerHTML = toy.name 
    let img = document.createElement("img")
        img.className = "toy-avatar"
        img.src = toy.image
    let p = document.createElement("p")
        p.innerHTML = `${toy.likes} Likes `
    let btn = document.createElement("button") 
        btn.className = "like-btn"
        btn.innerHTML = "Like <3"
        btn.addEventListener("click", (event)=> {
          event.preventDefault()
          console.log("INCREMENT LIKE")
          incrementLike(event, toy)
        })

    div.appendChild(h2)
    div.appendChild(img)
    div.appendChild(p)
    div.appendChild(btn)

    toyCollectionContainer.appendChild(div)
  })
}

function incrementLike(data, toy) {
  const num = toy.likes += 1

    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": `${num}`
      })
    })
    .then(res => res.json())
    .then((toy) => {
      data.target.previousElementSibling.innerText = `${toy.likes} Likes `
    })
    
}