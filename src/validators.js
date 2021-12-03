const Joi = require("joi");

const bookValidator= (req, res, next)=>{
    const bookSchema = Joi.object ({
        name: Joi.string().trim().empty("").min(2).max(30).required().messages({
            'string.min' : 'Book\'s name must have at least 2 character.',
            'string.max' : 'Book\'s name mustn\'t exceed 30 characters.',
            'any.required' : 'Please enter a name for your book !'
        }), 

        author: Joi.string().trim().empty("").min(2).max(20).required().messages({
            'string.min': 'Author\'s name must have at least 2 character.',
            'string.max': 'Author\'s name must not exceed 20 characters',
            'any.required': 'Please enter the author\'s name !'
        }), 

        summary: Joi.string().trim().empty("").min(3).max(40).required().messages({
            'string.min': 'Summary must have at least 3 characters.',
            'string.max': 'Summary must not exceed 40 characters',
            'any.required': 'Please enter the summary !'
        }),

        wantToRead: Joi.boolean(),
        haveRead: Joi.boolean()
    })

    const {value,error} = bookSchema.validate(req.body, {abortEarly:false});

    if (error==undefined) {
        next();
    } else {
        res.status(422).json({
            error: error,
            message: error.details
        })
    }
}

module.exports = bookValidator;

    




