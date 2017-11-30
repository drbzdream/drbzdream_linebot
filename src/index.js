const express = require('express');
const line = require('@line/bot-sdk');

require('dotenv').config();

// config line developer account
const config = {
    channelAccessToken: "Vj8BrPqUF2Bi9oIPc6BGCu2RWLWy+aQ3PXW9pZ/U4eIbWM4N49ikkjpljzsaBlaA06etw9YjT+9uzF0oeY/Tm6AleDmYC43kIufQvfi+O1PtSxMjvFDZ7wdKWhyyY6KYXMzG13rkG7olCk0Z9wdRQgdB04t89/1O/w1cDnyilFU=",
    channelSecret: "81bf39e163e77999a7e9160ab05aa0be"
};
const client = new line.Client(config);

// setup server
const app = express();
app.set('port', (process.env.PORT || 9090));
app.listen(app.get('port'), function () {
    console.log('Production Express server API running at localhost:' + app.get('port'))
});


app.get('/', (req, res) => {
    res.send('Hello!!! This is server for DrbzDream bot')
});

app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});


function handleEvent(event) {
    console.log(event);
    if (event.type === 'message') {
        handleMessageEvent(event);
    } else {
        return Promise.resolve(null);
    }
}

// detect msg 
function handleMessageEvent(event) {
    var msg = {
        type: 'text',
        text: 'น้องยังโง่ รอน้องหน่อยเน้ออออ น้องจะตอบคำถามที่ดูฉลาดกว่านี้ <3'
    };

    if(event.message.type === 'text') {
        var eventText = event.message.text.toLowerCase();

        if (eventText === 'ขอดูหน่อย') {
            msg = {
                'type': 'image',
                'originalContentUrl': 'https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100',
                'previewImageUrl': 'https://images.performgroup.com/di/library/GOAL/a6/bb/fifa-18-ronaldo_lx3r88bpjpk91re36ukdgomrj.jpg?t=2027563652&w=620&h=430'
            }
        } else if (eventText === 'อยู่ไหน') {
            msg = {
                "type": "location",
                "title": "my location",
                "address": "〒150-0002 東京都渋谷区渋谷２丁目２１−１",
                "latitude": 35.65910807942215,
                "longitude": 139.70372892916203
            }
        }
    } else if(event.message.type === 'sticker') {
        msg = {
            "type": "sticker",
            "packageId": "1",
            "stickerId": "1"
        }
    }

    return client.replyMessage(event.replyToken, msg);
}




