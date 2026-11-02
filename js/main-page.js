document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("modal-overlay");
    const buttons = document.querySelectorAll(".more-btn");

    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            const originalCard = button.closest('.cardrep, .carddem, .cardlib, .cardlincoln');
            if (!originalCard) return;

            // Fetch live placement measurements from page layout
            const rect = originalCard.getBoundingClientRect();

            // Setup cloned container
            const clonedCard = document.createElement("div");
            clonedCard.className = `expanded-card-active ${originalCard.className}`;
            
            // Mirror size properties from source component explicitly
            clonedCard.style.top = `${rect.top}px`;
            clonedCard.style.left = `${rect.left}px`;
            clonedCard.style.width = `${rect.width}px`;
            clonedCard.style.height = `${rect.height}px`;
            clonedCard.style.borderRadius = "8px"; // Match original border rounding

            // Structural Assembly: Hero panel configuration
            const leftHero = document.createElement("div");
            leftHero.className = "modal-left-hero";

            const img = originalCard.querySelector("img").cloneNode(true);
            const name = originalCard.querySelector(".cardname").cloneNode(true);
            const party = originalCard.querySelector(".cardparty").cloneNode(true);
            
            const closeBtn = document.createElement("button");
            closeBtn.className = "close-btn";
            closeBtn.innerText = "CLOSE";

            leftHero.appendChild(img);
            leftHero.appendChild(name);
            leftHero.appendChild(party);
            leftHero.appendChild(closeBtn);

            // Structural Assembly: Content section creation
            const scrollContent = document.createElement("div");
            scrollContent.className = "modal-scroll-content";
            
            const hiddenData = originalCard.querySelector(".readmore");
            if (hiddenData) {
                scrollContent.innerHTML = hiddenData.innerHTML;
            } else {
                scrollContent.innerHTML = "<h3>Overview</h3><p>No additional details provided.</p>";
            }

            clonedCard.appendChild(leftHero);
            clonedCard.appendChild(scrollContent);
            document.body.appendChild(clonedCard);

            // Hide the original layout card behind the clone to avoid duplication artifacts
            originalCard.style.opacity = "0";

            // Open background layer mask 
            overlay.classList.add("active");

            // Compute precise 5% margins dynamically based on active screen resolution
            const marginX = window.innerWidth * 0.05;
            const marginY = window.innerHeight * 0.05;
            const targetWidth = window.innerWidth * 0.90;
            const targetHeight = window.innerHeight * 0.90;

            // Execute sizing transitions smoothly in the next screen repaint cycle
            requestAnimationFrame(() => {
                clonedCard.classList.add("expanded");
                clonedCard.style.top = `${marginY}px`;
                clonedCard.style.left = `${marginX}px`;
                clonedCard.style.width = `${targetWidth}px`;
                clonedCard.style.height = `${targetHeight}px`;
            });

            // Smooth exit animation logic
            const closeTargetView = () => {
                clonedCard.style.zIndex = "1002";
                
                // Immediately force text layers to transparent opacity before card shrinks
                const textElements = scrollContent.querySelectorAll('*');
                textElements.forEach(el => el.style.opacity = "0");
                
                // Timeout removes the container entirely right before scaling finishes
                setTimeout(() => {
                    scrollContent.style.display = "none";
                    leftHero.style.width = "100%";
                    leftHero.style.borderRight = "none";
                }, 100);

                clonedCard.classList.remove("expanded");
                
                const returnRect = originalCard.getBoundingClientRect();
                clonedCard.style.top = `${returnRect.top}px`;
                clonedCard.style.left = `${returnRect.left}px`;
                clonedCard.style.width = `${returnRect.width}px`;
                clonedCard.style.height = `${returnRect.height}px`;
                clonedCard.style.borderRadius = "8px";
                
                overlay.classList.remove("active");

                let transitionFinished = false;
                const completionHandler = (e) => {
                    if (e.propertyName === 'top' || e.propertyName === 'width' || e.propertyName === 'left' || e.propertyName === 'height') {
                        if (transitionFinished) return;
                        transitionFinished = true;
                        originalCard.style.opacity = "1";
                        clonedCard.remove();
                        clonedCard.removeEventListener("transitionend", completionHandler);
                    }
                };

                clonedCard.addEventListener("transitionend", completionHandler);
            };

            closeBtn.addEventListener("click", closeTargetView);
            overlay.addEventListener("click", closeTargetView);
        });
    });
});
