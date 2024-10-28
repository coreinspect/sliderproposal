const carouselItems = [
  { imgSrc: "img/adams-homes.png", alt: "Adams Home", title: "Adams Home" },
  {
    imgSrc: "img/arthur-ruthenberg.png",
    alt: "Arthur Ruthenberg",
    title: "Arthur Ruthenberg",
  },
  {
    imgSrc: "img/cardel-homes.png",
    alt: "Cardel Homes",
    title: "Cardel Homes",
  },
  {
    imgSrc: "img/casa-fresca-homes.png",
    alt: "Casa Fresca Homes",
    title: "Casa Fresca Homes",
  },
  {
    imgSrc: "img/david-weekley-homes.png",
    alt: "David Weekley Homes",
    title: "David Weekley Homes",
  },
  {
    imgSrc: "img/dream-finders-home.png",
    alt: "Dream Finders Home",
    title: "Dream Finders Home",
  },
  {
    imgSrc: "img/homes-by-towne.png",
    alt: "Dr Horton",
    title: "Dr Horton",
  },
  {
    imgSrc: "img/homes-by-towne.png",
    alt: "Homes by Towne",
    title: "Homes by Towne",
  },
  {
    imgSrc: "img/homes-by-towne.png",
    alt: "Homes by Westbay",
    title: "Homes by Westbay",
  },
  {
    imgSrc: "img/homes-by-towne.png",
    alt: "John Cannon Homes",
    title: "John Cannon Homes",
  },
  {
    imgSrc: "img/homes-by-towne.png",
    alt: "KB Home",
    title: "KB Home",
  },
  {
    imgSrc: "img/homes-by-towne.png",
    alt: "Kolter Homes",
    title: "Kolter Homes",
  },
  {
    imgSrc: "img/homes-by-towne.png",
    alt: "Lee Wetherington",
    title: "Lee Wetherington",
  },
  {
    imgSrc: "img/homes-by-towne.png",
    alt: "Lennar",
    title: "Lennar",
  },
  {
    imgSrc: "img/homes-by-towne.png",
    alt: "Mattamy Homes",
    title: "Mattamy Homes",
  },
  {
    imgSrc: "img/homes-by-towne.png",
    alt: "Medallion Home",
    title: "Medallion Home",
  },
  {
    imgSrc: "img/homes-by-towne.png",
    alt: "Meritage Homes",
    title: "Meritage Homes",
  },
  {
    imgSrc: "img/homes-by-towne.png",
    alt: "MI Homes",
    title: "MI Homes",
  },
  {
    imgSrc: "img/homes-by-towne.png",
    alt: "Neal Communities",
    title: "Neal Communities",
  },
  {
    imgSrc: "img/homes-by-towne.png",
    alt: "Pulte Homes",
    title: "Pulte Homes",
  },
  {
    imgSrc: "img/homes-by-towne.png",
    alt: "Ryan Homes",
    title: "Ryan Homes",
  },
  {
    imgSrc: "img/homes-by-towne.png",
    alt: "Taylor Morrison",
    title: "Taylor Morrison",
  },
  {
    imgSrc: "img/homes-by-towne.png",
    alt: "Toll Brothers",
    title: "Toll Brothers",
  },
];

// Get the carousel container
const carouselContainer = document.getElementById("carouselContainer");

// Generate the carousel items
carouselItems.forEach((item) => {
  const listItem = document.createElement("li");
  listItem.classList.add("cards-carousel");

  listItem.innerHTML = `
    <div class="img">
      <img src="${item.imgSrc}" draggable="false" alt="${item.alt}" />
    </div>
    <h2>${item.title}</h2>
    <div class="links btn">
      <a href="#">View Listings</a>
    </div>
  `;

  carouselContainer.appendChild(listItem);
});

const wrapper = document.querySelector(".wrapper-custom-slider");
const carouselJS = document.querySelector(".unique-carousel");
const arrowBtns = document.querySelectorAll(".wrapper-custom-slider i");
const firstCardWidth = carouselJS.querySelector(".cards-carousel").offsetWidth;
const carouselChildren = [...carouselJS.children];
let cards = document.querySelectorAll(".cards-carousel"); // Use querySelectorAll to get all cards

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
  if (!isDragging) return;
  e.preventDefault();

  const x = e.pageX || e.touches[0].pageX;
  const scrollDistance = x - startX;

  carouselJS.scrollLeft = startScrollLeft - scrollDistance;
};

// Function to stop dragging
const dragStop = () => {
  isDragging = false;
  carouselJS.classList.remove("dragging");
};

const autoPlay = () => {
  if (window.innerWidth < 800) return;
  timeoutId = setTimeout(() => {
    carouselJS.scrollLeft += firstCardWidth;
  }, 3500);
};

autoPlay();

// Function to apply the hover effect (circle on hover) on each card
const applyHoverEffect = () => {
  cards.forEach((card) => {
    // Mouse move event for desktop
    card.addEventListener("mousemove", (event) => {
      let rect = card.getBoundingClientRect();
      let x = event.clientX - rect.left;
      let y = event.clientY - rect.top;
      card.style.setProperty("--x", `${x}px`);
      card.style.setProperty("--y", `${y}px`);
    });

    // Touch start event for mobile
    card.addEventListener("touchstart", (event) => {
      let rect = card.getBoundingClientRect();
      let x = event.touches[0].clientX - rect.left;
      let y = event.touches[0].clientY - rect.top;
      card.style.setProperty("--x", `${x}px`);
      card.style.setProperty("--y", `${y}px`);
      card.classList.add("hover"); // Add a class to trigger any additional hover styles if necessary
    });

    // Touch end event to remove hover styles
    card.addEventListener("touchend", () => {
      card.classList.remove("hover");
    });
  });
};

applyHoverEffect();

const infiniteScroll = () => {
  if (carouselJS.scrollLeft <= 0) {
    carouselJS.classList.add("no-transition");
    carouselJS.scrollLeft = carouselJS.scrollWidth - 2 * carouselJS.offsetWidth;
    carouselJS.classList.remove("no-transition");
  } else if (
    Math.ceil(carouselJS.scrollLeft + carouselJS.offsetWidth) >=
    carouselJS.scrollWidth
  ) {
    carouselJS.classList.add("no-transition");
    carouselJS.scrollLeft = carouselJS.offsetWidth;
    carouselJS.classList.remove("no-transition");
  }

  clearTimeout(timeoutId);

  if (!wrapper.matches(":hover")) {
    autoPlay();
  }
};

// Add event listeners for drag functionality
carouselJS.addEventListener("mousedown", dragStart);
carouselJS.addEventListener("mousemove", dragging);
carouselJS.addEventListener("mouseup", dragStop);
carouselJS.addEventListener("mouseleave", dragStop);
carouselJS.addEventListener("scroll", infiniteScroll);

wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

// Add event listeners for touch interactions
carouselJS.addEventListener("touchstart", dragStart);
carouselJS.addEventListener("touchmove", dragging);
carouselJS.addEventListener("touchend", dragStop);
