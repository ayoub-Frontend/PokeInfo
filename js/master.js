// Check if There's local storage color option
let mainColor = localStorage.getItem("color_option")

if (mainColor !== null) {
    document.documentElement.style.setProperty("--main-color", mainColor)
    // Remove Active Class From All Color list items
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active")

        // Add Active Class On Element With data-color === Local Storage Item
        if (element.dataset.color === mainColor) {
            element.classList.add("active")
        }
    })
}

// Random Background Option
let backgroundOption = true
// Variable To Control The Backgound Interval
let backgroundInterval;

// Check if there's LocalStorage random background item
let backgroundLocalItem = localStorage.getItem("background_option")

let imageChosen = localStorage.getItem("image_chosen")

// Check if random background localStorage is not empty
if (backgroundLocalItem !== null && imageChosen !== null) {
    if (backgroundLocalItem === "true") {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }

    // Check the Random Background Image 


    // Remove Class Active From All Spans
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active")
    })

    document.querySelectorAll(".image-choice img").forEach(element => {
        element.classList.remove("active")
    })

    if (backgroundLocalItem === "true") {
        document.querySelector(".random-backgrounds .yes").classList.add("active")

    } else {
        document.querySelector(".random-backgrounds .no").classList.add("active")

        document.querySelectorAll(".image-choice img").forEach(element => {
        element.classList.add("active")
    })
    }
    // Remove Class Active From All images
} 

// Display Settings Menu
// Mine
let settingsBox = document.querySelector(".settings-box")
let settingsIcon = document.querySelector(".settings-icon")
function open_menu() {
    settingsIcon.classList.toggle("fa-spin");
    settingsBox.classList.toggle("active");
}

// Switch Colors 
const colorsLi = document.querySelectorAll(".colors-list li")
// Loop on all list items
colorsLi.forEach(li => {
    // Click on all list items
    li.addEventListener("click", (e) => {
        // Set Color on Root
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color)
        // Set color on local Storage
        localStorage.setItem("color_option", e.target.dataset.color);    
        handleActiveState(e)
    });
});

// Switch random Backgrounds Option
const radnomBackEl = document.querySelectorAll(".random-backgrounds span")
// Loop on all Spans
radnomBackEl.forEach(span => {
    // Click on all Span
    span.addEventListener("click", (e) => {
        handleActiveState(e)

        if (e.target.dataset.background === "yes") {
            backgroundOption = true;
            randomizeImages();

            localStorage.setItem("background_option", true)
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);

            localStorage.setItem("background_option", false)
        }
    });
});

// Chose Special Background Image
const imageChoice = document.querySelectorAll(".image-choice ul li img")
// Function To Add Active Class To All Images When No Option
function choose_image() {
    imageChoice.forEach(image => {
        if (image.classList !== ("active")) {
            image.classList.add("active")
            image.addEventListener("click", (e) => {
                landingPage.style.backgroundImage = 'url("imgs/' + e.target.dataset.img + '")'
                localStorage.setItem("image_chosen", e.target.dataset)
        })     
    }
})
}
// Function To Remove Active Class From All Images When Yes Option
function random_image() {
    imageChoice.forEach(image => {
        if (image.classList !== ("active")) {
            image.classList.remove("active")
        }
    })
}

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// get Array of Images
let imgsArray = ["background-1.webp","background-2.webp","background-3.webp","background-4.webp","background-5.webp","background-6.webp"]

// Function To Randomize Images
function randomizeImages() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
        // Get random number  
        let randomNumber = Math.floor(Math.random() * imgsArray.length);

        // Change Background Image Url
        landingPage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] +' ")'
    }, 3000)
    }
}

randomizeImages()


// Select Skills Selector
let ourSkills = document.querySelector(".skills")

window.onscroll = function() {
    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

    let observer = new IntersectionObserver((entires) => {
        entires.forEach((entry) => {
            if (entry.isIntersecting) {
                allSkills.forEach(skill => {
                    skill.style.width = skill.dataset.progress
                })

                observer.unobserve(entry.target);
            }
        })
    })

    if (ourSkills) {
        observer.observe(ourSkills)
    }
}


// Create Popup With the Image 
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
    img.addEventListener("click" , (e) => {
        // Create Overlay Element
        let overlay = document.createElement("div");

        // Add Class To Overlay
        overlay.className = "popup-overlay"

        // Appenb Overlay To the Body
        document.body.appendChild(overlay)

        // Create The Popup Box
        let popupBox = document.createElement("div")

        // Add Class To the Popup Box 
        popupBox.className = "popup-box"

        // Check if There Are Alternate Texts In The Images
        if (img.alt !== null) {
            // Create Heading
            let imgHeading = document.createElement("h3");

            // Create Text For Heading
            let imgText = document.createTextNode(img.alt);

            // Append the Text to the Heading
            imgHeading.appendChild(imgText);

            // Append The Heading to the Popup Box
            popupBox.appendChild(imgHeading);
        }

        // Create The Image
        let popupImage = document.createElement("img")

        // Set Image Source
        popupImage.src = img.src;

        // Add Image To Popup Box
        popupBox.appendChild(popupImage)

        // Append The Popup Box To The Body
        document.body.appendChild(popupBox)

        // Create The Close Span
        let closeButton = document.createElement("span");

        // Create The Close Button Text
        let closeButtonText = document.createTextNode("X");

        // Append Text To The Close Button
        closeButton.appendChild(closeButtonText);

        // Add Class To Close Button
        closeButton.className = "close-button";

        // Add Close Button To The Popup Box
        popupBox.appendChild(closeButton);
    })
})

// Close Pupup Inside it
document.addEventListener("click", function (e) {
    if (e.target.className == "close-button") {
        // Remove The Current Pupup
        e.target.parentNode.remove()

        // Remove Overlay
        document.querySelector(".popup-overlay").remove()
    }
})
// Close Pupup OutSide it
document.addEventListener("click", function (e) {
    if (e.target.className == "popup-overlay") {
        document.querySelector(".popup-box").remove()

        // Remove Overlay
        document.querySelector(".popup-overlay").remove()
    }
})


// Select All bullets
const allBullets = document.querySelectorAll(".nav-bulltes .bullet")
// Select All Links
const allLinks =document.querySelectorAll(".links a")

function scroolToSections(element) {
    element.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault()
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
}
scroolToSections(allBullets)
scroolToSections(allLinks)

// Handle Active State
function handleActiveState(event) {
    // Remove Class Active From All Cheldrens
    event.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active")
    })
    // Add Class Active on self
    event.target.classList.add("active")
}

let bulletSpan = document.querySelectorAll(".bullets-option span")
let bulletsContainer = document.querySelector(".nav-bulltes")

let bulletsLocalItem = localStorage.getItem("bullets_option")
if (bulletsLocalItem !== null) {
    bulletSpan.forEach(span => {
        span.classList.remove("active")
    })

    if (bulletsLocalItem === "block") {
        bulletsContainer.style.opacity = "1"

        document.querySelector(".bullets-option .yes").classList.add("active")
    } else {
        bulletsContainer.style.opacity = "0"
        document.querySelector(".bullets-option .no").classList.add("active")
    }
}

bulletSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === "show") {
            bulletsContainer.style.opacity = "1"
            bulletsContainer.style.pointerEvents = "visible"
            localStorage.setItem("bullets_option", "block")
        } else {
            bulletsContainer.style.opacity = "0"
            bulletsContainer.style.pointerEvents = "none";
            localStorage.setItem("bullets_option", "none")
        }

        handleActiveState(e)
    })
})

// Reset Button
document.querySelector(".reset-option").onclick = function () {
    // localStorage.clear()

    localStorage.removeItem("color_option")
    localStorage.removeItem("background_option")
    localStorage.removeItem("bullets_option")

    // Reload Window
    window.location.reload();
}

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function(e) {
    // Stop Propagation
    e.stopPropagation()
    // Toggle Class 'menu-active; On Button
    this.classList.toggle("menu-active")
    // Toggle Class 'open' On Links
    tLinks.classList.toggle("open")
}
tLinks.addEventListener("click", (e) => {
    e.stopPropagation()
})

document.onclick = function(e) {
    if (e.target !== toggleBtn && e.target !== tLinks) {
        // Check if Menu is open
        if (tLinks.classList.contains("open")) {
            // Toggle Class 'menu-active; On Button
            toggleBtn.classList.toggle("menu-active")
            // Toggle Class 'open' On Links
            tLinks.classList.toggle("open")
        }
    }
}