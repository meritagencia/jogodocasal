const countdownNodes = document.querySelectorAll("[data-countdown], .timer");
let secondsLeft = 15 * 60; // 15 minutes countdown

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function updateCountdown() {
  countdownNodes.forEach((node) => {
    node.textContent = formatTime(secondsLeft);
  });

  secondsLeft = secondsLeft > 0 ? secondsLeft - 1 : 15 * 60;
}

updateCountdown();
setInterval(updateCountdown, 1000);

document.querySelectorAll(".faq details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;

    document.querySelectorAll(".faq details").forEach((otherDetail) => {
      if (otherDetail !== detail) {
        otherDetail.removeAttribute("open");
      }
    });
  });
});

const tickerTrack = document.querySelector(".ticker__track");
if (tickerTrack) {
  // Duplicate ticker for seamless infinite scroll
  tickerTrack.innerHTML += tickerTrack.innerHTML;
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId && targetId !== "#") {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
  });
});

// Age restriction gate / unlock preview
const unlockGalleryBtn = document.getElementById("unlock-gallery-btn");
const galleryGate = document.getElementById("gallery-gate");
const bookGallery = document.getElementById("book-gallery");

if (unlockGalleryBtn && galleryGate && bookGallery) {
  unlockGalleryBtn.addEventListener("click", () => {
    galleryGate.classList.add("is-unlocked");
    bookGallery.classList.remove("is-blurred");
  });
}

// Track InitiateCheckout on checkout buttons click
document.querySelectorAll('a[href*="pay.wiapy.com"]').forEach((button) => {
  button.addEventListener("click", () => {
    if (typeof fbq === "function") {
      fbq("track", "InitiateCheckout", {
        content_name: "O Jogo do Casal",
        value: 17.90,
        currency: "BRL"
      });
    }
  });
});
