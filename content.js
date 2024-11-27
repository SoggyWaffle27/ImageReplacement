//Add names of images added to Image list. 
//If you add images to list, make sure an image is added to the Images folder with the .jpg postfix
const imageFiles = [
  "Ack", "Bama", "Bart", "Bat", "Biden", "Biden2", "Blue", "Burns", "Cap", "Cap2", 
  "Case", "Case2", "Case3", "Chad", "Chess", "Chungus", "CR", "Crab", "Crap", "Doof", 
  "Dora", "Dora2", "Fish", "Fish2", "Fish3", "Garf", "Garf2", "Golumn", "Gru", "Gru2", 
  "Homer", "HT", "Jack", "JarJar", "JarJar2", "Jesus", "Jesus2", "JFK", 
  "Joe3", "Joe4", "Junk", "Kevin", "Kevin2", "King", "Knight", "Lebron", "Lisa", "Lord", 
  "Macho", "Macho1", "Macho2", "Macho3", "Mark", "Mark2", "MB", "MB2", "MB3", "MB4", 
  "MB5", "MCC", "MCC2", "MCC3", "Minor", "Moist", "Musk", "Ohare", "Oldguy", "Penguin", 
  "Penguin2", "Penguin3", "Prime", "Primo", "Putin", "Queen", "Queen2", "Queen3", "Rock", 
  "Rock1", "Sam", "Shrek", "Simp", "Simp2", "Simp3", "Simp4", "Simp5", "Soy", "Squid", 
  "Stalin", "Tele", "Tzu", "Vader", "Vader2", "Vader3", "Vegi", "Watto", "Yoda", "Yoda2"
];


const MAX_WIDTH = 20; 
const MAX_HEIGHT = 200; 

// Function to select a random image from the list
function getRandomImageUrl() {
  const randomIndex = Math.floor(Math.random() * imageFiles.length);
  return chrome.runtime.getURL("Images/" + imageFiles[randomIndex] + ".jpg");
}

// Function to overlay images
function overlayImages() {
  // Select images on Google Image Search and YouTube
  const images = document.querySelectorAll('img');
  let offset = 0;

  images.forEach(img => {
    // Skip if an overlay already exists
    if (img.dataset.overlayAdded) return;

    // Adjust offset based on YouTube-specific class
    // This determines if the image is a yt thumbnail, which requires different formatting than a google image
    if (img.classList.contains('yt-core-image')) {
      offset = 150;
    } else {
      offset = 0;
    }

    // Create an overlay container
    const overlay = document.createElement('div');
    overlay.classList.add('testclass'); // Add the "testclass" class
    overlay.style.position = 'absolute';
    overlay.style.top = `${img.offsetTop - offset}px`;
    overlay.style.left = `${img.offsetLeft}px`;
    overlay.style.width = `${img.width}px`;
    overlay.style.height = `${img.height}px`;
    overlay.style.backgroundImage = `url(${getRandomImageUrl()})`;
    overlay.style.backgroundSize = 'cover';
    overlay.style.opacity = '1'; // Adjust opacity as needed
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '10';

    // Ensure the parent has relative positioning
    const parent = img.parentNode;
    if (window.getComputedStyle(parent).position === 'static') {
      parent.style.position = 'relative';
    }

    // Add the overlay to the parent and mark it as added
    parent.appendChild(overlay);
    img.dataset.overlayAdded = true;
  });
}

// Initialize MutationObserver to monitor dynamically loaded images
function initOverlayObserver() {
  const observer = new MutationObserver(overlayImages);
  observer.observe(document.body, { childList: true, subtree: true });
}

// Run the script
overlayImages(); // Initial overlay
initOverlayObserver(); // Monitor dynamically loaded images
