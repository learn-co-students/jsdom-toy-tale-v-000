let addToy = false;
// let toys = {}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
  
  getToys()
  formListener()
  
});
  
  const getToys = () => {
    return fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toys => {
      toys.map(toy => {
        toyCard(toy)
      })
    })
    .catch(error => {
      alert("Error during getToys()")
    })
  }
  
  const toyCard = (toy) => {
    const collection = document.getElementById('toy-collection')
    const card = document.createElement('div')
    card.className = 'card'
    // card.addEventListener('click', (event) => console.log('listening, card', event.target))
    cardListener(card, toy)
    const h2 = document.createElement('h2')
    h2.innerText = toy['name']
    const img = document.createElement('img')
    img.className = 'toy-avatar'
    img.src = toy['image']
    const p1 = document.createElement('p')
    p1.innerText = toy['likes']
    const button = document.createElement('button')
    button.className = 'like-btn'
    button.innerText = 'Like'
    const p2 = document.createElement('p')
    p2.innerText = 'Delete'
    // button.addEventListener('click', (event) => { console.log(event.target) })
    collection.appendChild(card)
    const children = [h2, img, p1, button, p2]
    children.map(node => card.appendChild(node))
  }
  
  
  
  const createToy = (toy) => {
    return fetch('http://localhost:3000/toys', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json', 
        'Accept': 'application/json'
      }, 
      body: JSON.stringify(toy)
    } )
    .catch(error => {
      alert("Error on createToy()")
    })
  }
  
  const formListener = () => {
    document.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault()
      const toyObject = { likes: 0 }
      const nameInput = document.querySelector("input[name='name']").value
      const imageInput = document.querySelector("input[name='image']").value
      toyObject.name = nameInput
      toyObject.image = imageInput
      createToy(toyObject)
      document.getElementById('toy-collection').innerHTML = ''
      getToys()

      event.target.reset()
    })
  }
  
  const cardListener = (node, toy) => {
    node.addEventListener('click', (event) => {
      
      if (event.target.innerText === 'Like') {
        const elementId = node.parentElement
        console.log('button click here', elementId.id)
        const likes = node.querySelector('p')
        let parsedLikes = likes.innerText
        parsedLikes++
        likes.innerText = parsedLikes 
        toy['likes'] = parsedLikes
        
        addLike(toy)
      }

      if (event.target.innerText === 'Delete') {
        deleteToy(toy)
      }
    })
  }
        
 const addLike = (toy) => {
    return fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }, 
      body: JSON.stringify({
        'likes': toy.likes
      })
    })
    .catch(error => console.log('error on patch'))
  }

  const deleteToy = (toy) => {
    return fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'DELETE'
    })
    .then(window.location.reload(true))
    .catch(error => alert('error on delete'))
  }
  