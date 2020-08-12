(function () {
	angular
		.module('calendarApp', ['ngAnimate'])
		.controller('calendarController', calendarController);

	function calendarController($scope) {
		var vm = this,
			now = new Date(),
			months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			jan = daysInMonth(1, now.getFullYear()),
			feb = daysInMonth(2, now.getFullYear()),
			mar = daysInMonth(3, now.getFullYear()),
			apr = daysInMonth(4, now.getFullYear()),
			may = daysInMonth(5, now.getFullYear()),
			jun = daysInMonth(6, now.getFullYear()),
			jul = daysInMonth(7, now.getFullYear()),
			aug = daysInMonth(8, now.getFullYear()),
			sep = daysInMonth(9, now.getFullYear()),
			oct = daysInMonth(10, now.getFullYear()),
			nov = daysInMonth(11, now.getFullYear()),
			dec = daysInMonth(12, now.getFullYear()),
			monthRef = [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec],
			month = now.getMonth(),
			monthDay = monthRef[now.getMonth()],
			n = now.getDate(),
			uidi,
			uidm,
			uid;

		vm.id = now.getDate().toString() + now.getMonth().toString();
		vm.dataId;
		vm.events = [];
		vm.description;
		vm.month = months[month];
		vm.next = next;
		vm.prev = prev;
		vm.add = add;

		// Place Dates In Correct Place
		function placeIt() {
			var def_marg = 14.28;
			var firstDay = new Date(now.getFullYear(), month, 1);
			var weekDay = (firstDay.getDay() + 6) % 7;
			var margin = def_marg * weekDay;
			var perc_margin = String(margin) + "%";
			$(".date_item").first().css({
				'margin-left': perc_margin
			})

			/*
      if (month === 0) {
        $(".date_item").first().css({
          'margin-left': marg
        })
      } else if (month === 1) {
        $("date_item").first().css({
          'margin-left': '250px'
        })
      } else if (month === 2) {
        $(".date_item").first().css({
          'margin-left': '300px'
        })
      } else if (month === 3) {
        $(".date_item").first().css({
          'margin-left': '100px'
        })
      } else if (month === 4) {
        $(".date_item").first().css({
          'margin-left': '0px'
        })
      } else if (month === 5) {
        $(".date_item").first().css({
          'margin-left': '0px'
        })
      } else if (month === 6) {
        $(".date_item").first().css({
          'margin-left': '100px'
        })
      } else if (month === 7) {
        $(".date_item").first().css({
          'margin-left': '250px'
        })
      } else if (month === 8) {
        $(".date_item").first().css({
          'margin-left': '50px'
        })
      } else if (month === 9) {
        $(".date_item").first().css({
          'margin-left': '150px'
        })
      } else if (month === 10) {
        $(".date_item").first().css({
          'margin-left': '300px'
        })
      } else if (month === 11) {
        $(".date_item").first().css({
          'margin-left': '50px'
        })
      } */

		}

		// Highlight Present Day
		function presentDay() {
			$(".date_item").eq(n - 1).addClass("present");
			getNextEvents();
		}

		// Print List Of Dates For Current Month
		function showDays(days) {
			for (var i = 1; i < days; i++) {
				var uidi = i;
				var uidm = month;
				var uid = uidi.toString() + '-' + uidm.toString();
				$(".dates").append("<div class='date_item' data='" + uid + "'>" + i + "</div>");
			}
		}

		// Get The Current Date
		function daysInMonth(month, year) {
			return new Date(year, month, 0).getDate() + 1;
		}

		// Next Month
		function next() {
			if (month < 11) {
				month++;
				$(".dates").html('');
				vm.month = months[month];
				monthDay = monthRef[month];
				showDays(monthDay);
				placeIt();
			}
		}

		// Previous Month
		function prev() {
			if (month === 0) {
				return false
			}
			else {
				month--;
				$(".dates").html('');
				vm.month = months[month];
				monthDay = monthRef[month];
				showDays(monthDay);
				placeIt();
			}
		}

		// Add Events To Specified Date
		function add() {
			vm.events.push({
				id: vm.id,
				description: vm.description,
				type: vm.type
			});

			vm.description = "";
			console.log(vm.events);
		}

		// Fetch Unique ID For Each Date Item
		$(".dates").on("click", ".date_item", function () {
			vm.id = $(this).attr('data');
			vm.dataId = $(this).attr('data');
			$(this).addClass("present").siblings().removeClass("present");
			for (var i = 0; i < 3; i++) {
				id_el = "#next-event" + i;
				$(id_el).html('');
			}
			getNextEvents();
			$scope.$apply();
		});

		showDays(monthDay);

		presentDay();

		placeIt();

	}

})();


function getNextEvents() {

	var id_day = $(".present").attr("data");

	var months = {
		1: "January",
		2: "February",
		3: "March",
		4: "April",
		5: "May",
		6: "June",
		7: "July",
		8: "August",
		9: "September",
		10: "October",
		11: "November",
		12: "December"
	}

	console.log(id_day);

	var month = id_day.split('-')[1];
	var day = id_day.split('-')[0];
	var next_events = new Array();
	var card_max_width = "100%";
	var month_right = String(parseInt(month) + 1);

	console.log(month);
	console.log(day);

	// $.ajax({
	// 	type: 'GET',
	// 	url: 'https://hyp-ave.herokuapp.com/v2/events/eventsbymonth/' + month_right,
	// 	dataType: 'json',
	// 	success: function (json) {
	//
	//
	// 		$.each(json, function (index, event) {
	// 			if (event.month >= parseInt(month_right) && event.day >= parseInt(day)) {
	// 				var temp = new Object();
	// 				temp["eventId"] = event.eventId;
	// 				temp["img_path"] = event.picturePath;
	// 				temp["name"] = event.name;
	// 				temp["day"] = event.day;
	// 				temp["year"] = event.year;
	// 				temp["month"] = months[event.month];
	// 				temp["descriptionText"] = event.descriptionText;
	// 				next_events.push(temp);
	// 			}
	// 		})
	// 	}
	// });

	console.log(next_events);

	//sort the events incrementally
	next_events.sort(function (a, b) {
		return a.day - b.day;
	})


	setTimeout(function () {
		for (var i = 0; i < 3; i++) {
			if (i < next_events.length) {
				let event = next_events[i];
				console.log(event);
				let img_path = event.img_path;
				let name = event.name;
				let descriptionText = event.descriptionText;
				let eventId = String(event.eventId);
				var string_day = pretty_day(event.day);
				var pretty_date = event.month + " " + string_day + " " + event.year;
				var new_card = createNextEventCard(eventId, card_max_width, img_path, name, pretty_date, i);
			}
		}
	}, 500)

}

function createNextEventCard(eventId, card_max_width, img_path, name, pretty_date, i) {

	var id_tag = "#next-event" + i;

	console.log(id_tag);

	var blockDiv = $('<div />')
		.addClass("row center-block top-10")
		.attr("id", eventId)
		.appendTo($(id_tag)); //div in which load the card

	var card = $('<div />')
		.addClass("card card-dim")
		.attr("style", "max-width: " + card_max_width + ";")
		.appendTo(blockDiv)

	var row = $('<div />')
		.addClass("row-card")
		.appendTo(card)

	var col4 = $('<div />')
		.addClass("col-img-card")
		.appendTo(row)

	$('<img />')
		.attr('src', img_path) //image relative path
		.addClass("img-card-madsomma card-img")
		.attr("alt", "image-event-" + name)
		.appendTo(col4);

	var col8 = $('<div />')
		.addClass("col-body-card")
		.appendTo(row)

	var cardbody = $("<div />")
		.addClass("card-body-mad")
		.appendTo(col8);

	$("<h5 />")
		.addClass("card-title")
		.appendTo(cardbody)
		.text(name)

	$("<p />")
		.addClass("card-text")
		.appendTo(cardbody)
		.text(pretty_date)

	$("<a />")
		.addClass("button-card btn text-light")
		.attr("onclick", "goToEvent(" + eventId + ")")
		.appendTo(cardbody)
		.text("Read more")

}

function goToEvent(eventId) {
	console.log("Going to event ".concat(eventId));
	eventId = String(eventId);
	//window.sessionStorage.setItem("event_to_display", eventId);
	window.location = "./event.html" + "?id=" + eventId + "&event-gt=none";
}

function pretty_day(day) {
	var j = day % 10,
		k = day % 100;
	if (j == 1 && k != 11) {
		return day + "st";
	}
	if (j == 2 && k != 12) {
		return day + "nd";
	}
	if (j == 3 && k != 13) {
		return day + "rd";
	}
	return day + "th";
}
