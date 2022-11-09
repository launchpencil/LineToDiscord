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
export declare function setup(url: string): void;
export declare function senddiscord(content: events): void;
export {};
