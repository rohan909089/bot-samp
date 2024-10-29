const typesList = [
  { Type: "normal", emoji: "⚪️" },
  { Type: "fire", emoji: "🔥" },
  { Type: "water", emoji: "💧" },
  { Type: "electric", emoji: "⚡️" },
  { Type: "grass", emoji: "🌱" },
  { Type: "ice", emoji: "❄️" },
  { Type: "fighting", emoji: "🥊" },
  { Type: "poison", emoji: "☠️" },
  { Type: "ground", emoji: "🌍" },
  { Type: "flying", emoji: "🕊️" },
  { Type: "psychic", emoji: "🧠" },
  { Type: "bug", emoji: "🐛" },
  { Type: "rock", emoji: "🪨" },
  { Type: "ghost", emoji: "👻" },
  { Type: "dragon", emoji: "🐉" },
  { Type: "dark", emoji: "🌑" },
  { Type: "steel", emoji: "⚙️" },
  { Type: "fairy", emoji: "🧚" },
];
function showSuggestions() {
  const input = document.getElementById("type").value.toLowerCase();
  const suggestionsContainer = document.getElementById("suggestions-container");
  suggestionsContainer.innerHTML = ""; // Clear previous suggestions

  if (input) {
    const filteredSuggestions = typesList
      .filter((typeObj) => typeObj.type.startsWith(input))
      .slice(0, 5); // Filter suggestions

    filteredSuggestions.forEach((suggestion) => {
      const suggestionItem = document.createElement("div");
      suggestionItem.classList.add("suggestion-item");
      suggestionItem.innerHTML = `${suggestion.emoji} ${suggestion.type}`;
      suggestionItem.onclick = () => {
        document.getElementById("type").value = suggestion.type; // Set input to clicked suggestion
        suggestionsContainer.innerHTML = ""; // Clear suggestions
      };
      suggestionsContainer.appendChild(suggestionItem);
    });
  }
}

async function getpokemon() {
  const type = document.getElementById("type").value.toLowerCase();
  const num = document.getElementById("numberofpoke").value;
  const container = document.getElementById("mainConta");
  container.innerHTML = "";

  try {
    const typeResponse = await axios.get(
      `https://pokeapi.co/api/v2/type/${type}`
    );
    const pokemonList = typeResponse.data.pokemon.slice(0, num);

    for (let pokemonInfo of pokemonList) {
      const response = await axios.get(pokemonInfo.pokemon.url);
      const pokemon = response.data;

      const stats = pokemon.stats
        .map((stat) => `<p>${stat.stat.name}: ${stat.base_stat}</p>`)
        .join("");

      const card = document.createElement("div");
      card.classList.add("pokemon-card");
      card.innerHTML = `
      <h3>${pokemon.name}</h3>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      <p>Type: ${pokemon.types.map((t) => t.type.name).join(", ")}</p>
      <div class="pokemon-stats">
        <h4>Stats:</h4>
        ${stats}
      </div>
    `;
      container.appendChild(card);
    }
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
  }
}
