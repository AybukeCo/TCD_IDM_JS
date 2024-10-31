let $=jQuery;

$(document).ready(function () {
    
    $.ajax({
        url: "images.json",
        dataType: "json",
        success: function (data) {
            console.log(data);
            
            let wrapper = $(".wrapper");
            
            for (let i = 0; i< data.length; i++) {
                let flower = data[i];
                console.log(flower.path);
                    setTimeout(changeBackground(wrapper, flower.path, 5000));
                
                if (i == data.length -1) {
                    i = 0;
                }
            }
            
            function changeBackground(element, path, seconds) {
                console.log(element, path);
                element.css('background-image', path);
            }
        },
    });
});