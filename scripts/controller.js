
// app -- Optometrist demo in Couchdb
// Namespace is APP for app-level cpntroller logic
// Uses Routerlite for page refresh: https://github.com/1Marc/jquery-mobile-routerlite:w
APP = window.APP || {};

// Click handlers set these app globals. Routerlite uses them.
APP.key = '';
APP.id = '';

// DOM ready:
$(document).ready( function () {

	// Each time we change to a page with id="two" then run this code
	$.mobile.routerlite.pagechange("#two", function(page){
	  APP.rp1();
	});

	// If we change to a page with id="three" then run this code
	$.mobile.routerlite.pagechange("#three", function(page){
	  APP.rp2(APP.id);
	});


	// If we change to a page with id="four" then run this code
	$.mobile.routerlite.pagechange("#four", function(page){
	  APP.rp3(APP.id);
	});

	// Eagerly load states list
	APP.rp1();

});
// End DOM ready


// Populate relative page one rows
APP.rp1 = function () {
		console.log("Populate states listing");

		var url = "_list/plan/exList/";

		$.get(url, function(data) {
				var selector = "#exercises";
				$(selector).empty();
				$(selector).append(data);
				try {
						$("div#exercisesdiv ul").listview("refresh");
				} catch (ex) {
						console.log(ex.message + ". It's OK.  Exercises pre-leoaded. View them on next page.");
				}
		});
};
	
// Populate relative page two rows
APP.rp2 = function (id) {
	console.log("Populate edetail form");
	// curl -X GET "http://127.0.0.1:5984/opto3/_design/opto/_show/detail/3770717789a226c91f8ce4808e2eefd7"
	var url = "_show/exercise/";
	url += id;

	var cnclBtn = "#edtcncl";
	var saveBtn = "#edtsave";
	$(saveBtn).attr('onclick', 'APP.id=\''+id+'\'; $(document).ready(function() { $("#exForm").ajaxSubmit({type: "UPDATE" }); return false; });');
  $(cnclBtn).attr('onclick', 'javascript:void(0);');


	$.get(url, function(data) {
		var selector = "#edetails";
		$(selector).empty();
		$(selector).append(data);
	});	
};
	
// Populate relatve page three detail page
APP.rp3 = function (id) {
		console.log("Populate detail form");

		var url = "_show/detail/";
		url    += id;

		var btn = "#editbtn";
		$(btn).attr('onclick', 'APP.id=\''+id+'\';');

		$.get(url, function(data) {
				var selector = "#details";
				$(selector).empty();
				$(selector).append(data);
		});	

		var btnEnt = "#entbtn";
		var urlEnt = "_show/enter/";
		urlEnt    += id;

		$.get(urlEnt, function(data) {
				var selector = "#enter";
				$(selector).empty();
				$(selector).append(data);
				$(btnEnt).attr('onclick', '"APP.id=\''+id+'\'; $(document).ready(function() { $("#entForm").ajaxSubmit({type: "PUT" }); return false; });"');
		});	
};
