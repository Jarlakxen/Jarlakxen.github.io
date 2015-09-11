// ******************************************

//  			Global Stuff

// ******************************************

if (![].shuffle) {
	Array.prototype.shuffle = function() {
		var array = this.slice(0);
		var currentIndex = array.length, temporaryValue, randomIndex ;

		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	};
}


// String - Tooltip label font declaration for the scale label
Chart.defaults.global.tooltipFontFamily = "Inconsolata, Monaco, Consolas, 'Courier New', monospace";

// Number - Tooltip label font size in pixels
Chart.defaults.global.tooltipFontSize = 20;

// String - Tooltip title font declaration for the scale label
Chart.defaults.global.tooltipTitleFontFamily = "Inconsolata, Monaco, Consolas, 'Courier New', monospace";

 // Number - Tooltip title font size in pixels
Chart.defaults.global.tooltipTitleFontSize = 20;

// String - Template string for single tooltips
Chart.defaults.global.tooltipTemplate = "<%if (label){%><%=label%>: <%}%><%= value %>%";


new WOW().init();

// ******************************************

//  			My Page App

// ******************************************

var app = angular.module('MyPage', ['tc.chartjs']);


"ngInject";
function MainCtrl($scope){

	function increase_brightness(hex, percent){

		hex = hex.replace(/^\s*#|\s*$/g, '');

		if(hex.length == 3){
			hex = hex.replace(/(.)/g, '$1$1');
		}

		var r = parseInt(hex.substr(0, 2), 16),
		g = parseInt(hex.substr(2, 2), 16),
		b = parseInt(hex.substr(4, 2), 16);

		return '#' +
		((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
		((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
		((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
	}

	function fill_with_color(elements){
		//var colors = randomColor({count: elements.length, luminosity: 'dark'});
		var colors = ['#B71C1C', '#D50000', '#880E4F', '#C51162', '#4A148C', '#AA00FF', '#311B92', '#6200EA', '#1A237E', '#304FFE', '#004D40', '#00BFA5', '#1B5E20', '#33691E', '#827717', '#F57F17', '#A1887F', '#3E2723', '#9E9E9E', '#212121', '#607D8B'].shuffle();
		for(var i=0; i<elements.length; i++){
			elements[i].color = colors[i];
			elements[i].highlight = increase_brightness(colors[i], 20);
		}
		return elements;
	}

	$scope.options =  {
		responsive: true,
		scaleShowLabelBackdrop : true,
		scaleBackdropColor : 'rgba(255,255,255,0.75)',
		scaleBeginAtZero : true,
		scaleBackdropPaddingY : 2,
		scaleBackdropPaddingX : 2,
		scaleShowLine : true,
		segmentShowStroke : true,
		segmentStrokeColor : '#fff',
		segmentStrokeWidth : 2,
		animationSteps : 100,
		animationEasing : 'easeOutBounce',
		animateRotate : true,
		animateScale : false,
		legendTemplate : '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
	};



	$scope.langs_skills = fill_with_color([
		{
			value: 100,
			label: 'Scala'
		},
		{
			value: 100,
			label: 'Java'
		},
		{
			value: 90,
			label: 'JavaScript'
		},
		{
			value: 60,
			label: 'C'
		},
		{
			value: 50,
			label: 'Bash'
		},
		{
			value: 50,
			label: 'SQL'
		}
	]);

	$scope.paradigms_skills = fill_with_color([
		{
			value: 100,
			label: 'Object-oriented'
		},
		{
			value: 80,
			label: 'Functional'
		},
		{
			value: 10,
			label: 'Logic'
		}
	]);

	$scope.dbs_skills = fill_with_color([
		{
			value: 90,
			label: 'Mongo'
		},
		{
			value: 90,
			label: 'Elastic Search'
		},
		{
			value: 60,
			label: 'MySQL/MariaDB'
		},
		{
			value: 50,
			label: 'Cassandra'
		}
	]);

	$scope.others_skills = fill_with_color([
		{
			value: 100,
			label: 'Kafka'
		},
		{
			value: 50,
			label: 'Spark'
		},
		{
			value: 50,
			label: 'HDFS'
		}
	]);


	$scope.my_interests = fill_with_color([
		{
			value: 20,
			label: 'BigData'
		},
		{
			value: 10,
			label: 'Machine learning'
		},
		{
			value: 40,
			label: 'Scala/Functional Programming'
		},
		{
			value: 30,
			label: 'Frontend Development'
		}
	]);

	$scope.my_hobbies = fill_with_color([
		{
			value: 10,
			label: 'Hydroponic'
		},
		{
			value: 10,
			label: 'Arduino'
		},
		{
			value: 10,
			label: 'PC Games'
		},
		{
			value: 15,
			label: 'Role-playing Games'
		},
		{
			value: 10,
			label: 'Board Games'
		},
		{
			value: 35,
			label: 'Programming'
		}
	]);
}

app.controller("MainCtrl", MainCtrl);