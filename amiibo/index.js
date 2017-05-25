"use strict";
$('.menu .item')
    .tab();
function clearFilter() {
    var last = document.querySelector("#series div a.active");
    if (last) {
        last.classList.remove("active");
    }
    var firstFilter = document.querySelector("#series div a.label");
    if (firstFilter)
        firstFilter.classList.add("active");
    var arr = document.querySelectorAll("#lineup div.card");
    var array = document.querySelectorAll("#lineup div.card");
    for (var index = 0; index < array.length; index++) {
        var element = array[index];
        element.removeAttribute("l-hidden");
    }
}
function findFilter(n) {
    var filter = document.querySelector("#series div a.label[data-tab='" + n.dataset.tab + "']");
    console.log(filter);
    if (!filter)
        return;
    if (filter.classList.contains("active")) {
        clearFilter();
    }
    else {
        filterAmiibo(filter);
    }
}
function filterAmiibo(n) {
    var last = document.querySelector("#series div a.active");
    if (last === n) {
        return;
    }
    else if (last) {
        last.classList.remove("active");
    }
    // console.log(n);
    // console.log(n.dataset.tab );
    n.classList.add("active");
    var series = n.dataset.tab;
    var array = document.querySelectorAll("#lineup div.card");
    for (var index = 0; index < array.length; index++) {
        var element = array[index];
        if (element.dataset.series === series) {
            element.removeAttribute("l-hidden");
        }
        else {
            element.setAttribute("l-hidden", "");
        }
    }
}
var r = new XMLHttpRequest();
r.open("GET", "lineup.json", true);
r.onreadystatechange = function () {
    if (r.readyState != 4 || r.status != 200)
        return;
    // alert("Success: " + r.responseText);
    new Vue({
        el: '#lineup',
        data: JSON.parse(r.responseText)
    });
    new Vue({
        el: '#series',
        data: JSON.parse(r.responseText),
        filters: {
            colorSeries: function (value) {
                return "color: " + value.color + "; background: " + value.bgcolor + ";";
            }
        }
    });
    // $('.menu .item').tab();
};
r.send();
