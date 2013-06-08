var Type = require('couchtypes/types').Type,
    fields = require('couchtypes/fields'),
    widgets = require('couchtypes/widgets');

exports.exercise = new Type('exercise', {
		fields : {
				name:     fields.string(),
				cycle:    fields.number(),
				position: fields.number(),
				steps:    fields.numberArray(),
				current:  fields.number(),
				parts:    fields.array(),
				type:     fields.string()
		}
});

exports.person = new Type('person', {
    fields : { 
        first_name: fields.string(),
        last_name: fields.string()
    }   
});
