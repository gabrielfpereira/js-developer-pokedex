const urlParams = new URLSearchParams(location.search)

if(!urlParams.get('pokemon')){
    window.location.href='./404.html'
}

let Pokemon = {}
fetch(`https://pokeapi.co/api/v2/pokemon/${urlParams.get('pokemon')}`)
    .then(response => response.json())
    .then(response => {
        Pokemon = response
        renderPage(response)
    })
    .catch( resp => window.location.href='./404.html')

function createCardPokemon(pokemon) {
    const div = document.createElement('div')
    div.classList.add('card-pokemon')
    
    const img = document.createElement('img')
    img.setAttribute('src', pokemon.sprites.other.dream_world.front_default)
    
    div.appendChild(img)
    div.appendChild(creteTabsPokemon().divTab)
    div.appendChild(creteTabsPokemon().divAbout)
    div.appendChild(creteTabsPokemon().divStats)
    div.appendChild(creteTabsPokemon().divEvolution)

    return div
}

function createTabsLinkElement(name){
    const btn = document.createElement('button')
    btn.classList.add('tabslink')
    btn.innerHTML = name
    btn.onclick = (e) => handleTabButton(e, e.target.value)

    return btn
}

function createTabContentElement(name){
    const div = document.createElement('div')
    div.classList.add('tabContent')
    div.id = name

    return div
}

function createTableElement(items){
    const table = document.createElement('table')
    for (let i = 0; i < items.length; i++) {
        
        const tr = document.createElement('tr')
        const td1 = document.createElement('td')
        const key = Object.keys(items[i])
        td1.innerHTML = key
        td1.classList.add('table-key')

        const td2 = document.createElement('td')
        td2.innerHTML = items[i][key]
        td2.classList.add('table-value')

        tr.appendChild(td1)
        tr.appendChild(td2)
        table.appendChild(tr)
        
    }

    return table

}

function creteTabsPokemon(){
    const btn1 = createTabsLinkElement('About')
    btn1.classList.add('active')

    const divAbout = createTabContentElement('about')
    divAbout.appendChild(createTableElement([
        {Species: Pokemon.species.name},
        {Height: Pokemon.height},
        {Weight: Pokemon.weight},
        {Abilities: `${Pokemon.abilities[0].ability.name}, ${Pokemon.abilities[1].ability.name}`},
    ]))

    const btn2 = createTabsLinkElement('Base Stats')

    const divStats = createTabContentElement('base stats')
    divStats.appendChild(createTableElement([
        {HP: Pokemon.stats[0].base_stat},
        {Attack: Pokemon.stats[1].base_stat},
        {Defenso: Pokemon.stats[2].base_stat},
        {Speed: Pokemon.stats[5].base_stat},
    ]))

    const btn3 = createTabsLinkElement('Evolution')

    const divEvolution = createTabContentElement('evolution')
    divEvolution.innerHTML = 'Evolution'

    const divTab = document.createElement('div')
    divTab.classList.add('tabs')
    divTab.appendChild(btn1)
    divTab.appendChild(btn2)
    divTab.appendChild(btn3)

    return {divTab, divAbout, divStats, divEvolution}
}

function createHeaderPokemon(pokemon){
    const h1 = document.createElement('h1')
    h1.innerHTML = pokemon.name
    
    const ul = document.createElement('ul')
    ul.classList.add('types')
    pokemon.types.forEach(type => {
        const li = document.createElement('li')
        li.classList.add('type')
        li.classList.add( pokemon.types[0].type.name )
        li.innerHTML = type.type.name
        ul.appendChild(li)
    }); 

    document.querySelector('.details').appendChild(h1) 
    document.querySelector('.details').appendChild(ul) 

    const span = document.createElement('span')
    span.classList.add('number')
    span.innerHTML = `#${pokemon.order}`
    document.querySelector('.details-pokemon').appendChild(span)
}

function renderPage(pokemon) {
    const body = document.querySelector('body')
    body.classList.add(pokemon.types[0].type.name)

    const container = document.querySelector('section')

    createHeaderPokemon(pokemon)
    container.appendChild(createCardPokemon(pokemon))

    console.log(pokemon)
   
}



function handleTabButton(event){
    tabcontent = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tabslink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(event.target.textContent.toLowerCase()).style.display = "block";
    event.currentTarget.className += " active";
}

