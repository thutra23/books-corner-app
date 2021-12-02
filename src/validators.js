const Joi = require("joi");

const bookValidator= (req,res)=>{
    const bookSchema = Joi.object ({
        name: Joi.string().trim().empty("").min(1).max(30).required().messages({
            'string.min' : 'Book\'s name must have at least 1 character.',
            'string.max' : 'Book\'s name mustn\'t exceed 30 characters.',
            'any.required' : 'Please enter a name for your book !'
        }), 

        author: Joi.string().trim().empty("").min(2).max(10).required().messages({
            'string.min': 'Author\'s name must have at least 1 character.',
            'string.max': 'Author\'s name must not exceed 20 characters',
            'any.required': 'Please enter the author\'s name !'
        }), 

        summary: Joi.string().trim().empty("").min(5).max(40).required().messages({
            'string.min': 'Summary must have at least 5 characters.',
            'string.max': 'Summary must not exceed 50 characters',
            'any.required': 'Please enter the summary !'
        })
    })

    const {value,error} = bookSchema.validate(req.body, {abortEarly:false});

    if (error==undefined) {
        res.sendFile(__dirname + "/public/index.html", {book: value});
    } else {
        res.status(422).render('error', {error: error.details})
    }
}

module.exports = bookValidator;

    




