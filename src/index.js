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


const getAllToys = () => {
	return fetch('http://localhost:3000/toys')
		.then(response => response.json())
		.then(json => console.log(json))
}


 const postNewToy = (data) => {
    const url = "http://localhost:3001/toys"
    let configObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            'name': toyData.name.value,
            'image': toyData.image.value,
            'likes': 0
        })
    }
	fetch(url, configObject )
		.then(response => response.json())
		.then(data => createToyCard(data))
		.catch(error => console.log(error.message))
}

const createToyCard = (toy) => {
	let h2 = document.createElement('h2')
	h2.innerText = toy.name

	let img = document.createElement('img')
	img.src = data.image
	img.classname = "toy-avatar"
	
	let p = document.createElement('p')
	p.likes = ''

	let button = document.createElement('button')
	button.classname = 'like-btn'
	btn.innerText = "like"
	btn.addEventListener('click', (event) => {
		console.log("not sure what to do")
		likes(event)
	})
//.setAttribute(attrib, name) diff between this and simple dot notation and = 

}

const addToDom = (data) => {
	const div = document.createElement('div')
	div.classname = "card"
	const putToysHere = document.querySelector("#toy-collection")
	putToysHere.append.div

}


	//make a div
	//give it a classname attribute card 
	//add to toy-collection div 