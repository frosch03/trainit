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

exports.set = function (doc, req) {
    var myForm = new Form (set,doc);
    return {
      title : 'Set Form',
      content: templates.render('enter.html', req, {
            form_title : 'Set Form',
            method : 'PUT',
            action : '_update/set',
					  weight : doc.steps[doc.current],
            form : myForm.toHTML(doc),
            button: 'Done'})
    }
};

exports.enter = function(doc, req) {
		var Handlebars = require('handlebars'); 

		var i = 0;
		var x = new Array(i);
		var html = '';

		var context = {
				id: doc._id,
				reps: doc.reps,
				setnr: 0,
				now: Date.now(),
				weight: doc.steps[doc.current]
		};
		
		var template = Handlebars.templates['enter.html'];

		while (i < doc.sets) {
				context.setnr = (i+1);
				html += template(context);
				i++;
		};

		return html;
};

// exports.exercise_content = function(doc, req) {
// 		var myForm = new Form (ex);
		
// 		var Handlebars = require('handlebars');
// 		var context = {
// 				id: doc._id,
// 				name: doc.name,
// 				type: doc.type,
// 				parts: doc.parts,
// 				steps: doc.steps,
// 				position: doc.position,
// 				current: doc.steps[doc.current],
// 				next: doc.steps[doc.current+1]
// 		};
		
// 		var template = Handlebars.templates['edetail.html'];
// 		var html = template(context);
// 		return html;
// };


