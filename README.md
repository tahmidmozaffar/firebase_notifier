# Firebase Notifier

This is a tool for sending firebase push notifications to client apps. Currently I added support to 
send notifications only to Android apps, but iOS support will be added later.
 
You can use this tool from here. https://firebase-notifier.vercel.app/.

or using it from the source connecting to your own firebase account.  


## How does it work?

It is similar like https://www.pushtry.com/, but with functionality to save your projects, where you are sending notifications 
and which user your are sending it to. 

You can use this tool just to test push notification feature in your app while your are developing it, or in a production app where you don't have a backend for the app and you want to manually send some 
push notifications to specific users from time to time. For example asking for reviews or notifying them about some features.

This tool is dependent on Firebase Messaging, Firestore and Amplitude (https://amplitude.com/)

To use this tool, you have to have some mechanism in your app to get the firebase device token. Because to send notification from this tool you have to provide the device token of the user.

## How to run this project?
Create a firebase project and add a web app there. Get the firebase configs and add those in `src/configs.json` file

For now, I did not add firebase authentication. So you have to update the rule for firebase firestore to allow it without authentication. Go to firestore rule section and add this rule there.

````
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write;
    }
  }
}
````

I know it is not good practice to make this public. But for now it will be like this. In future I will add proper authentication in this tool then we can change the rule  to be secure. 
Or if you want to contribute implementing it now, feel free to make pull request. 

For amplitude id, go to their site, create your account and add a javascript project there. Then you can get the amplitude id. Add it in the `configs.json` file.

I added amplitude to see some analytics of the project. If you don't want to use it, you can remove the dependency and code that depends on it from the project.



## Future development
- Add support for sending notifications to iOS Apps
- Add proper authentication to access this tool.  
- Add feature to save message as template.

Here is how it looks.

![add_project](https://raw.githubusercontent.com/tahmidmozaffar/firebase_notifier/master/screenshots/1.png)

![send_notifications](https://raw.githubusercontent.com/tahmidmozaffar/firebase_notifier/master/screenshots/2.png)


## License

MIT License

Copyright 2021 Md Tahmid Mozaffar

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

