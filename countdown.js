var RELEASE_DATE = Date.parse("2020-04-16 00:00:00");

if (!Date.parse) {
	Date.parse = function (str) {
		return new Date(str).getTime();
	};
}

if (!Date.now) {
	Date.now = function () {
		return new Date().getTime();
	};
}

var countdown_timer = null;

function lpad(str, len, char) {
	str = String(str);
	while (str.length < len) {
		str = char + str;
	}
	return str;
}

function init() {
	var bgs = [];

	for (var i = 0; i < 10; ++ i) {
		var bg = document.getElementById('bg' + (i + 1));
		if (i > 0) {
			bg.style.display = "none";
		}
		bgs.push(bg);
	}

	var bg_timer = setInterval(function () {
		var bg = bgs[0];
		bg.style.display = '';
		for (var i = 0; i < bgs.length; ++ i) {
			bgs[i].style.zIndex = bgs.length - i;
		}
		setTimeout(function() {
			bg.className = "bg_layer bg_layer_shown";
		}, 2000);

		setTimeout(function () {
			bg.style.display = 'none';
			bg.className = "bg_layer";
		}, 14000);

		bgs.push(bgs.shift());
	}, 10000);

	var text1 = document.getElementById('countdown_text1');
	var text2 = document.getElementById('countdown_text2');
	var text3 = document.getElementById('countdown_text3');
	var text4 = document.getElementById('countdown_text4');
	var text5 = document.getElementById('countdown_text5');

	function update() {
		var diff = Math.floor((RELEASE_DATE - Date.now()) / 1000);
		var text = [];
		if (diff <= 0) {
			text.push('OUT NOW!');
		} else {
			var secs = diff;
			var mins = Math.floor(secs / 60);
			secs -= mins * 60;
			var hours = Math.floor(mins / 60);
			mins -= hours * 60;
			var days = Math.floor(hours / 24);
			hours -= days * 24;

			if (days > 0) {
				text.push(days + ' days');
			}

			text.push(lpad(hours, 2, '0')+':'+lpad(mins, 2, '0')+':'+lpad(secs, 2, '0'));

		}
		text = text.join(' ');
		text1.textContent = text;
		text2.textContent = text;
		text3.textContent = text;
		text4.textContent = text;
		text5.textContent = text;
	};

	update();

	countdown_timer = setInterval(update, 1000);
}