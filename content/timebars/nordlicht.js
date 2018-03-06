WIDTH = 500;

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

    var bar = $(document.createElement("img"));
    bar.attr("src", "timebars/"+vid+style+".png");
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

    bar.mousemove(function(event) {
        if (bar.data("mousedown")) {
            //bar.click(event);
            x = event.offsetX?(event.offsetX):event.pageX-bar.offsetLeft;
            x = x/bar.width()*player.getDuration();
            player.seekTo(x, true);
        }
    });

    var marker = document.createElement("div");
    timebardiv.append(marker);

    var player = new YT.Player(vid+style, {
        playerVars: { 'controls': 0, 'modestbranding': 1, 'rel': 0, 'iv_load_policy': 3 },
        events: {
            'onReady': function() {
                // nop
            }

        }
    });

    setInterval(function(){
        marker.style.marginLeft = (player.getCurrentTime()/player.getDuration()*bar.width()-11)+"px";
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
//    $(bar).attr("src", "timebars/"+vid+".png");
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
