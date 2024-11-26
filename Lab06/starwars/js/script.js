function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

$(document).ready(function () {
	$.ajax({
		url: "../js/starwars.json",
		dataType: "json",
		success: async function (data) {

			let wrapper = $(".wrapper");

			for (i = 0; i < data.length; i++) {

				let theSW = data[i];

				changeBackground(wrapper, theSW);

				await sleep(3000);
				if (i == data.length - 1) {
					i = 0;
				}
			}
		},
	});
});

function changeBackground(element, sw) {
	element.css("background-image", `url(../img/${sw.path})`);

	if (window.innerWidth <= 500) {
		console.log("yep");
		element.css("background-position-x", sw.position);
	}

	element.find("#sw-title").text(sw.title);
	element.find("#sw-description").text(sw.description);
}
