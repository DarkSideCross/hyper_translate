import getRandomLanguage from './random-language.js';

document.querySelector('#icon-translate').addEventListener('click', async (evt) => {

    const inputTranslate = document.querySelector('#input-translate').value;
    let inputTranslateCoded = encodeURIComponent(inputTranslate);
    let langInput = document.querySelector('#lang-input').value;
    const langOutput = document.querySelector('#lang-output').value;
    const quantityLangs = document.querySelector('#quantity-langs').value;

    removeAllParts();
    createLoadingParts(quantityLangs);

    for (let i = 0; i < quantityLangs -1; i++) {
        const randomLang = getRandomLanguage();

        const translationConfig = {
            inputTranslateCoded,
            langInput,
            langOutput: randomLang
        }

        const textTranslated = await (await fetch('http://localhost:3000/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(translationConfig)
        })).text();

        inputTranslateCoded = encodeURIComponent(textTranslated);
        langInput = randomLang;

        addSucessPart()
    }

    const translationConfig = {
        inputTranslateCoded,
        langInput,
        langOutput
    }
    
    const textTranslated = await (await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(translationConfig)
    })).text();

    addSucessPart();

    console.log(textTranslated);

    document.querySelector('#output-translate').value = textTranslated;
})

function createLoadingParts (quantity) {
    const loadingParts = [];
    const divLoading = document.querySelector('.loading');

    const widthDivLoading = divLoading.clientWidth;

    for (let i = 0; i < quantity; i++) {
        const div = document.createElement('div');

        div.style.width = widthDivLoading + 'px'; 
        div.style.height = '16px';

        div.classList.add('loading-part');

        loadingParts.push(div);
    }

    divLoading.append(...loadingParts);
}

function addSucessPart () {
    const allParts = document.querySelectorAll('.loading-part');

    for (let i = 0; i < allParts.length; i++) {
        const currentPart = allParts[i];
        if (!currentPart.classList.contains('loading-part-sucess')) {
            currentPart.classList.add('loading-part-sucess');
            break;
        }
    }
}

function removeAllParts () {
    const allParts = document.querySelectorAll('.loading-part');
    allParts.forEach(part => part.remove());
}