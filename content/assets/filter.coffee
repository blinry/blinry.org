# trim whitespace
trim = (s) -> (s || '').replace(/^\s+|\s+$/g, '')

# filter by a regular experession, case-insensitive
$.expr[":"].contains = $.expr.createPseudo (arg) ->
    (elem) ->
        $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0

filter = (term, updateBox) ->
    if updateBox
        $("#morr-search").val(term)

    if term == ""
        window.history.replaceState("", "", window.originalURL)
    else
        if window.originalURL != "https://morr.cc"
            window.location.href = "/"+"#"+term
        else
            window.history.replaceState("", "", window.originalURL+"#"+term)

    $("#filters a").removeClass("selected")

    if term == ""
        $("#content .box").show()

        selected = $("#filters a").filter ->
            return $(this).attr("href") == "#"
    else
        $("#content .box").hide()

        ors = term.split("|")
        for o in ors
            o = trim(o)
            ands = o.split(" ")
            boxes = $("#content .box")
            for a in ands
                a = trim(a)
                boxes = boxes.has(".meta:contains("+a+")")
            boxes.show()

            if $("#filters a.hidden:contains("+o+")").length > 0
                $("#filters a.hidden").show()
                $("#toggle").html("-")

        selected = $("#filters a").filter ->
            return $(this).attr("href") == "#"+term

    selected.addClass("selected")

$ ->
    window.originalURL = window.location.pathname

    $(window).on "hashchange", ->
        term = window.location.hash.substr(1)
        hash = decodeURIComponent(term)
        filter(hash, true)

    $("#morr-search").keyup (e) ->
        filter($("#morr-search").val(), false)

    $(window).trigger("hashchange")

    $("#toggle").on "click", ->
        if $("#toggle").html().trim() == "+"
            $("#filters a.hidden").show()
            $("#toggle").html("-")
        else
            $("#filters a.hidden").hide()
            $("#toggle").html("+")
