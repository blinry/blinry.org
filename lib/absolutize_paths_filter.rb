class AbsolutizePathsFilter < Nanoc3::Filter
    identifier :absolutize_paths
    type :text

    def run(content, params={})
        content.gsub(/\]\(([^\/].+?)\)/) do
            "](#{@item.path+$1})"
        end
    end
end
