const numImg = document.querySelectorAll(".singer_image").length;
let currImg = 1;

let timeoutID;

var audio =  new Audio();
let isPlaying = false;

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

updateImage();

// Function to handle previous and next buttons for the English section
function prevSlideEnglish() {
  const carousel = document.querySelector(".English .carousel");
  carousel.scrollLeft -= 100; // Adjust scroll distance as needed
}

function nextSlideEnglish() {
  const carousel = document.querySelector(".English .carousel");
  carousel.scrollLeft += 100; // Adjust scroll distance as needed
}

// Function to handle previous and next buttons for the Hindi section
function prevSlideHindi() {
  const carousel = document.querySelector(".Hindi .carousel");
  carousel.scrollLeft -= 100; // Adjust scroll distance as needed
}

function nextSlideHindi() {
  const carousel = document.querySelector(".Hindi .carousel");
  carousel.scrollLeft += 100; // Adjust scroll distance as needed
}

function prevSlideLofi() {
  const carousel = document.querySelector(".lofi .carousel");
  carousel.scrollLeft -= 100; // Adjust scroll distance as needed
}

function nextSlideLofi() {
  const carousel = document.querySelector(".lofi .carousel");
  carousel.scrollLeft += 100; // Adjust scroll distance as needed
}

function prevSlidePunjabi() {
  const carousel = document.querySelector(".punjabi .carousel");
  carousel.scrollLeft -= 100; // Adjust scroll distance as needed
}

function nextSlidePunjabi() {
  const carousel = document.querySelector(".punjabi .carousel");
  carousel.scrollLeft += 100; // Adjust scroll distance as needed
}

// Event listeners for English section
document
  .querySelector(".English .prev")
  .addEventListener("click", prevSlideEnglish);
document
  .querySelector(".English .next")
  .addEventListener("click", nextSlideEnglish);

// Event listeners for Hindi section
document
  .querySelector(".Hindi .prev")
  .addEventListener("click", prevSlideHindi);
document
  .querySelector(".Hindi .next")
  .addEventListener("click", nextSlideHindi);

// for lofi section
document.querySelector(".lofi .prev").addEventListener("click", prevSlideLofi);
document.querySelector(".lofi .next").addEventListener("click", nextSlideLofi);

// for punjabi section
document
  .querySelector(".punjabi .prev")
  .addEventListener("click", prevSlidePunjabi);
document
  .querySelector(".punjabi .next")
  .addEventListener("click", nextSlidePunjabi);

// for render list
function renderElements(data_songs) {
  data_songs.forEach((item) => {
    // Create list item for the song
    const listItem = document.createElement("li");
    listItem.setAttribute("data-sing-id", item.songId);
    listItem.setAttribute("song-name",item.songname);

    // Create image element for the song
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("image");
    const image = document.createElement("img");
    image.src = item.img; // Use coverPath for image source
    image.alt = "Album Cover";
    imageDiv.appendChild(image);

    // Create tag element for the song
    const tagDiv = document.createElement("div");
    tagDiv.classList.add("tag");
    const tagText = document.createElement("p");
    tagText.textContent = item.songname;
    tagDiv.appendChild(tagText);

    // Append image and tag to the list item
    listItem.appendChild(imageDiv);
    listItem.appendChild(tagDiv);

    // Find the section corresponding to the genre
    const section = document.querySelector(
      `section[data-genre="${item.genre.toLowerCase()}"]`
    );

    // Append the list item to the section
    if (section) {
      const cardList = section.querySelector(".card");
      if (cardList) {
        cardList.appendChild(listItem);
      }
    }
  });
}

function makerequest() {
  fetch("http://localhost:3000/songs/allSongs")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Parse the JSON response
      return response.json();
    })
    .then(function (data) {
      renderElements(data);
    })
    .catch(function (error) {
      console.error("There was a problem with the fetch operation:", error);
    });
}

makerequest();

// click event to every card

function fetchmusic(singId){
  return fetch("http://localhost:3000/songs/"+singId)
        .then(response => response.blob()) // Convert response to blob
        .catch(error => {
          console.error('Error fetching audio:', error);
        });
}

function handleClick(event) {
  const list = event.target.closest("li");
  const singId = list.getAttribute("data-sing-id");
  const name = list.getAttribute("song-name");
  document.querySelector(".song_name").innerHTML = name

  fetchmusic(singId).then(blob=>{
    // console.log(blob)
    audio.src = URL.createObjectURL(blob);
    isPlaying = true;
    updatePlayPauseIcon();
    audio.play();
  }).catch(error =>{
    console.log(error)
  })
}


const cardList = document.querySelectorAll(".card");

cardList.forEach((element) => {
  element.addEventListener("click", handleClick);
});

// below code is for model

var modal = document.getElementById("mymodel");
var btn = document.getElementById("model_triger");

// for notification
var notify = new Notyf({
  duration: 2000,
  position: {
    x: "right",
    y: "top",
  },
});

if (sessionStorage.getItem("username")) {
  btn.innerText = sessionStorage.getItem("username");
  notify.success("Logged-in");
} else {
  btn.onclick = function () {
    modal.style.display = "block";
  };
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};


  const playPauseButton = document.querySelector(".play-pause");
  const progressBar = document.querySelector(".progress");
  const progressContainer = document.querySelector(".progress-bar");

  playPauseButton.addEventListener("click", function () {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    isPlaying = !isPlaying;
    updatePlayPauseIcon();
  });

  function updatePlayPauseIcon() {
    playPauseButton.classList.toggle("fa-pause", isPlaying);
    playPauseButton.classList.toggle("fa-play", !isPlaying);
  }

  audio.addEventListener("timeupdate", function () {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + "%";
  });

  progressContainer.addEventListener("click", function (event) {
    const offsetX = event.offsetX;
    const progressBar = progressContainer.clientWidth;
    const percentageClicked = offsetX / progressBar;
    const seekTime = percentageClicked * audio.duration;
    audio.currentTime = seekTime;
  });

  const volumeBar = document.querySelector(".volume-bar");
  const volumeProgressBar = volumeBar.querySelector(".progress-volume");

  volumeBar.addEventListener("click", function (event) {
    const offsetX = event.offsetX;
    const volumeWidth = volumeBar.clientWidth;
    const volume = offsetX / volumeWidth;
    audio.volume = volume;
    volumeProgressBar.style.width = volume * 100 + "%";
  });
