const helpers = require('./helpres')
class TNValidator {
    getCourier(tr) {
        return helpers.get_courier_by_tr(tr);
    }
    isValid(tr, type) {
        return helpers.tr_is_valid(tr, type)
    }
}
const instance = new TNValidator();
exports = instance;
