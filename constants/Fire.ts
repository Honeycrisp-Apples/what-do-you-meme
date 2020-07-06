import firebase from 'firebase'


// interface Props {
//   navigation: { navigate: (arg0: string) => void }
// }

export default class Fire {
  static shared: Fire
  constructor(){
    this.init()
    this.observerauth()
  }

  init = () => {
    //api keys to firebase database
    if(!firebase.apps.length){
      const firebaseConfig = {
        apiKey: "AIzaSyCdFHZ-nU0tLz2lythaZPaqK3qTG83JH4I",
        authDomain: "memer-365.firebaseapp.com",
        databaseURL: "https://memer-365.firebaseio.com",
        projectId: "memer-365",
        storageBucket: "memer-365.appspot.com",
        messagingSenderId: "754909736770",
        appId: "1:754909736770:web:362d8496dc4c1fae5b22db",
        measurementId: "G-5T5T6J15VF"
      }
      firebase.initializeApp(firebaseConfig);
    }
  }

  observerauth = () => {
    //calls auth situations
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged2);
  }

  onAuthStateChanged2 = (user: any) => {
    if (!user) {
      try {
        // firebase.auth().signInAnonymously();
        console.log('Maybe navigate to correct screen?')
      } catch ({ message }) {
        //if something goes wrong basically
        alert(message);
      }
    } else {
      console.log('there is a user!!')
      // this.props.navigation.navigate("Welcome")
    }
  };

  createUser = (email: string, pass: string, username: string) => {
    firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then((cred) => {
      if (cred.user){
        cred.user.updateProfile({displayName: username})
        .then(() => console.log("CRED DISPLAYNAME: ", cred.user?.displayName))
      }
      console.log("The new cred: ", cred)
    })
    .then(() => console.log('made an account!!'))
    .catch((err) => console.log("Error MAKING USER: ", err))
  }

  login = async (email: string, pass: string) => {
    firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(() => firebase.auth().currentUser)
    .catch((err)=> console.log("Error SIGNING IN: ", err))

    return await firebase.auth().currentUser
  }
  logout = () => {
    firebase.auth().signOut()
  }

  getUser = async () => {
    let user = await firebase.auth().currentUser
    if(user){
    console.log("CURRENT USER: ", user)
    return user.displayName
    }
  }
  // shared = () => new Fire()
}

Fire.shared = new Fire()


// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.15.5/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyCdFHZ-nU0tLz2lythaZPaqK3qTG83JH4I",
//     authDomain: "memer-365.firebaseapp.com",
//     databaseURL: "https://memer-365.firebaseio.com",
//     projectId: "memer-365",
//     storageBucket: "memer-365.appspot.com",
//     messagingSenderId: "754909736770",
//     appId: "1:754909736770:web:362d8496dc4c1fae5b22db",
//     measurementId: "G-5T5T6J15VF"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>
