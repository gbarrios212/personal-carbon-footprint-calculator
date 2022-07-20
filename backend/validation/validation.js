const Validator = require('validator');


function validateRequest(req, res) {
    const categories = req.body;
    const { errors, isValid } = validateInput(categories);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    return categories;
}

function validateInput(categories) {
    let errors = {};
    for(const category in categories) {
        const categoryPorperties = categories[category];
        if (!Validator.isInt(categoryPorperties.input.toString(), { min: 0})){
            errors[category] = `Input for ${category} must be greater than or equal to 0`;
        }
    }
    
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};


module.exports = { validateRequest };
