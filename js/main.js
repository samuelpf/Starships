function processLinks(initial_list) {
	var items = [];

	$.each(initial_list, function(key, item) {
		var link_str = "<a href=\"" + item + "\">" + item + "</a>";
		items.push(link_str);
	});

	return items.join(", ");
}

function processShipsPage(ships) {
	var items = [];

	$.each(ships, function(key,ship) {
		var ship_str = "<tr>" +
			"<td>" + ship.name + "</td>" +
			"<td>" + ship.model + "</td>" +
			"<td>" + ship.manufacturer + "</td>" +
			"<td class=\"num\">" + ship.cost_in_credits + "</td>" +
			"<td class=\"num\">" + ship.length + "</td>" +
			"<td class=\"num\">" + ship.max_atmosphering_speed + "</td>" +
			"<td class=\"num\">" + ship.crew + "</td>" +
			"<td class=\"num\">" + ship.passengers + "</td>" +
			"<td class=\"num\">" + ship.cargo_capacity + "</td>" +
			"<td class=\"num\">" + ship.consumables + "</td>" +
			"<td class=\"num\">" + ship.hyperdrive_rating + "</td>" +
			"<td class=\"num\">" + ship.MGLT + "</td>" +
			"<td>" + ship.starship_class + "</td>" +
			"<td>" + processLinks(ship.pilots) + "</td>" +
			"<td>" + processLinks(ship.films) + "</td>" +
			"<td>" + ship.created + "</td>" +
			"<td>" + ship.edited + "</td>" +
			"<td>" + "<a href=\"" + ship.url + "\">" + ship.url + "</a>" + "</td>" +
		"</tr>";
		items.push(ship_str);
	});

	$("#ships-table tbody").append(items.join(""));
}

function activateFilters() {
	$('#ships-table').DataTable({
		paging: false,
		searching: false,
		columns: [
			null,
			null,
			null,
			{ "type": "sort-numbers-ignore-text" },
			{ "type": "sort-numbers-ignore-text" },
			{ "type": "sort-numbers-ignore-text" },
			{ "type": "sort-numbers-ignore-text" },
			{ "type": "sort-numbers-ignore-text" },
			{ "type": "sort-numbers-ignore-text" },
			{ "type": "sort-numbers-ignore-text" },
			{ "type": "sort-numbers-ignore-text" },
			{ "type": "sort-numbers-ignore-text" },
			null,
			null,
			null,
			null,
			null,
			null,
		],
	});
}

function getJSON(json_url) {
	$.ajax({
		dataType: "json",
		url: json_url,
		success: function(data) {
			console.log("Success retrieving from: " + json_url);
			processShipsPage(data.results);

			var next_url = data.next != null ? data.next : null;
			if (next_url != null) {
				getJSON(next_url);
			} else {
				console.log("Finished loading all pages...");
				activateFilters();
			}
		}
	});
}

$(document).ready(function() {

	// Clone the table's header content for the sticky header
	$("#ships-table thead").clone().appendTo("#table-header-aux");
	$("#table-header-aux").click(function(){
        $('body, html').animate({scrollTop: 0}, 500);
	});

	// Set the behaviour for the sticky header
	var timer;
	var is_scrolling = false;
	var header_height = $(".header-container").outerHeight() + 50;
	$(window).scroll(function() {
		if (!is_scrolling) {
			$("#table-header-aux").hide();
			is_scrolling = true;
		}

		var left = $(this).scrollLeft();
		window.clearTimeout(timer)
		timer = window.setTimeout(function(){
			if ($(this).scrollTop() > header_height) {
				$("#table-header-aux").css("left", -left).fadeIn();
			}

			is_scrolling = false;
		}, 150);	
	});

	// Get the data for the table from the starships API
	var json_url = "http://swapi.co/api/starships/?format=json";
	getJSON(json_url);

});