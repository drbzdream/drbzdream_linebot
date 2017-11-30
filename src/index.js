import express from 'express'
import bodyParser from 'body-parser'

const app = express()
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

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