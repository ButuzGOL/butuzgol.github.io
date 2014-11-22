# Rquire jekyll to compile the site.
require "jekyll"
require "tmpdir"

task :default do
end

task :publish do
  Rake::Task["publish:home"].invoke
end

namespace :publish do
  # Compile the Jekyll site using the config.
  Jekyll::Site.new(Jekyll.configuration({
    "source"      => ".",
    "destination" => "_site",
    "config" => "_config.yml"
  })).process

  def publish(origin)
    # Make a temporary directory for the build before production release.
    # This will be torn down once the task is complete.
    Dir.mktmpdir do |tmp|
      # Copy accross our compiled _site directory.
      cp_r "_site/.", tmp

      # Switch in to the tmp dir.
      Dir.chdir tmp

      # Prepare all the content in the repo for deployment.
      system "git init" # Init the repo.
      system "git add . && git commit -m 'Site updated at #{Time.now.utc}'" # Add and commit all the files.

      # Add the origin remote for the parent repo to the tmp folder.
      system "git remote add origin #{origin}"

      # Push the files to the master branch, forcing an overwrite.
      system "git push origin master --force"
    end
  end

  task :home do
    origin = `git config --get remote.origin.url`
    publish(origin)
  end
  task :travis do
    origin = "https://${GH_TOKEN}@github.com/ButuzGOL/butuzgol.github.io.git"
    system "git config --global user.email 'travis@nodemeatspace.com'"
    system "git config --global user.name 'Travis-CI'"

    publish(origin)
  end
  
end
