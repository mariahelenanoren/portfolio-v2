let hamburgerMenuIsOpen = false;
let expandlableDivIsOpen = false;

window.onload = main;

function main() {
    createColcade();
    addEventListeners();
    declareLoadAnimationElements();
}

function addEventListeners() {
    const filterButtons = document.querySelectorAll(".filter-buttons button")
    const navToggle = document.querySelector("#nav-toggle")
    const expandableContainer = document.querySelectorAll(".expandable-container")
    const submitButton = document.querySelector("#submit-button")

    navToggle.addEventListener("click", (event) => toggleMobileMenu(event))
    window.addEventListener("resize", (event) => toggleMobileMenu(event))
    window.addEventListener("scroll", declareLoadAnimationElements)
    
    if (submitButton) {
        submitButton.addEventListener("click", (event, submitButton) => validateContactForm(event, submitButton))
    }

    for (let i = 0; i < expandableContainer.length; i++) {
        let index = i;
        expandableContainer[i].addEventListener("click", () => toggleExpandableDiv(index))
    }

    for (let i = 0; i < filterButtons.length; i++) {
        filterButtons[i].addEventListener("click", () => filterPortfolio(filterButtons[i], filterButtons))
        filterButtons[i].addEventListener("click", declareLoadAnimationElements)
    }
}

/** Creates colcade for mansonry grid */
function createColcade() {
    const portfolio = document.querySelector(".portfolio-container")
    if (portfolio) {
        var colc = new Colcade( '.portfolio-container', {
            columns: '.grid-col',
            items: '.project-container'
        });
    }
}

/** Toggles the mobile menu */
function toggleMobileMenu(event) {
    const siteNav = document.querySelector(".site-nav")

    if (event.type === "resize" && hamburgerMenuIsOpen === true) {
        document.body.classList.remove("scroll-lock")
        siteNav.style.display = "none"
        animateHamburger()
        hamburgerMenuIsOpen = false;
    }

    if (event.type === "click") {
        if (hamburgerMenuIsOpen === false ) {
            document.body.classList.add("scroll-lock")
            siteNav.style.display = "flex"
            animateHamburger()
            hamburgerMenuIsOpen = true;
        } else {
            document.body.classList.remove("scroll-lock")
            siteNav.style.display = "none"
            animateHamburger()
            hamburgerMenuIsOpen = false; 
        }
    }
}

/** Animates the hamburger icon */
function animateHamburger() {
    const span = document.querySelectorAll(".nav-toggle span");

    if (hamburgerMenuIsOpen === false) {
        crossTheHamburger(span);
    }
    else {
        unCrossTheHamburger(span);
    }
}

/**
 * Crosses the span elements of the hamburger icon
 * @param {Element} span 
 */
function crossTheHamburger(span) {
    span[0].style.top = "9px"
    span[2].style.top = "9px"

    setTimeout( function() {
        span[1].style.display = "none";
        span[0].style.transform = "rotate(45deg)";
        span[2].style.transform = "rotate(-45deg)";
    }, 200);
}

/**
 * Uncrosses the span elements of the hamburger icon
 * @param {Element} navToggle 
 */
function unCrossTheHamburger(navToggle) {
    setTimeout( function() {
        navToggle[0].style.top = "0px"
        navToggle[2].style.top = "18px"
        navToggle[1].style.display = "unset"
    }, 200);

    navToggle[0].style.transform = "rotate(0deg)";
    navToggle[2].style.transform = "rotate(0deg)";
}

/** Declares which elements should be animated */
function declareLoadAnimationElements() {
    const projectPreviews = document.querySelectorAll(".project-container")
    const projectImages = document.querySelectorAll(".project-image")
    const colImages = document.querySelectorAll(".col img")

    if (colImages) {
        for (let i = 0; i < colImages.length; i++) {
            initiateLoadAnimation(colImages[i])
        }
    }

    if (projectImages) {
        for (let i = 0; i < projectImages.length; i++) {
            initiateLoadAnimation(projectImages[i])
        }
    }

    if (projectPreviews) {
        for (let i = 0; i < projectPreviews.length; i++) {
            initiateLoadAnimation(projectPreviews[i])
        }
    }
}

/**
 * Initiates load animation
 * @param {Element} element 
 */
function initiateLoadAnimation(element) {
    const viewportHeight = window.innerHeight;
    /** If top of element is  above bottom of page, change element style */
    if (element.getBoundingClientRect().top <= viewportHeight) {
        element.classList.add("load-animation");
    }
}

/**
 * Changes the style of filter buttons and filters projects
 * @param {Element} allButtons 
 * @param {Element} targetButton 
 */
function filterPortfolio(targetButton, allButtons) {
    console.log("hello")
    const projects =  document.querySelectorAll(".project-container")

    /* Changes style of filterbuttons */
    for (button of allButtons) {
        if (button.classList.contains("active")) {
            button.classList.remove("active")
        }
    }

    /* Changes style of the clicked button */
    targetButton.classList.add("active")

    /* Filters projects */
    for (project of projects) {
        if (targetButton.id !== "all") { 
            if (project.classList.contains(targetButton.id)) {
                project.style.display = "block";
            }
            else {
                project.style.display = "none";
            }
        } else {
            project.style.display = "block";
        }
    }
}

/**
 * Toggles expandable divs
 * @param {Number} index 
 */
function toggleExpandableDiv(index) {
    const expandableContent = document.querySelectorAll(".expandable-content")

    if (expandlableDivIsOpen === false) {
        expandlableDivIsOpen = true;
        expandableContent[index].classList.add("expandable-max-height")
        rotateArrow(index)
    } else {
        expandlableDivIsOpen = false;
        expandableContent[index].classList.remove("expandable-max-height")
        rotateArrow(index)
    }
}

/**
 * Rotates arrows in expandable divs
 * @param {Number} index 
 */
function rotateArrow(index) {
    const arrow = document.querySelectorAll(".expandable-container .expand-icon")
    if (expandlableDivIsOpen === false) {
        arrow[index].style.transform = "rotate(0deg)"
    } else if (expandlableDivIsOpen === true) {
        arrow[index].style.transform = "rotate(180deg)"
    }
}

/**
 * Validates the contact form
 * @param {Event} event 
 */
function validateContactForm(event) {
    const nameInput = document.querySelector("#name")
    const emailInput = document.querySelector("#email")
    const messageTextField = document.querySelector("#message")
    const gdprCheckbox = document.querySelector("#gdpr")
    const gdprContainer = document.querySelector(".gdpr-container")

    const textInputs = [nameInput, emailInput, messageTextField]

    if (!nameInput.value || !emailInput.value || !messageTextField.value || !gdprCheckbox.checked) {
        event.preventDefault()
        for (const input of textInputs) {
            if (!input.value) {
                input.classList.add("no-validation")
            } else {
                input.classList.remove("no-validation")
            }
        }
        if (!gdprCheckbox.checked) {
            gdprContainer.classList.add("no-validation")
        } else {
            gdprContainer.classList.remove("no-validation")
        }
    }
}