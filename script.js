// script.js
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const netImg = new Image();
    const butterflyImg = new Image();
    const butterflies = [];
    let netX = 1100;
    let netY = 400;
    let score = 0;
    let loadedImages = 0;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function checkImagesLoaded() {
        loadedImages++;
        if (loadedImages === 2) {
            spawnButterflies();
            animate();
        }
    }

    netImg.onload = checkImagesLoaded;
    butterflyImg.onload = checkImagesLoaded;
    netImg.src = 'net.png';
    butterflyImg.src = 'butterfly.png';

    function moveNet(dy) {
        netY += dy;
        netY = Math.max(0, Math.min(canvas.height - netImg.height, netY)); // Keep the net within canvas bounds
    }

    function spawnButterflies() {
        for (let i = 0; i < 5; i++) {
            butterflies.push({
                x: Math.random() * (canvas.width - butterflyImg.width),
                y: Math.random() * (canvas.height - butterflyImg.height),
                visible: true
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(netImg, netX, netY);

        butterflies.forEach((butterfly) => {
            if (butterfly.visible) {
                ctx.drawImage(butterflyImg, butterfly.x, butterfly.y);
                butterfly.x += 10;
                if (butterfly.x > canvas.width) {
                    butterfly.x = 0;
                    butterfly.y = Math.random() * (canvas.height - butterflyImg.height);
                }

                // Check for collision
                if (butterfly.x < netX + netImg.width &&
                    butterfly.x + butterflyImg.width > netX &&
                    butterfly.y < netY + netImg.height &&
                    butterfly.y + butterflyImg.height > netY) {
                    score++;
                    butterfly.visible = false;
                }
            }
        });

        if (score >= 5) {
            ctx.font = "42px Helvetica";
            ctx.fillText("You Won!!", 50, 50);
        } else {
            requestAnimationFrame(animate);
        }
    }

    document.addEventListener('keydown', function(event) {
        if (event.keyCode === 38) { // Up arrow
            moveNet(-10);
        } else if (event.keyCode === 40) { // Down arrow
            moveNet(10);
        }
    });
});
