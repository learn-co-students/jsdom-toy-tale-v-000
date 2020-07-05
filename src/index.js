let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  loadToys();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', event => {
        event.preventDefault()
        let name = event.target.name.value;
        let img = event.target.image.value;

        submitNewToyForm(name, img);
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function loadToys(){
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => {toys.forEach(toy => appendToyCard(toy))});
};

function editLikes(e, toy) {
  e.preventDefault()
        let more = parseInt(e.target.previousElementSibling.innerText) + 1
        fetch(`http://localhost:3000/toys/${toy.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"

            },
          body: JSON.stringify({
            "likes": more
              })
            })
          .then(res => res.json())
        .then((like_obj => {
          e.target.previousElementSibling.innerText = `${more} likes`;
        }))
};

function appendToyCard (toy){
  let toyBox = document.getElementById('toy-collection');
  let card = document.createElement('div');
    function addToyInfo(toy) {
      let name = document.createElement('h2')
      name.innerHTML = toy.name;
      card.appendChild(name);

      let img = document.createElement('img')
      img.src = toy.image;
      img.classList.value = 'toy-avatar'
      card.appendChild(img);

      let likes = document.createElement('p')
      likes.innerHTML = toy.likes + ' likes ';
      card.appendChild(likes)

      let button = document.createElement('button')
      button.classList.value = 'like-btn'
      button.innerHTML = 'Like '
      button.addEventListener('click', e => {
        editLikes(e, toy)
      });
      card.appendChild(button);
    };

  addToyInfo(toy);
  card.classList.value = 'card';
  card.id = toy.id;
  toyBox.appendChild(card);
};

function addToyInfo(toy) {
  let name = document.createElement('h2')
  name.innerHTML = toy.name;
  card.appendChild(name);
};

function submitNewToyForm(name, imgUrl){
  let formData = {
    name: name,
    image: imgUrl,
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

  return fetch('http://localhost:3000/toys', configObj)
  .then(resp => resp.json())
  .then(object => {console.log(object)});
}