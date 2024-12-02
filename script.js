let isDesktop = window.innerWidth > 768;
function splitTextIntoSpansByChars(elementId, charLimit) {
  // Get the element by ID
  const element = document.getElementById(elementId);

  if (!element) {
    console.error(`Element with ID ${elementId} not found.`);
    return;
  }

  // Get the text content of the element
  const text = element.innerText;

  // Split the text into words
  const words = text.split(" ");

  // Initialize variables
  let result = "";
  let spanContent = "";

  // Iterate through words and build spans based on character limit
  words.forEach((word) => {
    // Check if adding the new word exceeds the character limit
    if (spanContent.length + word.length + 1 > charLimit) {
      // Close the current span and start a new one
      result += `<h3><span class="text">${spanContent.trim()}</span> <h3>`;
      spanContent = "";
    }
    // Add the word to the current span
    spanContent += word + " ";
  });

  // Add the last span content
  if (spanContent) {
    result += `<h3><span class="text">${spanContent.trim()}</span> <h3>`;
  }

  // Set the innerHTML of the element to the result with spans
  element.innerHTML = result.trim();
}
function locomotiveScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
    lerp: 0.02,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);
  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
function cursorEffect() {
  let cursor = document.querySelector(".page1 .cursor");
  let page1 = document.querySelector(".page1");
  page1.addEventListener("mousemove", function (e) {
    gsap.to(cursor, {
      x: e.x,
      y: e.y,
    });
  });
  page1.addEventListener("mouseleave", function () {
    gsap.to(cursor, {
      scale: 0,
    });
  });
  page1.addEventListener("mouseenter", function () {
    gsap.to(cursor, {
      scale: 1,
    });
  });
}
function page1Effect() {
  let h1 = document.querySelectorAll(".page1 h1 span");
  let tl2 = gsap.timeline();
  tl2.from(h1, {
    duration: 1,
    y: "100%",
    delay: 2,
    opacity: 1,
    stagger: 0.1,
    scrollTrigger: {
      trigger: h1,
      start: "top bottom",
      scroller: ".main",
      toggleActions: "play none reverse reset",
    },
  });
  tl2.to(".page1 .overlay", {
    autoAlpha: 0,
    delay: 3,
  });
  tl2.from(
    ".page1 .playreel img",
    {
      scale: 0,
    },
    "abs"
  );
  tl2.from(
    ".page1 .playreel .content",
    {
      y: 40,
    },
    "abs"
  );
  tl2.from(
    ".page1 .scroll",
    {
      y: 40,
      delay: 0.3,
    },
    "abs"
  );
}
function page2Effect() {
  if (isDesktop) {
    splitTextIntoSpansByChars("page2-text", 50);
  } else {
    splitTextIntoSpansByChars("page2-text", 30);
  }
  let page2 = document.querySelector(".page2");
  let text = document.querySelectorAll(".page2 .text");
  let hr = document.querySelector(".page2 hr");

  gsap.from(text, {
    duration: 1,
    scrollTrigger: {
      trigger: page2,
      start: "15% bottom",
      end: "15% bottom",
      scroller: ".main",
      toggleActions: "play none reverse reset",
    },
    y: 300,
    stagger: 0.1,
    opacity: 1,
  });
  gsap.from(hr, {
    duration: 1,
    scrollTrigger: {
      trigger: page2,
      start: "15% bottom",
      scroller: ".main",
      toggleActions: "play none reverse reset",
    },
    width: 0,
  });
}
function page3Effect() {
  let page3top = document.querySelector(".page3-top");
  let page3topspan = document.querySelectorAll(".page3-top h2 span");
  gsap.from(page3topspan, {
    duration: 1,
    scrollTrigger: {
      trigger: page3top,
      start: "top bottom",
      end: "top bottom",
      scroller: ".main",
      toggleActions: "play none reverse reset",
    },
    y: 300,
    opacity: 0,
  });
}
function page4Effect() {
  if (isDesktop) {
    splitTextIntoSpansByChars("page4-text", 50);
  } else {
    splitTextIntoSpansByChars("page4-text", 30);
  }
  let page2 = document.querySelector(".page4");
  let text = document.querySelectorAll(".page4 .text");
  let hr = document.querySelector(".page4 hr");
  gsap.from(text, {
    duration: 1,
    scrollTrigger: {
      trigger: page2,
      start: "15% bottom",
      end: "15% bottom",
      scroller: ".main",
      toggleActions: "play none reverse reset",
    },
    y: 300,
    stagger: 0.1,
    opacity: 1,
  });
  gsap.from(hr, {
    duration: 1,
    scrollTrigger: {
      trigger: page2,
      start: "15% bottom",
      scroller: ".main",
      toggleActions: "play none reverse reset",
    },
    width: 0,
  });
}
function page5Effect() {
  let cursor = document.querySelector(".page5 .cursor");
  let page5 = document.querySelector(".page5");
  page5.addEventListener("mousemove", function (e) {
    gsap.to(cursor, {
      left: e.x,
      top: e.y,
    });
  });
  page5.addEventListener("mouseleave", function () {
    gsap.to(cursor, {
      scale: 0,
    });
  });
  page5.addEventListener("mouseenter", function () {
    gsap.to(cursor, {
      scale: 1,
    });
  });
  let progress = 80;
  let circleProgress = document.querySelector(".circle-progress");
  let circleProgressIndicator = document.querySelector(
    ".circle-progress-indicator"
  );
  gsap.to(circleProgressIndicator, {
    duration: 1,
    scrollTrigger: {
      trigger: page5,
      start: "15% bottom",
      end: "15% bottom",
      scroller: ".main",
      toggleActions: "play none reverse reset",
    },
    rotate: (360 / 100) * progress,
  });
  gsap.to(circleProgress, {
    duration: 1,
    scrollTrigger: {
      trigger: page5,
      start: "30% bottom",
      end: "30% bottom",
      scroller: ".main",
      toggleActions: "play none reverse reset",
    },
    strokeDashoffset: (308 / 100) * (100 - progress),
  });
}
function page7Effect() {
  if (isDesktop) {
    splitTextIntoSpansByChars("page7-text", 50);
  } else {
    splitTextIntoSpansByChars("page7-text", 30);
  }
  let page2 = document.querySelector(".page7");
  let text = document.querySelectorAll(".page7 .text");
  let hr = document.querySelector(".page7 hr");
  gsap.from(text, {
    duration: 1,
    scrollTrigger: {
      trigger: page2,
      start: "15% bottom",
      end: "15% bottom",
      scroller: ".main",
      toggleActions: "play none reverse reset",
    },
    y: 300,
    stagger: 0.1,
    opacity: 1,
  });
  gsap.from(hr, {
    duration: 1,
    scrollTrigger: {
      trigger: page2,
      start: "15% bottom",
      scroller: ".main",
      toggleActions: "play none reverse reset",
    },
    width: 0,
  });
}
function swiperConfig() {
  let swiper = new Swiper(".myswiper", {
    slidesPerView: 4.3,
    spaceBetween: 30,
    loop: true,
    centerSlide: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    speed: 5000,
    freeMode: true,
    breakpoints: {
      0: {
        slidesPerView: 1.5,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2.3,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1440: {
        slidesPerView: 4.3,
        spaceBetween: 30,
      },
    },
  });
}
function page8Effect() {
  let text = document.querySelector(".page8 h2 span");
  gsap.from(text, {
    duration: 1,
    y: 300,
    scrollTrigger: {
      trigger: ".page8",
      start: "20% bottom",
      end: "20% bottom",
      scroller: ".main",
      toggleActions: "play none reverse reset",
    },
  });
}
function footerEffect() {
  gsap.from(".footer-bottom h3 span", {
    y: "-100%",
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".footer-bottom",
      start: "top bottom",
      scroller: ".main",
      toggleActions: "play none reverse reset",
    },
  });
}
function loader() {
  let loader = document.querySelector(".loader");
  let loaderText = document.querySelectorAll(".loader h3");
  let headerlogo = document.querySelectorAll("header .text");
  let tl = gsap.timeline();
  tl.from(loaderText, {
    x: 40,
    stagger: 0.2,
    autoAlpha: 0,
  });
  tl.to(loaderText, {
    x: -40,
    stagger: 0.2,
    autoAlpha: 0,
  });
  tl.to(loader, {
    duration: 1,
    autoAlpha: 0,
  });
  tl.from(headerlogo, {
    x: 30,
    autoAlpha: 0,
    stagger: 0.1,
  });
}
if (gsap) {
  cursorEffect();
  locomotiveScroll();
  page1Effect();
  page2Effect();
  page3Effect();
  page4Effect();
  page5Effect();
  page7Effect();
  swiperConfig();
  page8Effect();
  footerEffect();
  loader();
}
