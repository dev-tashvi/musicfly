
const numImg = document.querySelectorAll(".singer_image").length;
let currImg = 1;

let timeoutID;

console.log(numImg)

const imgcontainer = document.querySelector(".img-container");

function updateImage() {
if (currImg > numImg) {
    currImg = 1;
} else if (currImg < 1) {
    currImg = numImg;
}
imgcontainer.style.transform = `translateX(-${(currImg - 1) * 900}px)`;

timeoutID = setTimeout(() => {
    currImg++;
    updateImage();
}, 3800);
}

updateImage()

// Function to handle previous and next buttons for the English section
function prevSlideEnglish() {
    const carousel = document.querySelector('.English .carousel');
    carousel.scrollLeft -= 100; // Adjust scroll distance as needed
}

function nextSlideEnglish() {
    const carousel = document.querySelector('.English .carousel');
    carousel.scrollLeft += 100; // Adjust scroll distance as needed
}

// Function to handle previous and next buttons for the Hindi section
function prevSlideHindi() {
    const carousel = document.querySelector('.Hindi .carousel');
    carousel.scrollLeft -= 100; // Adjust scroll distance as needed
}

function nextSlideHindi() {
    const carousel = document.querySelector('.Hindi .carousel');
    carousel.scrollLeft += 100; // Adjust scroll distance as needed
}


function prevSlideLofi() {
    const carousel = document.querySelector('.lofi .carousel');
    carousel.scrollLeft -= 100; // Adjust scroll distance as needed
}

function nextSlideLofi() {
    const carousel = document.querySelector('.lofi .carousel');
    carousel.scrollLeft += 100; // Adjust scroll distance as needed
}

function prevSlidePunjabi() {
    const carousel = document.querySelector('.punjabi .carousel');
    carousel.scrollLeft -= 100; // Adjust scroll distance as needed
}

function nextSlidePunjabi() {
    const carousel = document.querySelector('.punjabi .carousel');
    carousel.scrollLeft += 100; // Adjust scroll distance as needed
}

// Event listeners for English section
document.querySelector('.English .prev').addEventListener('click', prevSlideEnglish);
document.querySelector('.English .next').addEventListener('click', nextSlideEnglish);

// Event listeners for Hindi section
document.querySelector('.Hindi .prev').addEventListener('click', prevSlideHindi);
document.querySelector('.Hindi .next').addEventListener('click', nextSlideHindi);

// for lofi section
document.querySelector('.lofi .prev').addEventListener('click', prevSlideLofi);
document.querySelector('.lofi .next').addEventListener('click', nextSlideLofi);

// for punjabi section
document.querySelector('.punjabi .prev').addEventListener('click', prevSlidePunjabi);
document.querySelector('.punjabi .next').addEventListener('click', nextSlidePunjabi);



// below code is for rendering list
const data = [
    { imageUrl: "./assets/singer1.png", tagText: "chote miya",singId:1 },
    { imageUrl: "./assets/singer1.png", tagText: "another singer",singId:2 },
    { imageUrl: "./assets/singer1.png", tagText: "another singer",singId:3 },
    { imageUrl: "./assets/singer1.png", tagText: "another singer",singId:4 },
    { imageUrl: "./assets/singer1.png", tagText: "another singer",singId:5 },
    { imageUrl: "./assets/singer1.png", tagText: "another singer",singId:6 },
    { imageUrl: "./assets/singer1.png", tagText: "another singer",singId:7 },
    { imageUrl: "./assets/singer1.png", tagText: "another singer",singId:8 },
    { imageUrl: "./assets/singer1.png", tagText: "another singer",singId:9 }
    // Add more data as needed
];


function renderElements() {
    const cardList = document.querySelectorAll('.card');

    data.forEach(item => {

        const listItem = document.createElement('li');
        listItem.setAttribute('data-sing-id', item.singId); 

        const imageDiv = document.createElement('div');
        imageDiv.classList.add('image');
        const image = document.createElement('img');
        image.src = item.imageUrl;
        image.alt = "Singer Image";
        imageDiv.appendChild(image);


        const tagDiv = document.createElement('div');
        tagDiv.classList.add('tag');
        const tagText = document.createElement('p');
        tagText.textContent = item.tagText;
        tagDiv.appendChild(tagText);

        listItem.appendChild(imageDiv);
        listItem.appendChild(tagDiv);

        cardList.forEach(cardList => {
            const clonedListItem = listItem.cloneNode(true);
            cardList.appendChild(clonedListItem);
        });
    });
}

renderElements();

function handleClick(event) {
    const singId = event.target.closest('li').getAttribute('data-sing-id');
    const genre = event.target.closest('section').getAttribute('data-genre')
    console.log("Sing ID:", singId + "genre:",genre);
}


// renderElements();

const cardList = document.querySelectorAll('.card');

cardList.forEach(element =>{
    element.addEventListener('click', handleClick);
})




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
      const formData = new FormData(form);
      sendData(url, formData)
        .then(response => {
          if (response.ok) {
            console.log("log in")
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


var modal = document.getElementById("mymodel");
var btn = document.getElementById("model_triger");

btn.onclick = function() {
    modal.style.display = "block";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  document.addEventListener("DOMContentLoaded", function() {
    const audio = new Audio("./songs/water.mp3");
    const playPauseButton = document.querySelector(".play-pause");
    const progressBar = document.querySelector(".progress");
    const progressContainer = document.querySelector(".progress-bar");
  
    let isPlaying = false;

    playPauseButton.addEventListener("click", function() {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      isPlaying = !isPlaying;
      updatePlayPauseIcon();
    });
  
    function updatePlayPauseIcon() {
      playPauseButton.classList.toggle("fa-play", isPlaying);
      playPauseButton.classList.toggle("fa-pause", !isPlaying);
    }
  

    audio.addEventListener("timeupdate", function() {
      const progress = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = progress + "%";
    });
  
  
    progressContainer.addEventListener("click", function(event) {
      const offsetX = event.offsetX;
      const progressBar = progressContainer.clientWidth;
      const percentageClicked = offsetX/progressBar;
      const seekTime = percentageClicked*audio.duration;
      audio.currentTime = seekTime;
    });
  
    const volumeBar = document.querySelector(".volume-bar");
    const volumeProgressBar = volumeBar.querySelector(".progress-volume");
  
    volumeBar.addEventListener("click", function(event) {
      const offsetX = event.offsetX;
      const volumeWidth = volumeBar.clientWidth;
      const volume = offsetX / volumeWidth;
      audio.volume = volume;
      volumeProgressBar.style.width = (volume * 100) + "%";
    });
    
  });
  