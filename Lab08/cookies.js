//set cookie function
//event listener
//this should be attached to the button
//when clicked the data should be stored in local storage
//retrieve that local storage data and show on screen on page

//make a website and each time the button is pressed the project will change

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

        // Set a cookie to indicate the form was submitted
        setCookie('formSubmitted', 'true', 1);

        alert('Thank you for your message! I will get back to you soon.');
    });

    // Check if the formSubmitted cookie is set
    if (getCookie('formSubmitted')) {
        alert('You have already submitted the form today.');
    }
});
