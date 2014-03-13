module Jekyll
  class BaseTaxonomyPage < Page
    def initialize(site, base, dir, page)
      @site = site
      @base = base
      @dir = dir
      @page = page
      @name = 'index.html'
      self.process @name
      self.read_yaml File.join(base, '_layouts'), layout_page
    end

    def layout_page
      raise
    end
  end

  class TaxonomyPage < BaseTaxonomyPage
    def initialize(site, base, dir, taxonomy, page)
      super(site, base, dir, page)
      self.data['taxonomy'] = taxonomy
      self.data['title'] = taxonomy
    end

    def layout_page
      @page + '_page.html'
    end
  end

  class TaxonomyPageGenerator < Generator
    safe true

    def generate(site)
      generate_taxonomy(site, :tag)
      generate_taxonomy(site, :category)
    end

    private

    def generate_taxonomy(site, type)
      case type
      when :tag
        taxonomies = site.tags
        page = 'tag'
      when :category
        taxonomies = site.categories
        page = 'category'
      end
      
      if site.layouts.has_key? page + '_page'
        dir = site.config['taxonomy_page_dir'] || page
        taxonomies.keys.each do |taxonomy|
          write_page(site, File.join(dir, taxonomy), taxonomy, page)
        end
      end
    end

    def write_page(site, dir, taxonomy, page)
      page = TaxonomyPage.new(site, site.source, dir, taxonomy, page)
      page.render(site.layouts, site.site_payload)
      page.write(site.dest)
      site.pages << page
    end
  end

end