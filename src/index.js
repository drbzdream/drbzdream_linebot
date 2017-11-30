const express = require('express');
const line = require('@line/bot-sdk');

require('dotenv').config();

const app = express();

const config = {
    channelAccessToken: "Vj8BrPqUF2Bi9oIPc6BGCu2RWLWy+aQ3PXW9pZ/U4eIbWM4N49ikkjpljzsaBlaA06etw9YjT+9uzF0oeY/Tm6AleDmYC43kIufQvfi+O1PtSxMjvFDZ7wdKWhyyY6KYXMzG13rkG7olCk0Z9wdRQgdB04t89/1O/w1cDnyilFU=",
    channelSecret: "81bf39e163e77999a7e9160ab05aa0be"
};

const client = new line.Client(config);

app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

app.get('/', (req, res) => {
    res.send('Hello!!! This is server for DrbzDream bot')
});

function handleEvent(event) {
    
        console.log(event);
        if (event.type === 'message' && event.message.type === 'text') {
            handleMessageEvent(event);
        } else {
            return Promise.resolve(null);
        }
    }
    
    function handleMessageEvent(event) {
        var msg = {
            type: 'text',
            text: 'สวัสดีครัช'
        };
    
        var eventText = event.message.text.toLowerCase();
        console.log('text:', eventText)
    
        if (eventText === 'image') {
            msg = {
                'type': 'image',
                'originalContentUrl': 'https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100',
                'previewImageUrl': 'https://images.performgroup.com/di/library/GOAL/a6/bb/fifa-18-ronaldo_lx3r88bpjpk91re36ukdgomrj.jpg?t=2027563652&w=620&h=430'
            }
        } else if (eventText === 'location') {
            msg = {
                "type": "location",
                "title": "my location",
                "address": "〒150-0002 東京都渋谷区渋谷２丁目２１−１",
                "latitude": 35.65910807942215,
                "longitude": 139.70372892916203
            }
        } else if (eventText === 'template button') {
            msg = {
                "type": "template",
                "altText": "this is a buttons template",
                "template": {
                    "type": "buttons",
                    "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                    "title": "Menu",
                    "text": "Please select",
                    "actions": [{
                        "type": "postback",
                        "label": "Buy",
                        "data": "action=buy&itemid=123"
                    }, {
                        "type": "postback",
                        "label": "Add to cart",
                        "data": "action=add&itemid=123"
                    }, {
                        "type": "uri",
                        "label": "View detail",
                        "uri": "http://example.com/page/123"
                    }]
                }
            }
        } else if (eventText === 'template confirm') {
            msg = {
                "type": "template",
                "altText": "this is a confirm template",
                "template": {
                    "type": "confirm",
                    "text": "Are you sure?",
                    "actions": [{
                        "type": "message",
                        "label": "Yes",
                        "text": "yes"
                    }, {
                        "type": "message",
                        "label": "No",
                        "text": "no"
                    }]
                }
            }
        } else if (eventText === 'carousel') {
            msg = {
                "type": "template",
                "altText": "this is a carousel template",
                "template": {
                    "type": "carousel",
                    "columns": [
                        {
                            "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                            "title": "this is menu",
                            "text": "description",
                            "actions": [
                                {
                                    "type": "postback",
                                    "label": "Buy",
                                    "data": "action=buy&itemid=111"
                                },
                                {
                                    "type": "postback",
                                    "label": "Add to cart",
                                    "data": "action=add&itemid=111"
                                },
                                {
                                    "type": "uri",
                                    "label": "View detail",
                                    "uri": "http://example.com/page/111"
                                }
                            ]
                        },
                        {
                            "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                            "title": "this is menu",
                            "text": "description",
                            "actions": [
                                {
                                    "type": "postback",
                                    "label": "Buy",
                                    "data": "action=buy&itemid=222"
                                },
                                {
                                    "type": "postback",
                                    "label": "Add to cart",
                                    "data": "action=add&itemid=222"
                                },
                                {
                                    "type": "uri",
                                    "label": "View detail",
                                    "uri": "http://example.com/page/222"
                                }
                            ]
                        }
                    ]
                }
            }
        }
    
        return client.replyMessage(event.replyToken, msg);
    }

app.set('port', (process.env.PORT || 9090));

app.listen(app.get('port'), function () {
    console.log('Production Express server API running at localhost:' + app.get('port'))
});