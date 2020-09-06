const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
let addToy = false;
 
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      addBtn.addEventListener("click", addNewToy)
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function addNewToy(event) {

  }

  function getToys() {
    console.log("toys test")
    fetch("http://localhost:3000/toys")
    .then(responce => responce.json())
    .then(toys => toys.forEach(toy => createToy(toy)))
  }

  /* <div class="card">
  <h2>Woody</h2>
  <img src=toy_image_url class="toy-avatar" />
  <p>4 Likes </p>
  <button class="like-btn">Like <3</button>
</div> */
  
  
  function createToy(toyObj) {
      console.log(toyObj)

      let div = document.createElement("div")
      div.classList.add("card")

      let h2 = document.createElement("h2")
      h2.innerText = toyObj.name

      let img = document.createElement("img")
      img.src = toyObj.image
      img.classList.add("toy-avatar")

      let p = document.createElement("p")
      p.innerText = `${toyObj.likes} Likes`

      let btn = document.createElement("button")
      btn.innerText = "Like <3"
      btn.classList.add("like-btn")

      div.append(h2, img, p, btn)
      getToyDiv().appendChild(div)
  }

  function getToyDiv() {
    return document.getElementById("toy-collection")
  }

    function getForm() {
      return document.querySelector("#add-toy-form")
    }
document.addEventListener("DOMContentLoaded", () => {
  console.log("Hello World!")
  getToys();
})