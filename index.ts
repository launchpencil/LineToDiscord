const request = require("request");
var TOKEN: string = process.env.LINE_ACCESS_TOKEN;
var sendurl: string;

interface getObj {
  uri: string;
  method: string;
  headers: {
    [key: string]: string;
  };
  json: boolean;
}
interface postObj {
  uri: string;
  headers: {
    [key: string]: string;
  };
  json: {
    [key: string]: string;
  };
}
interface msg {
  "type": String;
  text: null | string;
  packageId: null | string;
  stickerId: null | string;
  originalContentUrl: null | string;
  previewImageUrl: null | string;
}
interface source {
  "type": String;
  "userId": String;
}
interface delcon {
  "isRedelivery": boolean;
}
interface events {
  "type": String;
  "message": null | msg;
  "timestamp": Number;
  "source": source;
  "replyToken": null | String;
  "mode": String;
  "webhookEventId": String;
  "deliveryContext": delcon;
}

export function setup(url: string) {
    sendurl = url;
}

export function senddiscord(content: events) {
    var options: getObj = {
      uri: "https://api.line.me/v2/bot/profile/" + content.source.userId,
      method: 'GET',
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + TOKEN
      },
      json: true
    };
    request(options, function (error, response, body) {
      console.log(body);
      var sendmsg: postObj = {
        uri: sendurl,
        headers: {
          "Content-type": "application/json"
        },
        json: {
          "displayName": body.displayName,
          "pictureUrl": body.pictureUrl,
          "content": content.message.text
        }
      }
      if (content.message.type != 'text') {
        sendmsg.json.content = 'ファイルが送信されました。';
      }

      request.post(sendmsg);
    });
  }