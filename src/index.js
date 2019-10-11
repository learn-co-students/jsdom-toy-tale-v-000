const addNewToyButton = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const addToyForm = document.querySelector('.add-toy-form')
let addToy = false



const addNewToy = (toy) => { //toy = event.target
    const url = "http://localhost:3000/toys"
    let configObjectPost = {
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

	fetch(url, configObjectPost )
		.then(response => response.json())
		.then(data => {
			createToyCard(data)
		})
		.catch(error => console.log(error.message))
}

addNewToyButton.addEventListener('click', (event) => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block';
    //do something to capture the data and go to POST/
    addToyForm.addEventListener('submit', (e) => {
    	e.preventDefault()
	    addNewToy(e.target)
		})
  	} else {
    toyForm.style.display = 'none'
  }
})

//Fetch and display the toys
const getAllToys = () => {
	 fetch('http://localhost:3000/toys')
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
	// button.setAttribute('id', toy.id)
	button.innerText = 'Like'
	button.addEventListener('click', (event) => {
		updateLikes(event)
	})

	div.append(h2, img, p, button)
	toyCollection = document.querySelector('#toy-collection')
	toyCollection.appendChild(div)
	
}

window.addEventListener('DOMContentLoaded', getAllToys)

// click button -- call updateLikes function, carry the event object over 


const updateLikes = (event) => {
	event.preventDefault()
	const likes = event.target.previousElementSibling
	const newLikes = parseInt(likes.innerHTML) + 1;
	const id = likes.id
	// const id = event.target.id
	// let putLikesHere = document.getElementsByTagName(`p#${id}`)
	
	console.log(event.target)
	console.log('id: ', event.target.id)
	// console.log("event target: " , event.target) 
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
    console.log(newLikes)
	fetch(url, configObjectPatch)
		.then(response => response.json())
		.then(data => {(data.likes)
			// event.target.previousElementSibling.innerHTML = `${newLikes} likes`
			// why isn't newLikes coming in here? 
			// const id = event.target.id
			likes.innerHTML = `${newLikes} likes`
		})

}

// How to update the p/number right away -- why isn't it? 
// I'm not always clear about what props and arguments
//I'm passing from function to function.


	