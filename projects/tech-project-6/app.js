// Variables

const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const resetBtn = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
const tries = document.getElementsByClassName('tries');
const mainContainer = document.querySelector('.main-container');

let missed = 0;


// event listener to start game



resetBtn.addEventListener('click', () => {
    mainContainer.removeChild(overlay);
});

// phrases array

 const phrases = [
    "may the force be with you",
    "would you kindly",
    "that we do in life echoes in eternity",
    "a man chooses a slave obeys",
    "do or do not there is no try"
 ];

 // Random Phrase function
const getRandomPhraseAsArray = (arr) => {
    const randomSelection = arr[Math.floor(Math.random() * arr.length)];
    const  randoPhase = randomSelection.split('');
    console.log(randoPhase);
    return randoPhase;
};

// set game display
const addPhraseToDisplay = (arr) => {
    for (let i = 0; i < arr.length; i++){
        const Item = document.createElement('li');
        Item.textContent = arr[i];
        const ul = phrase.firstElementChild;
        ul.appendChild(Item);
        if (arr[i] !== ' ') {
            Item.className = 'letter';
        } else {
            Item.style.width = '35px';
        }
    }
};

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

// a Checkletter function

const checkLetter = (atempt) => {
    const letters = document.querySelectorAll('.letter');
    let match = null;
    for (let i = 0; i < letters.length; i++) {
        let show = letters[i].textContent;
        if (show === atempt.textContent) {
            console.log('match');
            letters[i].className += ' show';
            match = true;
        } 
    }
    return match;
};

// Event listener to the Keyboard

qwerty.addEventListener('click', (e) => {
    if (e.target.nodeName === 'BUTTON') {
        e.target.className = 'chosen';
        e.target.setAttribute('disabled', true);
        const letterFound = checkLetter(e.target);
        if (letterFound === null) {
            tries[missed].style.display = 'none';
            missed += 1;
            console.log('missed');
        }
        // Check to see if you won or lost

        const checkWin = () => {
            const show = document.querySelectorAll('.show');
            const letters = document.querySelectorAll('.letter');
            if  (show.length === letters.length) {
                console.log('won');
                overlay.className = 'win';
                overlay.innerHTML = '<h1>Won</h1>'
                mainContainer.appendChild(overlay);

            } else if (missed >= 5) {
                console.log('lost');
                overlay.className = 'lose';
                overlay.innerHTML = '<h1>Lose</h1>'
                mainContainer.appendChild(overlay);
             }
        }
        checkWin();
    }
  
});




