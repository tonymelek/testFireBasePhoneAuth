import { firebaseConfig } from "./firebase.js"
import countryCodes from './countryCodes.js'

const app = {
    data() {
        return {
            phoneNumber: '',
            isVerified:false,
            message:'',
            appVerifier:null,
            error:'',
            displayError:false,
            countryCode:''
        }
    },
    created() {
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        //   firebase.analytics();
        firebase.auth().languageCode = 'en-au';
        // Initialize Recaptcha
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('captcha',{'size':'invisible'});
        this.appVerifier = window.recaptchaVerifier;
       
            axios.get('https://ipapi.co/json').then(res=>{
                const userCountry=countryCodes.find(country=>country.TwoLetterCode=== res.data.country);
                this.countryCode=`+${userCountry.Code}`
            })
            
           
        

   
            
     
    },
    mounted() {

    },
    methods: {
        verify(){
            this.error=''
            this.phoneNumber=`+61${this.phoneNumber.split(' ').join('').slice(1)}`
            firebase.auth().signInWithPhoneNumber(this.phoneNumber, this.appVerifier)
            .then(confirmationResult => {
                console.log(confirmationResult);
              // SMS sent. Prompt user to type the code from the message, then sign the
              let code=prompt('enter otp','')
              // user in with confirmationResult.confirm(code).
              if(code===null)return
              confirmationResult.confirm(code).then(result=>{
                console.log("Successful Login");
                this.isVerified=true
              })
              // window.confirmationResult = confirmationResult;
              // ...
            }).catch((error) => {
              // Error; SMS not sent
              this.displayError=true
              if (error.code === 'auth/invalid-verification-code') this.error="You entered wrong OTP"
              // ...
            }); 
        }
    },
    computed: {

    }
}

Vue.createApp(app).mount('#app')
