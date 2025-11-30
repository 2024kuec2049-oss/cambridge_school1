
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A" && navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}


const slides = document.querySelectorAll(".hero-slide");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  if (!slides.length) return;
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  if (!slides.length) return;
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

const nextBtn = document.querySelector(".hero-control.next");
const prevBtn = document.querySelector(".hero-control.prev");

if (nextBtn) nextBtn.addEventListener("click", nextSlide);
if (prevBtn) prevBtn.addEventListener("click", prevSlide);

if (slides.length) {
  setInterval(nextSlide, 7000);
}


const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealElements.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("visible"));
}


const lightbox = document.querySelector(".lightbox");
const lightboxImg = lightbox ? lightbox.querySelector("img") : null;
const lightboxClose = document.querySelector(".lightbox-close");
const galleryItems = document.querySelectorAll("[data-lightbox='campus']");

galleryItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    if (!lightbox || !lightboxImg) return;
    const largeSrc = item.getAttribute("href");
    const alt = item.querySelector("img")?.getAttribute("alt") || "Campus image";
    lightboxImg.src = largeSrc;
    lightboxImg.alt = alt;
    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  if (!lightbox) return;
  lightbox.style.display = "none";
  document.body.style.overflow = "";
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.style.display === "flex") {
      closeLightbox();
    }
  });
}


const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("q-name").value.trim();
    const email = document.getElementById("q-email").value.trim();
    const type = document.getElementById("q-type").value;
    const message = document.getElementById("q-message").value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    
    alert(`Thank you, ${name}! Your ${type} query has been submitted. We will get back to you soon.`);

    
    contactForm.reset();
  });
}
