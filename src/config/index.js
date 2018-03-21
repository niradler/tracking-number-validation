export default {
    courier_info : {
    ups: new RegExp(/\b(1Z ?[0-9A-Z]{3} ?[0-9A-Z]{3} ?[0-9A-Z]{2} ?[0-9A-Z]{4} ?[0-9A-Z]{3} ?[0-9A-Z]|T\d{3} ?\d{4} ?\d{3})\b/i),
    usps1: new RegExp(/\b((420 ?\d{5} ?)?(91|92|93|94|01|03|04|70|23|13)\d{2} ?\d{4} ?\d{4} ?\d{4} ?\d{4}( ?\d{2,6})?)\b/i),
    usps2: new RegExp(/\b((M|P[A-Z]?|D[C-Z]|LK|E[A-C]|V[A-Z]|R[A-Z]|CP|CJ|LC|LJ) ?\d{3} ?\d{3} ?\d{3} ?[A-Z]?[A-Z]?)\b/i),
    usps3: new RegExp(/\b(82 ?\d{3} ?\d{3} ?\d{2})\b/i),
    ontrac: new RegExp(/\b(C\d{14})\b/i),
    dhl: new RegExp(/\b(\d{4}[- ]?\d{4}[- ]?\d{2}|\d{3}[- ]?\d{8}|[A-Z]{3}\d{7})\b/i),
    fedex: new RegExp(/\b(((96\d\d|6\d)\d{3} ?\d{4}|96\d{2}|\d{4}) ?\d{4} ?\d{4}( ?\d{3})?)\b/i),
}
}