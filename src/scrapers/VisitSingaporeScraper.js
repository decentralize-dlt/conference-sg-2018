import { BaseScraper } from './BaseScraper.js';

/**
 * Scraper for Visit Singapore (official tourism board) - attractions and activities
 */
export class VisitSingaporeScraper extends BaseScraper {
  constructor() {
    super('Visit Singapore', 'https://www.visitsingapore.com');
    this.categories = [
      { name: 'See & Do', path: '/en/see-do-singapore/' },
      { name: 'Events', path: '/en/festivals-events-singapore/' },
      { name: 'Attractions', path: '/en/see-do-singapore/attractions/' },
      { name: 'Nature & Wildlife', path: '/en/see-do-singapore/nature-wildlife/' },
      { name: 'Arts & Culture', path: '/en/see-do-singapore/arts-culture/' },
    ];
  }

  async scrape(options = {}) {
    const events = [];
    const categoriesToScrape = options.category
      ? this.categories.filter(c => c.name.toLowerCase().includes(options.category.toLowerCase()))
      : this.categories.slice(0, 3);

    for (const category of categoriesToScrape) {
      const url = `${this.baseUrl}${category.path}`;
      console.log(`Scraping ${category.name} from Visit Singapore...`);

      const $ = await this.fetchPage(url);
      if (!$) continue;

      // Visit Singapore card selectors
      const selectors = [
        '[class*="card"]',
        '[class*="listing"]',
        '[class*="item"]',
        'article',
      ];

      for (const selector of selectors) {
        $(selector).each((i, element) => {
          if (i >= 15) return false;

          const $el = $(element);
          const event = this.parseEventCard($, $el, category.name);

          if (event && event.title && event.title !== 'Untitled' && event.title.length > 3) {
            events.push(event);
          }
        });

        if (events.length > 0) break;
      }
    }

    return this.deduplicateEvents(events);
  }

  parseEventCard($, $el, categoryName) {
    const titleSelectors = ['h2', 'h3', 'h4', '[class*="title"]', '[class*="heading"]', 'a'];

    let title = '';
    let url = '';

    for (const sel of titleSelectors) {
      const $title = $el.find(sel).first();
      if ($title.length) {
        title = $title.text().trim();
        const $link = $title.is('a') ? $title : $title.find('a').first();
        url = $link.attr('href') || $el.find('a').first().attr('href') || '';
        if (title && title.length > 3) break;
      }
    }

    const descSelectors = ['[class*="description"]', '[class*="excerpt"]', 'p'];
    let description = '';
    for (const sel of descSelectors) {
      const $desc = $el.find(sel).first();
      if ($desc.length) {
        description = $desc.text().trim().slice(0, 200);
        if (description) break;
      }
    }

    const $img = $el.find('img').first();
    const image = $img.attr('src') || $img.attr('data-src') || '';

    if (url && !url.startsWith('http')) {
      url = `${this.baseUrl}${url}`;
    }

    return this.formatEvent({
      title,
      description,
      category: categoryName,
      location: 'Singapore',
      url,
      image,
      date: 'Ongoing',
    });
  }

  deduplicateEvents(events) {
    const seen = new Set();
    return events.filter(event => {
      const key = event.title.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
}
