/*
 * Update functions to be exported from the design doc.
 */


var templates = require('duality/templates'),
    fields = require('couchtypes/fields'),
    Form = require('couchtypes/forms').Form;
var ex = require('./types').exercise;
var set = require('./types').set;

exports.exercise = function (doc, req) {
    var form = new Form(ex,doc);
    form.validate(req);

    /**
     * We do that because we are not using CouchType
     * CouchType takes care of generating a uuid
     */
    //form.values._id = req.uuid;

		if (form.isValid()) {
        return [form.values, {content: 'Exercise ' + form.values.name, title: 'Result'}];
    }
		else {
        var content = templates.render('exerciseForm.html', req, {
            form_title: 'My Form from update',
            method: 'UPDATE',
            action: 'exercise',
            form: form.toHTML(doc),
            input: 'Validate'
        });
        return [null, {content: content, title: 'My First Form'}];
    }
};

exports.set = function (doc, req) {
    var form = new Form(set,doc);
//		form.values.time = Date.now();
		
    form.validate(req);

    /**
     * We do that because we are not using CouchType
     * CouchType takes care of generating a uuid
     */
    form.values._id = req.uuid;

		if (form.isValid()) {
        return [form.values, {content: 'Set# ' + form.values.setnum, title: 'Result'}];
    }
		else {
        var content = templates.render('enter.html', req, {
            form_title: 'Set Form',
            method: 'PUT',
            action: '_update/set/glomb',
            form: form.toHTML(req),
            input: 'Validate'
        });
        return [null, {content: content, title: 'Set Form'}];
    }
};

exports.update_my_form = function (doc, req) {
    var form = new Form(person);
    form.validate(req);


    /**
     * We do that because we are not using CouchType
     * CouchType takes care of generating a uuid
     */
    form.values._id = req.uuid;

 if (form.isValid()) {
        return [form.values, {content: 'Hello ' + form.values.first_name +', '+ form.values.last_name , title: 'Result'}];
    }
 else {
        var content = templates.render('exerciseForm.html', req, {
            form_title: 'My Form',
            method: 'POST',
            action: '../_update/update_my_form',
            form: form.toHTML(req),
            input: 'Validate'
        });
        return [null, {content: content, title: 'My First Form'}];
    }
};
