'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var helpers = require('./helpres');

var TNValidator = function () {
    function TNValidator() {
        _classCallCheck(this, TNValidator);
    }

    _createClass(TNValidator, [{
        key: 'getCourier',
        value: function getCourier(tr) {
            return helpers.get_courier_by_tr(tr);
        }
    }, {
        key: 'isValid',
        value: function isValid(tr, type) {
            return helpers.tr_is_valid(tr, type);
        }
    }]);

    return TNValidator;
}();

var instance = new TNValidator();
exports = instance;