const addNewToyButton = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const addToyForm = document.querySelector('.add-toy-form')
let addToy = false



const addNewToy = (toy) => { //toy = event.target
    debugger
    const url = "http://localhost:3001/toys"
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
    addToyForm.addEventListener('submit', e => {
    	e.preventDefault()
	    addNewToy(event.target)
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
		// .then(json => console.log(json))
}

//<div class='card'>
// <h2> `${toy.name}` </h2>
//<img src=`${data.image}` class="toy-avatar"></img>
//<p> `${toy.likes} likes` </p>
//<button class="like-btn">Like`</button>
//</div

const listAllToys = (toys) => {
	toys.forEach(toy => createToyCard(toy))
}

const createToyCard = (toy) => {
	//add for each toy in toy? 
	let div = document.createElement('div')
	div.classname = "card"

	let h2 = document.createElement('h2')
	h2.innerText = `${toy.name}`

	let img = document.createElement('img')
	img.src = toy.image
	img.setAttribute('class', "toy-avatar")
	
	let p = document.createElement('p')
	p.setAttribute('class', "toy-likes")
	p.innerHTML = `${toy.likes} likes`

	let button = document.createElement('button')
	button.setAttribute('class', 'like-button')
	button.setAttribute('id', toy.id)
	button.innerText = 'Like'
	button.addEventListener('click', (event) => {
		updateLikes(event)
	})

	div.append(h2, img, p, button)
	toyCollection = document.querySelector('#toy-collection')
	toyCollection.appendChild(div)
	
}

window.addEventListener('DOMContentLoaded', getAllToys)


 


const updateLikes = (event) => {
	const url = `http://localhost:3000/toys/${event.target.id}`
	const configObjectPatch = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            'likes': '' //figure out how to capture current likes 
        })
    }

	fetch(url, configObjectPatch)
		.then(response => response.json())
		.then(data => howManyLikes(data))

}


const howManyLikes = (data) => {
	console.log(data.likes) 
}




	