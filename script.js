const wrapper = document.querySelector(".wrapper-custom-slider");
const carouselJS = document.querySelector(".unique-carousel");
const arrowBtns = document.querySelectorAll(".wrapper-custom-slider i");
const firstCardWidth = carouselJS.querySelector(".cards-carousel").offsetWidth;
const carouselChildren = [...carouselJS.children];
let cards = document.querySelectorAll(".cards-carousel"); // Use querySelectorAll to get all cards
// Variables to track dragging state and position
let isDragging = false,
  startX,
  startScrollLeft,
  timeoutId;

let cardPerView = Math.round(carouselJS.offsetWidth / firstCardWidth);

carouselChildren
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carouselJS.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

carouselChildren.slice(0, cardPerView).forEach((card) => {
  carouselJS.insertAdjacentHTML("beforeend", card.outerHTML);
});

arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carouselJS.scrollLeft +=
      btn.id === "left" ? -firstCardWidth : firstCardWidth;
  });
});

// Function to handle the start of dragging
const dragStart = (e) => {
  isDragging = true;
  carouselJS.classList.add("dragging");
  startX = e.pageX || e.touches[0].pageX; // Get starting X position (mouse or touch)
  startScrollLeft = carouselJS.scrollLeft; // Store the initial scroll position of the carouselJS
};

// Function to handle the dragging movement
const dragging = (e) => {
  if (!isDragging) return; // If not dragging, do nothing
  e.preventDefault(); // Prevent default behavior like page scrolling (on touch devices)

  const x = e.pageX || e.touches[0].pageX; // Get current X position (mouse or touch)
  const scrollDistance = x - startX; // Calculate how much the user has dragged

  // Scroll the carouselJS based on how much the user has dragged
  carouselJS.scrollLeft = startScrollLeft - scrollDistance;
};

// Function to stop dragging
const dragStop = () => {
  isDragging = false; // Reset dragging state
  carouselJS.classList.remove("dragging"); // Remove 'dragging' class
};

const autoPlay = () => {
  if (window.innerWidth < 800) return;
  timeoutId = setTimeout(() => {
    carouselJS.scrollLeft += firstCardWidth;
  }, 3500); // The delay is now correctly set to 2500ms
};

autoPlay();
// Function to apply the hover effect (circle on hover) on each card
const applyHoverEffect = () => {
  let cards = document.querySelectorAll(".cards-carousel"); // Get all current cards, including newly added ones

  cards.forEach((card) => {
    card.addEventListener("mousemove", function (event) {
      let rect = card.getBoundingClientRect(); // Get the position of the card relative to the viewport
      let x = event.clientX - rect.left; // Calculate the x position inside the card
      let y = event.clientY - rect.top; // Calculate the y position inside the card

      // Set the CSS variables for the card
      card.style.setProperty("--x", `${x}px`);
      card.style.setProperty("--y", `${y}px`);
    });
  });
};

// Apply the hover effect initially on page load
applyHoverEffect();

const infiniteScroll = () => {
  if (carouselJS.scrollLeft === 0) {
    carouselJS.classList.add("no-transition");
    carouselJS.scrollLeft = carouselJS.scrollWidth - 2 * carouselJS.offsetWidth;
    carouselJS.classList.remove("no-transition");
  } else if (
    Math.ceil(carouselJS.scrollLeft) ===
    carouselJS.scrollWidth - carouselJS.offsetWidth
  ) {
    carouselJS.classList.add("no-transition");
    carouselJS.scrollLeft = carouselJS.offsetWidth;
    carouselJS.classList.remove("no-transition");
  }

  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) {
    setTimeout(autoPlay); // Small delay to prevent quick autoplay reset
  }
  applyHoverEffect();
};

// Add event listeners for mouse interactions
carouselJS.addEventListener("mousedown", dragStart);
carouselJS.addEventListener("mousemove", dragging);
carouselJS.addEventListener("mouseup", dragStop);
carouselJS.addEventListener("mouseleave", dragStop);
carouselJS.addEventListener("scroll", infiniteScroll);

wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

// Add event listeners for touch interactions (for mobile devices)
carouselJS.addEventListener("touchstart", dragStart);
carouselJS.addEventListener("touchmove", dragging);
carouselJS.addEventListener("touchend", dragStop);

// Box design circle
cards.forEach((card) => {
  card.addEventListener("mousemove", function (event) {
    let rect = card.getBoundingClientRect(); // Get the position of the card relative to the viewport
    let x = event.clientX - rect.left; // Calculate the x position inside the card
    let y = event.clientY - rect.top; // Calculate the y position inside the card

    // Set the CSS variables for the card
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  });
});
