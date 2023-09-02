const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const modal = document.getElementById("boxPokemon")
const voltar = document.getElementById('voltar')
const viewModal = document.getElementById("modalPokemon")

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {


    return `
        <li class="pokemon ${pokemon.type}"  id="${pokemon.name}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function convertPokemonToModal(pokemon) {
    return `
    
    <li class="pokemon-modal ${pokemon.type}" id="${pokemon.name}">
    <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>
    
    <div class="detail-modal">
        <ol class="types-modal">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
        <div class="img">
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
        <div class="engloba-abilities">
            <div class="habilidade">
                  <ol class="types">
                    ${pokemon.abilities.map((a) => `<li class="type ${a}">${a}</li>`).join('')}
                    
                  </ol>
            </div>
            <div class="caracteristicas">
                  <span class="experience">experience: <span class="numbers">${pokemon.experience}</span></span>
                  <span class="height">height: <span class="numbers">${pokemon.height}</span></span>
                  <span class="weight">weight: <span class="numbers">${pokemon.weight}</span></span>
            </div>
        </div>
          
    </div>
    
    </li>

    `
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })

}

loadPokemonItens(offset, limit, event)


loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


function detailsPokemonModal() {
    let pokemonsList = document.getElementById("pokemonList")

    pokemonsList.addEventListener("click", (event) => {
        let pokemonClick = event.target.parentElement
        let pokemonName = pokemonClick.id

        if (pokemonName !== "") {
            pokeApi.getOnePokemonDetail(pokemonName).then((res) => {
                modal.innerHTML = convertPokemonToModal(res)

                viewModal.classList.add("aparecer")
            })
        }

    })
}

detailsPokemonModal()

voltar.addEventListener('click', () => {
    modal.innerHTML = ''

    viewModal.classList.remove("aparecer")

})