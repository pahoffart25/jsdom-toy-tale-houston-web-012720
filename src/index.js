let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection")
  const form = document.querySelector(".add-toy-form")

  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });


  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toys => {
    toys.forEach(toy => {
        createToy(toy)
    })
  })


  function createToy(toy) {
    
    div = document.createElement("div")
    div.className = "card"

    h2 = document.createElement("h2")
    h2.innerText = toy.name

    img = document.createElement("img")
    img.src = toy.image
    img.className = "toy-avatar"

    p = document.createElement("p")
    p.innerText = `${toy.likes} Likes`

    btn = document.createElement("button")
    btn.className = "like-btn"
    btn.innerText = "like <3"

    btn.addEventListener("click", () => {
      fetch("http://localhost:3000/toys/"+toy.id, {
        method: "PATCH",
        headers:{ 
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          likes: toy.likes + 1
        })
      })
      .then(res => res.json())
      .then(updated => {
        p.innerText = `${updated.likes} Likes`
        toy = updated
      })
    })

    div.append(h2,img,p,btn)
    toyCollection.append(div)

  }

form.addEventListener ("submit", () =>{
  event.preventDefault()

  let name = event.target[0].value
  let image = event.target[1].value

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    Body: JSON.stringify({
      name: name,
      image: image,
      likes: 0
    })
  })
  .then(res => res.json())
  .then(newToy => {
    createToy(newToy)
  form.reset()
  })
})

});
