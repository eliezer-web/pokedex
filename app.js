let mainScreen = document.querySelector(".main-screen");
let pokeName = document.querySelector(".poke-name");
let pokeId = document.querySelector(".poke-id");
let pokeFrontImage = document.querySelector(".poke-front-image");
let pokeBackImage = document.querySelector(".poke-back-image");
let pokeWeight = document.querySelector(".poke-weight");
let pokeHeight = document.querySelector(".poke-height");
let listItem = document.querySelectorAll(".list-item")
let typeOne = document.querySelector(".poke-type-one")
let typeTwo = document.querySelector(".poke-type-two")
//buttons

let leftButton = document.querySelector(".left-button");
let rightButton = document.querySelector(".right-button");
 var apipoke = "https://pokeapi.co/api/v2/pokemon";
 let suivant , precedent , nomdespokemons;



function refreshpoke() {
    
    // Initialise la requete http avec l'url de la ressource et les configurations définis ci-dessus
    fetch(apipoke)
    .then(function (response) {
    
        // On appelle la method json a partir de l'objet response pour parser les données renvoyer par l'API
        response.json()
            .then(function (data) {
                if (response.status == 400) {
                    console.log("requete echec");
                    // gestion erreur données envoyer a la requette
                }
                else if (response.status == 403) {
                    console.log("erreur d'autentification");
                    // gestion erreur authentification
                }
                else if (response.status == 200) {
                    console.log(data);
                    for (let index = 0; index < data.results.length; index++) {
                        let numberpoke= data.results[index].url.split("/");
                        let num  = numberpoke[numberpoke.length-2];
                        // console.log(num);


                        listItem[index].innerHTML = num +"."+ data.results[index].name
                        
                    }
                    
                    // ici on peut exploiter nos donnée
                    suivant = data.next;
                    precedent = data.previous;
                }
            })
            .catch(function (data_parsing_error) {
                console.log(data_parsing_error);
            })
    })
    .catch(function(server_errors) {
        // Cas erreur server (API)
        console.log(server_errors);
    })
}



 leftButton.addEventListener("click", ()=>{
    // console.log("chocolat");
    apipoke = precedent;
    refreshpoke();
 })
rightButton.addEventListener("click", ()=>{
    
    apipoke=suivant;
    refreshpoke()
})
refreshpoke();

let newurl = "https://pokeapi.co/api/v2/pokemon/";
 listItem.forEach(element => {
    element.addEventListener("click", () =>{
        fetch(newurl + element.textContent.match(/\d+/))
        .then(function (response) {

            // On appelle la method json a partir de l'objet response pour parser les données renvoyer par l'API
            response.json()
                .then(function (data) {
                    if (response.status == 200) {
             
                        console.log(data);
                        mainScreen.className ="main-screen";
                     pokeName.innerHTML=data.name;
                    
                    pokeId.innerHTML="#"+data.id;
                    pokeFrontImage.src=data.sprites.front_default; 
                    pokeBackImage.src=data.sprites.back_default; 
                    pokeWeight.innerHTML=data.weight; 
                    pokeHeight.innerHTML=data.height;
                    typeOne.innerHTML=data.types[0].type.name;
                    mainScreen.classList.add(typeOne.innerHTML);
                    if (data.types.length == 2) {
                        typeTwo.innerHTML=data.types[1].type.name;
                        typeTwo.style.display="block";
                        
                    }else {
                        typeTwo.style.display="none";
                    }

                    }
                })
                .catch(function (data_parsing_error) {
                    console.log(data_parsing_error);
                })
        })
        .catch(function(server_errors) {
            // Cas erreur server (API)
            console.log(server_errors);
        })
        
    }
    )
    
});