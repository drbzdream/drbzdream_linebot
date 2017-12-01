const express = require('express')
const line = require('@line/bot-sdk')

// import minhyun from './img/min1.png'
// import jonghyun from './img/jr1.png'
var random_no = 0

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

        if ((eventText === 'ดีจ้า' || eventText === 'หวัดดี' || eventText === 'hi' || eventText === 'hello') || eventText.search("สวัสดี") !== -1) {
            random_no = Math.floor((Math.random() * 10) + 1);
            if(random_no <= 2) {
                msg = {
                    'type': 'text',
                    'text': eventText
                }
            } else if (random_no <= 4){
                msg = {
                    'type': 'text',
                    'text': 'ว่าไงจ๊ะ คิดถึงเราอะดิ อิอิ'
                }
            } else if (random_no <= 6){
                msg = {
                    'type': 'text',
                    'text': 'เหงาเหรอ เดี๋ยวคุยด้วยนะ'
                }
            } else if (random_no <= 8){
                msg = {
                    'type': 'text',
                    'text': 'อะไร? ใคร? มาทักรู้จักกันเหรอ =.='
                }
            } else {
                msg = {
                    'type': 'text',
                    'text': 'อันยองทุกคนเลยยยยยยยยยยยยยยยย'
                }
            }
        } else if (eventText.search("ดู") !== -1 || eventText.search("รูป") !== -1 || eventText.search("กำลังใจ") !== -1) {
            random_no = Math.floor((Math.random() * 10) + 1);
            if(random_no <= 2) {
                msg = {
                    'type': 'image',
                    'originalContentUrl': 'https://firebasestorage.googleapis.com/v0/b/drbzdream-linebot.appspot.com/o/min1.png?alt=media&token=d062709c-4827-43aa-8133-2dc7b7e25ba4',
                    'previewImageUrl': 'https://firebasestorage.googleapis.com/v0/b/drbzdream-linebot.appspot.com/o/jr1.png?alt=media&token=60359477-3a9c-4bc0-88c9-6124bcde33ec'
                }
            } else if (random_no <= 4){
                msg = {
                    'type': 'text',
                    'text': 'จะดูรูปอะไรอะ ทะลึ่ง คนหยาบคาย'
                }
            } else if (random_no <= 6){
                msg = {
                    'type': 'text',
                    'text': 'เดี๋ยวส่งรูปหลัวเราให้ดูนะ อิอิ'
                }
            } else if (random_no <= 8){
                msg = {
                    'type': 'image',
                    'originalContentUrl': 'https://firebasestorage.googleapis.com/v0/b/drbzdream-linebot.appspot.com/o/IMG_3679.JPG?alt=media&token=b03b826d-828a-4221-a1a9-81caddf6b541',
                    'previewImageUrl': 'https://firebasestorage.googleapis.com/v0/b/drbzdream-linebot.appspot.com/o/min2.png?alt=media&token=332d6de2-851e-409b-b778-bbf7db563fb9'
                }
            } else {
                msg = {
                    'type': 'image',
                    'originalContentUrl': 'https://firebasestorage.googleapis.com/v0/b/drbzdream-linebot.appspot.com/o/IMG_2843.JPG?alt=media&token=a6a8da44-4173-4f2c-8477-62c53eef22cb',
                    'previewImageUrl': 'https://firebasestorage.googleapis.com/v0/b/drbzdream-linebot.appspot.com/o/IMG_3853.JPG?alt=media&token=e2356324-6351-48cf-bbf7-fc8e2eaa10d7'
                }
            }
        } else if (/^\d+$/.test(eventText) || eventText.search("ขำ") !== -1 || eventText.search("ตลก") !== -1) {
            random_no = Math.floor((Math.random() * 8) + 1);
            if(random_no <= 2) {
                msg = {
                    'type': 'text',
                    'text': 'ขำไร ขำด้วยจิ 55555555555555555'
                }
            } else if (random_no <= 4){
                msg = {
                    'type': 'text',
                    'text': 'ขำไร ตลกเหรอ'
                }
            } else if (random_no <= 6){
                msg = {
                    'type': 'text',
                    'text': 'ตลกจังงงงงง 555555555555555555555'
                }
            } else {
                msg = {
                    'type': 'text',
                    'text': eventText
                }
            }
        } else if (eventText === 'อยู่ไหน' || eventText === 'ถึงไหน' || eventText === 'ไปไหน') {
            msg = {
                "type": "location",
                "title": "my location",
                "address": "ที่อยู่ของคนสวย",
                "latitude": 35.65910807942215,
                "longitude": 139.70372892916203
            }
        } else if (eventText.search("เศร้า") !== -1 || eventText.search("เหงา") !== -1) {
            msg = {
                "type": "video",
                "originalContentUrl": "https://firebasestorage.googleapis.com/v0/b/drbzdream-linebot.appspot.com/o/IMG_4793.mp4?alt=media&token=0136c625-2e06-49a7-a6ec-faa8538b891e",
                "previewImageUrl": "https://firebasestorage.googleapis.com/v0/b/drbzdream-linebot.appspot.com/o/IMG_3853.JPG?alt=media&token=e2356324-6351-48cf-bbf7-fc8e2eaa10d7"
            }
        } else if (eventText.search("ดอก") !== -1 || eventText.search("บ้า") !== -1) {
            random_no = Math.floor((Math.random() * 8) + 1);
            if(random_no <= 2) {
                msg = {
                    'type': 'text',
                    'text': 'ด่าเราทำไมอะ กระซิกๆ'
                }
            } else if (random_no <= 4){
                msg = {
                    'type': 'text',
                    'text': 'อ้าว อีดอกกกกกกกก '
                }
            } else if (random_no <= 6){
                msg = {
                    'type': 'text',
                    'text': 'ทำไมทำตัวแบบนี้ ไม่น่ารักเลย'
                }
            } else {
                msg = {
                    'type': 'text',
                    'text': eventText
                }
            }
        } else if (eventText.search("ด่า") !== -1 && eventText.search("ให้หน่อย") !== -1) {
            var tempfirst = 0
            var templast = 0; 
            for(i=0; i < eventText.length; i++) {
                if(eventText[i] == 'า'){
                    tempfirst = i+1;
                    continue;
                }
                if(tempfirst != 0 && eventText[i] == 'ใ' && i-tempfirst > 1){
                    templast = i;
                    break;
                }
            }
            var name = eventText.substring(tempfirst, templast);

            random_no = Math.floor((Math.random() * 8) + 1);
            if(random_no <= 2) {
                msg = {
                    'type': 'text',
                    'text': name + ' ไอเห็ดเกิดจากความเหงา'
                }
            } else if (random_no <= 4){
                msg = {
                    'type': 'text',
                    'text': name + 'ไอขยะรีไซเคิล'
                }
            } else if (random_no <= 6){
                msg = {
                    'type': 'text',
                    'text': name + ' ดีออกกกกกก วรั่ยย' + name +'ดอกกก' 
                }
            } else {
                msg = {
                    'type': 'text',
                    'text': 'คลจรัยวร้ายยยย อี' + + 'ตูดหมึก ว้ายยยยยยย'
                }
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



