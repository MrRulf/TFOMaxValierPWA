const express = require("express");

//SETTINGS

const port = 3000;
const links =
[
    {
        name: "Digitales Register",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flat_tick_icon.svg/1200px-Flat_tick_icon.svg.png",
        url: "https://tfobz.digitalesregister.it"
    },
    {
        name: "Moodle",
        icon: "",
        url: "https://moodle.tfobz.net"
    },
    {
        name: "Schulbar",
        icon: "",
        url: "https://www.schulbar.it"
    },
    {

        name: "Mail",
        icon: "",
        url: "https://mail.tfobz.net/login.php",
        useIFrame: true

    },
    {
        name: "Schulwebseit",
        icon: "",
        url: "http://tfobz.it",
        useIFrame: true
    },
    {
        name: "Dokumente für den Schulbetrieb",
        icon: "",
        url: "https://dokumente.tfobz.net",
        useIFrame: true
    },
    {
        name: "Räume",
        icon: "",
        url: "https://mrbs.tfobz.net",
        useIFrame: true
    },
    {
        name: "Test",
        icon: "",
        url: "http://localhost:10000",
        useIFrame: true
    }
]

const app = express();
app.set('view engine', 'ejs');

app.use(express.static("public"));

app.use(setDefaultValues);

app.get('/', (req, res) => {

    res.render('index');

});

app.get('/:id/site', (req, res) => {

    let siteID = req.params.id;

    let selected = links[siteID];
    selected['id'] = siteID;

    res.render('site', {selected: selected});

});

app.listen(port, () => {

    console.log(`Express listening at port ${port}`);

});

function setDefaultValues(req, res, next) {

	res.locals.url = "http://" + req.get("host");
    res.locals.links = links;

    next();
    
}
