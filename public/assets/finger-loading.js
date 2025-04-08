// Custom implementation of the rolling finger animation
// Based on the LottieFiles animation: https://lottiefiles.com/free-animation/loading-sp5ya2LLZC

const createFingerLoadingAnimation = (container) => {
  // Create SVG element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "200");
  svg.setAttribute("height", "200");
  svg.setAttribute("viewBox", "0 0 200 200");
  container.appendChild(svg);
  
  // Create hand group
  const handGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svg.appendChild(handGroup);
  
  // Create palm
  const palm = document.createElementNS("http://www.w3.org/2000/svg", "path");
  palm.setAttribute("d", "M100,140 C130,140 150,120 150,90 C150,70 140,60 120,60 L80,60 C60,60 50,70 50,90 C50,120 70,140 100,140 Z");
  palm.setAttribute("fill", "none");
  palm.setAttribute("stroke", "#64ffda");
  palm.setAttribute("stroke-width", "4");
  palm.setAttribute("stroke-linecap", "round");
  handGroup.appendChild(palm);
  
  // Create fingers
  const fingers = [];
  
  // Thumb
  const thumb = document.createElementNS("http://www.w3.org/2000/svg", "path");
  thumb.setAttribute("d", "M60,90 C50,80 50,70 60,60 C70,50 80,50 90,60");
  thumb.setAttribute("fill", "none");
  thumb.setAttribute("stroke", "#64ffda");
  thumb.setAttribute("stroke-width", "4");
  thumb.setAttribute("stroke-linecap", "round");
  handGroup.appendChild(thumb);
  fingers.push(thumb);
  
  // Index finger
  const indexFinger = document.createElementNS("http://www.w3.org/2000/svg", "path");
  indexFinger.setAttribute("d", "M80,60 L80,30");
  indexFinger.setAttribute("fill", "none");
  indexFinger.setAttribute("stroke", "#64ffda");
  indexFinger.setAttribute("stroke-width", "4");
  indexFinger.setAttribute("stroke-linecap", "round");
  handGroup.appendChild(indexFinger);
  fingers.push(indexFinger);
  
  // Middle finger
  const middleFinger = document.createElementNS("http://www.w3.org/2000/svg", "path");
  middleFinger.setAttribute("d", "M100,60 L100,25");
  middleFinger.setAttribute("fill", "none");
  middleFinger.setAttribute("stroke", "#64ffda");
  middleFinger.setAttribute("stroke-width", "4");
  middleFinger.setAttribute("stroke-linecap", "round");
  handGroup.appendChild(middleFinger);
  fingers.push(middleFinger);
  
  // Ring finger
  const ringFinger = document.createElementNS("http://www.w3.org/2000/svg", "path");
  ringFinger.setAttribute("d", "M120,60 L120,30");
  ringFinger.setAttribute("fill", "none");
  ringFinger.setAttribute("stroke", "#64ffda");
  ringFinger.setAttribute("stroke-width", "4");
  ringFinger.setAttribute("stroke-linecap", "round");
  handGroup.appendChild(ringFinger);
  fingers.push(ringFinger);
  
  // Pinky finger
  const pinkyFinger = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pinkyFinger.setAttribute("d", "M140,70 L140,40");
  pinkyFinger.setAttribute("fill", "none");
  pinkyFinger.setAttribute("stroke", "#64ffda");
  pinkyFinger.setAttribute("stroke-width", "4");
  pinkyFinger.setAttribute("stroke-linecap", "round");
  handGroup.appendChild(pinkyFinger);
  fingers.push(pinkyFinger);
  
  // Animation variables
  let angle = 0;
  let animationId;
  
  // Animate the hand with rolling fingers
  const animate = () => {
    angle += 2;
    if (angle >= 360) angle = 0;
    
    // Rotate the hand
    handGroup.setAttribute("transform", `rotate(${angle}, 100, 100)`);
    
    // Animate fingers with wave effect
    fingers.forEach((finger, index) => {
      const fingerAngle = (angle + (index * 15)) % 360;
      const yOffset = Math.sin(fingerAngle * Math.PI / 180) * 5;
      finger.setAttribute("transform", `translate(0, ${yOffset})`);
    });
    
    animationId = requestAnimationFrame(animate);
  };
  
  // Start animation
  animate();
  
  // Return cleanup function
  return () => {
    cancelAnimationFrame(animationId);
    if (container.contains(svg)) {
      container.removeChild(svg);
    }
  };
};
