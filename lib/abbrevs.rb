def titlepage file, title, url=nil
    file = file.split(".").first
    link = url || "#{file}.pdf"
    "[![#{title}](#{file}-titlepage.svg)](#{link}){:.titlepage title=\"#{title}\"}"
end
