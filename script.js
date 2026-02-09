// EmailJS Configuration
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'RnSZTYN7pQXxGvA5x',
    SERVICE_ID: 'service_vhl6dgy',
    TEMPLATE_ID: 'template_cqzfckk',
    TO_EMAIL: 'momnsami000@gmail.com'
};

// Initialize EmailJS if available
if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
}

// Flower rain animation
const flowers = ['🌸', '🌹', '🌺', '🌻', '🌷', '💐', '🌼', '🌿', '🌺', '🌹'];

function createFlower() {
    const flower = document.createElement('div');
    flower.className = 'flower';
    flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
    flower.style.left = Math.random() * 100 + '%';
    flower.style.animationDuration = (Math.random() * 3 + 2) + 's';
    flower.style.opacity = Math.random() * 0.5 + 0.5;
    flower.style.fontSize = (Math.random() * 20 + 20) + 'px';

    const flowerContainer = document.getElementById('flowerContainer');
    if (flowerContainer) {
        flowerContainer.appendChild(flower);

        // Remove flower after animation
        setTimeout(() => {
            flower.remove();
        }, 5000);
    }
}

function startFlowerRain() {
    const interval = setInterval(() => {
        createFlower();
    }, 200);

    setTimeout(() => {
        clearInterval(interval);
    }, 5000);
}

document.addEventListener('DOMContentLoaded', function () {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const valentineContainer = document.getElementById('valentineContainer');
    const celebrationSection = document.getElementById('celebrationSection');
    const movieSection = document.getElementById('movieSection');
    const yayText = document.getElementById('yayText');
    const movieCards = document.querySelectorAll('.movie-card');
    const selectedMovieDiv = document.getElementById('selectedMovie');
    const selectedMovieName = document.getElementById('selectedMovieName');
    const shyText = document.getElementById('shyText');

    const customMovieInput = document.getElementById('customMovieInput');
    const customMovieText = document.getElementById('customMovieText');
    const submitMovieBtn = document.getElementById('submitMovieBtn');
    const timePickerSection = document.getElementById('timePickerSection');
    const movieTime = document.getElementById('movieTime');
    const confirmTimeBtn = document.getElementById('confirmTimeBtn');
    const finalMessage = document.getElementById('finalMessage');
    const finalMovieName = document.getElementById('finalMovieName');
    const finalTime = document.getElementById('finalTime');

    let selectedMovie = '';

    // Make No button move smoothly away when mouse gets near
    if (noBtn && valentineContainer) {
        let isMoving = false;
        let moveTimeout;

        function getRandomPosition() {
            const containerRect = valentineContainer.getBoundingClientRect();
            const buttonRect = noBtn.getBoundingClientRect();
            const containerWidth = containerRect.width;
            const containerHeight = containerRect.height;

            const padding = 20;
            const maxX = Math.max(0, containerWidth - buttonRect.width - padding * 2);
            const maxY = Math.max(0, containerHeight - buttonRect.height - padding * 2);

            const randomX = padding + Math.random() * maxX;
            const randomY = padding + Math.random() * maxY;

            return { x: randomX, y: randomY };
        }

        function moveButton() {
            if (isMoving) return;
            isMoving = true;

            const newPos = getRandomPosition();
            noBtn.style.position = 'absolute';
            noBtn.style.left = newPos.x + 'px';
            noBtn.style.top = newPos.y + 'px';
            noBtn.style.zIndex = '10';

            if (shyText) {
                shyText.classList.remove('hidden');
                shyText.classList.add('show');
            }

            setTimeout(() => {
                isMoving = false;
            }, 250);
        }

        valentineContainer.addEventListener('mousemove', function (e) {
            if (!noBtn || valentineContainer.classList.contains('hidden')) return;

            const buttonRect = noBtn.getBoundingClientRect();
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const buttonCenterX = buttonRect.left + buttonRect.width / 2;
            const buttonCenterY = buttonRect.top + buttonRect.height / 2;
            const distance = Math.hypot(mouseX - buttonCenterX, mouseY - buttonCenterY);

            if (distance < 120 && !isMoving) {
                clearTimeout(moveTimeout);
                moveTimeout = setTimeout(moveButton, 60);
            }
        });

        valentineContainer.addEventListener('mouseleave', function () {
            if (shyText) {
                shyText.classList.remove('show');
                setTimeout(() => {
                    shyText.classList.add('hidden');
                }, 300);
            }
        });
    }

    // Yes button click -> celebration then movie section
    if (yesBtn) {
        yesBtn.addEventListener('click', function () {
            valentineContainer.classList.add('hidden');
            celebrationSection.classList.remove('hidden');

            startFlowerRain();

            setTimeout(() => {
                yayText.classList.add('show');
            }, 100);

            setTimeout(() => {
                celebrationSection.classList.add('hidden');
                movieSection.classList.remove('hidden');
            }, 3000);
        });
    }

    function showTimePicker(movie) {
        selectedMovie = movie;
        selectedMovieDiv.classList.add('hidden');
        timePickerSection.classList.remove('hidden');
        finalMessage.classList.add('hidden');

        const now = new Date();
        now.setHours(now.getHours() + 1);
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        movieTime.value = `${hours}:${minutes}`;

        timePickerSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Movie selection
    movieCards.forEach(card => {
        card.addEventListener('click', function () {
            const movieName = this.getAttribute('data-movie');
            const movieNumber = this.querySelector('.movie-number').textContent;

            movieCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');

            customMovieInput.classList.add('hidden');
            selectedMovieDiv.classList.add('hidden');
            timePickerSection.classList.add('hidden');

            if (movieNumber === '10') {
                customMovieInput.classList.remove('hidden');
                customMovieText.focus();
                customMovieInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                selectedMovieName.textContent = movieName;
                selectedMovieDiv.classList.remove('hidden');
                selectedMovieDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => showTimePicker(movieName), 1500);
            }
        });
    });

    function submitCustomMovie() {
        const customMovie = customMovieText.value.trim();
        if (!customMovie) return;

        selectedMovieName.textContent = customMovie;
        customMovieInput.classList.add('hidden');
        selectedMovieDiv.classList.remove('hidden');
        selectedMovieDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        customMovieText.value = '';

        setTimeout(() => showTimePicker(customMovie), 1500);
    }

    // Email sending
    async function sendEmail(movieName, formattedTime) {
        if (typeof emailjs === 'undefined') {
            const subject = encodeURIComponent(`Movie Night: ${movieName}`);
            const body = encodeURIComponent(`Hi!\n\nWe're watching: ${movieName}\nTime: ${formattedTime}\n\nSee you then! 💕`);
            window.location.href = `mailto:${EMAILJS_CONFIG.TO_EMAIL}?subject=${subject}&body=${body}`;
            return;
        }

        // If config left as placeholders, fall back to mailto (not in this case)
        if (EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY' ||
            EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID' ||
            EMAILJS_CONFIG.TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {
            const subject = encodeURIComponent(`Movie Night: ${movieName}`);
            const body = encodeURIComponent(`Hi!\n\nWe're watching: ${movieName}\nTime: ${formattedTime}\n\nSee you then! 💕`);
            window.location.href = `mailto:${EMAILJS_CONFIG.TO_EMAIL}?subject=${subject}&body=${body}`;
            return;
        }

        try {
            const templateParams = {
                to_email: EMAILJS_CONFIG.TO_EMAIL,
                movie_name: movieName,
                movie_time: formattedTime,
                message: `Hi!\n\nWe're watching: ${movieName}\nTime: ${formattedTime}\n\nSee you then! 💕`
            };

            await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                templateParams
            );
        } catch (error) {
            const subject = encodeURIComponent(`Movie Night: ${movieName}`);
            const body = encodeURIComponent(`Hi!\n\nWe're watching: ${movieName}\nTime: ${formattedTime}\n\nSee you then! 💕`);
            window.location.href = `mailto:${EMAILJS_CONFIG.TO_EMAIL}?subject=${subject}&body=${body}`;
        }
    }

    function confirmTime() {
        const time = movieTime.value;
        if (!time) return;

        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        const formattedTime = `${displayHour}:${minutes} ${ampm}`;

        finalMovieName.textContent = selectedMovie;
        finalTime.textContent = formattedTime;
        finalMessage.classList.remove('hidden');
        finalMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        sendEmail(selectedMovie, formattedTime);
    }

    // Wire up buttons & inputs
    if (submitMovieBtn) {
        submitMovieBtn.addEventListener('click', submitCustomMovie);
    }

    if (customMovieText) {
        customMovieText.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') submitCustomMovie();
        });
    }

    if (confirmTimeBtn) {
        confirmTimeBtn.addEventListener('click', confirmTime);
    }

    if (movieTime) {
        movieTime.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') confirmTime();
        });
    }
});


