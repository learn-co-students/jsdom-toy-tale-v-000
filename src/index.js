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

document.addEventListener('DOMContentLoaded', function() {
	fetchToys();

})

function fetchToys() {
	const toyUrl = "http://localhost:3000/toys"
	fetch(toyUrl)
		.then(res => res.json())
		.then(obj => {
			createToys(obj);
		})
}

function createToys(obj) {
	obj.forEach(toy => renderToy(toy));
}

function renderToy(toy) {
	const toys = document.getElementById("toy-collection")

	const div = document.createElement('div')
	div.setAttribute("class", "card")

	const h2 = document.createElement('h2')
	h2.innerHTML = `${toy.name}`

	const img = document.createElement('img')
	img.setAttribute("class", "toy-avatar")
	img.setAttribute("src", `${toy.image}`)
	
	const p = document.createElement('p')
	p.innerHTML = `${toy.likes} Likes`
	
	const btn = document.createElement('button')
	btn.setAttribute("class", "like-btn")
	btn.setAttribute('id', toy.id)
	btn.addEventListener('click', incLikes)
	btn.innerHTML = "Like"

	div.appendChild(h2)
	div.appendChild(img)
	div.appendChild(p)
	div.appendChild(btn)
	toys.appendChild(div)
}

document.addEventListener('submit', function(event) {
	event.preventDefault();

	let name = document.querySelector('.add-toy-form input[name="name"]').value
	let url = document.querySelector('.add-toy-form input[name="image"]').value

	submitData(name, url)

	event.target.reset();

})

function submitData(name, url) {
	let formData = {
		name: name,
		image: url,
		likes: 0
	};

	let configObj = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify(formData)
	};

	fetch("http://localhost:3000/toys", configObj)

	renderToy(formData);

}

function incLikes(element) {
	element.preventDefault();

	let increaseLikes = parseInt(element.target.previousElementSibling.innerText) + 1
	let configObj = {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify({"likes": increaseLikes})
	}

	fetch(`http://localhost:3000/toys/${element.target.id}`, configObj)
	.then(res => res.json())
	.then((obj => {
			element.target.previousElementSibling.innerText = `${increaseLikes} Likes`
		}))
}
