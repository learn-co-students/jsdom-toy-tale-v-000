let addToy = false;

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
  });

  document.querySelector(".add-toy-form").addEventListener("submit", event=>{
    event.preventDefault()

    const form = event.target
    const formData = {
      [form.name.name]: form.name.value,
      [form.image.name]: form.image.value,
      likes: "0"
    }

    sendNewToyData(formData).then((resp)=>{
      console.log(resp)
      fetchToysAndUpdateView()

      // hiding the toy container:
      addToy = false
      document.querySelector(".container").style.display = "none";
    })

  })

  fetchToysAndUpdateView()

}); //endof DOMCONTENTLOADED event

function addLikeToToy(toy) {
  fetchToyWithID(toy.id).then(function(toy){
    const formData = { likes: String(+toy.likes + 1) }
    const config = { method: "PATCH", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(formData) }

    fetch(`http://localhost:3000/toys/${toy.id}`, config).then((patchResp)=>{

    }).then(()=>{
      fetchToyWithID(toy.id).then(updatedToy=>{

        updateCardForToy(updatedToy)
      })
    }).catch(error=>console.log(error))
  })
}

function fetchToysAndUpdateView() {
  fetchToys().then(toys=>{
    document.querySelector("#toy-collection").innerHTML = ''
    for (const toy of toys) {
      createNewToyCardWithData(toy)
    }
  })
}

function fetchToys() {
  return fetch("http://localhost:3000/toys").then(resp=>resp.json()).then(response=>response).catch(error=>{alert(error + " something went wrong!")})
}

function fetchToyWithID(toy_id) {
  return fetch(`http://localhost:3000/toys/${toy_id}`).then(resp => resp.json()).then(response => response).catch(error => { alert(error + " something went wrong!") })
}

function updateCardForToy(toy) {
  const toyDiv = document.querySelector(`#toy-${toy.id}`)
  toyDiv.querySelector('p').innerText = `${toy.likes} Likes`
  
}

function sendNewToyData(formData) {
  const config = {method: "POST", headers: {"Content-Type": "application/json", "Accept": "application/json"}, body: JSON.stringify(formData)}
  console.log(formData)
  console.log(config)
  return fetch("http://localhost:3000/toys", config).then(console.log("sent data!")).catch(error=>{alert("No"); console.log(error)})
}

function createNewToyCardWithData(toy) {
  const div = document.createElement('div')
  div.id = `toy-${toy.id}`
  div.classList.add("card")
  div.innerHTML = `
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes} Likes </p>
  <button class="like-btn">Like <3</button>
  `
  document.querySelector("#toy-collection").appendChild(div)
  div.querySelector(".like-btn").addEventListener("click", event=>{
    addLikeToToy(toy)
  })
}