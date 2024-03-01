
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
        console.log(data)
        jsobj[data[0]] = data[1];
      }
      const formData = JSON.stringify(jsobj);
      sendData(url, formData)
        .then(response => {
          if (response.ok) {
            response.json().then(data =>{
                console.log(data.username);
                sessionStorage.setItem("username", data.username);
                /**
                 * Remove model
                 * show username to user
                 * on clicking username form should not be open
                 */
            })
            console.log("log in");
          }
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }

    loginForm.addEventListener("submit", function (event) {
      handleFormSubmit(event, loginForm, "http://localhost:3000/user/login");
    });

    signupForm.addEventListener("submit", function (event) {
      handleFormSubmit(event, signupForm, "http://localhost:3000/user/register");
    });

  })

