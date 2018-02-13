import helpers from './helpres'

module.exports = {
    getCourier:(tr) =>{
        return helpers.get_courier_by_tr(tr);
    },
    isValid:(tr, type) =>{
        return helpers.tr_is_valid(tr, type)
    }
};
