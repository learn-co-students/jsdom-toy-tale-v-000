const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
//div -- toy collection
//create a toy collection with class card and then add it to toy collection div


function toyCard(){
fetch("http://localhost:3000/toys")
.then(resp => resp.json())
//make a div class card and add it to toy collectino div
.then(result =>
var divElement = document.createElement("div")
divElement.setAttribute("class", "card" );
// add it to toy collection div
)}
