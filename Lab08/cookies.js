//set cookie function
//event listener
//this should be attached to the button
//when clicked the data should be stored in local storage
//retrieve that local storage data and show on screen on page

//make a website and each time the button is pressed the project will change

function setCookie(cookieKey, cookieValue, exdays) {
    const cookieDate = new Date();
    const expiryDaysInMs = exdays * 24 * 60 * 60 * 1000;
    cookieDate.setTime(cookieDate.getTime() + expiryDaysInMs);
    let expires = "expires="+ cookieDate.toUTCString();
    document.cookie = cookieKey + "=" + cookieValue + ";" + expires +
    ";path=/";
    console.log(document);
    }

// yukarıdaki kodu websayfasının inspect diyip console kısmına yaz ve enter

setCookie('first_name', 'Jim', 30);

// sonra bu yukarıdaki kodu yaz ve enter

// >> tuşuna basıp applications'ı bul ve ordan cookies'i seç