"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _courier_info;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var courier_info = (_courier_info = {
    ups: new RegExp(/\b(1Z ?[0-9A-Z]{3} ?[0-9A-Z]{3} ?[0-9A-Z]{2} ?[0-9A-Z]{4} ?[0-9A-Z]{3} ?[0-9A-Z]|T\d{3} ?\d{4} ?\d{3})\b/i),
    usps: new RegExp(/\b((420 ?\d{5} ?)?(91|92|93|94|01|03|04|70|23|13)\d{2} ?\d{4} ?\d{4} ?\d{4} ?\d{4}( ?\d{2,6})?)\b/i)
}, _defineProperty(_courier_info, "usps", new RegExp(/\b((M|P[A-Z]?|D[C-Z]|LK|E[A-C]|V[A-Z]|R[A-Z]|CP|CJ|LC|LJ) ?\d{3} ?\d{3} ?\d{3} ?[A-Z]?[A-Z]?)\b/i)), _defineProperty(_courier_info, "usps", new RegExp(/\b(82 ?\d{3} ?\d{3} ?\d{2})\b/i)), _defineProperty(_courier_info, "ontrac", new RegExp(/\b(C\d{14})\b/i)), _defineProperty(_courier_info, "dhl", new RegExp(/\b(\d{4}[- ]?\d{4}[- ]?\d{2}|\d{3}[- ]?\d{8}|[A-Z]{3}\d{7})\b/i)), _defineProperty(_courier_info, "fedex", new RegExp(/\b(((96\d\d|6\d)\d{3} ?\d{4}|96\d{2}|\d{4}) ?\d{4} ?\d{4}( ?\d{3})?)\b/i)), _courier_info);

var TNV = function () {
    function TNV() {
        _classCallCheck(this, TNV);
    }

    _createClass(TNV, [{
        key: "getCourier",
        value: function getCourier(tr) {
            for (var key in courier_info) {
                var courier = courier_info[key];
                if (courier.test(tr)) {
                    return key;
                }
            }
            return null;
        }
    }, {
        key: "isValid",
        value: function isValid(tr, type) {
            for (var key in courier_info) {
                var courier = courier_info[key];
                if (courier.test(tr) && key === type.toLowerCase()) {
                    return true;
                }
            }
            return false;
        }
    }]);

    return TNV;
}();

window.TNV = new TNV();