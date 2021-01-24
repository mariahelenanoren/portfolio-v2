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
    const navToggle = document.querySelector(".nav-toggle")
    //const expandableContainer = document.querySelectorAll(".expandable-container")

    navToggle.addEventListener("click", (event) => toggleHamburgerMenu(event))
    window.addEventListener("resize", (event) => toggleHamburgerMenu(event))
    window.addEventListener("scroll", declareLoadAnimationElements)

    /* for (let i = 0; i < expandableContainer.length; i++) {
        let index = i;
        expandableContainer[i].addEventListener("click", () => toggleExpandableDiv(index))
    } */

    for (let i = 0; i < filterButtons.length; i++) {
        filterButtons[i].addEventListener("click", () => filterPortfolio(filterButtons[i], filterButtons))
        filterButtons[i].addEventListener("click", declareLoadAnimationElements)
    }
}

function createColcade() {
    // selector string as first argument
    const portfolio = document.querySelector(".portfolio-container")
    if (portfolio) {
        var colc = new Colcade( '.portfolio-container', {
            columns: '.grid-col',
            items: '.project-container'
        });
    }
}

/** Toggles the hamburger menu */
function toggleHamburgerMenu(event) {
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
    const projects = document.querySelectorAll(".project-container")
    
    if (projects) {
        for (let i = 0; i < projects.length; i++) {
            initiateLoadAnimation(projects[i])
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
        element.style.opacity = "100";
        element.style.margin = "0 0 4rem 0";
    }
}

/**
 * Changes the style of filter buttons and filters projects
 * @param {Element} allButtons 
 * @param {Element} targetButton 
 */
function filterPortfolio(targetButton, allButtons) {
    const projects =  document.querySelectorAll(".project-container")

    /** Changes style of filterbuttons */
    for (button of allButtons) {
        if (button.classList.contains("active")) {
            button.classList.remove("active")
        }
    }

    targetButton.classList.add("active")

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