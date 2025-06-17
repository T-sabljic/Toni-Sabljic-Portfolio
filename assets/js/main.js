

// CLOCK

let second = 0;
let minute = 0;
let hour = 0;
let currentTime = new Date();

setInterval(
    function() {
        currentTime = new Date();
        second = currentTime.getSeconds() * 6;
        minute = currentTime.getMinutes() * 6;
        hour = currentTime.getHours() * 30 + Math.round(minute / 12);
        document.getElementById("second__hand").style.transform = "rotate(" + second + "deg)";
        document.getElementById("minute__hand").style.transform = "rotate(" + minute + "deg)";
        document.getElementById("hour__hand").style.transform = "rotate(" + hour + "deg)";
    }, 1000
)

// WEATHER

let city = "";
const apiKey = "eac2cd56e1e6ad036beb890f9843b518";

let weatherImg = document.createElement('img');
let weatherIcon = document.querySelector(".nav__weatherIcon");

const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`;


async function fetchWeather(weatherApi) {
  try {
    const response = await fetch(weatherApi);
    const data = await response.json();

    const weatherToday = data.weather[0].main;
    console.log(weatherToday);

    if (weatherToday === "Clouds") {
      weatherImg.setAttribute('src', './assets/img/cloudly_icon.svg');
      weatherIcon.append(weatherImg);
    } 
    if (weatherToday === "Rain") {
      weatherImg.setAttribute('src', './assets/img/rainy_icon.svg');
      weatherIcon.append(weatherImg);
    }
    if (weatherToday === "Snow") {
      weatherImg.setAttribute('src', './assets/img/snow_icon.svg');
      weatherIcon.append(weatherImg);
    }
    if (weatherToday === "Clear") {
      weatherImg.setAttribute('src', './assets/img/sun__icon.svg');
      weatherIcon.append(weatherImg);
    }

    let temparature = Math.round(data.main.temp);
    document.querySelector(".nav__temp").innerText = temparature;

  } catch (error) {
    console.error("Greška kod dohvaćanja vremena:", error);
  }
}

fetchWeather(weatherApi);


// TYPING TEXT

  const frontendText =  "Hi, I'm Toni Sabljic — a passionate frontend developer who transforms ideas into sleek, interactive web experiences.";
  let i = 0;

  const typingText = () => {

    if(i < frontendText.length) {
        document.querySelector(".header__contentTextAbout").innerHTML += frontendText.charAt(i);
        i++;
        setTimeout(typingText,70);


    }
  };

  typingText();


  // SKILLS PRCENT

let skillsSection = document.querySelector(".skills");
let skillsPrcents = document.querySelectorAll(".skills__prcent");

// Funkcija koja vraća baznu širinu ovisno o širini prozora
function getBaseWidth() {
  if (window.innerWidth <= 576) {
    return 300;
  } else if (window.innerWidth <= 768) {
    return 400;
  } else if (window.innerWidth <= 992) {
    return 500;
  } else {
    return 800;
  }
}

for (const skillPrcent of skillsPrcents) {
  let intervalStarted = false;
  let interval;
  let percentText;

  // Funkcija koja pokreće animaciju širine
  function startAnimation() {
    clearInterval(interval); // zaustavi staru animaciju ako postoji
    skillPrcent.style.width = "0px"; // reset širine
    if (percentText) percentText.remove(); // ukloni stari tekst ako postoji

    let currentWidth = 0;
    let baseWidth = getBaseWidth();
    let maxWidth = baseWidth * parseFloat(skillPrcent.dataset.max);

    let skillsNumber = parseFloat(skillPrcent.dataset.max) * 100;
    percentText = document.createElement("p");
    percentText.innerText = `${Math.round(skillsNumber)}%`;

    interval = setInterval(() => {
      if (currentWidth >= maxWidth) {
        clearInterval(interval);
        skillPrcent.appendChild(percentText);
      } else {
        currentWidth += 4;
        skillPrcent.style.width = currentWidth + "px";
      }
    }, 25);
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !intervalStarted) {
        intervalStarted = true;
        startAnimation(); // pokreni animaciju kad element uđe u viewport
      }
    });
  }, {
    threshold: 0.2
  });

  observer.observe(skillsSection);

  // Ponovno pokretanje animacije prilikom resize-a ako je već startana
  window.addEventListener("resize", () => {
    if (intervalStarted) {
      startAnimation();
    }
  });
}




  // NAV SECTION CHANGE OPACITY

  let nav = document.querySelector(".nav");
  let navContent = document.querySelector(".nav__content");
  
  window.addEventListener("scroll", () => {
    let rectNav = nav.getBoundingClientRect().bottom;

    if(rectNav <= -200) {
      navContent.style.background = "rgba(0,0,0,1)";
      navContent.style.backgroundColor = "#111723";
      navContent.classList.add("nav-underline");

    } else{
      navContent.style.background = "rgba(0,0,0,0.5)";
      navContent.classList.remove("nav-underline");
    }
  });

  // NAV CONTENT MOUS OVER 

  let listItems = document.querySelectorAll(".nav__listItems");

  navContent.addEventListener("mouseover", () => {

    for(listItem of listItems){
      listItem.style.border = "1px solid white";
    }

    if(nav.getBoundingClientRect().bottom <= -200) {
      navContent.style.background = "rgba(17, 23, 35, 1)";
    } else{
      navContent.style.background = "rgba(0, 0, 0, 0.7)";
    }
   
  });

  navContent.addEventListener("mouseout", () => {

    for(listItem of listItems){
      listItem.style.border = "1px solid black";
    }

    if(nav.getBoundingClientRect().bottom <= -200) {
      navContent.style.background = "rgba(17, 23, 35, 1)";
    } else{
      navContent.style.background = "rgba(0, 0 ,0, 0.5)";
    }
  });


  // SHOW MODAL FORM AND VALID MODAL FORM

  const modal = document.querySelector(".modal");
  const callBtn = document.querySelector(".header__contentBtn");
  const closeBtn = document.querySelector(".modal__closeBtn");
  
  callBtn.addEventListener("click", () => {
    modal.classList.toggle('active');
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove('active');
  });

  // GET USERS LOKATION 

  async function getUserCity() {
    if ("geolocation" in navigator) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
  
            try {
              const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
              const data = await response.json();
              const address = data.address;
              const city = address.city || address.town || address.village || address.hamlet || "Nepoznato mjesto";
              resolve(city);
            } 
            catch (error) {
              reject("Error retrieving city.");
            }
          },
          (error) => {
            reject("geolocation is not allowed");
          }
        );
      });
    } else {
      throw new Error("Geolokacija nije podržana");
    }
  }

  getUserCity()
  .then(city => {
    document.querySelector(".nav__weatherCity").textContent = city;
    const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`;
    
    fetchWeather(weatherApi);
  })
  .catch(err => {
    console.warn(err);
    const defaultCity = "Chur";
    document.querySelector(".nav__weatherCity").textContent = defaultCity;
    const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${apiKey}&units=metric&lang=en`;
    fetchWeather(weatherApi);
  });


  // VALID CONTACT FORM


  const form = document.querySelector('.contact__form');

  form.addEventListener('submit', function(event) {
  const name = form.elements['name'].value.trim();
  const email = form.elements['email'].value.trim();
  const message = form.elements['message'].value.trim();

  // Check if the name contains at least one letter
  const nameIsValid = /[a-zA-Z]/.test(name);

  if (!name || !nameIsValid) {
    alert("Please enter a valid name containing letters.");
    event.preventDefault();  // Stop the form from being submitted if validation fails
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
  alert("Please enter a valid email.");
  event.preventDefault();
  return;
  }

  if (!message) {
    alert("Please enter a message.");
    event.preventDefault();
    return;
  }
});


//  SHOW MOBILE MENU 

const hamburgerIcon = document.querySelector(".nav__hamburger");
const navList = document.querySelector(".nav__list");

hamburgerIcon.addEventListener("click", () => {
    navList.classList.toggle("activeHamburger");
});

navList.addEventListener("click", ()=> {
  navList.classList.remove("activeHamburger");
});