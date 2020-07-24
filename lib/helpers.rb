include Nanoc::Helpers::Rendering
include Nanoc::Helpers::ChildParent

def things
    blk = -> { newest_first(@items.find_all("/**/*").select{|i| i[:published]}) }
    if @items.frozen?
        @things ||= blk.call
    else
        blk.call
    end
end

def link_to item, text=nil
    text = item[:title] if text.nil?
    "<a href=\"#{link_for(item)}\">#{text}</a>"
end

def calculate_tags
    @items.select{|i| i[:tags]}.map{|i| i[:tags]}.flatten.uniq.sort
end

def tags
    calculate_tags
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
        if link
            "<a href=\"/##{tag}\">#{tag}</a>"
        else
            tag
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
    if item[:subtitle]
        item[:subtitle]
    else
        content = item.raw_content.dup
        content.gsub!(/!\[([^\]]*)\]\([^)]*\)/,"") # remove images
        content.gsub!(/\[([^\]]*)\]\([^)]*\)/,"\\1") # replace links with link text
        content.gsub!(/[*"]/,"") # remove italic and bold markers and quotations
        content.strip!
        abstract = content[/^[[:print:]]{20,256}[.…!?:*]/] || item[:title]
    end
end

def thumbnail_for item
    if ENV["NANOC_ENV"] == "dev"
        # We don't build thumbnails in dev mode.
        @items[item[:thumbnail]].path
    else
        @items[item[:thumbnail]].reps[:thumbnail].path
    end
end

def minithumbnail_for item
    if ENV["NANOC_ENV"] == "dev"
        @items[item[:thumbnail]].path
    else
        @items[item[:thumbnail]].reps[:minithumbnail].path
    end
end

def with_tag tag
    things.select do |item|
        item[:tags] and item[:tags].include? tag
    end
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
    things.select { |i|
        next unless i[:tags]
        (i[:tags] & item[:tags]).size > 0 and i != item
    }.sort_by { |i|
        (i[:tags] & item[:tags]).size
    }.reverse
end
