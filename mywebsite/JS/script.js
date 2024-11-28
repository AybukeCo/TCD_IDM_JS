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

        // To store message content in local storage
        localStorage.setItem("name", $("#name").val());
        localStorage.setItem("email", $("#email").val());
        localStorage.setItem("message", $("#message").val());

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
    // Fetch the JSON file containing project data
    fetch('../JS/projects.json')
        .then(response => {
            // Check if the response is ok (status 200-299)
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            // Parse the JSON data from the response
            return response.json();
        })
        .then(data => {
            // Get the projects container element where project details will be appended
            const projectsContainer = document.getElementById('projects');
            // Iterate over each project in the JSON data
            data.forEach(project => {
                // Create a new div element for the project
                const projectElement = document.createElement('div');
                projectElement.classList.add('project');

                // Create and set the project title
                const title = document.createElement('h2');
                title.textContent = project.title;

                // Create and set the project description
                const description = document.createElement('p');
                description.textContent = project.description;

                // Create image carousel for the project images
                const carousel = createImageCarousel(project.images);
                // Create video carousel for the project videos
                const videoCarousel = createVideoCarousel(project.videos);

                // Append title, description, and carousels to the project element
                projectElement.appendChild(title);
                projectElement.appendChild(description);
                if (carousel) {
                    projectElement.appendChild(carousel);
                }
                if (videoCarousel) {
                    projectElement.appendChild(videoCarousel);
                }

                // Append the project element to the projects container
                projectsContainer.appendChild(projectElement);
            });
        })
        .catch(error => console.error('Fetch error:', error)); // Log any errors that occur during fetch
});

// Function to create an image carousel
function createImageCarousel(images) {
    // Return null if there are no images
    if (!images || images.length === 0) {
        return null;
    }

    // Create a container div for the carousel
    const carouselContainer = document.createElement('div');
    carouselContainer.classList.add('carousel');

    // Iterate over each image URL
    images.forEach((image, index) => {
        // Create an img element for each image
        const img = document.createElement('img');
        img.src = image;
        img.classList.add('carousel-item');
        // Set the first image as active
        if (index === 0) {
            img.classList.add('active');
        }
        // Append the img element to the carousel container
        carouselContainer.appendChild(img);
    });

    let currentIndex = 0;
    // Set up an interval to change the active image every 3 seconds
    setInterval(() => {
        const items = carouselContainer.querySelectorAll('.carousel-item');
        // Remove the active class from the current image
        items[currentIndex].classList.remove('active');
        // Update the index to the next image
        currentIndex = (currentIndex + 1) % items.length;
        // Add the active class to the new current image
        items[currentIndex].classList.add('active');
    }, 4000); // Change item every 3 seconds

    return carouselContainer;
}

// Function to create a video carousel
function createVideoCarousel(videos) {
    // Return null if there are no videos
    if (!videos || videos.length === 0) {
        return null;
    }

    // Create a container div for the carousel
    const carouselContainer = document.createElement('div');
    carouselContainer.classList.add('carousel');

    // Iterate over each video URL
    videos.forEach((videoSrc, index) => {
        // Create a video element for each video
        const video = document.createElement('video');
        video.src = videoSrc;
        video.classList.add('carousel-item');
        video.controls = true;
        video.muted = true; // Optionally mute the video
        // Set the first video as active and autoplay it
        if (index === 0) {
            video.classList.add('active');
            video.autoplay = true;
        }
        // Add an event listener to handle the end of the video
        video.onended = () => {
            setTimeout(() => {
                // Pause the current video and reset it to the start
                video.pause();
                video.currentTime = 0;
                video.classList.remove('active');
                // Move to the next video in the carousel
                const nextIndex = (index + 1) % videos.length;
                const nextVideo = carouselContainer.children[nextIndex];
                nextVideo.classList.add('active');
                nextVideo.play();
            }, 1000); // Pause 1 second before starting the next video
        };
        // Append the video element to the carousel container
        carouselContainer.appendChild(video);
    });

    return carouselContainer;
}
