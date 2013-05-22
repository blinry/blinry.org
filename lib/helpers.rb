def toplevel
    @items['/'].children.select{|i| i[:title]}.sort_by{|i| i[:order]}
end

def link_to item
    "<a href=\"#{item.path}\">#{item[:title]}</a>"
end

def tags
    @items.select{|i| i[:tags]}.map{|i| i[:tags]}.join(", ").split(",").map{|t| t.strip}.uniq
end

class Array
    def chronologic
        sort_by do |item|
            item[:published] || Date.new
        end
    end
end

def with_tag tag
    @items.select do |item|
        item[:tags] and item[:tags].split(",").map{|t| t.strip}.include? tag
    end
end
