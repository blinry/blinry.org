class Thumbnailize < Nanoc::Filter
    identifier :thumbnailize
    type       :binary

    def run(filename, params={})
        system(
            'convert',
            '-flatten',
            '-interlace', 'plane',
            '-quality', '75',
            '-scale',
            params[:width].to_s+"x"+params[:width].to_s+"^",
            filename+"[0]", # to extract the first frame from gifs
            "jpg:"+output_filename
        )
    end
end
