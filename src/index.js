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

  // newElement.innerHTML = element.name

  var h = document.createElement('h2')
  h.innerHTML = element.name
  var img = document.createElement('img')
  img.setAttribute('src',element.image)
  img.setAttribute('class','toy-avatar')
  var p = document.createElement('p')
  p.innerHTML = `${element.likes} Likes`
  var button = document.createElement('button')
  button.setAttribute('class','like-btn')
  button.innerHTML = 'Like <3'
  button.addEventListener('click', event => {likesCounter(event)})
  //when you click the button, this will set the fucntion to start
  newElement.append(h,img,p,button)
  listToys.appendChild(newElement)

  function likesCounter(){

  }
  // var htext = document.getElementById('h2')
  // h.innerHTML = element.name
  // newElement.appendChild(h)


  // var htext = document.createTextNode(element.name)
  // new element - cardhtml.
  //h2 - inner
  //create each element.
  // add event listener
  // create individually append everything into newEelement


  //h2 with toys name
  // img tag  with src of toys image attribtues
  //p tag with how many likes that toy has
  //button tag with a class like btn
}

//send post request to save the data of a new toy
function submitData(){
  return fetch('http://localhost:3000/toys')
}
