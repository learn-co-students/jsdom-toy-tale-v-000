let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const inputs = toyForm.getElementsByTagName("input");
  const name = inputs.name;
  const image = inputs.image;
  const submit = inputs.submit;

  fetchToys();

  submit.addEventListener("click", function (e) { 
    e.preventDefault();
    submitData(name.value, image.value)})
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
});

function submitData(name, image) {

  let formData = {
      name: `${name}`,
      image: `${image}`,
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
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      toy(json);
    })
    .catch(function(error) {
      console.log(error.message);
    });
}

function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => toys(json)) 
}

function toys(json) {
  const mainDiv = document.getElementById('toy-collection')
  json.forEach(toy => {
      const div = document.createElement('div');
      div.className = "card";
      const h2 = document.createElement('h2');
      h2.innerHTML = toy["name"];
      const img = document.createElement('img')
      img.src = toy["image"];
      img.className = "toy-avatar";
      const p = document.createElement('p')
      p.innerHTML = `${toy["likes"]} Likes `;
      const button = document.createElement('button')
      button.innerHTML = "Like <3";
      button.className = "like-btn";
      button.addEventListener("click", function() {liked(toy["id"], p)});
      div.appendChild(h2);
      div.appendChild(img);
      div.appendChild(p);
      div.appendChild(button);
      mainDiv.appendChild(div);
    })
}

function toy(json) {
  const mainDiv = document.getElementById('toy-collection')
    const div = document.createElement('div');
    div.className = "card";
    const h2 = document.createElement('h2');
    h2.innerHTML = json["name"];
    const img = document.createElement('img')
    img.src = json["image"];
    img.className = "toy-avatar";
    const p = document.createElement('p')
    p.innerHTML = `${json["likes"]} Likes `;
    const button = document.createElement('button')
    button.innerHTML = "Like <3";
    button.className = "like-btn";
    button.addEventListener("click", function() {liked(json["id"], p)});
    div.appendChild(h2);
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(button);
    mainDiv.appendChild(div);
  }

  function liked(id, p) {
    let likes = parseInt(p.innerHTML.split(' ')[0]);
    p.innerHTML = `${parseInt(likes)+1} Likes `;
    let formData = {
      likes: `${parseInt(likes)+1}`
    };  
  
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }; 
  
    fetch(`http://localhost:3000/toys/${id}`, configObj)
    .then(function(response) {
      return response.json();
    })
  }