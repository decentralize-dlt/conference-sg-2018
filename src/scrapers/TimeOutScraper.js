import { BaseScraper } from './BaseScraper.js';

/**
 * Scraper for TimeOut Singapore - things to do, events, and activities
 */
export class TimeOutScraper extends BaseScraper {
  constructor() {
    super('TimeOut Singapore', 'https://www.timeout.com');
    this.categories = [
      { name: 'Things to Do', path: '/singapore/things-to-do' },
      { name: 'Attractions', path: '/singapore/attractions' },
      { name: 'Events', path: '/singapore/things-to-do/events-in-singapore' },
      { name: 'Free Things', path: '/singapore/things-to-do/free-things-to-do-in-singapore' },
      { name: 'Art & Culture', path: '/singapore/art' },
      { name: 'Food & Drink', path: '/singapore/restaurants' },
      { name: 'Nightlife', path: '/singapore/nightlife' },
    ];
  }

  async scrape(options = {}) {
    const events = [];
    const categoriesToScrape = options.category
      ? this.categories.filter(c => c.name.toLowerCase().includes(options.category.toLowerCase()))
      : this.categories.slice(0, 3); // Default to first 3 categories

    for (const category of categoriesToScrape) {
      const url = `${this.baseUrl}${category.path}`;
      console.log(`Scraping ${category.name} from TimeOut...`);

      const $ = await this.fetchPage(url);
      if (!$) continue;

      // TimeOut uses article cards for listings
      const selectors = [
        'article[class*="card"]',
        'div[class*="card"]',
        '[class*="listing-item"]',
        '[class*="article-item"]',
        'article',
      ];

      for (const selector of selectors) {
        $(selector).each((i, element) => {
          if (i >= 15) return false; // Limit per category

          const $el = $(element);
          const event = this.parseEventCard($, $el, category.name);

          if (event && event.title && event.title !== 'Untitled') {
            events.push(event);
          }
        });

        if (events.length > 0) break;
      }
    }

    return this.deduplicateEvents(events);
  }

  parseEventCard($, $el, categoryName) {
    // Try multiple selectors for title
    const titleSelectors = [
      'h2 a', 'h3 a', 'h4 a',
      '[class*="title"] a',
      '[class*="heading"] a',
      'a[class*="link"]',
      'h2', 'h3', 'h4',
    ];

    let title = '';
    let url = '';

    for (const sel of titleSelectors) {
      const $title = $el.find(sel).first();
      if ($title.length) {
        title = $title.text().trim();
        url = $title.attr('href') || '';
        if (title) break;
      }
    }

    // Try multiple selectors for description
    const descSelectors = [
      '[class*="description"]',
      '[class*="excerpt"]',
      '[class*="summary"]',
      'p',
    ];

    let description = '';
    for (const sel of descSelectors) {
      const $desc = $el.find(sel).first();
      if ($desc.length) {
        description = $desc.text().trim().slice(0, 200);
        if (description) break;
      }
    }

    // Try to find image
    const $img = $el.find('img').first();
    const image = $img.attr('src') || $img.attr('data-src') || '';

    // Try to find location/venue
    const locationSelectors = ['[class*="venue"]', '[class*="location"]', '[class*="address"]'];
    let location = 'Singapore';
    for (const sel of locationSelectors) {
      const $loc = $el.find(sel).first();
      if ($loc.length) {
        location = $loc.text().trim() || 'Singapore';
        break;
      }
    }

    // Make URL absolute
    if (url && !url.startsWith('http')) {
      url = `${this.baseUrl}${url}`;
    }

    return this.formatEvent({
      title,
      description,
      category: categoryName,
      location,
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
