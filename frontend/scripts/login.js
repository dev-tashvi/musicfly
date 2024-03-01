// elements to target after login
var modal = document.getElementById("mymodel");
var signupbtn = document.getElementById("flip");

// below code is for the login and registration form 
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");

    function sendData(url, formData) {
      return new Promise((resolve, reject) => {
        fetch(url, {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(response => {
            if (!response.ok) {
              reject(response.statusText);
            }
            resolve(response);
          })
          .catch(error => reject(error));
      });
    }

    function handleFormSubmit(event, form, url) {
      event.preventDefault();
      const Data = new FormData(form);
      const jsobj = {};
      for(let data of Data){
        jsobj[data[0]] = data[1];
      }
      const formData = JSON.stringify(jsobj);
      sendData(url, formData)
        .then(response => {
          if (response.ok) {
            console.log(response.statusText);            
            // check the status code and according to that shows message 
              if(response.statusText=="OK"){
                  response.json().then(data =>{
                      sessionStorage.setItem("username", data.username);
                      modal.style.display="none";
                      location.reload(true);
                  })
                }
                // status code for registration
                else if(response.statusText=="Created"){
                  var notify = new Notyf({duration: 2000,
                    position: {
                      x: 'right',
                      y: 'top',
                    }});

                  notify.success("registered successfully");
                  signupbtn.checked = false;
                }
          }
        })
        .catch(error => {
          var notify = new Notyf({duration: 2000,
            position: {
              x: 'right',
              y: 'top',
            }});
          notify.error("user-name or password is incorrect !!")
        });
    }

    loginForm.addEventListener("submit", function (event) {
      handleFormSubmit(event, loginForm, "http://localhost:3000/user/login");
    });

    signupForm.addEventListener("submit", function (event) {
      handleFormSubmit(event, signupForm, "http://localhost:3000/user/register");
    });

  })

