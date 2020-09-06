const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
let addToy = false;
 
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function getToys() {
    console.log("toys test")
    fetch("http://localhost:3000/toys")
    .then(responce => responce.json())
    .then(data => console.log(data))
  }

document.addEventListener("DOMContentLoaded", () => {
  console.log("Hello World!")
  getToys();
})