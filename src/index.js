let addToy = false
const resource = "http://localhost:3000/toys"


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
  
fetchSource(resource).then(submitObj).then(likeAction).catch((error) => { console.error('Error:', error); })


// ---- [Start] fetch & display elements 

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
      throw Error("The respose Object is that of an Array");
    }
    return jsonResponse
  }

  function imgExtractor(arr){
  arr.forEach(element => {
    if (element.likes === undefined){ element.likes = 0;}
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
    divCard.setAttribute("id", obj.id);
    
      h2.textContent = obj.name;
      img.setAttribute("src",obj.image);
      img.setAttribute("class","toy-avatar");
      img.textContent = obj.name;
      p.textContent = obj.likes + " Likes";
      button.setAttribute("class","like-btn");
    button.textContent = "Like \u2764"

    //  -- appending starts
    toyCollection.appendChild(divCard);
    divCard.appendChild(h2);
    divCard.appendChild(img);
    divCard.appendChild(p);
    divCard.appendChild(button);
  }


  // ---- [END] fetch & display elements

  // ---- [START] form evenListener

 function formData(event, form){
      if(event.type === "click"){
        let formData = {
        "name" : form[0].value,
        "image" : form[1].value,
        "likes" : 0
        }
        configHeader('POST',formData, resource)
      }
    }


function configHeader(method,formData, resource) {
   let obj = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(formData)
  }
  
  fetch(resource, obj).then((resp) => resp.json())
    .then((data) => { console.log('Success:', data); })
    .catch((error) => { console.error('Error:', error); })
}


function submitObj() {
  let submitButton = document.querySelector(".add-toy-form \.submit")
  let form = document.querySelector(".add-toy-form")
  submitButton.addEventListener("click", (event) => { formData(event, form) })
}

// ---- [END] form evenListener


// ---- [START] likes evenListener
function likeAction() {
  let btn = document.querySelectorAll('button.like-btn');
  btn.forEach((node) => { 
  node.addEventListener("click", (element) => { plusOne(element) })})
  
    function plusOne(element) {
    let newValue = parseInt(element.target.previousElementSibling.innerText) + 1
    let targetId = element.target.parentNode.id 
    configHeader('PATCH', { "likes": newValue }, `http://localhost:3000/toys/${targetId}`)
    }
}

// ---- [END] likes evenListener


// -- initializes img req.
async function fetchSource(resource){
  await  fetch(resource)
    .then(validateResponse)
    .then(responseAsJson)
    .then(jsonResponsevalidation)
    .then(imgExtractor)
    .catch((error) => { console.error('Error:', error); })
}



