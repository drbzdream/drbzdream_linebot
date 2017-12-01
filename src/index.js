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

function checkCurrentLocation() {
    var location = { lat: 0, lng: 0}
    return location;
}

function handleMessageEvent(event) {
    var msg = {
        type: 'text',
        text: 'น้องยังโง่ รอน้องหน่อยเน้ออออ น้องจะตอบคำถามที่ดูฉลาดกว่านี้'
    };

    if (event.message.type === 'text') {
        var eventText = event.message.text.toLowerCase();

        if (eventText ==='ขอดูหน่อย') {
            msg = {
                'type': 'image',
                'originalContentUrl': 'https://firebasestorage.googleapis.com/v0/b/drbzdream-linebot.appspot.com/o/min1.png?alt=media&token=d062709c-4827-43aa-8133-2dc7b7e25ba4',
                'previewImageUrl': 'https://firebasestorage.googleapis.com/v0/b/drbzdream-linebot.appspot.com/o/jr1.png?alt=media&token=60359477-3a9c-4bc0-88c9-6124bcde33ec'
            }
        } else if (/^\d+$/.test(eventText)) {
            msg = {
                type: 'text',
                text: 'ขำไร ขำด้วยจิ 55555555555555555'
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
        var sticker_id = '' + Math.floor((Math.random() * 527) + 1);
        msg = {
            "type": "sticker",
            "packageId": "2",
            "stickerId": sticker_id
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



