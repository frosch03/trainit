var Type = require('couchtypes/types').Type,
    fields = require('couchtypes/fields'),
    widgets = require('couchtypes/widgets');

exports.exercise = new Type('exercise', {
		fields : {
				name:     fields.string(),
				cycle:    fields.number(),
				position: fields.number(),
				reps:     fields.number(),
				sets:     fields.number(),
				steps:    fields.numberArray(),
				current:  fields.number(),
				parts:    fields.array(),
				type:     fields.string()
		}
});

exports.set = new Type('set', {
		fields : {
				time:     fields.string(),
				exid:     fields.string(),
				weight:   fields.number(),
				reps:     fields.number(),
				setnum:   fields.number()
		}
});

exports.person = new Type('person', {
    fields : { 
        first_name: fields.string(),
        last_name: fields.string()
    }   
});
