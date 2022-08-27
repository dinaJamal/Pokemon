var pokemonsData;

function fetchPokemons(index) {
  let randId = getRandomPokemons();

  url = `https://pokeapi.co/api/v2/pokemon/${randId[index]}/`;
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      displayData(data, index);
    })
    .catch(function (error) {
      console.log("error" + error);
    });
}
function displayData(pokemonData, index) {
  let type = "";
  let pokemonType = pokemonData.types;
  let pokemonImage = pokemonData.sprites.other.dream_world.front_default;
  let isCaptured = localStorage.getItem(pokemonData.name) === "true";
  document.getElementById("captured" + index).checked = isCaptured;

  for (let index = 0; index < pokemonType.length; index++) {
    type += pokemonType[index].type.name;
    if (index < pokemonType.length - 1) type += ", ";
  }
  document.getElementById("pokemonImage" + index).src = pokemonImage;
  document.getElementById("pokemonName" + index).innerHTML = pokemonData.name;
  document.getElementById("pokemonType" + index).innerHTML = type;
}
function getRandomPokemons() {
  let arr = [];
  while (arr.length < 8) {
    let r = Math.floor(Math.random() * 100) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}

function saveCaptured(index) {
  let pokKey = document.getElementById("pokemonName" + index).innerHTML;
  let pokValue = document.getElementById("captured" + index).checked;

  localStorage.setItem(pokKey, pokValue);
}
function getPokemons(pokNumber) {
  for (let i = 0; i < pokNumber; i++) getPokemonList(i);
}
function getPokemonList(index) {
  document.getElementById(
    "pokemonItems"
  ).innerHTML += ` <div class="item col s3">
    <div class="card">
      <div class="card-image">
        <img  width="120" height="150" id="pokemonImage${index}" src="assets/pokemonBall.png" alt="pokemon image" />
      </div>
      <div class="card-content">
        <h3 id="pokemonName${index}"></h3>
        <p id="poktype${index}">Pison, Grass</p>
      </div>
      <div class="card-action">
        <div class="switch">
          <label>
            <input type="checkbox"  id="captured${index}"
            onclick="saveCaptured(${index})"/>
            <span class="lever"></span>
            Captured
          </label>
        </div>
      </div>
    </div>
  </div>`;
  fetchPokemons(index);
}
