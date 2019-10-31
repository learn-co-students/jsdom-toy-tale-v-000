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
  //when the Dom loads -- do this
  fetch("http://localhost:3000/toys")
  //taking the object of the toys
  .then(resp => resp.json())
  //turning it to response of json
  .then(elements => {
    console.log(elements)
    //taking the elements of each object
  elements.forEach(element => toyCard(element))
  //creating a toycard for each element.
  })

})

function toyCard(element){
  //creating a toycard for each element
  var listToys = document.getElementById('toy-collection')
  var newElement = document.createElement('div');
  newElement.className = `card-${element.id}`;
  //allowing to associate with each card, their id

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
  button.addEventListener('click', event => {likesCounter(event, element.id)})
  //when you click the button, this will set the fucntion to start
  newElement.append(h,img,p,button)
  listToys.appendChild(newElement)

  var newToyForm = document.querySelector('.add-toy-form')
  newToyForm.addEventListener('submit',event=>{ event.preventDefault()

  var input_name = document.querySelector('#name_input')
  //query select each name input and to be able to use this for submit
  var input_image = document.querySelector('#url_input')
      //select the value
      //submit data using thse values
      //subtmit data function gets
    submitData(input_name,input_image)
    })

  function likesCounter(event,id){
//conditiomal increase
//take the old number and take that number, increase it by one. and replace it with the new number
//set that likes number

var likes = document.querySelector(`.card-${id} p`)
var current_likes = Number(likes.innerText.split(' ')[0])+1
likes.innerHTML = `${current_likes} Likes`

fetch("http://localhost:3000/toys",{
  method: "PATCH",
  headers:
  {
  "Content-Type": "application/json",
  Accept: "application/json"
  } ,
  body:
  {
  'likes': current_likes
  }
})
  }
}

//send post request to save the data of a new toy
function submitData(input_name,input_image){
  //when they click on the new button

  fetch("http://localhost:3000/toys", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       "Accept": "application/json"
     },
     body: JSON.stringify({
       'name': input_name.value,
       'image': input_image.value,
       'likes': 0
     })
     })
     .then(resp => resp.json())
     .then(toy => toyCard(toy))
     //taking the toy that they created and creating a new toy
}
