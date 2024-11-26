//instead of this line: document.addEventListener("DOMContentLoaded"; the lines below will do the same!


$(document).ready(function () {

    let treats = $('#treats');

    const students = [
        { name: "Jim", age: 21, email: "j@j.com" },
        { name: "Maggie", age: 22, email: "m@m.com" },
        { name: "Bob", age: 20, email: "Bob@bob.com" },
    ];

    for (student in students) {
        treats.append("<li>" + students[student].name + "<li>");
    }

    changeText($('#someText', 'Something new'));

});

function changeText(elementToChange, newText) {
    elementToChange.text(newText);
}

