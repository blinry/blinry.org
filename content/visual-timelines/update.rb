IO.read("index.md").scan(/youtube\("([^"]+?)"\)/) do |match|
    vid = match[0]

    file = "videos/#{vid}.mp4"
    puts "Processing #{vid}..."

    if not File.exist?(file)
        puts "Video not found."
        print "Running youtube-dl... "
        system("youtube-dl -f 160 -o #{file} http://www.youtube.com/watch?v=#{vid}")
    end

    if not File.exist?("timebars/#{vid}.jpg") or not File.exist?("thumbnails/#{vid}.jpg")
        puts "Either timebar or thumbnail file not found."
        print "Running nordlicht... "
        system("~/wip/nordlicht/rust/target/debug/nordlicht /home/seb/permanent/homepage/content/visual-timelines/#{file} --timeline timebars/#{vid}.jpg --thumbnails thumbnails/#{vid}.jpg -w 1000 -h 90")
    end
end
