let addToy = false
const addForm = document.querySelector('.add-toy-form');
let toysArr;


const toysUrl = "http://localhost:3000/toys"



function createToy(event){
  const toyForm = document.querySelector('.container');
  toyForm.style.display = "none";
  //let formName = document.getElementsByName("name")[0].value
  //let formImage = document.getElementsByName("image")[0].value
  return fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: event.target.name.value, // how to interpolate the HTML variables form form? grab the elements above in their own global variables?
      image: event.target.image.value,
      likes: 0,
      })
  }) //close of event listener + function
  .then(response => response.json())
  .then(json => renderToys (Object.entries(json)));
}


function fetchToys(){
  return fetch(toysUrl)
  .then(response => response.json())
  .then(toysArr =>
  renderToys(toysArr));
}

//how can i refactor this? is there a way to do a group append?
function renderToys(toysArr){
  const toysDiv = document.getElementById('toy-collection')
  toysArr.forEach(function(elem){
    let cardDiv = document.createElement("div")
    cardDiv.classList.add('card')
    //heading with name
    let h2 = document.createElement("h2")
    h2.innerHTML = elem.name
    cardDiv.append(h2)
    //image
    let imgElem = document.createElement("img")
    imgElem.classList.add('toy-avatar')
    imgElem.src = elem.image
    cardDiv.append(imgElem)
    // likes counter paragraph
    let likeys = document.createElement('p')
    likeys.innerText = elem.likes + " likes"
    cardDiv.append(likeys)
    // like button
    let likeBtn = document.createElement('button')
    likeBtn.classList.add('like-btn')
    likeBtn.setAttribute('id', elem.id)
    likeBtn.innerHTML = "Like <3" //how can i incorporate a real heart emoji?
    likeBtn.addEventListener('click', event => {
      likes(event);
    });
    cardDiv.append(likeBtn)
    toysDiv.append(cardDiv)
  });
}


function likes(event){
  let numberLikes = parseInt(event.target.previousElementSibling.innerText[0]);
  let newLikes = numberLikes + 1;
  fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"

    },
    body: JSON.stringify({
      "likes": newLikes
    })
  })
  .then(res => res.json())
  .then((like_obj => {
    event.target.previousElementSibling.innerText = `${newLikes} likes`;
  }))
}

  //send this value via fetch using PATCH update to server
  //renderToys -> do you need Object.entries?





  document.addEventListener("DOMContentLoaded", function (){
  fetchToys();
  //const toyForm = document.querySelector('.container')
  const toyForm = document.querySelector('.container') //when i try and add this globally is isn't recorgnised have to declare it twice
  const addBtn = document.querySelector('#new-toy-btn')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy // click will make addToy true
    if (addToy) { // if addToy clicked and true then display create toyform
      toyForm.style.display = 'block'
      toyForm.addEventListener('submit', event => {
      event.preventDefault();
      createToy(event);
    })
    } else {
      toyForm.style.display = 'none'
    }
  })
})
