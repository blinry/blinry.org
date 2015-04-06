class Thumbnailize < Nanoc::Filter
    identifier :thumbnailize
    type       :binary

    def run(filename, params={})
        system(
            'convert',
            '-resize',
            params[:width].to_s,
            filename,
            output_filename
        )
    end
end
