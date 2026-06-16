const ORLUNE_CONTACT = {
  email: "digitalorlune@gmail.com",
  whatsapp: "918248738100",
  whatsappDisplay: "+91 8248738100"
};

const STORAGE_KEY = "orlune_inquiries";

function getInquiries() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveInquiries(inquiries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries));
}

function initRevealAnimations() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((item) => observer.observe(item));
}

function showMessage(elementId, text, isError) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = text;
  el.classList.remove("hidden", "error");
  if (isError) el.classList.add("error");
}

function hideMessage(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.classList.add("hidden");
  el.classList.remove("error");
}

function handleContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    hideMessage("contactMessage");

    const inquiry = {
      id: "inq-" + Date.now(),
      name: document.getElementById("contactName").value.trim(),
      email: document.getElementById("contactEmail").value.trim(),
      phone: document.getElementById("contactPhone").value.trim(),
      service: document.getElementById("contactService").value,
      message: document.getElementById("contactMessageInput").value.trim(),
      submittedAt: new Date().toISOString()
    };

    const inquiries = getInquiries();
    inquiries.unshift(inquiry);
    saveInquiries(inquiries);

    showMessage(
      "contactMessage",
      "Thank you! Your message has been received. We will get back to you within 24 hours."
    );
    form.reset();
  });
}

function setContactLinks() {
  document.querySelectorAll("[data-orlune-email]").forEach((el) => {
    el.href = "mailto:" + ORLUNE_CONTACT.email;
    if (el.hasAttribute("data-orlune-email-text")) {
      el.textContent = ORLUNE_CONTACT.email;
    }
  });

  document.querySelectorAll("[data-orlune-whatsapp]").forEach((el) => {
    el.href = "https://wa.me/" + ORLUNE_CONTACT.whatsapp;
    if (el.hasAttribute("data-orlune-whatsapp-text")) {
      el.textContent = ORLUNE_CONTACT.whatsappDisplay;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initRevealAnimations();
  handleContactForm();
  setContactLinks();
});
