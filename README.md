# boring-logging

**Warning:** This application is no longer being actively maintained!

Boring Logging was meant as an voice-based accessibility application to aid Civil Engineers with performing ground sample analysis by providing 3D sample data visualizations.

Voice-based assistance was enabled through the [Speech Kitt](https://github.com/TalAter/SpeechKITT) voice assistant. Intuitive actions were chosen to help a user create items, remove items, update specific fields, and more, all from their voice.

### Why?

It had come to our attention that Civil Engineers that were out in the field were relying solely on pencils and papers to record their data. Then, when they returned to the office they had to enter the data in a spread sheet.

We hoped to streamline this process by making the data readily availabe immediately after collection.

### Features

* [x] Voice Based Adding/Removing Projects/Samples
* [ ] Visualizations of Collected Ground Sample Data
* [ ] Exporting data to Excel/Sheets/XML Formats
* [ ] Upgrading to full release of Material UI (& Out of Beta)
* [ ] Full Documentation on Getting Up and Running with Firebase

## Installation

### Dependencies

First, make sure to have npm and node (8.15.0) installed.

```
git clone https://github.com/kanerodriguez/boring-logging
cd boring-logging
npm install
npm start
```
Visit http://localhost:3000/

### Firebase and Login

To login, you will have to connect your own instance of firebase. 

Follow instructions on creating your own firebase project [here](https://firebase.google.com/docs/web/setup)

Then, open the src/firebase.js file and update the production and development config variables to your project's specific configuration.

```javascript
const prodConfig = {
  apiKey: "AIzaSyBodnZKCgvoqaH2xk2L2sukR8-WXXWqukc",
  authDomain: "boring-logging-prod.firebaseapp.com",
  databaseURL: "https://boring-logging-prod.firebaseio.com",
  projectId: "boring-logging-prod",
  storageBucket: "",
  messagingSenderId: "206276382684"
};

const devConfig = {
  apiKey: "AIzaSyDV5I-uFl20xsvkC0IrRxx9On03gEmvheA",
  authDomain: "boring-logging-dev.firebaseapp.com",
  databaseURL: "https://boring-logging-dev.firebaseio.com",
  projectId: "boring-logging-dev",
  storageBucket: "boring-logging-dev.appspot.com",
  messagingSenderId: "150056509671"
};
```

**Note:** More documentation on how to setup firebase may or may not come in the future.
