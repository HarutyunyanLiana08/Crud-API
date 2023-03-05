const express = require('express')
const sqlite = require('sqlite3').verbose()
const app = express()
const port = 3001
app.use(express.json())
const cors = require('cors')

app.use(cors())

const db = new sqlite.Database('database.db', (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("OK")
    }
})

app.get('/', (req, res) => {
    db.all('SELECT * FROM jewelry', [], (err, data) => {
        res.send(data)
    })
})

// app.get('/jewelry/:id', (req, res) => {
//     const id = req.params.id
//     db.get('SELECT * FROM jewelry WHERE id=?', [id], (err, data) => {
//         res.send(data)
//     })
//     // res.send(data[id])
// })
app.get('/jewelry/:id', (req, res) => {
    const id = req.params.id
    db.get('SELECT * FROM jewelry WHERE id=?', [id], (err, data) => {
        console.log(data)
        res.send(data)
    })
})

app.post('/jewelry/create', (req,res) => {

    const img = req.body.img
    const name =req.body.name
    const price = req.body.price
    const description=req.body.description

    db.run('INSERT INTO jewelry (img,name,price,description) values (?,?,?,?)', [img,name,price,description],(err) => {
        res.send("OK")
    })
})
app.put('/jewelry/update/:id', (req,res)=>{
    const id = req.params.id
    const img = req.body.img
    const name =req.body.name
    const price = req.body.price
    const description=req.body.description
    db.run('UPDATE jewelry SET img=?,name=?,price=?,description=? WHERE id=?', [img,name,price,description,id],(err)=>{
    res.send("OK")
 })
})

app.delete('/delete/:id', (req,res) => {


    db.run('DELETE FROM jewelry WHERE id=?', [req.params.id],(err) => {
        res.send("OOKKK")
    })
})

app.listen(port)