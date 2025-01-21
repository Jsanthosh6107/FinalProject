document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector('.navbar-toggler');
    const navbarMenu = document.querySelector('.navbar-menu');

    toggleButton.addEventListener('click', () => {
        navbarMenu.classList.toggle('open'); //basic toggle for nav
    });
    
    document.addEventListener('scroll', () => {
        const svgCenter = document.getElementById('svg-container');
        const svgLeft = document.getElementById('svg-container-left');
        const svgRight = document.getElementById('svg-container-right');
        const scrollPosition = window.scrollY;
    
        const threshold = window.innerHeight * 0.5; //how far does the user scroll down before it appears/disappears
    
        // Fade in/out
        if (scrollPosition > threshold) {
            svgCenter.style.opacity = '1'; 
            svgLeft.style.opacity = '1'; 
            svgRight.style.opacity = '1'; 
        } else {
            svgCenter.style.opacity = '0';
            svgLeft.style.opacity = '0';
            svgRight.style.opacity = '0';
        }
    });
        
  const observerOptions = {
    threshold: 0.75 //how far user scrolls
  };

  // Function to animate numbers
  const animateNumber = (element, start, end, duration) => {
    const startTime = performance.now();

    const updateNumber = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentNumber = Math.floor(progress * (end - start) + start);

      element.textContent = currentNumber.toLocaleString(); 
      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      }
    };

    requestAnimationFrame(updateNumber);
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetElement = entry.target;

        if (targetElement.classList.contains("hidden")) {
          targetElement.classList.remove("hidden");
          targetElement.classList.add("show");

          const numberSpans = targetElement.querySelectorAll(".animate-number");
          numberSpans.forEach(numberSpan => {
            const endValue = parseInt(numberSpan.dataset.target, 10) || 0;
            animateNumber(numberSpan, 0, endValue, 1500); 
          });

          observer.unobserve(targetElement);
        }
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach(element => observer.observe(element));

  document.getElementById('transcriptButton').addEventListener('click', function() {
      const transcript = document.getElementById('transcript');
      const button = this;

      if (transcript.style.display === 'none') {
          transcript.style.display = 'block';
          button.textContent = '▲ Hide Transcript';
      } else {
          transcript.style.display = 'none';
          button.textContent = '▼ Show Transcript';
      }
  });


});
