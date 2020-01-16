let addToy = false

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  let configurationObject = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    // body: JSON.stringify({
    //   name: userName,
    //   email: userEmail
    // })
  };

  return fetch('http://localhost:3000/toys', configurationObject).then(function (response) {
    return response.json();
  })
    .then(function (json) {
      console.log(json)
      json.forEach(object => 
        createToyCard(object)
        
        )
    })

})




function createToyCard(obj) {
  let cardDiv = document.createElement('div')
  let h2 = document.createElement('h2')
  let image = document.createElement('img')
  let paragraph = document.createElement('p')
  let button = document.createElement('button')
  let allToys = document.getElementById('toy-collection')

  cardDiv.className = "card"
  image.className = "toy-avatar"
  button.className = "like-btn"
  h2.textContent = obj['name']
  image.src = obj['image']
  paragraph.textContent = `${obj['likes']} Likes`
  button.textContent = "Like <3"

  cardDiv.appendChild(h2)
  cardDiv.appendChild(image)
  cardDiv.appendChild(paragraph)
  cardDiv.appendChild(button)
  allToys.appendChild(cardDiv)
}