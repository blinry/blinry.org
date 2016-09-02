include Nanoc::Helpers::Rendering

def categories
    $categories ||= calculate_categories
end

def calculate_categories
    c = {}

    c["Software"] = with_tag("project")
    c["Documents"] = newest_first((with_tag("document") + with_tag("talk") + with_tag("paper")).uniq) - c.values.flatten
    c["Design"] = with_tag("art") - c.values.flatten
    c["Blog"] = things - c.values.flatten

    c
end

def things
    $things ||= calculate_things
end

def favs
    things.select{|i| i[:fav]}.sort_by{|i| i[:fav]}
end

def calculate_things
    newest_first(@items.find_all("/**/*").select{|i| i[:published]})
end

def link_to item, text=nil
    text = item[:title] if text.nil?
    "<a href=\"#{link_for(item)}\">#{text}</a>"
end

def tags
    things.select{|i| i[:tags]}.map{|i| i[:tags]}.flatten.uniq
end

def link_for item
    if item[:url]
        item[:url]
    else
        item.path
    end
end

def tags_for item, link=true
    item[:tags].map do |tag|
        if tag == "german"
            text = "<img class=\"flag\" src=\"/assets/images/de.svg\" alt=\"german\" />"
        else
            text = tag
        end
        if link
            "<a href=\"/tag/#{tag}/\">#{text}</a>"
        else
            text
        end
    end.join(", ")
end

def lang_for item
    if item[:tags] and item[:tags].include? "german"
        "de"
    else
        "en"
    end
end

def abstract_for item
    content = item.raw_content.dup
    content.gsub!(/\[([^\]]*)\]\([^)]*\)/,"\\1") # remove links
    content.gsub!(/[*"]/,"") # remove italic and bold markers and quotations
    abstract = content[/^[[:print:]]{20,256}[.!?:*][[:space:]]/]
end

def thumbnail_for item
    if item[:thumbnail]
        item.path+item[:thumbnail]
    else
        candidates = @items.find_all(@item.identifier.to_s.sub(/[^\/]+$/, "") + "*")

        images = candidates.select{|c| c.path =~ Regexp.new("\.(png|jpg|svg|gif)$")}
        thumbnail = images.find{|i| i.path =~ Regexp.new("/thumbnail\....$")}
        return thumbnail.path if thumbnail

        pdfs = candidates.select{|c| c.path =~ Regexp.new("\.pdf$")}
        thumbnail = pdfs.find{|p| p.path =~ Regexp.new("talk")}
        return thumbnail.reps[:titlepage].path if thumbnail

        return images.first.path unless images.empty?

        return pdfs.first.reps[:titlepage].path unless pdfs.empty?

        return ""
    end
end

def with_tag tag
    things.select do |item|
        item[:tags] and item[:tags].include? tag
    end
end

def subtitle
    "morr.cc"
end

def domain
    "https://morr.cc/"
end

def box(items)
    ret = "<div class=\"boxes\">"
    items.each do |item|
        ret << render("/box.*", {:item => item})
    end
    ret << "</div>"
    ret
end

def newest_first(items)
    items.select{|i| i[:updated] || i[:published] }.sort_by{|i| i[:updated] || i[:published]}.reverse
end

def similar(item)
    items.select { |i|
        next unless i[:tags]
        (i[:tags] & item[:tags]).size > 0 and i != item
    }.sort_by { |i|
        (i[:tags] & item[:tags]).size
    }.reverse
end
