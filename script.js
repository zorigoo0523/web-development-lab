const body = document.body;
const header = document.querySelector(".header");
const navLinks = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");
const themeToggle = document.getElementById("themeToggle");
const typingText = document.getElementById("typingText");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const projectIdeaBtn = document.getElementById("projectIdeaBtn");
const year = document.getElementById("year");

/* =========================
   1. CURRENT YEAR
========================= */
if (year) {
    year.textContent = new Date().getFullYear();
}

/* =========================
   2. MOBILE MENU
========================= */
if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("open");

        const isOpen = navLinks.classList.contains("open");
        menuToggle.setAttribute("aria-expanded", isOpen);
    });

    const links = navLinks.querySelectorAll("a");

    links.forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

/* =========================
   3. HEADER ON SCROLL
========================= */
window.addEventListener("scroll", function () {
    if (header) {
        if (window.scrollY > 10) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }
});

/* =========================
   4. TYPING ANIMATION
========================= */
const roles = [
    "Web Developer",
    "Student",
    "Problem Solver",
    "Future Programmer"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeRole() {

    if (!typingText) {
        return;
    }

    const currentRole = roles[roleIndex];

    if (deleting) {
        typingText.textContent = currentRole.substring(0, charIndex);
        charIndex--;

    } else {
        typingText.textContent = currentRole.substring(0, charIndex);
        charIndex++;
    }

    let speed = deleting ? 50 : 100;

    /* Finished typing */
    if (!deleting && charIndex > currentRole.length) {
        deleting = true;
        speed = 1200;
    }

    /* Finished deleting */
    if (deleting && charIndex < 0) {
        deleting = false;
        roleIndex++;

        if (roleIndex >= roles.length) {
            roleIndex = 0;
        }

        charIndex = 0;
        speed = 400;
    }

    setTimeout(typeRole, speed);
}

typeRole();

/* =========================
   5. DARK / LIGHT MODE
========================= */
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    body.classList.add("light-theme");

    if (themeToggle) {
        themeToggle.textContent = "☾";
    }
}

if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        const lightMode = body.classList.toggle("light-theme");

        if (lightMode) {
            localStorage.setItem("portfolio-theme", "light");
            themeToggle.textContent = "☾";
        } else {
            localStorage.setItem("portfolio-theme", "dark");
            themeToggle.textContent = "☼";
        }

    });

}

/* =========================
   6. SCROLL REVEAL ANIMATION
========================= */

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(function (element) {
    observer.observe(element);
});

/* =========================
   7. CONTACT FORM
========================= */

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const nameInput = document.getElementById("name");
        const messageInput = document.getElementById("message");

        const name = nameInput.value.trim();
        const message = messageInput.value.trim();

        if (name === "" || message === "") {

            formStatus.textContent =
                "Нэр болон мессежээ бөглөнө үү.";

            formStatus.style.color = "#fbbf24";

            return;
        }

        formStatus.textContent =
            "Баярлалаа, " + name + "! Мессеж амжилттай илгээгдлээ.";

        formStatus.style.color = "var(--success)";

        contactForm.reset();

    });

}

/* =========================
   8. PROJECT IDEA BUTTON
========================= */

if (projectIdeaBtn) {

    projectIdeaBtn.addEventListener("click", function () {

        alert(
            "Project санаа:\n\n" +
            "To-Do App\n" +
            "• Dark / Light mode\n" +
            "• LocalStorage\n" +
            "• Search\n" +
            "• Filter\n" +
            "• Task counter"
        );

    });

}
