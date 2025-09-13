
document.addEventListener("DOMContentLoaded", () => {
  initMenuResponsive();
  initScrollSpy();
  initFormValidation();
  initSmoothScroll();
});


function initMenuResponsive() {
  const header = document.querySelector("header");
  const nav = header.querySelector("nav ul");

 
  const burger = document.createElement("button");
  burger.innerHTML = "☰";
  burger.setAttribute("aria-label", "Abrir menú");
  burger.classList.add("burger-menu");

  header.insertBefore(burger, nav);

  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-open");
    burger.classList.toggle("open");
    burger.innerHTML = burger.classList.contains("open") ? "✖" : "☰";
  });
}


function initScrollSpy() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll("nav ul li a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}


function initFormValidation() {
  const form = document.querySelector("form");

  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = form.querySelector("#name");
    const email = form.querySelector("#email");
    const message = form.querySelector("#message");

    let isValid = true;
    clearErrors(form);

    if (name.value.trim().length < 2) {
      showError(name, "Por favor ingresa un nombre válido.");
      isValid = false;
    }

    if (!validateEmail(email.value)) {
      showError(email, "Por favor ingresa un correo válido.");
      isValid = false;
    }

    if (message.value.trim().length < 10) {
      showError(message, "El mensaje debe tener al menos 10 caracteres.");
      isValid = false;
    }

    if (isValid) {
      alert("✅ Gracias por tu mensaje. ¡Pronto te contactaremos!");
      form.reset();
    }
  });
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

function showError(input, message) {
  const error = document.createElement("small");
  error.style.color = "#a67b5b";
  error.style.fontSize = "0.9rem";
  error.textContent = message;
  input.insertAdjacentElement("afterend", error);
}

function clearErrors(form) {
  form.querySelectorAll("small").forEach(el => el.remove());
}


function initSmoothScroll() {
  const links = document.querySelectorAll("a[href^='#']");

  links.forEach(link => {
    link.addEventListener("click", e => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: "smooth",
        });
      }
    });
  });
}
