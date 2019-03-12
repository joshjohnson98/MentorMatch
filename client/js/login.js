// const auth = firebase.auth();
// auth.signInWithEmailAndPassword(email, pass);

// auth.createUserWithEmailAndPassword(email, pass);

// auth.onAuthStateChanged(firebaseUser => {});

    // Initialize Firebase

    const config = {
        apiKey: "AIzaSyCvsB1qBMOpUOG0XT9TM9ShTouhQjf_hZs",
        authDomain: "mentormatch-1551397019664.firebaseapp.com",
        databaseURL: "https://mentormatch-1551397019664.firebaseio.com",
        projectId: "mentormatch-1551397019664",
        storageBucket: "mentormatch-1551397019664.appspot.com",
        messagingSenderId: "94097431082"
    };
    firebase.initializeApp(config);

    const textEditEmail = document.getElementById('textEditEmailLogin');
    const textEditPassword = document.getElementById('textEditPasswordLogin');
    const buttonLogin = document.getElementById('buttonLogin');
    const buttonGoogle = document.getElementById('googleButton');
    var clickedGoogleButton = false;
    if (clickedGoogleButton)
        console.log("true");
    else
        console.log("false");
    buttonGoogle.addEventListener('click', e=>
    {
        clickedGoogleButton = true;
    })

    buttonLogin.addEventListener('click', e =>
    {
        const email = textEditEmail.value;
        const password = textEditPassword.value;
        const auth = firebase.auth();
        const answer = auth.signInWithEmailAndPassword(email, password);
        answer
            .catch(e => console.log(e.message));
    })


    buttonLogin.addEventListener('click', e =>
    {
        const email = textEditEmail.value;
        const password = textEditPassword.value;
        const auth = firebase.auth();
        const answer = auth.signInWithEmailAndPassword(email, password);
        if (answer)
            window.location.href = "index.html";
        answer
            .catch(e => console.log(e.message));
    })

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

    } else {
        // No user is signed in.
        console.log("not successful!");
    }
});

    function onSignin(googleUser)
    {
        if (clickedGoogleButton)
        {
            const profile = googleUser.getBasicProfile();
            console.log("ID: " + profile.getId()); // Don't send this directly to your server!
            console.log('Full Name: ' + profile.getName());
            console.log('Given Name: ' + profile.getGivenName());
            console.log('Family Name: ' + profile.getFamilyName());
            console.log("Image URL: " + profile.getImageUrl());
            console.log("Email: " + profile.getEmail());


            alert('Successfully logged in!\nHello ' + profile.getName());
            window.location.href = "index.html";
        }
    }