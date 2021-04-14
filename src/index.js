// let addToy = false;

// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyFormContainer = document.querySelector(".container");
//   fetchToys()
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });
// });

// function fetchToys() {
//   fetch("http://localhost:3000/toys")
//   .then(response => response.json())
//   .then(data => {
//     data.forEach(toy => createToyCard(toy))
//   })
// }

// function createToyCard(toy) {
//   const toyCollection = document.querySelector("#toy-collection");
//   const toyCard = document.createElement("div")
//   toyCard.classList.add("card")
//   toyCard.dataset.id = toy.id

//   const toyName = document.createElement("h2")
//   toyName.innerText = toy.name
//   toyCard.append(toyName)

//   const toyImage = document.createElement("img")
//   toyImage.classList.add("toy-avatar")
//   toyImage.src = toy.image
//   toyCard.append(toyImage)

//   const toyLikes = document.createElement("p")
//   toyLikes.innerText = `${toy.likes} likes`
//   toyCard.append(toyLikes)

//   const likeButton = document.createElement("button")
//   likeButton.classList.add("like-btn")
//   likeButton.innerText = "Like this Toy"
//   toyCard.append(likeButton)

//   toyCollection.append(toyCard)
// }

let addToy = false;

document.addEventListener('DOMContentLoaded', function(){

  const addBtn = document.querySelector("#new-toy-btn");
  const toyCollection = document.getElementById('toy-collection');
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector('form');

  addBtn.addEventListener("click", () => {
        // hide & seek with the form
        addToy = !addToy;
        if (addToy) {
          toyFormContainer.style.display = "block";
        } else {
          toyFormContainer.style.display = "none";
        }
      });

  fetch('http://localhost:3000/toys')
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      response.forEach(function(toy) {
        let toyCard = createToyCard(toy.name, toy.image, toy.likes, toy.id)
        toyCollection.append(toyCard);
      })

    })

  toyForm.addEventListener('submit', function(event){
    event.preventDefault();
    const toyName = event.target.name.value;
    const toyImage = event.target.image.value


    postNewToy(toyName, toyImage);

  })
})

function postNewToy(name, image){
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "image": image
    })
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(toy) {
    let toyCard = createToyCard(toy.name, toy.image, toy.likes, toy.id)
    const toyCollection = document.getElementById('toy-collection');
    toyCollection.append(toyCard);
  })
}

function createToyCard(toyName, toyImage, toyLikes = 0, toyId){
  const toyCard = document.createElement('div')
  toyCard.classList.add('card')
  toyCard.innerHTML = `
    <h2>${toyName}</h2>
    <img src=${toyImage} class="toy-avatar" />
  `
  const likes = document.createElement("p")
  likes.innerText = toyLikes
  toyCard.appendChild(likes)
  const button = document.createElement('button')
  button.innerText = "Like <3"

  button.addEventListener('click', function(event){
    fetch(`http://localhost:3000/toys/${toyId}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": toyLikes + 1
      })
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(toy) {
      toyLikes = toy.likes
     likes.innerText = toy.likes
    })
  })

  toyCard.appendChild(button)
  return toyCard;
};