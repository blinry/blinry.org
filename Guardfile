guard "nanoc" do
  watch("nanoc.yaml")
  watch("Rules")
  watch(%r{^(content|layouts|lib)/.*$})
end

guard "livereload" do
    watch(%r{output/.+\.(css|js|html)})
end
