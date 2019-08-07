var sections = document.querySelectorAll("section");
for (let i = 0; i < sections.length; i++) {
  const e = sections[i];
  e.id = `slide-${i}`;
}

var slide = 0;
if (window.location.href.split("#").length > 1) {
  slide = parseInt(window.location.href.split("#")[1].split("-")[1]);
}

function loc() {
  var l = window.location.href.split("#");
  window.location.href = l[0] + `#slide-${slide}`;
}
loc();

function prev() {
  if (slide > 0) {
    slide = slide - 1;
    loc();
  }
}
function next() {
  if (slide < sections.length - 1) {
    slide = slide + 1;
    loc();
  }
}

// SETTINGS
var wayDirection = "horizontal"; // vertical, horizontal
var wayKeys = true; // boolean
var wayScroll = true; // boolean
var waySwiping = true; // boolean
var wayThresholdScroll = 3; // how sensitive is scrolling?
var wayThresholdSwipe = 20; // how sensitive is swiping?

// KEYBOARD
if (wayKeys) {
  // Key inputs, all the usual suspects for discoverability
  document.addEventListener(
    "keyup",
    e => {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "Space" || e.key === "space") {
        prev();
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        next();
      }
    },
    false
  );
}

// SCROLL EVENTS
var wayScrollFired = false; // Use to debounce scroll events
if (wayScroll) {
  // only fire if scrolling is an option
  window.addEventListener("mousewheel", function(e) {
    // listen for scroll events
    // vertical scrolling
    if (wayDirection === "vertical") {
      if (wayThresholdScroll < Math.abs(e.deltaY)) {
        // does it meet the threshold?
        if (!wayScrollFired) {
          // Fire once, debounce input
          if (e.deltaY > 0) {
            next();
          } else {
            prev();
          }
          wayScrollFired = true; // Don’t fire again until new scroll
        }
      } else {
        // Reset debounce when under threshold
        wayScrollFired = false;
      }
    }
    // vertical scrolling
    else {
      if (wayThresholdScroll < Math.abs(e.deltaX)) {
        // does it meet the threshold?
        if (!wayScrollFired) {
          // Fire once, debounce input
          if (e.deltaX > 0) {
            next();
          } else {
            prev();
          }
          wayScrollFired = true; // Don’t fire again until new scroll
        }
      } else {
        // Reset debounce when under threshold
        wayScrollFired = false;
      }
    }
  });
}

// TOUCH EVENTS
var waySwipeFired = false; // Only trigger once
document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);
document.addEventListener("touchend", handleTouchEnd, false);

var xDown;
var yDown;
var xDiff;
var yDiff;

function handleTouchStart(e) {
  xDown = e.touches[0].clientX;
  yDown = e.touches[0].clientY;
}

function handleTouchMove(e) {
  var xUp = e.touches[0].clientX;
  var yUp = e.touches[0].clientY;

  xDiff = xDown - xUp;
  yDiff = yDown - yUp;
  if (!waySwipeFired) {
    if (wayDirection === "horizontal") {
      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (wayThresholdSwipe < Math.abs(xDiff)) {
          if (xDiff > 0) {
            next();
          } else {
            prev();
          }
          waySwipeFired = true;
        }
      }
    } else {
      if (Math.abs(yDiff) > Math.abs(xDiff)) {
        if (wayThresholdSwipe < Math.abs(yDiff)) {
          if (yDiff > 0) {
            next();
          } else {
            prev();
          }
          waySwipeFired = true;
        }
      }
    }
  }
}

// Reset touch data
function handleTouchEnd(e) {
  xDown = null;
  yDown = null;
  xDiff = null;
  yDiff = null;
  waySwipeFired = false;
}

var objToday = new Date(),
  weekday = new Array(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ),
  dayOfWeek = weekday[objToday.getDay()],
  domEnder = (function() {
    var a = objToday;
    if (/1/.test(parseInt((a + "").charAt(0)))) return "th";
    a = parseInt((a + "").charAt(1));
    return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th";
  })(),
  dayOfMonth =
    today + (objToday.getDate() < 10)
      ? "0" + objToday.getDate() + domEnder
      : objToday.getDate() + domEnder,
  months = new Array(
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ),
  curMonth = months[objToday.getMonth()],
  curYear = objToday.getFullYear();

var today = `${curMonth} ${dayOfMonth}, ${curYear}`;
var dates = document.querySelectorAll(".date");
for (let i = 0; i < dates.length; i++) {
  dates[i].textContent = today;
}

function toggleFullscreen() {
  document.body.requestFullscreen();
}
