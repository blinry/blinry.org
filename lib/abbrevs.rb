def titlepage file, title, url=nil
    link = url || "#{file}.pdf"
    "[![#{title}](#{file}.pdf-titlepage.svg)](#{link}){:.titlepage title=\"#{title}\"}"
end

def tweet id
<<HERE
<blockquote class="twitter-tweet" data-conversation="none" data-width="550px">Loading tweet...<a href="https://twitter.com/blinry/status/#{id}"></a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
HERE
end

def youtube id, classes: nil, start: nil
<<HERE
<iframe #{classes ? "class=\"#{classes}\"" : ""} width="550" height="310"
src="https://www.youtube.com/embed/#{id}?#{start ? "start=#{start}&" : ""}rel=0" frameborder="0" allowfullscreen>
</iframe>
HERE
end

def vimeo id
<<HERE
<iframe src="https://player.vimeo.com/video/#{id}" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
HERE
end

def media_ccc_de id
<<HERE
<iframe width="663" height="376"
src="https://media.ccc.de/v/#{id}/oembed" frameborder="0" allowfullscreen>
</iframe>
HERE
end

def soundcloud name
<<HERE
<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/#{name}&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
HERE
end

def twitch id, start: nil
<<HERE
<iframe src="https://player.twitch.tv/?autoplay=false&video=v#{id}#{start ? "&time=#{start}" : "" }" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe>
HERE
end
