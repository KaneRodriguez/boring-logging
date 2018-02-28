import * as firebase from 'firebase';

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

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
//const DB_SECRET = 'e7Dpd1qHmHq1PPIlWK3EH39pEVjlezjSITJ8FaKp';

export {
  auth
};
