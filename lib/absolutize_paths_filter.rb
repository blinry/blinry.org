class AbsolutizePathsFilter < Nanoc::Filter
    identifier :absolutize_paths
    type :text

    def run(content, params={})
        content.gsub(/\]\(([^\/].+?)\)/) do
            if $1.include?'://'
                "](#{$1})"
            else
                "](#{@item.path+$1})"
            end
        end
    end
end
