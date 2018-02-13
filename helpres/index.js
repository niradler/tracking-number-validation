'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var courier_info = _config2.default.courier_info;

var get_courier_by_tr = function get_courier_by_tr(tr) {
    for (var key in courier_info) {
        var courier = courier_info[key];
        if (courier.test(tr)) {
            return key;
        }
    }
    return null;
};

var tr_is_valid = function tr_is_valid(tr, type) {
    for (var key in courier_info) {
        var courier = courier_info[key];
        if (courier.test(tr) && key === type.toLowerCase()) {
            return true;
        }
    }
    return false;
};
exports.default = {
    get_courier_by_tr: get_courier_by_tr,
    tr_is_valid: tr_is_valid
};