let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const addToyForm = document.querySelector(".add-toy-form");
  fetchToys();

  function fetchToys(){
    const toys = "http://localhost:3000/toys";
    return fetch(toys).then(response => response.json()).then(json => renderToys(json));
  }

  function renderToys(json){
    for (element of json){
      var divCard = document.createElement('div');
      divCard.className = "card";
      document.getElementById("toy-collection").appendChild(divCard);
      for (key in element){
          if (key == "name") {
            let cardName = document.createElement('h2');
            cardName.innerHTML = element[key];
            divCard.appendChild(cardName);
          }
            else if (key == "image"){
              let avatar = document.createElement("div");
              avatar.className = "toy-avatar";
              divCard.appendChild(avatar);
              let cardImage = document.createElement("img");
              cardImage.src = element[key];
              cardImage.height = 150;
              let ava = avatar.appendChild(cardImage);
              divCard.ava
            } 
              else if (key == "likes"){
                let cardLikes = document.createElement("p");
                let stringLikes = `${element[key]} like(s)`;
                cardLikes.innerHTML = stringLikes;
                divCard.appendChild(cardLikes);
                let likeToys = document.createElement("button");
                likeToys.className ="like-btn";
                divCard.appendChild(likeToys);
                likeToys.addEventListener("click", function(e){
                  e.preventDefault;
                  increaseLikes(e);
                })
              }
      }
    }
        
  }

    
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      addToyForm.addEventListener("submit", function(e){
        e.preventDefault
        postNewToy(e.target);
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });

    function postNewToy(newToy){
    fetch('http://localhost:3000/toys', {
        method: 'POST', 
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "name": newToy.name.value,
          "image": newToy.image.value,
          "likes": 0
        })  
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(object) {
        let objectArray = [];
        objectArray.push(object); 
        renderToys(objectArray)
      });
   }

  function increaseLikes(e) {
    let moreLikes = parseInt(e.target.previousElementSibling.innerText) + 1
    fetch('http://localhost:3000/toys/:id', {
      method: 'PATCH', 
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": moreLikes
       })  
      })
     .then(function(response) {
      return response.json();
     })
     .then(function(object) {
      e.target.previousElementSibling.innerText = `${moreLikes} likes`;
    });
  }
});
