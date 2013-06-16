/**
 * Show functions to be exported from the design doc.
 */

var templates = require('duality/templates'),
    fields = require('couchtypes/fields'),
    Form = require('couchtypes/forms').Form;
var ex = require('./types').exercise;
var set = require('./types').set;


exports.exercise = function (doc, req) {
    var myForm = new Form (ex,doc);
    return {
      title : 'My First Form',
      content: templates.render('exerciseForm.html', req, {
            form_title : 'My Form',
            method : 'UPDATE',
            action : '_update/exercise',
            form : myForm.toHTML(doc),
            button: 'Save'})
    }
};

//
// Export all Couchdb show functions here.
//
exports.detail = function(doc, req) {
		
		var Handlebars = require('handlebars'); 
		var context = {
				id: doc._id,
				name: doc.name,
				type: doc.type,
				parts: doc.parts,
				steps: doc.steps,
				position: doc.position,
				reps: doc.reps,
				sets: doc.sets,
				current: doc.steps[doc.current],
				next: doc.steps[doc.current+1]
		};
		
		if (context.steps.length > 1 )
				var template = Handlebars.templates['detail_multiWeight.html'];
		else 
				var template = Handlebars.templates['detail_oneWeight.html'];

		var html = template(context);
		return html;
};

// exports.set = function (doc, req) {
// 		var i = 0;
// 		var now = Date.now();
// 		var htmlform = '';

// 		doc.time = now;
// 		doc.exid = req.id;
// 		doc.weight = doc.steps[doc.current];
// 		doc.type = 'result';

// 		while (i < doc.sets) {
// 				doc.setnum = (i+1);
// 				var myForm = new Form (set,doc);
// 				htmlform += myForm.toHTML(doc); //templates.render('enter.html', req, context);
// 				i++;
// 		};

//     return {
//       content: templates.render('enter.html', req, {
//           form_title : 'Set Form',
//           method : 'PUT',
//           action : '_update/set',
//           form : htmlform, //myForm.toHTML(doc),
//           button: 'Done'})
//     }
// };

exports.enter = function (doc, req) {
		var Handlebars = require('handlebars'); 
		var i = 0;
		var html = '';
		var now = new Number(Date.now());
		var actual_set = doc;

		actual_set._id    = now.toString();
		actual_set._rev   = null;
		actual_set._deleted = null;
		actual_set.type   = 'set';
		actual_set.time   = now;
		actual_set.exid   = req.id;
		actual_set.weight = doc.steps[doc.current];

		// while(i < doc.sets) {
		// 		actual_set.setnum = (i+1);
		// 		var myForm = new Form (set,actual_set);
		// 		html += myForm.toHTML(actual_set);
		// 		i++;
		// };
		
    var template = Handlebars.templates['enter.html'];

    while (i < doc.sets) {
				actual_set.setnum = (i+1);
				var myForm = new Form (set, actual_set);
				html += templates.render('enter.html', req, {
						method: 'PUT',
						action: '_update/set',
						form: myForm.toHTML(actual_set),
						button: (i+1) + '. Set'
				})
				i++;
		}

		return html;

		// var myForm = new Form (set,actual_set);

		// return { title: "Enter one Set:",
		// 				 content : templates.render('enter.html', req, {
		// 						 method : 'PUT',
		// 						 action : '_update/set',
		// 						 form : myForm.toHTML(actual_set),
		// 						 button: 'Done'})
		// 			 }
};
