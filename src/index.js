let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  let createBtn = document.querySelector(".submit");


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    toyFunc()

    // console.log(toyFunc())
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
});

  function toyFunc(){

    fetch("http://localhost:3000/toys")
      .then(function(response){
        return response.json();
      }).then(function(json){
        json.forEach(function(element){
          let jsonEl = element;
          let el = document.createElement("div");
          el.setAttribute('class', 'card');

          let jsonElName = jsonEl.name;
          let jsonElName_v = document.createElement("h2");
          jsonElName_v.innerText=jsonElName

          let jsonElImg = jsonEl.image;
          let imageTag = document.createElement("IMG");
          imageTag.setAttribute('class', 'toy-avatar');
          imageTag.setAttribute('src', jsonElImg);

          let p = document.createElement("P");
          let jsonElLikes = jsonEl.likes;
          p.innerText=`${jsonElLikes} Likes`;

          let button = document.createElement("BUTTON");
          button.setAttribute('class', 'like-btn')
          button.innerText="Like"

          document.body.appendChild(el);
          el.append(jsonElName_v, imageTag, p, button);
        })
      });
    };

    function postToys(toyData){
      fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toyData.name.value,
        "image": toyData.image.value,
        "likes": 0
      })
    }).then(function(response){
      response.json();
    }).then(function(toyObj){
      let newToy = renderToys(toyObj)
      divCollet.append(newToy)
    })
    }


    function renderToys(toy){
      let h2 = document.createElement("h2");
      h2.innerText = toy.name;

      let img = document.createElement("img");
      img.setAttribute('src', toy.image);
      img.setAttribute('class', 'toy-avatar');

      let p = document.createElement("p");
      p.innerText = `${toy.likes} likes`;

      let btn = document.createElement('button')
      btn.setAttribute('class', 'like-btn');
      btn.setAttribute('id', toy.id);
      btn.innerText = "like";
      btn.addEventListener('click', (e))
        console.log(e.target.dataset);
        likes(e);

      let divCard = document.createElement('div');
      divCard.setAttribute('class', 'card');
      divCard.append(h2, img, p, btn);
      divCollect.append(divCard);
      }




  // then(function(json){
  //   console.log(json);
