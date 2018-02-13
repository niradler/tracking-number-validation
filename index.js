'use strict';

var _helpres = require('./helpres');

var _helpres2 = _interopRequireDefault(_helpres);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
    getCourier: function getCourier(tr) {
        return _helpres2.default.get_courier_by_tr(tr);
    },
    isValid: function isValid(tr, type) {
        return _helpres2.default.tr_is_valid(tr, type);
    }
};