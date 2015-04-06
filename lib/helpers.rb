include Nanoc::Helpers::Rendering

def things
    @items.select{|i| i[:published]}.chronologic.reverse
end

def toplevel
    @items['/'].children.select{|i| i[:title] and i[:order] and not i[:hidden]}.sort_by{|i| i[:order]}
end

def link_to item
    "<a href=\"#{item.path}\">#{item[:title]}</a>"
end

def tags
    @items.select{|i| i[:tags]}.map{|i| i[:tags]}.join(", ").split(",").map{|t| t.strip}.uniq
end

def tags_for item
    if item[:tags]
        item[:tags].split(",").map do |tag|
            tag = tag.strip
            "<a href=\"/blog/tag/#{tag}/\">#{tag}</a>"
        end.join(", ")
    else
        []
    end
end

def lang_for item
    if tags_for(item).include? "german"
        "de"
    else
        "en"
    end
end

def abstract_for item
    #abstract = item.compiled_content.split("\n").find{|line| not line.empty?}
    abstract = item.raw_content.split("\n").find{|line| not line.empty?}
    max_len = 30*2
    if abstract.size > max_len
        abstract[0..max_len-1]+"…"
    else
        abstract
    end
end

def thumbnail_for item
    if not item[:thumbnail]
        thumbnail = @items.find{|i| i.path == item.path+"thumbnail.png"}
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

class Array
    def chronologic
        sort_by do |item|
            item[:published] || Date.new
        end
    end
    def enum
        map { |item|
            entry = ""
            if item[:cover]
                entry << "<img src=\"#{item.path}cover.png\">"
            end
            if item[:published]
                entry << item[:published].strftime("%Y-%m-%d") << " -- "
            end
            entry << link_to(item)
            if item[:tags]
                entry << " / <span class=\"meta\">#{tags_for item}</span>"
            end
            entry
        }.join("\n\n")
    end
end

def with_tag tag
    @items.select do |item|
        item[:tags] and item[:tags].split(",").map{|t| t.strip}.include? tag
    end
end

def has_tag item, tag
    item[:tags] and item[:tags].split(",").map{|t| t.strip}.include? tag
end

def subtitle
    "morr.cc"
end

def domain
    "http://morr.cc/"
end
