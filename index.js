const express = require("express");
const app = express()
const PORT = 8080

const morgan = require('morgan');

app.use(morgan('short'));
app.use(express.json())

app.get('/test/:id', (req, res) => {
    const { id } = req.params;

    if (!id){
        return res.status(404).send("We need an ID")
    }
    res.status(200).send(id);
})

app.listen(
    PORT,
    () => console.log(`App running on http://localhost:${PORT}`)
)

/*
post,get db file, routes, insomnia, 7-8h

test
app.get(/test
 */