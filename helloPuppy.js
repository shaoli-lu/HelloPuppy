let timer;
let deleteFirstPhotoDelay;

async function start() {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all")
        const data = await response.json()
        createBreedList(data.message)
        loadByBreed("samoyed") // Fetch Samoyed images after the breed list has been created
    }
    catch (e) {
        console.log("There was a problem fetching the breed list from the server")
    }
}

start();
/* async function start() {
try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all")
    const data = await response.json()
    createBreedList(data.message)    
}
catch (e) {
console.log("There was a problem fetching the breed list from teh server")
}
} */

start();
function createBreedList(breedList) {
    document.getElementById("breed").innerHTML = `
    <select onchange="loadByBreed(this.value)">
    <option>Choose a dog breed here</option> 
    ${Object.keys(breedList).map(function(breed) {
        if (breed === "samoyed") {
            return `<option selected>${breed}</option>`
        } else {
            return `<option>${breed}</option>`
        }
    }).join('')}
    </select>
    `
}
/* function createBreedList(breedList) {
    document.getElementById("breed").innerHTML = `
    <select onchange="loadByBreed(this.value)">
    <option>Choose a dog breed here</option> 
    ${Object.keys(breedList).map(function(breed) {
        return `<option>${breed}</option>`
    }).join('')}
    </select>
    `
} */

async function loadByBreed(breed) {
if (breed != "Choose a dog breed here") {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
    const data = await response.json() 
    createSlideshow(data.message)
    }
}

function createSlideshow(images) {
    let currentPosition = 0;
    clearInterval(timer);
    clearTimeout(deleteFirstPhotoDelay);
    window.addEventListener("keypress",function(event){
        switch(event.key.toLowerCase()){
          case 'p': moveBack();break;
          case 'n': moveForward();break;
         
        }
      });
    if (images.length > 1) {
        document.getElementById("slideshow").innerHTML = `
        <div class ="slide" style="background-image: url('${images[0]}');"></div>
        <div class ="slide" style="background-image: url('${images[1]}');"></div>
        `
    
        currentPosition += 2;
        if (images.length == 2) currentPosition = 0;
        timer = setInterval(nextSlide, 3000)
    
    } else {

        document.getElementById("slideshow").innerHTML = `
    <div class ="slide" style="background-image: url('${images[0]}');"></div>
    <div class ="slide"></div>
    `
    }

    function nextSlide() {
        document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class ="slide" style="background-image: url('${images[currentPosition]}');"></div>`)
        deleteFirstPhotoDelay = setTimeout(function() {
            document.querySelector(".slide").remove()
        }, 1000)

        if (currentPosition + 1 >= images.length) {
            currentPosition = 0;
        }
        else {
            currentPosition++
        }


    }

    
    function moveBack() {
        currentPosition--
    }

    
    function moveForward() {
        currentPosition++
    }


  
}