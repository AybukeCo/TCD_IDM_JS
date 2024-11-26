document.addEventListener('DOMContentLoaded', (event) => {
    const contactForm = document.getElementById('contact-form');
    const clickCountDisplay = document.getElementById('click-count');

    // Initialize click count from localStorage
    let clickCount = localStorage.getItem('clickCount') ? parseInt(localStorage.getItem('clickCount')) : 0;
    clickCountDisplay.textContent = `Button has been clicked ${clickCount} times`;

    // Function to set a cookie
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    // Function to get a cookie
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Event listener for form submission
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Increment click count and update localStorage
        clickCount++;
        localStorage.setItem('clickCount', clickCount);
        clickCountDisplay.textContent = `Button has been clicked ${clickCount} times`;

        //To store message content in local storage
        //localStorage.setItem("name", $("#name").val());
        //localStorage.setItem("email", $("#email").val());
        //localStorage.setItem("message", $("#message").val());

        // Set a cookie to indicate the form was submitted
        setCookie('formSubmitted', 'true', 1);

        alert('Thank you for your message! I will get back to you soon.');
    });

    // Check if the formSubmitted cookie is set
    if (getCookie('formSubmitted')) {
        alert('You have already submitted the form today.');
    }
});

// AFTER THIS IT'S THE MEDIA CAROUSEL SCRIPT!!//

document.addEventListener('DOMContentLoaded', function() {
    fetch('projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const projectsContainer = document.getElementById('projects');
            data.forEach(project => {
                const projectElement = document.createElement('div');
                projectElement.classList.add('project');

                const title = document.createElement('h2');
                title.textContent = project.title;

                const description = document.createElement('p');
                description.textContent = project.description;

                const carousel = createImageCarousel(project.images);
                const videoCarousel = createVideoCarousel(project.videos);

                projectElement.appendChild(title);
                projectElement.appendChild(description);
                if (carousel) {
                    projectElement.appendChild(carousel);
                }
                if (videoCarousel) {
                    projectElement.appendChild(videoCarousel);
                }

                projectsContainer.appendChild(projectElement);
            });
        })
        .catch(error => console.error('Fetch error:', error));
});

function createImageCarousel(images) {
    if (!images || images.length === 0) {
        return null;
    }

    const carouselContainer = document.createElement('div');
    carouselContainer.classList.add('carousel');

    images.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = image;
        img.classList.add('carousel-item');
        if (index === 0) {
            img.classList.add('active');
        }
        carouselContainer.appendChild(img);
    });

    let currentIndex = 0;
    setInterval(() => {
        const items = carouselContainer.querySelectorAll('.carousel-item');
        items[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % items.length;
        items[currentIndex].classList.add('active');
    }, 3000); // Change item every 3 seconds

    return carouselContainer;
}

function createVideoCarousel(videos) {
    if (!videos || videos.length === 0) {
        return null;
    }

    const carouselContainer = document.createElement('div');
    carouselContainer.classList.add('carousel');

    videos.forEach((videoSrc, index) => {
        const video = document.createElement('video');
        video.src = videoSrc;
        video.classList.add('carousel-item');
        video.controls = true;
        video.muted = true; // Optionally mute the video
        if (index === 0) {
            video.classList.add('active');
            video.autoplay = true;
        }
        video.onended = () => {
            setTimeout(() => {
                video.pause();
                video.currentTime = 0;
                video.classList.remove('active');
                const nextIndex = (index + 1) % videos.length;
                const nextVideo = carouselContainer.children[nextIndex];
                nextVideo.classList.add('active');
                nextVideo.play();
            }, 1000); // Pause 1 second before starting next video
        };
        carouselContainer.appendChild(video);
    });

    return carouselContainer;
}
