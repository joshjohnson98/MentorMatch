const config = {
    apiKey: "AIzaSyCvsB1qBMOpUOG0XT9TM9ShTouhQjf_hZs",
    authDomain: "mentormatch-1551397019664.firebaseapp.com",
    databaseURL: "https://mentormatch-1551397019664.firebaseio.com",
    projectId: "mentormatch-1551397019664",
    storageBucket: "mentormatch-1551397019664.appspot.com",
    messagingSenderId: "94097431082"
};
firebase.initializeApp(config);

const buttonSignUp = document.getElementById("buttonSignUp");
buttonSignUp.addEventListener('click', e =>
{
    console.log("clicked button sign up!");
    const email = document.getElementById("textEditEmailSignUp").value;
    const password = document.getElementById("textEditPasswordSignUp").value;
    const password2 = document.getElementById("textEditPasswordSignUp2").value;
    if (password == password2)
    {
        const auth = firebase.auth();
        const answer = auth.createUserWithEmailAndPassword(email, password);
        answer
            .catch(e => console.log(e.message));
        window.location.href = "login.html";
        alert("Successfully added!");
    }
    else
    {
        alert("Password and confirm password does not match!")
    }
})