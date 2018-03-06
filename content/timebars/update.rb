IO.read("index.md").scan(/youtube\("(.+?)"\)/) do |match|
    vid = match[0]
    if not File.exist?("timebars/#{vid}.png")
        puts "No timebar for VID #{vid}."
        `rm -f /tmp/video.3gp`
        print "Running youtube-dl... "
        output = `youtube-dl -f 36 -o /tmp/video.3gp http://www.youtube.com/watch?v=#{vid}`
        puts "done."
        puts output
        print "Running nordlicht... "
        output = `nordlicht /tmp/video.3gp -o timebars/#{vid}.png`
        puts "done."
        puts output
    end
end
