// Elements
const cookie = document.querySelector(".cookie");
const pointsDisplay = document.querySelector(".points");
const upgradeButton = document.querySelector(".upgrade1");
const hireGrandmaButton = document.querySelector(".upgrade2");
const buyLocalCookiesShopButton = document.querySelector(".upgrade3");
const buyFactoryButton = document.querySelector(".upgrade4");
const buyMineButton = document.querySelector(".upgrade5");
const buyFarmButton = document.querySelector(".upgrade6");
const shopItem1 = document.querySelector(".shopItem1");
const shopItem2 = document.querySelector(".shopItem2");
const shopItem3 = document.querySelector(".shopItem3");
const shopItem4 = document.querySelector(".shopItem4");
const shopItem5 = document.querySelector(".shopItem5");
const shopItem6 = document.querySelector(".shopItem6");
const progressBar = document.querySelector(".progress-bar");
const wildCookie = document.querySelector(".wild-cookie");

function showWildCookieRandomly() {
  function showAndHide() {
    // Use the viewport dimensions, considering the wild cookie's size to avoid overflow
    const vw =
      Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      ) - wildCookie.offsetWidth;
    const vh =
      Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      ) - wildCookie.offsetHeight;

    // Generate random positions within the viewport
    const randomX = Math.floor(Math.random() * vw);
    const randomY = Math.floor(Math.random() * vh);

    // Position the wild cookie using CSS 'top' and 'left' properties based on viewport dimensions
    wildCookie.style.left = `${randomX}px`;
    wildCookie.style.top = `${randomY}px`;

    // Make the wild cookie visible
    wildCookie.style.display = "block";

    // Hide the wild cookie after 2 seconds
    setTimeout(() => {
      wildCookie.style.display = "none";
    }, 2000);
  }

  // Show the wild cookie at regular intervals
  setInterval(showAndHide, 5000);
}
// Call the function when ready
showWildCookieRandomly();
// Scores and settings
let score = 0;
let progressClicks = 0;
const maxClicks = 5;
let progressInterval;
let cookieRotation = 0;
let cookiesPerClick = 1;
const priceOfCursor = 50;
const priceOfGrandma = 500;
const priceOfLocalCookiesShop = 1000;
const priceOfFactory = 5000;
const priceOfMine = 10000;
const priceOfFarm = 25000;
let cookiesPerSecond = 0;

// Update display function
function updateDisplay() {
  pointsDisplay.textContent = `Cookies: ${score}`;
}
// Function to update progress bar
function updateProgressBar() {
  let progressPercentage = (progressClicks / maxClicks) * 100;
  progressBar.style.width = `${progressPercentage}%`;

  if (progressPercentage >= 100) {
    // Award extra points and reset
    let bonusPoints = score;
    score *= 2;
    progressClicks = 0;
    triggerConfetti();
    showReward(bonusPoints);
    updateDisplay(); // Update score display
  }
}

wildCookie.addEventListener("click", () => {
  // Hide the cookie immediately on click
  wildCookie.style.display = "none";

  // Trigger confetti at the click position
  triggerConfetti();

  // Logic to award points goes here
  score += 100; // Assuming 'score' is your score variable
  showReward(100);
  updateDisplay(); // Update the display with the new score

  // Optionally, show some feedback to the player
});

function showReward(bonusPoints) {
  // Create the element
  const rewardMessage = bonusPoints + " Cookies!";
  const reward = document.createElement("div");
  reward.classList.add("points-reward");
  reward.textContent = rewardMessage;

  // Assuming the progress bar container's parent can be used as the position reference
  const progressBarContainer = document.querySelector(".progress-container");
  progressBarContainer.parentNode.insertBefore(
    reward,
    progressBarContainer.nextSibling
  );

  // Remove the reward message after 2 seconds (2000 milliseconds)
  setTimeout(() => {
    reward.remove();
  }, 2000);
}

function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

// Update the state of both upgrade buttons
function updateUpgradeButtons() {
  if (score >= priceOfCursor) {
    upgradeButton.classList.remove("disabled");
    upgradeButton.style.pointerEvents = "auto";
    upgradeButton.style.opacity = "1";
  } else {
    upgradeButton.classList.add("disabled");
    upgradeButton.style.pointerEvents = "none";
    upgradeButton.style.opacity = "0.5";
  }

  if (score >= priceOfGrandma) {
    hireGrandmaButton.classList.remove("disabled");
    hireGrandmaButton.style.pointerEvents = "auto";
    hireGrandmaButton.style.opacity = "1";
  } else {
    hireGrandmaButton.classList.add("disabled");
    hireGrandmaButton.style.pointerEvents = "none";
    hireGrandmaButton.style.opacity = "0.5";
  }

  if (score >= priceOfLocalCookiesShop) {
    buyLocalCookiesShopButton.classList.remove("disabled");
    buyLocalCookiesShopButton.style.pointerEvents = "auto";
    buyLocalCookiesShopButton.style.opacity = "1";
  } else {
    buyLocalCookiesShopButton.classList.add("disabled");
    buyLocalCookiesShopButton.style.pointerEvents = "none";
    buyLocalCookiesShopButton.style.opacity = "0.5";
  }

  if (score >= priceOfFactory) {
    buyFactoryButton.classList.remove("disabled");
    buyFactoryButton.style.pointerEvents = "auto";
    buyFactoryButton.style.opacity = "1";
  } else {
    buyFactoryButton.classList.add("disabled");
    buyFactoryButton.style.pointerEvents = "none";
    buyFactoryButton.style.opacity = "0.5";
  }

  if (score >= priceOfMine) {
    buyMineButton.classList.remove("disabled");
    buyMineButton.style.pointerEvents = "auto";
    buyMineButton.style.opacity = "1";
  } else {
    buyMineButton.classList.add("disabled");
    buyMineButton.style.pointerEvents = "none";
    buyMineButton.style.opacity = "0.5";
  }

  if (score >= priceOfFarm) {
    buyFarmButton.classList.remove("disabled");
    buyFarmButton.style.pointerEvents = "auto";
    buyFarmButton.style.opacity = "1";
  } else {
    buyFarmButton.classList.add("disabled");
    buyFarmButton.style.pointerEvents = "none";
    buyFarmButton.style.opacity = "0.5";
  }
}

// Initially update the state of the upgrade buttons
updateUpgradeButtons();

// Event listener for cookie clicks
cookie.addEventListener("click", () => {
  score += cookiesPerClick;
  cookieRotation += 10; // Increase by 10 degrees on each click
  progressClicks = Math.min(progressClicks + 1, maxClicks); // Prevent going over maxClicks

  // Apply the rotation along with scale (if you want the cookie to also scale up on hover as per your CSS)
  cookie.style.transform = `rotate(${cookieRotation}deg) scale(1.1)`;
  updateDisplay();
  updateProgressBar(); // Update progress bar
  updateUpgradeButtons();
});

function drainProgress() {
  if (progressClicks > 0) {
    progressClicks -= 3; // Decrease progress
    updateProgressBar(); // Update progress bar
  }
}

// Start draining progress
if (!progressInterval) {
  progressInterval = setInterval(drainProgress, 1000); // Drain progress every second
}

// Event listener for purchasing the cursor enhancement
upgradeButton.addEventListener("click", () => {
  if (score >= priceOfCursor && cookiesPerClick === 1) {
    score -= priceOfCursor;
    cookiesPerClick += 5;
    upgradeButton.style.display = "none";
    shopItem1.style.display = "block";

    updateDisplay();
  }
});

// Event listener for hiring a grandma
hireGrandmaButton.addEventListener("click", () => {
  if (score >= priceOfGrandma) {
    score -= priceOfGrandma;
    cookiesPerSecond += 5; // Increase cookies per second
    hireGrandmaButton.style.display = "none";
    shopItem2.style.display = "block";
    updateDisplay();
  }
});

// Event listener for buying local cookies shop
buyLocalCookiesShopButton.addEventListener("click", () => {
  if (score >= priceOfLocalCookiesShop) {
    score -= priceOfLocalCookiesShop;
    cookiesPerSecond += 15; // Increase cookies per second
    buyLocalCookiesShopButton.style.display = "none";
    shopItem3.style.display = "block";
    updateDisplay();
  }
});

// Event listener for buying a factory
buyFactoryButton.addEventListener("click", () => {
  if (score >= priceOfFactory) {
    score -= priceOfFactory;
    cookiesPerSecond += 50; // Increase cookies per second
    buyFactoryButton.style.display = "none";
    shopItem4.style.display = "block";
    updateDisplay();
  }
});

// Event listener for buying a mine
buyMineButton.addEventListener("click", () => {
  if (score >= priceOfMine) {
    score -= priceOfMine;
    cookiesPerSecond += 100; // Increase cookies per second
    buyMineButton.style.display = "none";
    shopItem5.style.display = "block";
    updateDisplay();
  }
});
// Event listener for buying a farm

buyFarmButton.addEventListener("click", () => {
  if (score >= priceOfFarm) {
    score -= priceOfFarm;
    cookiesPerSecond += 250; // Increase cookies per second
    buyFarmButton.style.display = "none";
    shopItem6.style.display = "block";
    updateDisplay();
  }
});
// Increase score per second based on cookiesPerSecond
setInterval(() => {
  score += cookiesPerSecond;
  updateDisplay();
  updateUpgradeButtons();
}, 1000); // Runs every 1000 milliseconds (1 second)
