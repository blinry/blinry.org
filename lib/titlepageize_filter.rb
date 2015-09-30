class Titlepageize < Nanoc::Filter
    identifier :titlepageize
    type       :binary

    def run(filename, params={})
        system(
            'pdf2svg',
            filename,
            output_filename
        )
    end
end
