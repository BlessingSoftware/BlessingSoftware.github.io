"use strict";
$('.menu .item').tab();
// Vue.component('amiibo-card', {
//   template: '#amiibo-card-template'
// })
var chart;
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
function clearSoftFilter() {
    var last = document.querySelector("#hardware-series div a.active");
    if (last) {
        last.classList.remove("active");
    }
    var firstFilter = document.querySelector("#hardware-series div a.label");
    if (firstFilter)
        firstFilter.classList.add("active");
    var arr = document.querySelectorAll("#soft div.card");
    var array = document.querySelectorAll("#soft div.card");
    for (var index = 0; index < array.length; index++) {
        var element = array[index];
        element.removeAttribute("l-hidden");
    }
}
function enumAmiibos() {
    return document.querySelectorAll("#lineup div.card");
}
function findFilter(n) {
    var filter = document.querySelector("#series div a.label[data-tab='" + n.dataset.tab + "']");
    // console.log(filter);
    if (!filter)
        return;
    if (filter.classList.contains("active")) {
        clearFilter();
    }
    else {
        filterAmiibo(filter);
    }
}
function findSoftFilter(n) {
    var filter = document.querySelector("#hardware-series div a.label[data-tab='" + n.dataset.tab + "']");
    // console.log(filter);
    if (!filter)
        return;
    if (filter.classList.contains("active")) {
        clearSoftFilter();
    }
    else {
        filterSoft(filter);
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
function filterSoft(n) {
    var last = document.querySelector("#hardware-series div a.active");
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
    var array = document.querySelectorAll("#soft div.card");
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
function initLineup() {
    var r = new XMLHttpRequest();
    r.open("GET", "lineup.json", true);
    r.onreadystatechange = function () {
        if (r.readyState != 4 || r.status != 200)
            return;
        var result = JSON.parse(r.responseText);
        // if (chart) {
        //     Object.assign(chart, result);
        // } else
        //     chart = result;
        // alert("Success: " + r.responseText);
        new Vue({
            el: '#lineup',
            data: result
        });
        new Vue({
            el: '#series',
            data: result,
            filters: {
                colorSeries: function (value) {
                    return "color: " + value.color + "; background: " + value.bgcolor + ";";
                }
            },
            mounted: function () {
                $('.combo.dropdown')
                    .dropdown({
                    action: 'combo'
                });
                console.log("K");
                //在这里写试试
            }
        });
        // $('.menu .item').tab();
    };
    r.send();
}
function initSoft() {
    var r = new XMLHttpRequest();
    r.open("GET", "software.json", true);
    r.onreadystatechange = function () {
        if (r.readyState != 4 || r.status != 200)
            return;
        var result = JSON.parse(r.responseText);
        // if (chart) {
        //     Object.assign(chart, result);
        // } else
        //     chart = result;
        // alert("Success: " + r.responseText);
        new Vue({
            el: '#soft',
            data: result
        });
        // $('.menu .item').tab();
    };
    r.send();
}
function sortAmiibo(by, asc) {
    var fragment = document.createDocumentFragment();
    var lineup = document.getElementById("lineup");
    var arr = [];
    var nodes = enumAmiibos();
    for (var index = 0; index < nodes.length; index++) {
        arr.push(nodes[index]);
    }
    if (by === "date") {
        arr.sort(function (a, b) { return parseInt(a.dataset.date) - parseInt(b.dataset.date); });
    }
    else if (by === "series") {
        arr.sort(function (a, b) { return a.dataset.series.localeCompare(b.dataset.series); });
    }
    if (!asc) {
        arr.reverse();
    }
    for (var index = 0; index < arr.length; index++) {
        var element = arr[index];
        fragment.appendChild(element);
    }
    lineup.appendChild(fragment);
}
initLineup();
initSoft();
