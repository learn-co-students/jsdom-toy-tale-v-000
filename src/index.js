const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let divCollect = document.querySelector('#toy-collection')

// let's add the ability to change a toy's name in the browser
// select all the names of the toys...NOTE: you cannot do this: const toyNameArray = document.querySelectorAll('.card > h2')
function getToyNames() {
  return document.querySelectorAll('.card > h2')
}

// iterate over the array of toy names and log each one (building block only)
for (const toyName of document.querySelectorAll('.card > h2')) {
  console.log(toyName)
}

function getToys() {
  return fetch('http://localhost:3000/toys')
    .then(res => res.json())
}

function postToy(toy_data) {
  fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toy_data.name.value,
        "image": toy_data.image.value,
        "likes": 0

      })
    })
    .then(res => res.json())
    .then((obj_toy) => {
      let new_toy = renderToys(obj_toy)
      divCollect.append(new_toy)
    })
}

function likes(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": more
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
}

function renderToys(toy) {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  // This will create a hidden option to
  // when user clicks on toy's name they can change its color to red
  //let stupidJavascriptNeedsThisStep = newToyNameForm(toy)
  h2.style.cursor = 'pointer';
  h2.addEventListener('click', updateColor);

  // START: add an input field to change a toy's name here
  let toyNameInput = document.createElement('input')
  let toyNameInputSubmitButton = document.createElement('input')
  toyNameInput.type = 'text'
  toyNameInput.name = 'name'
  toyNameInput.value = ''
  toyNameInput.placeholder = "Enter a new name for the toy..."
  toyNameInput.setAttribute('class', 'input-text')
  toyNameInput.style.display = 'none'

  toyNameInputSubmitButton.type = 'submit'
  toyNameInputSubmitButton.name = 'submit'
  toyNameInputSubmitButton.value = "Change Toy Name"
  toyNameInputSubmitButton.setAttribute('class', 'submit')
  toyNameInputSubmitButton.style.display = 'none'

  toyNameInputSubmitButton.addEventListener('click', event => {
    console.log(`Submit button has been clicked for ${toy.name}`);
    event.preventDefault();
    changeToyName(toy, toyNameInput);
  })
  // FINISH: add an input field to change a toy's name here

  //h2.addEventListener('click', newToyNameForm(toy) <= This will not work because it will fire prematurely
  //SOURCE: https://stackoverflow.com/questions/16310423/addeventlistener-calls-the-function-without-me-even-asking-it-to
  h2.addEventListener('click',
    function() {
      newToyNameForm(toy, toyNameInput, toyNameInputSubmitButton);
    }
  );

  //toyNameInputSubmitButton.addEventListener('submit', event => {
  //  event.preventDefault()
  //  postToy(event.target)
  //})

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "like"
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likes(e)
  })

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.setAttribute('id', `toy-${toy.id}-section`)
//this is the original (Flatiron) version that doesn't let you update a toy's name:
//divCard.append(h2, img, p, btn)

//this is the updated (burd) version that lets you update a toy's name:
  divCard.append(h2, toyNameInput, toyNameInputSubmitButton, img, p, btn)

  divCollect.append(divCard)
}


// add listener to 'Add Toy' button to show or hide form
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
      event.preventDefault()
      postToy(event.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})

// start by getting all toys

getToys().then(toys => {
  toys.forEach(toy => {
    //function to render toys goes here or something
    renderToys(toy)
  })
})

// change color of toy name when clicked:
function updateColor(event) {
  if (event.target.style.color == 'red') {
    event.target.style.color = 'black'
  } else {
    event.target.style.color = 'red'
  }
  console.log(`A toy's color was changed!`)
}

function newToyNameForm(toy, toyNameInput, toyNameInputSubmitButton) {
  console.log(`A new name for ${toy.name } will be created here`)

  if (toyNameInput.style.display == 'none') {
    toyNameInput.style.display = 'block';
    toyNameInputSubmitButton.style.display = 'block';
  } else {
    toyNameInput.style.display = 'none';
    toyNameInputSubmitButton.style.display = 'none';
  }
}

function changeToyName(toy, toyNameInput) {
  console.log(`the changeToyName function has fired for ${toy.name }`)

  //toy.preventDefault()

  fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toy.name.value,

      })
    })
    .then(res => res.json())
    .then((obj_toy) => {
      console.log(`I can't get the name of ${toy.name } updated in the Database properly`)
      console.log(`The "obj_toy value is:" ${obj_toy.name }`)

      let singleCollect = document.querySelector(`#toy-${toy.id}-section > h2`)

      // This changes the name in the DOM, but doesn't update the database
      // This fundementally can't work without a major re-working of the Javascript
      // This workspace needs a function that creates a single toy at a time
      singleCollect.textContent = toyNameInput.value

      console.log(`The singleCollect value is producing:`)
      console.log(singleCollect.textContent)

      obj_toy = singleCollect.textContent
/*
      // newest experiment
      singleCollect = document.querySelector(`#toy-${toy.id}-section`)
      let myChild = singleCollect.firstElementChild
      singleCollect.removeChild(myChild)
      let newH2 = document.createElement('h2')
      newH2.innerText = toyNameInput.value
      singleCollect.prepend(newH2)
*/
    })

}
