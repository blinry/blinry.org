include Nanoc::Helpers::Rendering

def blog
    @items.select{|i| i[:published]}.chronologic.reverse
end

def toplevel
    @items['/'].children.select{|i| i[:title]}.sort_by{|i| i[:order]}
end

def link_to item
    "<a href=\"#{item.path}\">#{item[:title]}</a>"
end

def tags
    @items.select{|i| i[:tags]}.map{|i| i[:tags]}.join(", ").split(",").map{|t| t.strip}.uniq
end

def tags_for item
    item[:tags].split(",").map do |tag|
        tag = tag.strip
        "<a href=\"/tag/#{tag}/\">#{tag}</a>"
    end.join(", ")
end

class Array
    def chronologic
        sort_by do |item|
            item[:published] || Date.new
        end
    end
    def enum
        map { |item|
            "#{item[:published]} -- #{link_to item} / <span class=\"meta\">#{tags_for item}</span>"
        }.join("\n\n")
    end
end

def with_tag tag
    @items.select do |item|
        item[:tags] and item[:tags].split(",").map{|t| t.strip}.include? tag
    end
end
