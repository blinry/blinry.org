include Nanoc::Helpers::Rendering

def blog
    @items.select{|i| i.identifier =~ /\/blog\/./ and i[:published]}.chronologic.reverse
end

def projects
    @items.select{|i| i.identifier =~ /\/projects\/./ and i[:title]}.chronologic.reverse
end

def toplevel
    @items['/'].children.select{|i| i[:title] and not i[:hidden]}.sort_by{|i| i[:order]}
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
    return item.compiled_content.split("\n").find{|line| not line.empty?}
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

def subtitle
    "Sebastian Morr's blog about technology, art, and life"
end

def domain
    "http://blog.morr.cc/"
end
