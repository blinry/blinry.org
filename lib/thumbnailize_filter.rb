class Thumbnailize < Nanoc::Filter
    identifier :thumbnailize
    type       :binary

    def run(filename, params={})
        system(
            'convert',
            '-resize',
            params[:width].to_s+"x"+params[:width].to_s+"^",
            filename+"[0]", # to extract the first frame from gifs
            "png:"+output_filename
        )
    end
end
