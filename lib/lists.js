//
// All Couchdb list functions exported to module here.
//


exports.plan = function (doc, req){ 

		provides('html', function() {
				var Handlebars = require('handlebars');
				var template = Handlebars.templates['planElem.html'];
				var html = '';
				while (row = getRow()) {
						var context = { 
								id: row.id,
								pos: row.key,
								name: row.value
						};
						html += template(context);
				}
				return html;
		})
};
