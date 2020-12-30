let addToy = false;
const toyUrl= "http://localhost:3000/toys";



 document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  let toyColl = document.getElementById("toy-collection");
  const toyForm = document.querySelector('.add-toy-form');



//add new toy screen and form


  function postToy(toyData){
     let theToy = {
       name:  toyData.name.value,
       image: toyData.image.value,
       likes: 0
     }
     let configObj = {
       method: "POST",
       headers:{
         "Content-Type": 'application/json',
         "Accept": "application/json"
       },
       body: JSON.stringify(theToy)
     };
     fetch('http://localhost:3000/toys',configObj)
     .then(function(response){
       return response.json();
     })
     .then(function(object){
      console.log(object);
      renderAToy(object)
     })
  }

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyForm.addEventListener('submit', event => {
              event.preventDefault();
              // console.log(event.target.name.value);
              // console.log(event.target.image.value);
              postToy(event.target);
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });

//add like
function addLike(e){
    console.dir(e.target);
    let likesText =   e.target.previousElementSibling.innerText.replace("Likes:","");

    likesText = parseInt(likesText) + 1;
    console.log(likesText);
    console.log(e.target.id);
 //send new like to update DB and renden again
    fetch(`http://localhost:3000/toys/${e.target.id}`, //or :id
    {
       method: 'PATCH',
       headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
       },
       body: JSON.stringify({
         "likes":  likesText, //update db
       })
    }).then(res =>  res.json())
    .then( addLikeToUI => { e.target.previousElementSibling.innerText = "Likes:" + likesText;})

}

//render collection

  function renderAToy(toy) {

      let cardToy = document.createElement("div");
      cardToy.classList.add("card");
      let nameToy = document.createElement("h2");
      nameToy.innerHTML = toy.name;
      cardToy.appendChild(nameToy);
      let imgToy  = document.createElement("img");
      imgToy.width= "220";
      imgToy.src= toy.image;
      // imgToy.setAttribute('src', toy.image );
      cardToy.appendChild(imgToy);
      let likeToy = document.createElement("p");
      likeToy.innerHTML = "<strong>Likes:</strong>" + toy.likes;
      cardToy.appendChild(likeToy);
      let button = document.createElement("button");
      button.classList.add("like-btn");
      button.setAttribute('id',toy.id);
      button.textContent="Like";
      button.addEventListener('click', (e) => {
        addLike(e);
      }  );
      cardToy.appendChild(button);
      toyColl.appendChild(cardToy);

  }

  function fetchToys(){
    return fetch(toyUrl).then( resp => resp.json()).then ( toys => {
         toys.forEach( t => {
           renderAToy(t);
         });
    });
  }


  fetchToys();


 });
