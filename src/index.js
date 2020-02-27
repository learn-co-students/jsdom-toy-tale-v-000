let addToy = false

const url = "http://localhost:3000/toys"

window.addEventListener('DOMContentLoaded', getAllToys)

function getAllToys() {
  fetch(url)
	.then(response => response.json())
	.then(json => listAllToys(json))
}

const listAllToys = (toys) => {
  toys.forEach(toy => createToyCard(toy))
}


const createToyCard = (toy) => {
	let div = document.createElement('div')
	div.className = "card"
	div.setAttribute('id', toy.id)
	
	let h2 = document.createElement('h2')
	h2.innerText = `${toy.name}`

	let img = document.createElement('img')
	img.src = toy.image
	img.setAttribute('class', "toy-avatar")
	
	let p = document.createElement('p')
	p.setAttribute('class', "number-of-likes")
	p.innerHTML = `${toy.likes} likes`
	p.setAttribute('id', toy.id)

	let button = document.createElement('button')
	button.setAttribute('class', 'like-button')
	button.setAttribute('id', toy.id)
	button.innerText = 'Like'
	button.addEventListener('click', (event) => {
		console.log("event.target.dataset: ", event.target.dataset)
		updateLikes(event)
	})

	div.append(h2, img, p, button)
	toyCollection = document.querySelector('#toy-collection')
	toyCollection.appendChild(div)
	
}


const updateLikes = (event) => {
	event.preventDefault()
	const likes = event.target.previousElementSibling
	const newLikes = parseInt(likes.innerHTML) + 1;
	const id = likes.id
	
	console.log(event.target)
	console.log('id: ', event.target.id)
	console.log("prevSibl: ", likes.innerHTML)
	

	const url = `http://localhost:3000/toys/${id}`
	
	const configObjectPatch = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            'likes': newLikes////figure out how to capture current likes 
        })
    }
    console.log("newLikes: ", newLikes)
	fetch(url, configObjectPatch)
		.then(response => response.json())
		.then(data => {(data.likes)
			// event.target.previousElementSibling.innerHTML = `${newLikes} likes`
			// why isn't newLikes coming in here? 
			// const id = event.target.id
			likes.innerHTML = `${newLikes} likes`
		})

}

const addNewToy = (toy) => { //toy = event.target
     
    let configObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            'name': toy.name.value,
            'image': toy.image.value,
            'likes': 0
        })
    }

  fetch(url, configObject)
	.then(response => response.json())
	.then(data => {
		createToyCard(data)
	})
	.catch(error => console.log(error.message))
}


 addNewToyButton = document.querySelector('#new-toy-btn')
  addNewToyButton.addEventListener('click', (event) => {
  // hide & seek with the form
    const toyForm = document.querySelector('.container')

  	addToy = !addToy
  	if (addToy) {
   	  toyForm.style.display = 'block';
    //do something to capture the data and go to POST/
      const addToyForm = document.querySelector('.add-toy-form')
      addToyForm.addEventListener('submit', (event) => {
    	event.preventDefault()
	    addNewToy(event.target)
	 	})
	 	} else {
    	toyForm.style.display = 'none'
  	 }
  })


	