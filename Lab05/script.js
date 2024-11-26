
let randomAnime = ["aot.jpeg","deathnote.jpeg","fma.jpeg","gintama.jpeg","jojo.jpeg","naruto.jpeg","onepunch.jpeg","ouran.jpeg"];

    document.addEventListener("DOMContentLoaded", ()=>{

        console.log(getRandomIndex(5));

        let randomImageButton = document.getElementById('generateButton');

        randomImageButton.addEventListener('click', () => {

            let randomImage = randomAnime[getRandomIndex(randomAnime.length)];

            let img = document.getElementById('random-image');
            img.setAttribute('src', randomImage);

        });


    });
    
    function getRandomIndex(max) {
        return Math.floor(Math.random() * max);
    }