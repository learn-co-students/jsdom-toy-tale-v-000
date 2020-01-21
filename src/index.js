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

})
function getAllToyCards() {
  let configurationObject = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  };

  return fetch('http://localhost:3000/toys', configurationObject).then(function (response) {
    return response.json();
  })
    .then(function (json) {

      json.forEach(object =>
        createToyCard(object)

      )
    })
}