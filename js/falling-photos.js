(function () {
    function getRandomValue(min, max) {
      return Math.random() * (max - min) + min;
    }
  
    function createFallingPhotos() {
      let container = document.getElementById("falling-photos-container");
      if (!container) {
        container = document.createElement("div");
        container.id = "falling-photos-container";
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
            z-index: -1; /* Lowered z-index */
        `;
        document.body.appendChild(container);
      }
  
      // Number of photos to generate each time
      const photoCount = Math.floor(getRandomValue(5, 8));
  
      for (let i = 0; i < photoCount; i++) {
        const photo = document.createElement("div");
  
        const left = getRandomValue(0, window.innerWidth);
        const size = getRandomValue(50, 150);
        const animationDuration = getRandomValue(5, 10); 
        const delay = getRandomValue(0, 5);
        const rotation = getRandomValue(-20, 20);
  
        const photoUrls = [
          "./assets/photo1.jpg",
          "./assets/photo2.jpg",
          "./assets/photo3.jpg",
          "./assets/photo4.jpg",
          "./assets/photo5.jpg",
          "./assets/photo6.jpg",
          "./assets/photo7.jpg",
          "./assets/photo8.jpg",
            
        ];
  
        const randomPhotoUrl =
          photoUrls[Math.floor(Math.random() * photoUrls.length)];
  
        photo.style.cssText = `
            position: absolute;
            left: ${left}px;
            width: ${size}px;
            height: ${size}px;
            background-image: url('${randomPhotoUrl}');
            background-size: cover;
            background-position: center;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            opacity: 0.3; /* Reduced opacity */
            transform: translateY(-150%) rotate(${rotation}deg); /* Start higher */
            animation: fall ${animationDuration}s linear ${delay}s forwards;
        `;
  
        // Force removal after animation duration plus delay
        setTimeout(() => {
          if (photo.parentElement) {
            photo.parentElement.removeChild(photo);
          }
        }, (animationDuration + delay + 1) * 1000); // Add a small buffer
  
        container.appendChild(photo);
      }
    }
  
    function addFallAnimationStyle() {
      const styleExists = document.getElementById("falling-photos-style");
      if (styleExists) return;
  
      const style = document.createElement("style");
      style.id = "falling-photos-style";
      style.textContent = `
          @keyframes fall {
              0% {
                  opacity: 0.3;
                  transform: translateY(-150%) rotate(var(--rotation, 0deg)); /* Start higher */
              }
              10% {
                  opacity: 0.3;
              }
              90% {
                  opacity: 0.3;
              }
              100% {
                  opacity: 0;
                  transform: translateY(100vh) rotate(var(--rotation, 0deg));
              }
          }
      `;
      document.head.appendChild(style);
    }
  
    function initFallingPhotos() {
      addFallAnimationStyle();
      createFallingPhotos();
  
      setInterval(createFallingPhotos, 3000);
    }
  
    window.addEventListener("load", initFallingPhotos);
    window.addEventListener("resize", createFallingPhotos);
  })();
  
