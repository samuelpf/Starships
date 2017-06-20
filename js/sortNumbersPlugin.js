/*!
  Plugin for sorting colums with numbers and text: sorts numbers and pushes text to the end.
  Created by DavidKonrad
  Retrieved from: https://stackoverflow.com/questions/24761459/jquery-datatables-sort-numbers-only
*/

function sortNumbersIgnoreText(a, b, high) {
    var reg = /[+-]?((\d+(\.\d*)?)|\.\d+)([eE][+-]?[0-9]+)?/;    
    a = a.match(reg);
    a = a !== null ? parseFloat(a[0]) : high;
    b = b.match(reg);
    b = b !== null ? parseFloat(b[0]) : high;
    return ((a < b) ? -1 : ((a > b) ? 1 : 0));    
}

jQuery.extend( jQuery.fn.dataTableExt.oSort, {
    "sort-numbers-ignore-text-asc": function (a, b) {
        return sortNumbersIgnoreText(a, b, Number.POSITIVE_INFINITY);
    },
    "sort-numbers-ignore-text-desc": function (a, b) {
        return sortNumbersIgnoreText(a, b, Number.NEGATIVE_INFINITY) * -1;
    }
});