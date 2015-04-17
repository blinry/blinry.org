include Nanoc::Helpers::Rendering

def categories
    $categories ||= calculate_categories
end

def calculate_categories
    c = {}
    cats = {
        "Software" => "project",
        "Documents" => "document",
        "Design" => "art"
    }
    cats.each do |name, tag|
        used = c.values.flatten.uniq
        c[name] = with_tag(tag) - used
    end
    used = c.values.flatten.uniq
    c["Blog"] = things - used
    c
end

def things
    $things ||= calculate_things
end

def favs
    things.select{|i| i[:fav]}.sort_by{|i| i[:fav]}
end

def calculate_things
    @items['/'].children.select{|i| i[:published]}.sort_by{|i| i[:published]}.reverse
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
    abstract = item.raw_content.split("\n").find{|line| not line.empty?}
    if abstract
        max_len = 30*2
        if abstract.size > max_len
            abstract[0..max_len-1]+"…"
        else
            abstract
        end
    else
        ""
    end
end

def thumbnail_for item
    if not item[:thumbnail]
        thumbnail = @items.find{|i| i.path =~ Regexp.new("^"+Regexp.escape(item.path)+"thumbnail\.(png|jpg|svg|gif)$")}
        if thumbnail
            return thumbnail.path
        else
            thumbnail = @items.find{|i| i.path[Regexp.new(item.path+".*\.(png|jpg|svg|gif)")]}
            if thumbnail
                return thumbnail.path
            else
                return ""
            end
        end
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
    "http://morr.cc/"
end

def box(items)
    ret = "<div class=\"boxes\">"
    items.each do |item|
        ret << render("box", {:item => item})
    end
    ret << "</div>"
    ret
end
