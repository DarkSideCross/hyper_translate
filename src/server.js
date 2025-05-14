const fs = require('node:fs');
const path = require('node:path');
const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.resolve(__dirname, '../static')));
app.use(express.json());

app.get('/', (req, res) => {

    res.render('index');

});

app.post('/', async (req, res) => {

    const translationConfig = req.body;

    let { langInput, langOutput, inputTranslateCoded } = translationConfig;
    const url = 'https://lingva.thedaviddelta.com/_next/data/RLXCy8CXA0_YUa8elLcdX/';

    const translationObject = (await (await fetch(`${url}${langInput}/${langOutput}/${inputTranslateCoded}.json`)).json());

    const { translation } = translationObject.pageProps;

    res.write(translation);
    res.end();
})


const PORT = process.env.PORT || 3000;
console.log('Porta: ' + PORT);
app.listen(PORT, () => {
    console.log('Abrindo servidor na porta ' + PORT);
})