import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'


const app = express()
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


app.set('port', (process.env.PORT || 9090))
app.listen(app.get('port'), function () {
    console.log('Production Express server API running at localhost:' + app.get('port'))
})


app.get('/', function (req, res) {
	res.send('Hello!!! This is server for DrbzDream bot')
})
app.post('/webhook', (req, res) => {
    res.sendStatus(200)
})



// app.get('/test', (req, res) => {
// 	let x = [{
//         dream: 'cute',
//         mint: 'eiei'
//     }]
//     res.json(x)	
// })

