def titlepage file, title, url=nil
    link = url || "#{file}.pdf"
    "[![#{title}](#{file}-titlepage.svg)](#{link}){:.titlepage title=\"#{title}\"}"
end

def tweet id
<<HERE
<blockquote class="twitter-tweet" data-conversation="none" data-width="550px">Loading tweet...<a href="https://twitter.com/blinry/status/#{id}"></a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
HERE
end
