// trim whitespace
var trim = function (s) {
    return (s || "").replace(/^\s+|\s+$/g, "")
}

// filter by a regular experession, case-insensitive
$.expr[":"].contains = $.expr.createPseudo(function (arg) {
    return function (elem) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0
    }
})

var filter = function (term, updateBox) {
    var a, ands, boxes, i, j, len, len1, o, ors, selected
    if (updateBox) {
        $("#morr-search").val(term)
    }
    if (term === "") {
        window.history.replaceState("", "", window.originalURL)
    } else {
        if (window.originalURL !== "https://morr.cc") {
            window.location.href = "/" + "#" + term
        } else {
            window.history.replaceState("", "", window.originalURL + "#" + term)
        }
    }
    $("#filters a").removeClass("selected")
    if (term === "") {
        $("#content .box").show()
        selected = $("#filters a").filter(function () {
            return $(this).attr("href") === "#"
        })
    } else {
        $("#content .box").hide()
        ors = term.split("|")
        for (i = 0, len = ors.length; i < len; i++) {
            o = ors[i]
            o = trim(o)
            ands = o.split(" ")
            boxes = $("#content .box")
            for (j = 0, len1 = ands.length; j < len1; j++) {
                a = ands[j]
                a = trim(a)
                boxes = boxes.has(".meta:contains(" + a + ")")
            }
            boxes.show()
            if ($("#filters a.hidden:contains(" + o + ")").length > 0) {
                $("#filters a.hidden").show()
                $("#toggle").html("-")
            }
        }
        selected = $("#filters a").filter(function () {
            return $(this).attr("href") === "#" + term
        })
    }
    return selected.addClass("selected")
}

$(function () {
    window.originalURL = window.location.pathname
    $(window).on("hashchange", function () {
        var hash, term
        term = window.location.hash.substr(1)
        hash = decodeURIComponent(term)
        return filter(hash, true)
    })
    $("#morr-search").keyup(function (e) {
        return filter($("#morr-search").val(), false)
    })
    $(window).trigger("hashchange")
    return $("#toggle").on("click", function () {
        if ($("#toggle").html().trim() === "+") {
            $("#filters a.hidden").show()
            return $("#toggle").html("-")
        } else {
            $("#filters a.hidden").hide()
            return $("#toggle").html("+")
        }
    })
})
