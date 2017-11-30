const express = require('express')
const line = require('@line/bot-sdk')

// import minhyun from './img/min1.png'
// import jonghyun from './img/jr1.png'

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

    if (event.message.type === 'text') {
        var eventText = event.message.text.toLowerCase();

        if (eventText === 'ขอดูหน่อย') {
            msg = {
                'type': 'image',
                'originalContentUrl': 'http://78.media.tumblr.com/24fa96daf4bd9bbf25a36a426bed4082/tumblr_ouefu2JwVl1tnwp7qo2_1280.jpg',
                'previewImageUrl': 'https://i.pinimg.com/originals/02/4b/ce/024bce866c68b0a9be458aabd9511c8f.png'
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
    } else if (event.message.type === 'sticker') {
        msg = {
            "type": "sticker",
            "packageId": "1",
            "stickerId": "1"
        }
    }

    return client.replyMessage(event.replyToken, msg);
}


// response.body from line msg
// {
//     "events": [
//       {
//         "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
//         "type": "message",
//         "timestamp": 1462629479859,
//         "source": {
//           "type": "user",
//           "userId": "U206d25c2ea6bd87c17655609a1c37cb8"
//         },
//         "message": {
//           "id": "325708",
//           "type": "text",
//           "text": "Hello, world"
//         }
//       },
//       {
//         "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
//         "type": "follow",
//         "timestamp": 1462629479859,
//         "source": {
//           "type": "user",
//           "userId": "U206d25c2ea6bd87c17655609a1c37cb8"
//         }
//       }
//     ]
//   }



