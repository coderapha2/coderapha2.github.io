const app = document.querySelector("#app")
const favoritos = document.querySelector("#favoritos")

const url = "./backend/produtos.json";

function favoritar(id, nome) {
  const favoritarBtn = document.querySelector(`#btn${id}`)

  if (localStorage.getItem(`item${id}Fav`) === null) {
    localStorage.setItem(`item${id}Fav`, "true");
    favoritarBtn.innerHTML = "★"
    alert(`Item ${nome} adicionado aos favoritos`)
  } else {
    localStorage.removeItem(`item${id}Fav`)
    favoritarBtn.innerHTML = "☆"
    alert(`Item ${nome} removido dos favoritos`)
    document.location.reload(true);
  }
}

if(app) {
  fetch(url)
  .then(response=> response.json())
  .then(function(data) {
    data.map(function(item) {
      app.insertAdjacentHTML("beforeend", `
      <div class="card" id="${item.id}">
        <div class="card_header">
          <h1>${item.nome}</h1>
          <button id="btn${item.id}" onClick="favoritar(${item.id}, '${item.nome}')">
            ${localStorage.getItem(`item${item.id}Fav`) === null ? "☆" : "★"}
          </button>
        </div>
        <div class="card-items">
          <img src="${item.url}">
          <h3>R$: ${item.valor.toFixed(2)}</h3>
        </div>
      </div>
      `)
    }
  )
  })
}

if(favoritos) {
  fetch(url)
  .then(response=> response.json())
  .then(function(data) {
    data.map(function(item) {
      if (localStorage.getItem(`item${item.id}Fav`) !== null) {
        favoritos.insertAdjacentHTML("beforeend", `
        <div class="card" id="${item.id}">
          <div class="card_header">
            <h1>${item.nome}</h1>
            <button id="btn${item.id}" onClick="favoritar(${item.id}, '${item.nome}')">
              ${localStorage.getItem(`item${item.id}Fav`) === null ? "☆" : "★"}
            </button>
          </div>
          <div class="card-items">
            <img src="${item.url}">
            <h3>R$: ${item.valor.toFixed(2)}</h3>
          </div>
        </div>
        `)
      }
    }
  )
  })
}
