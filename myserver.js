const express = require('express');
const app = express();
//Vaihe 1. luodaan express olio/palvelu

app.use(express.static('public'));
//public kansiossa staattinen html sivu.html. Tällä komennolla palvelimella näkyy ko sivut.
//http://localhost:3001/sivu.html

app.use(express.json());
//Jos palvelimelle tulee jsonia, se osataan käsitellä tämän avulla

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});
//Vaihe 2 käynnistetään serveri http://localhost:3001


app.get( '/', (req, resp) =>  {
    resp.send('REST root get is working')
});

app.get( '/user4', (req, resp) =>  {
    resp.send('User toimii hienosti')
});
//Eli app.get voi määritellä polkuja verkkosivulle

app.get( '/user2', (req, resp) => {

    const user = {fname: 'Rölli', lname: 'Peikko'}

    resp.json(user);
});
//json palauttaa tietoa. voi olla myös taulukko, katso alla

app.get( '/user3', (req, resp) => {

    const user = [
        {fname: 'Rölli', lname: 'Peikko'},
        {fname: 'Rölli2', lname: 'Peikko2'},
        {fname: 'Rölli3', lname: 'Peikko3'},
    ]

    resp.status(200).json(user);
    resp.end();
});

app.get('/user', (req, resp) => {

    const id = req.query.id;

    const users = [
        {fname: 'Rölli', lname: 'Peikko'},
        {fname: 'Rölli2', lname: 'Peikko2'},
        {fname: 'Rölli3', lname: 'Peikko3'},
    ]

    if(id){
        if(id < users.length){
            resp.status(200).json(users[id]);
        }else
        resp.status(404).json({error: 'perkele'}); // tulostaa sivulle {"error":"perkele"}
    }else{
        resp.status(200).json(users);
    }
//if lauseella virheilmoituksia. Jos id on kirjoitettu osoitekenttään, näytetään id. jos käyttäjää ei ole olemassa, näytetään error

});

//app.get query parametri '?' esim osoitteessa https:\\page.com/user?id=1
//Selaimen osoitekenttään http://localhost:3001/user?id=2 ja tuo lopussa näkyvä "id=2" näyttää vain taulukon kolmannen

app.get('/summa', (req, resp) => {
    const x = Number(req.query.x);
    const y = Number(req.query.y);

    resp.send('Summa on ' + (x+y));
});
//Voi vaikka tehdä laskutoimituksen.
//Osoitekenttään http://localhost:3001/summa?x=6&y=9
//ja tulostaa vastauksen "Summa on 15"

