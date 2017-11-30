import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


const PORT = process.env.PORT || 9090
const server = app.listen(PORT, () => {
  console.log('Production Express server API running at localhost:' + PORT)
})

app.get('/test', (req, res) => {
	let x = [{
        dream: 'cute',
        mint: 'eiei'
    }]
    res.json(x)	
})

app.get('/', function (req, res) {
	res.send('Hello')
})
