'use strict';

var _helpers = require('./helpers');

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
    getCourier: function getCourier(tr) {
        return _helpers2.default.get_courier_by_tr(tr);
    },
    isValid: function isValid(tr, type) {
        return _helpers2.default.tr_is_valid(tr, type);
    }
};