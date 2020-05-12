const toysList = `http://localhost:3000/toys`

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
});


  function getToys() {
    fetch(toysList)

      .then(function(response) {
        return response.json();
      })

      .then(function(json) {
        // console.log('hi', json[0])
        json.forEach((item, i) => {
          let newDiv = document.createElement("div")
          newDiv.className = "card"
          document.getElementById("toy-collection").appendChild(newDiv)

          let newH2 = document.createElement("h2")
          newH2.innerHTML = item.name
          newDiv.appendChild(newH2)

          let newImg = document.createElement("img")
          newImg.src = item.image
          newImg.className = "toy-avatar"
          newDiv.appendChild(newImg)

          let newP = document.createElement("p")
          newP.innerHTML = item.likes + " likes"
          newDiv.appendChild(newP)

          let newButton = document.createElement("button")
          newButton.className = "like-btn"
          newButton.innerHTML = "Like <3"
          newDiv.appendChild(newButton)

        });


// not sure what to put in the body data section. where is the data coming from?
// this is about the form, the name and image url submission fields on inde.html

// you can connect this to the form with a listener

      function formListener() {
        console.log("form")
  // here we can use 'form' bc it happens to be the only form in the document
        document.querySelector("form").addEventListener("submit", event => {
        // document.getElementById("add-toy-form").addEventListener("submit", event => {

  // prevents the form from refreshing the page./
          event.preventDefault()
          // document.querySelector("name")
          let newToyForm = document.querySelector("form")
          let newToyName = newToyForm.querySelector('input[name="name"]').value;
          let newToyImageUrl = newToyForm.querySelector('input[name="image"]').value;

          console.log("hi", newToyName, newToyImageUrl)

          let newToyObj = {
            name: newToyName,
            image: newToyImageUrl,
            likes: 0
          }

          console.log("newToyObj", newToyObj)

          addNewToy(newToyObj)
        })

      }

      formListener()


      function addNewToy(objToy) {
        fetch(`http://localhost:3000/toys`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
             Accept: "application/json"
          },

          body: JSON.stringify(objToy)
          })
      }

      });




      function likeListener() {
        document.querySelectorAll("like-btn").addEventListener("click", event => {
          console.log("buttons!")
          increaseToyLikes()
        })
      }


      function increaseToyLikes() {
        fetch(`http://localhost:3000/toys/:id`, {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }

          body: JSON.stringify({
            // "likes":
          })
        })
      }



  }

  getToys()
