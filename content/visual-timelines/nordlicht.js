WIDTH = 500;
THUMB_WIDTH = 160;
THUMB_HEIGHT = 90;
THUMB_COUNT = 1000;
THUMB_COLUMNS = 20;

function initIframe(iframe) {
    var style = "";
    var klass = iframe.attr("class");
    if (klass) {
        style = klass.match(/nordlicht(-\w+)/)[1];
    }

    iframe.attr("src", iframe.attr("src")+"&enablejsapi=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3");
    iframe.attr("style", (iframe.attr("style")||"")+"margin-bottom: 0; padding-bottom: 0");

    var width = iframe.attr("width");

    var vid = iframe.attr("src").split("/").pop();
    var url = iframe.attr("src");
    var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    var vid = url.match(regExp)[1];
    iframe.attr("id", vid+style);

    var timebardiv = $(document.createElement("div"));
    iframe.after(timebardiv.get(0))
    timebardiv.attr("class", "timebar");
    timebardiv.attr("style", "width: "+width+"px");
    timebardiv.attr("draggable", "false");

    var bar = $(document.createElement("img"));
    bar.attr("src", "timebars/"+vid+style+".jpg");
    bar.attr("draggable", "false");
    timebardiv.append(bar.get(0));
    bar.click(function(event) {
        x = event.offsetX?(event.offsetX):event.pageX-bar.offsetLeft;
        x = x/bar.width()*player.getDuration();
        player.seekTo(x, true);
    });

    bar.mousedown(function(event) {
        bar.data("mousedown", true);
    });

    bar.mouseup(function(event) {
        bar.data("mousedown", false);
    });

    bar.mouseover(function(event) {
        bar.data("mouseover", true);
    });

    bar.mouseout(function(event) {
        bar.data("mouseover", false);
    });

    bar.mousemove(function(event) {
        x = event.offsetX?(event.offsetX):event.pageX-bar.offsetLeft;

        if (bar.data("mousedown")) {
            //bar.click(event);
            x = x/bar.width()*player.getDuration();
            player.seekTo(x, true);
        }

        //marker.get(0).style.marginLeft = (x-11)+"px";

        //var i = Math.round(player.getCurrentTime()/player.getDuration()*THUMB_COUNT);
        var n = Math.round(x/bar.width()*THUMB_COUNT);
        var tx = n % THUMB_COLUMNS;
        var ty = Math.floor(n/THUMB_COLUMNS);
        thumbnaildiv.css("background-position", (-tx*THUMB_WIDTH)+"px "+(-ty*THUMB_HEIGHT)+"px");
        thumbnaildiv.get(0).style.marginLeft = Math.min(Math.max(11,(x-THUMB_WIDTH/2-5)),550-160-5-14)+"px";
    });

    var marker = $(document.createElement("div"));
    marker.attr("draggable", "false");
    marker.attr("class", "marker");
    timebardiv.append(marker.get(0));

    var player = new YT.Player(vid+style, {
        playerVars: { 'controls': 0, 'modestbranding': 1, 'rel': 0, 'iv_load_policy': 3 },
        events: {
            'onReady': function() {
                // nop
            }

        }
    });

    var thumbnaildiv = $(document.createElement("div"));
    marker.after(thumbnaildiv.get(0));
    thumbnaildiv.attr("class", "thumbnail");
    thumbnaildiv.css("background", "url(thumbnails/"+vid+".jpg), url(loading.png)");
    thumbnaildiv.attr("draggable", "false");

    //var thumbnail = $(document.createElement("img"));
    //thumbnail.attr("src", "thumbnails/"+vid+style+".jpg");
    //thumbnaildiv.append(thumbnail.get(0));

    setInterval(function(){
        marker.get(0).style.marginLeft = (player.getCurrentTime()/player.getDuration()*bar.width()-11)+"px";

        //var n = Math.round(player.getCurrentTime()/player.getDuration()*THUMB_COUNT);
        //var tx = n % THUMB_COLUMNS;
        //var ty = Math.floor(n/THUMB_COLUMNS);
        //thumbnaildiv.css("background-position", (-tx*THUMB_WIDTH)+"px "+(-ty*THUMB_HEIGHT)+"px");
        //thumbnaildiv.get(0).style.marginLeft = (player.getCurrentTime()/player.getDuration()*bar.width()-THUMB_WIDTH/2)+"px";
    }, 1/30);
}

//function initPlayer(div) {
//    var playerdiv = document.createElement("div");
//    var vid = div.attr("id");
//    playerdiv.id = "player-"+vid;
//    div.append(playerdiv);
//
//    var timebardiv = document.createElement("div");
//    div.append(timebardiv);
//    $(timebardiv).attr("class", "timebar");
//    $(timebardiv).attr("style", "width: "+WIDTH+"px");
//
//    var bar = document.createElement("img");
//    $(bar).attr("src", "timebars/"+vid+".jpg");
//    timebardiv.append(bar);
//    $(bar).click(function(event) {
//        x = event.offsetX?(event.offsetX):event.pageX-bar.offsetLeft;
//        x = x/WIDTH*player.getDuration();
//        player.seekTo(x, true);
//    });
//
//    var marker = document.createElement("div");
//    timebardiv.append(marker);
//
//    var player = new YT.Player("player-"+vid, {
//        width: ""+WIDTH,
//        height: ""+9/16*WIDTH,
//        videoId: vid,
//        playerVars: { 'controls': 0, 'modestbranding': 1, 'rel': 0, 'iv_load_policy': 3 },
//        events: {
//            'onReady': function() {
//                // nop
//            }
//
//        }
//    });
//
//    setInterval(function(){
//        marker.style.marginLeft = (player.getCurrentTime()/player.getDuration()*WIDTH-10)+"px";
//    }, 1/30);
//}

// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    $("iframe").not(".nordlicht-none").each(function() {
        initIframe($(this));
    });
}
