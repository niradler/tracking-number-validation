'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var courier_info = {
    ups: new RegExp(/\b(1Z ?[0-9A-Z]{3} ?[0-9A-Z]{3} ?[0-9A-Z]{2} ?[0-9A-Z]{4} ?[0-9A-Z]{3} ?[0-9A-Z]|T\d{3} ?\d{4} ?\d{3})\b/i),
    usps1: new RegExp(/\b((420 ?\d{5} ?)?(91|92|93|94|01|03|04|70|23|13)\d{2} ?\d{4} ?\d{4} ?\d{4} ?\d{4}( ?\d{2,6})?)\b/i),
    usps2: new RegExp(/\b((M|P[A-Z]?|D[C-Z]|LK|E[A-C]|V[A-Z]|R[A-Z]|CP|CJ|LC|LJ) ?\d{3} ?\d{3} ?\d{3} ?[A-Z]?[A-Z]?)\b/i),
    usps3: new RegExp(/\b(82 ?\d{3} ?\d{3} ?\d{2})\b/i),
    ontrac: new RegExp(/\b(C\d{14})\b/i),
    dhl: new RegExp(/\b(\d{4}[- ]?\d{4}[- ]?\d{2}|\d{3}[- ]?\d{8}|[A-Z]{3}\d{7})\b/i),
    fedex: new RegExp(/\b(((96\d\d|6\d)\d{3} ?\d{4}|96\d{2}|\d{4}) ?\d{4} ?\d{4}( ?\d{3})?)\b/i)
};

var TNV = function () {
    function TNV() {
        _classCallCheck(this, TNV);
    }

    _createClass(TNV, [{
        key: 'normalize_key',
        value: function normalize_key(key) {
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
        }
    }, {
        key: 'getCourier',
        value: function getCourier(tr) {
            for (var key in courier_info) {
                var courier = courier_info[key];
                if (courier.test(tr)) {
                    return this.normalize_key(key);
                }
            }
            return null;
        }
    }, {
        key: 'isValid',
        value: function isValid(tr, type) {
            for (var key in courier_info) {
                var courier = courier_info[key];
                if (courier.test(tr) && this.normalize_key(key) === type.toLowerCase()) {
                    return true;
                }
            }
            return false;
        }
    }]);

    return TNV;
}();

window.TNV = new TNV();