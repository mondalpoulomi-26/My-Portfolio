/* =========================================================
   POULOMI MONDAL — PORTFOLIO
   script.js
   ========================================================= */


/* =========================
   CURRENT YEAR
   ========================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================
   MOBILE MENU
   ========================= */

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

        const icon = menuButton.querySelector("i");

        if (mobileMenu.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    // Close mobile menu after clicking a link

    const mobileLinks =
        mobileMenu.querySelectorAll("a");

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

            const icon =
                menuButton.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });


    // Close menu when clicking outside

    document.addEventListener("click", event => {

        const clickedInsideMenu =
            mobileMenu.contains(event.target);

        const clickedButton =
            menuButton.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedButton &&
            mobileMenu.classList.contains("active")
        ) {

            mobileMenu.classList.remove("active");

            const icon =
                menuButton.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

}


/* =========================
   SMOOTH SCROLL
   ========================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const targetId =
            this.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        const navbarHeight = 95;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});


/* =========================
   NAVBAR SCROLL EFFECT
   ========================= */

const navbar =
    document.querySelector(".navbar");


function updateNavbar() {

    if (!navbar) {
        return;
    }

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateNavbar
);

updateNavbar();


/* =========================
   ACTIVE NAVIGATION LINK
   ========================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-links a");


function updateActiveLink() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 160;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (
            href === `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveLink
);

updateActiveLink();


/* =========================
   TYPING EFFECT
   ========================= */

const typingElement =
    document.querySelector(".hero h2 span");


if (typingElement) {

    const roles = [
        "Full-Stack Developer",
        "Problem Solver",
        "Software Developer"
    ];

    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;


    function typeRole() {

        const currentRole =
            roles[roleIndex];


        if (!deleting) {

            typingElement.textContent =
                currentRole.substring(
                    0,
                    characterIndex + 1
                );

            characterIndex++;


            if (
                characterIndex ===
                currentRole.length
            ) {

                deleting = true;

                setTimeout(
                    typeRole,
                    1800
                );

                return;

            }

        } else {

            typingElement.textContent =
                currentRole.substring(
                    0,
                    characterIndex - 1
                );

            characterIndex--;


            if (characterIndex === 0) {

                deleting = false;

                roleIndex =
                    (roleIndex + 1) %
                    roles.length;

            }

        }


        const speed =
            deleting ? 55 : 90;

        setTimeout(
            typeRole,
            speed
        );

    }


    typeRole();

}


/* =========================
   SCROLL REVEAL
   ========================= */

const revealElements =
    document.querySelectorAll(
        ".section-heading, " +
        ".about-text, " +
        ".about-details, " +
        ".skill-card, " +
        ".project-card, " +
        ".timeline-item, " +
        ".profile-card, " +
        ".contact-container"
    );


revealElements.forEach(element => {

    element.classList.add("reveal");

});


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================
   PROJECT CARD TILT
   ========================= */

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


projectCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            // Disable on mobile

            if (window.innerWidth < 768) {
                return;
            }


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) /
                    centerY) * -2;


            const rotateY =
                ((x - centerX) /
                    centerX) * 2;


            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

});


/* =========================
   EMAIL COPY
   ========================= */

const contactInfo =
    document.querySelector(".contact-info");


if (contactInfo) {

    const emailSpan =
        contactInfo.querySelector(
            "span:first-child"
        );


    if (emailSpan) {

        emailSpan.style.cursor =
            "pointer";

        emailSpan.title =
            "Click to copy email";


        emailSpan.addEventListener(
            "click",
            async () => {

                const email =
                    "pm2737@it.jgec.ac.in";


                try {

                    await navigator
                        .clipboard
                        .writeText(email);


                    const oldContent =
                        emailSpan.innerHTML;


                    emailSpan.innerHTML =
                        `<i class="fa-solid fa-check"></i>
                         Email copied!`;


                    setTimeout(() => {

                        emailSpan.innerHTML =
                            oldContent;

                    }, 1500);


                } catch (error) {

                    window.location.href =
                        `mailto:${email}`;

                }

            }
        );

    }

}


/* =========================
   BUTTON RIPPLE EFFECT
   ========================= */

const buttons =
    document.querySelectorAll(".btn");


buttons.forEach(button => {

    button.addEventListener(
        "click",
        function (event) {

            const ripple =
                document.createElement("span");


            const rect =
                button.getBoundingClientRect();


            const size =
                Math.max(
                    rect.width,
                    rect.height
                );


            const x =
                event.clientX -
                rect.left -
                size / 2;


            const y =
                event.clientY -
                rect.top -
                size / 2;


            ripple.style.width =
                `${size}px`;

            ripple.style.height =
                `${size}px`;

            ripple.style.left =
                `${x}px`;

            ripple.style.top =
                `${y}px`;

            ripple.classList.add("ripple");


            button.appendChild(ripple);


            setTimeout(() => {

                ripple.remove();

            }, 600);

        }
    );

});


/* =========================
   ESCAPE KEY
   ========================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            mobileMenu &&
            mobileMenu.classList.contains("active")
        ) {

            mobileMenu.classList.remove(
                "active"
            );


            if (menuButton) {

                const icon =
                    menuButton.querySelector("i");

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        }

    }
);


/* =========================
   CONSOLE MESSAGE
   ========================= */

console.log(
    "%cHello! 👋",
    "font-size: 20px; font-weight: bold;"
);

console.log(
    "%cWelcome to Poulomi's portfolio.",
    "font-size: 14px;"
);