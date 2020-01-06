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
  fetchSource(resource)
})


// ----
const resource = "http://localhost:3000/toys"

function validateResponse(response){
  if(!response.ok){
    throw Error (response.statusText);
  }
  return response
}

function responseAsJson(response){
  return response.json();
}

function jsonResponsevalidation(jsonResponse){
  
  if (!Array.isArray(jsonResponse)){
    throw Error("The respose Object is that an Array");
  }
  return jsonResponse
}

function imgExtractor(arr){
 arr.forEach(element => {
   console.log(element.name)
 });
}
function logError(error){
  console.log('un error occured: \n', error);
}


// -- initializes img req.
function fetchSource(resource){
  fetch(resource)
  .then(validateResponse)
  .then(responseAsJson)
  .then(jsonResponsevalidation)
  .then(imgExtractor)
  // .catch(logError)
}

