

var googleUser = {};
var startApp = function() {
    gapi.load('auth2', function(){
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        auth2 = gapi.auth2.init({
            client_id: '94097431082-u080o437bpmes48td7lh5ojcungl8hsn.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
        });
        attachSignin(document.getElementById('customBtn'));
    });
};

function attachSignin(element)
{
    auth2.attachClickHandler(element, {},
        function (googleUser)
        {
            localStorage.clear();
            var email = googleUser.getBasicProfile().getEmail();  //Retrieve current user email
            var name = googleUser.getBasicProfile().getName();  //Retrieve current user email
            localStorage.setItem("useremail", email);
            localStorage.setItem("username", name);
            window.location.href = "home.html";
        }, function (error)
        {
            alert(JSON.stringify(error, undefined, 2));
        });
}

startApp();