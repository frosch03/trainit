/**
 * Show functions to be exported from the design doc.
 */

var templates = require('duality/templates'),
    fields = require('couchtypes/fields'),
    Form = require('couchtypes/forms').Form;
var ex = require('./types').exercise;


exports.exercise = function (doc, req) {
    var myForm = new Form (ex,doc);
    return {
      title : 'My First Form',
      content: templates.render('exerciseForm.html', req, {
            form_title : 'My Form',
            method : 'UPDATE',
            action : '_update/update_exercise',
            form : myForm.toHTML(doc),
            button: 'Save'})
    }
};

exports.exercise_content = function(doc, req) {
		var myForm = new Form (ex);
		
		var Handlebars = require('handlebars');
		var context = {
				id: doc._id,
				name: doc.name,
				type: doc.type,
				parts: doc.parts,
				steps: doc.steps,
				position: doc.position,
				current: doc.steps[doc.current],
				next: doc.steps[doc.current+1]
		};
		
		var template = Handlebars.templates['edetail.html'];
		var html = template(context);
		return html;
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
		current: doc.steps[doc.current],
		next: doc.steps[doc.current+1]
	};
	
    var template = Handlebars.templates['detail.html'];
	var html = template(context);
    return html;
};
