// Global variables
const body = document.querySelector('body');
const container = document.querySelector('div.container');
const textArea = document.querySelector('div.text-area');
const containers = document.querySelector('div.containers');
const leftContainer = document.querySelector('div.left-container');
const rightContainer = document.querySelector('div.right-container');
const btnContainer = document.querySelector('div.btn-container');

const overlay = document.querySelector('div.test');
const closeOverlay = document.querySelector('div.close');
const overlayContainer = document.querySelector('div.overlay-container');
const overlayLeft = document.querySelector('div.overlay-left-container');
const overlayCenter = document.querySelector('div.overlay-center-container');
const overlayRight = document.querySelector('div.overlay-right-container');

const radioArr = [];
const valueArr = [];

const key = 'https://swapi.dev/api/people/';

// class
class Character{
    constructor(name, gender, height, mass, hairColor, skinColor, eyeColor, movies, pictureUrl){
        this.name = name;
        this.gender = gender;
        this.height = height;
        this.mass = mass;
        this.hairColor = hairColor;
        this.skinColor = skinColor;
        this.eyeColor = eyeColor;
        this.movies = movies;
        this.pictureUrl = pictureUrl;
    }
    print(container){
        overlay.style.display = 'block';

        container.innerHTML = `
            <h2>${this.name}</h2>
            <p>Gender: ${this.gender}</p>
            <p>Length: ${this.height} cm</p>
            <p>Weight: ${this.mass} kg</p>
            <p>Hair color: ${this.hairColor}</p>
            <p>Skin color: ${this.skinColor}</p>
            <p>Eye color: ${this.eyeColor}</p>
            <p>Number of movies: ${this.movies}</p>
            <img src="img/${this.pictureUrl}" alt="Picture of ${this.name}">
        `;
    }
    compare(otherChar){
        // console.log('compare is active');
        // console.log('otherChar:', otherChar);

        // Rinse overlayCenter HTML
        overlayCenter.innerHTML = '';

        overlayCenter.innerHTML += `
            <h3>${otherChar.name}</h3>
            <br>
            <h3>VS.</h3>
            <br>
            <h3>${this.name}</h3>
            <br><br>
        `;

        // Convert string height to numbers
        const thisHeight = parseInt(this.height);
        const otherHeight = parseInt(otherChar.height);

        // Remove any commas from weight and convert to number
        const thisWeight = parseInt(this.mass.replace(/,/g, ''));
        const otherWeight = parseInt(otherChar.mass.replace(/,/g, ''));

        // Convert string movies to number
        const thisMovies = parseInt(this.movies);
        const otherMovies = parseInt(otherChar.movies);

        // Compare height
        if(thisHeight > otherHeight){
            overlayCenter.innerHTML += `<p>${this.name} is taller</p>`;
        } else if(thisHeight < otherHeight){
            overlayCenter.innerHTML += `<p>${otherChar.name} is taller</p>`;
        } else if(thisHeight === otherHeight){
            overlayCenter.innerHTML += `<p>Height is the same</p>`;
        }

        // Compare weight
        if(thisWeight > otherWeight){
            overlayCenter.innerHTML += `<p>${this.name} is heavier</p>`;
        } else if(thisWeight < otherWeight){
            overlayCenter.innerHTML += `<p>${otherChar.name} is heavier</p>`;
        } else if(thisWeight === otherWeight){
            overlayCenter.innerHTML += `<p>Weight is the same</p>`;
        }

        // Compare movies
        if(thisMovies > otherMovies){
            overlayCenter.innerHTML += `<p>${this.name} have been in more movies</p>`;
        } else if(thisMovies < otherMovies){
            overlayCenter.innerHTML += `<p>${otherChar.name} have been in more movies</p>`;
        } else if(thisMovies === otherMovies){
            overlayCenter.innerHTML += `<p>Amount of movies is the same</p>`;
        }

        // Compare gender
        if(this.gender === otherChar.gender){
            overlayCenter.innerHTML += `<p>Gender is the same</p>`;
        }else{
            overlayCenter.innerHTML += `<p>Gender is NOT the same</p>`;
        }

        // Compare haircolor
        if(this.hairColor === otherChar.hairColor){
            overlayCenter.innerHTML += `<p>Hair color is the same</p>`;
        }else{
            overlayCenter.innerHTML += `<p>Hair color NOT is the same</p>`;
        }

        // Compare haircolor
        if(this.skinColor === otherChar.skinColor){
            overlayCenter.innerHTML += `<p>Skin color is the same</p>`;
        }else{
            overlayCenter.innerHTML += `<p>Skin color NOT is the same</p>`;
        }
    }
}



// Get data (reausable)
const getData = async (url) => {
    const key = await fetch(url);
    const data = await key.json();

    return data;
};

// const data = getData(key);
// console.log(data);


// Randomize index and return array with links to char
const createArrayOfNumbers = (() => {
    const indexArr = [];

    for(let i = 0; indexArr.length < 12; i++){
        const index = Math.floor(Math.random() * 22);

        if(!indexArr.includes(key+index) && index !== 17 && index !== 0){
            indexArr.push(key+index);
        }
    }
    // console.log('indexArr:', indexArr);
    return indexArr;
});



// Create array with char objects
const indexArr = createArrayOfNumbers();
const charArr = [];

const getPeopleData = async (array) => {

    for(let i = 0; i < array.length; i++){
        let x = await getData(array[i]);
        charArr.push(x);
    }
    // console.log('charArr:', charArr);
    return charArr;
};

let charData = getPeopleData(indexArr);



// Splice charArr into 2 different arrays
const spliceArr = async (array, start, end) => {
    const data = await array;
    const arrCopy = [...data];
    // console.log('arrCopy:', arrCopy.splice(start, end));

    return arrCopy.splice(start, end);
};

const charArr1 = spliceArr(charData, 0, 6);
const charArr2 = spliceArr(charData, 6, 12);



// Render name in div with label and radio
const createAlt = async (array, container, place) => {
    const objArr = await array;
    // console.log('objArr:', objArr);
    
    objArr.forEach(obj => {
        // console.log('obj:', obj);
        container.innerHTML += `
            <div class="flex-row flex-center">
                <label class="flex-row flex-center" for="${obj.name}">
                <input type="radio" id="${obj.name}" name="${place}" value="${obj.url}">
                ${obj.name}</label>
            </div>
        `;
        // Return something?
    });
    // Return something?
};

createAlt(charArr1, leftContainer, 'left');
createAlt(charArr2, rightContainer, 'right');

// Add eventlistener on left & right container (push name/value to arrays)
containers.addEventListener('click', (e) => {

    if(e.target.name && e.target.value){
        const clickedObj = { radioName: e.target.name, radioValue: e.target.value };
        const checkObj = radioArr.some(obj => obj.radioName === clickedObj.radioName);

        if (checkObj) {
            // console.log(`The name ${clickedObj.radioName} already exists in the array.`);
            const index = radioArr.findIndex(obj => obj.radioName === clickedObj.radioName);
            // console.log(index);
            radioArr.splice(index,1);
            radioArr.push(clickedObj);
            // console.log(radioArr);
        }
        else {
            // console.log(`The name ${clickedObj.radioName} does not exist in the array.`);
            radioArr.push(clickedObj);
            // console.log(radioArr);
        }
    }

    // Show button get data if array.length is equal to 2
    if(radioArr.length === 2){
        btnContainer.innerHTML =`
            <button>Compare characters</button>
        `;
    }
});



// When the user clicks the get data button, create 2 instances
btnContainer.addEventListener('click', (e) => {
    // let charQuantity = 0;
    // console.log('test1:', charQuantity);

    if(e.target.localName === 'button'){
        // console.log('button clicked');

        let createChar = async () => {
            let x = await charData;

            const emptyArr = [];

            radioArr.forEach(obj2 => {
                const matchingObj = x.find(obj1 => obj1.url === obj2.radioValue);
                if(matchingObj){
                    const char = new Character(matchingObj.name, matchingObj.gender, matchingObj.height, matchingObj.mass, matchingObj.hair_color, matchingObj.skin_color, matchingObj.eye_color, matchingObj.films.length, `${matchingObj.name}.jpg`);
                    emptyArr.push(char);
                }
                // if (matchingObj && charQuantity === 0) {
                //     // Create (new) Character instance of matching obj1
                //     // console.log(matchingObj);
                //     const char1 = new Character(
                //         matchingObj.name,
                //         matchingObj.gender,
                //         matchingObj.height,
                //         matchingObj.mass,
                //         matchingObj.hair_color,
                //         matchingObj.skin_color,
                //         matchingObj.eye_color,
                //         matchingObj.films.length,
                //         `${matchingObj.name}.jpg`
                //     );
                //     console.log(char1);
                //     char1.print(overlayLeft);
                //     charQuantity++;
                // }
                // else if(matchingObj && charQuantity === 1) {
                //     // Create (new) Character instance of matching obj2
                //     // console.log(matchingObj);
                //     const char2 = new Character(
                //         matchingObj.name,
                //         matchingObj.gender,
                //         matchingObj.height,
                //         matchingObj.mass,
                //         matchingObj.hair_color,
                //         matchingObj.skin_color,
                //         matchingObj.eye_color,
                //         matchingObj.films.length,
                //         `${matchingObj.name}.jpg`
                //     );
                //     console.log(char2);
                //     char2.print(overlayRight);
                //     charQuantity++;
                // }
                // else {
                //     console.log(`No match found for ${obj2}`);
                // }
                 
            });
            // console.log('empty:', emptyArr);
            return emptyArr;
        };
        
        const fullArr = createChar();
        // console.log('full:', fullArr);

        // Render char
        const printChar = async () => {
            const chosenChars = await fullArr;

            chosenChars.forEach((char) => {
                // console.log('what we loop through:', chosenChars);
                const index = chosenChars.indexOf(char);
                // console.log('indexOf item:', index);
                const itemInIndex = chosenChars[index];
                // console.log('item in index:', chosenChars[index]);

                if(index === 0){
                    // Print
                    // console.log('item0', itemInIndex);
                    itemInIndex.print(overlayLeft);

                    // Compare
                    // itemInIndex.compare(chosenChars[1]);
                    // console.log('nextIndex:', nextIndex);
                    // console.log('nextChar', nextChar);
                    
                    // const nextIndex = index + 1;
                    // const nextChar = chosenChars[nextIndex];
                    // itemInIndex.compare(nextChar);

                } else if(index === 1){
                    // Print
                    // console.log('item1', itemInIndex);
                    itemInIndex.print(overlayRight);

                    // Compare
                    const prevoiusIndex = index - 1;
                    // console.log('prevoiusIndex:', prevoiusIndex);
                    const prevoiusChar = chosenChars[prevoiusIndex];
                    // console.log('prevoiusChar', prevoiusChar);

                    itemInIndex.compare(prevoiusChar);

                }
                
            });
        };
        printChar();

        // createChar();
        // charQuantity = 0;
    }
});



// Compare data
let test = async () => {
    
};



// To close overlay
closeOverlay.addEventListener('click', () => {
    // console.log('clicked');
    overlay.style.display = 'none';
});