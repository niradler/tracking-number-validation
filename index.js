"use strict";

var courier_info = {
  amazon: {
    patterns: [new RegExp(/^TB[A-D][0-9]{12}/)]
  },
  ups: {
    patterns: [new RegExp(/\b(1Z ?[0-9A-Z]{3} ?[0-9A-Z]{3} ?[0-9A-Z]{2} ?[0-9A-Z]{4} ?[0-9A-Z]{3} ?[0-9A-Z]|T\d{3} ?\d{4} ?\d{3})\b/i)],
    tracking_url: "https://www.ups.com/mobile/track?trackingNumber="
  },
  usps: {
    patterns: [new RegExp(/\b((420 ?\d{5} ?)?(91|92|93|94|95|01|03|04|70|23|13)\d{2} ?\d{4} ?\d{4} ?\d{4} ?\d{4}( ?\d{2,6})?)\b/i), new RegExp(/\b((M|P[A-Z]?|D[C-Z]|LK|E[A-C]|V[A-Z]|R[A-Z]|CP|CJ|LC|LJ) ?\d{3} ?\d{3} ?\d{3} ?[A-Z]?[A-Z]?)\b/i), new RegExp(/\b(82 ?\d{3} ?\d{3} ?\d{2})\b/i)],
    tracking_url: "https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1="
  },
  ontrac: {
    patterns: [new RegExp(/\b(C\d{14})\b/i)],
    tracking_url: "http://www.ontrac.com/trackres.asp?tracking_number="
  },
  dhl: {
    patterns: [new RegExp(/\b(\d{4}[- ]?\d{4}[- ]?\d{2}|\d{3}[- ]?\d{8}|[A-Z]{3}\d{7})\b/i)],
    tracking_url: "http://www.dhl.com/content/g0/en/express/tracking.shtml?brand=DHL&AWB="
  },
  fedex: {
    patterns: [new RegExp(/\b([0-9]{12}|100\d{31}|\d{15}|\d{18}|96\d{20}|96\d{32})\b/i)],
    tracking_url: "http://www.fedex.com/Tracking?language=english&cntry_code=us&tracknumbers="
  }
};

var getCourier = function getCourier(tr) {
  return Object.keys(courier_info).filter(function (c) {
    return courier_info[c].patterns.filter(function (p) {
      return p.test(tr);
    }).length > 0;
  });
};

var getCourierOne = function getCourierOne(tr) {
  return getCourier(tr)[0];
};

var isCourier = function isCourier(tr, courier) {
  return getCourier(tr).indexOf(courier.toLowerCase()) > -1;
};

var getTrackingUrl = function getTrackingUrl(tr, courier) {
  var link = null;
  if (courier) {
    link = courier_info[courier.toLowerCase()].tracking_url + tr;
  } else {
    var c = getCourier(tr)[0];
    if (c && courier_info[c].tracking_url) link = courier_info[c].tracking_url + tr;
  }

  return link;
};

var injectPatterns = function injectPatterns(courier, patt) {
  return !courier || !courier_info[courier.toLowerCase()] ? false : courier_info[courier.toLowerCase()].patterns.push(new RegExp(patt));
};

var isValid = function isValid(tr) {
  return getCourier(tr).length > 0;
};

var TNV = {
  getCourier: getCourier,
  getCourierOne: getCourierOne,
  isCourier: isCourier,
  getTrackingUrl: getTrackingUrl,
  injectPatterns: injectPatterns,
  isValid: isValid,
  couriers: courier_info
};

if (typeof exports === "undefined") {
  window.TNV = TNV;
} else {
  module.exports = TNV;
}
