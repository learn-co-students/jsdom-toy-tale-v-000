let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  getToys()
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


});

function getToys() {
  fetch('http://localhost:3000/toys')
  .then(function(response) {
    return response.json()
  })
  .then(function(json) {
    const toyArray = json
    for (const toy of toyArray) {
      createToy(toy)
    }
  })
}





const toySubmit = document.querySelector('input.submit')

toySubmit.addEventListener('click', function(event){
  let nameInput = document.querySelector('input[name="name"]').value;
  let imgInput = document.querySelector('input[name="image"]').value

  const configObj = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": nameInput,
      "image": imgInput,
      "likes": 0
    })
  };

  function newToy() {
    fetch('http://localhost:3000/toys', configObj)
    .then(response => response.json())
    .then(function(json) {
      createToy(json)
    })
  }

  newToy()
})

const toyCollection = document.getElementById('toy-collection')

function createToy(toyObject) {
  let toyCard = document.createElement('div');
  toyCard.className = 'card';

  let toyName = document.createElement('h2');
  toyName.innerText = toyObject['name'];
  toyCard.appendChild(toyName);

  let toyImg = document.createElement('img');
  toyImg.src = toyObject['image'];
  toyImg.className = 'toy-avatar'
  toyCard.appendChild(toyImg);

  let toyLikes = document.createElement('p')
  toyLikes.innerHTML = toyObject['likes'] + " Likes"
  toyCard.appendChild(toyLikes)

  let toyButton = document.createElement('button')
  toyButton.className = 'like-btn'
  toyButton.innerText = 'Like <3'
  toyCard.appendChild(toyButton)

  toyCollection.appendChild(toyCard)
}

