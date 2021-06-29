var firebaseConfig = {
    apiKey: "AIzaSyBvJ_5e8z2k1L8e2tpH_cG-a6E8pWXE2iY",
    authDomain: "testfunctions-3304f.firebaseapp.com",
    projectId: "testfunctions-3304f",
    storageBucket: "testfunctions-3304f.appspot.com",
    messagingSenderId: "330779454006",
    appId: "1:330779454006:web:a4de73ba406433621c4697",
    measurementId: "G-TGXP5XCY43"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
firebase.auth().languageCode = 'en-au';
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('container');

  const phoneNumber = '+61426081060';
  const appVerifier = window.recaptchaVerifier;
  console.log(appVerifier);
  firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(e => {
          console.log(e);
        // SMS sent. Prompt user to type the code from the message, then sign the
        let code=prompt('enter otp','')
        // user in with confirmationResult.confirm(code).
        console.log('result',confirmationResult);
        
        if(code===null)return
        e.confirm(code).then(result=>{
            console.log(result);
        })
        // window.confirmationResult = confirmationResult;
        // ...
      }).catch((error) => {
        // Error; SMS not sent
        console.log(error);
        // ...
      }); 