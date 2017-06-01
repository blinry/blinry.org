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

def youtube id
<<HERE
<iframe width="550px" height="310px"
src="https://www.youtube.com/embed/#{id}?rel=0" frameborder="0" allowfullscreen>
</iframe>
HERE
end

def media_ccc_de id
<<HERE
<iframe width="663px" height="376px"
src="https://media.ccc.de/v/#{id}/oembed" frameborder="0" allowfullscreen>
</iframe>
HERE
end
