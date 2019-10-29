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

window.addEventListener('DOMContentLoaded', () => {
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(elements => {
    console.log(elements)
  elements.forEach(element => toyCard(element))
  //creating a toycard for each element.
  })

})

function toyCard(element){
  var listToys = document.getElementById('toy-collection')
  var newElement = document.createElement('div');
  newElement.className = "card";


  var h = document.createElement('h2')
  h.innerHTML = element.name
  //creating h2
  var img = document.createElement('img')
  img.setAttribute('src',element.image)
  img.setAttribute('class','toy-avatar')
  //creating img
  var p = document.createElement('p')
  p.innerHTML = `${element.likes} Likes`
  //creating p
  var button = document.createElement('button')
  button.setAttribute('class','like-btn')
  button.innerHTML = 'Like <3'
  button.addEventListener('click', event => {likesCounter(event)})
  //when you click the button, this will set the fucntion to start
  newElement.append(h,img,p,button)
  listToys.appendChild(newElement)

  function likesCounter(){

  }
  submitData(name,image,likes)
}

//send post request to save the data of a new toy
function submitData(name,image,likes){
  //when they click on the new button
  var newToy = document.querySelector('add-toy-form')
  return fetch("http://localhost:3000/toys", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       "Accept": "application/json"
     },
     body: {

     }
     })
}
