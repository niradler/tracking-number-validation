'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var courier_info = _config2.default.courier_info;

var normalize_key = function normalize_key(key) {
    var new_key = '';
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = key[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var char = _step.value;

            if (isNaN(char) === true) new_key += char;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return new_key;
};

var get_courier_by_tr = function get_courier_by_tr(tr) {
    for (var key in courier_info) {
        var courier = courier_info[key];
        if (courier.test(tr)) {
            return normalize_key(key);
        }
    }
    return null;
};

var tr_is_valid = function tr_is_valid(tr, type) {
    for (var key in courier_info) {
        var courier = courier_info[key];
        if (courier.test(tr) && normalize_key(key) === type.toLowerCase()) {
            return true;
        }
    }
    return false;
};
exports.default = {
    get_courier_by_tr: get_courier_by_tr,
    tr_is_valid: tr_is_valid
};