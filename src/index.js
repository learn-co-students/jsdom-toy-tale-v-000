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
   markUp(element)
 });
}

function markUp(obj){
  let toyCollection = document.getElementById("toy-collection");
  
  // -- element creation starts
    let divCard = document.createElement("div");
    let h2  = document.createElement("h2");
    let img  = document.createElement("img");
    let button  = document.createElement("button");
    let p  = document.createElement("p");
  
  // -- content & attributes setting starts
     divCard.setAttribute("class","card");
     
     h2.textContent = obj.name;
     
     img.setAttribute("src",obj.image);
     img.setAttribute("class","toy-avatar");
     img.textContent = obj.name;
     
     p.textContent = obj.likes+" Likes" ;
     
     button.setAttribute("class","like-btn");
  button.textContent = "Like \u2764"

  //  -- appending starts
  toyCollection.appendChild(divCard);
  divCard.appendChild(h2);
  divCard.appendChild(img);
  divCard.appendChild(p);
  divCard.appendChild(button);
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
  .catch(logError)
}

