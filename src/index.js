let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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

  function generatePayload(method, data) {
    return {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
        body: JSON.stringify(data)
    };
  }

  function fetchUrl(url, payload) {
  return fetch(url, payload)
    .then(function(response) {
      return response.json();
    })
    .then(function(json){
      return json
    })
  }

  let outerDiv = document.getElementById('toy-collection')

  function appendToy(toy) {
    let div = document.createElement("div");
    let h2 = document.createElement("h2");
    let image = document.createElement("img");
    let paragraph = document.createElement("p");
    let button = document.createElement("button");

    div.setAttribute("class", "card");
    image.setAttribute("class", "toy-avatar")
    button.setAttribute("class", "like-btn")

    h2.innerHTML = toy.name
    image.setAttribute("src", toy.image);
    paragraph.innerHTML = `${toy.likes} Likes`
    button.innerHTML = "Like"

    button.setAttribute("data-id", toy.id)
    button.setAttribute("data-likes", toy.likes)

    div.appendChild(h2);
    div.appendChild(image);
    div.appendChild(paragraph);
    div.appendChild(button);
    outerDiv.appendChild(div);
  }

  fetchUrl("http://localhost:3000/toys").then(function(json){

    for (const toy of json) {
      appendToy(toy)
    }
  })

  let form = document.getElementsByClassName("add-toy-form")[0]

  // document.querySelector("[class='add-toy-form']") returns the first one
  // same as document.getElementsByClassName("add-toy-form")[0] returns a list

  form.addEventListener('submit', event => {
    event.preventDefault()

    let name = document.querySelector("[name='name']").value
    let urlImage = document.querySelector("[name='image']").value

    let toyData = {
      name: name,
      image: urlImage,
      likes: 0
    };

    let payload = generatePayload("POST", toyData)

    fetchUrl("http://localhost:3000/toys", payload).then(function(json){
      appendToy(json)
    });
  });

  document.addEventListener("click", event => {

    if (event.target.className === "like-btn") {
      let newLikes = parseInt(event.target.dataset.likes)+ 1
      let toyId = event.target.dataset.id

      let likesData = {
        "likes": newLikes
      }

      let payload = generatePayload("PATCH", likesData)

      fetchUrl(`http://localhost:3000/toys/${toyId}`, payload).then(function(json){
        event.target.dataset.likes = json.likes
        event.target.previousElementSibling.innerHTML = `${json.likes} Likes`
      });
    }
  });
});
