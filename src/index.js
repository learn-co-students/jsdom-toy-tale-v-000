let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  formInputs = toyForm.querySelectorAll('input');

  formInputs[2].addEventListener('click', () => {
    let formData = {
      name: formInputs[0].value,
      image: formInputs[1].value,
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
  })


  fetch('http://localhost:3000/toys')
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        toyCollection = document.getElementById('toy-collection');

        for (const element of json) {
          let div = document.createElement('div');
          div.classList.add('card');

          let h2 = document.createElement('h2');
          h2.innerHTML = element.name;

          let img = document.createElement('img');
          img.classList.add('toy-avatar');
          img.src = element.image;

          let p = document.createElement('p');
          p.innerHTML = `${element.likes}`;

          let button = document.createElement('button');
          button.classList.add('like-btn');
          button.innerHTML = 'Like';
          button.addEventListener('click', () => {
            let urlString = `http://localhost:3000/toys/${element.id}`;
            let likesNumber = Number(p.innerHTML);
            likesNumber++;
            fetch(urlString, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify({
                "likes": likesNumber
              })
            })
            p.innerHTML = `${likesNumber}`;
          });

          div.appendChild(h2);
          div.appendChild(img);
          div.appendChild(p);
          div.appendChild(button);

          toyCollection.appendChild(div);
        }
      });
})
