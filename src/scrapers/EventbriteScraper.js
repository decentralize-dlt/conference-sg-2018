import { BaseScraper } from './BaseScraper.js';

/**
 * Scraper for Eventbrite Singapore - local events and activities
 */
export class EventbriteScraper extends BaseScraper {
  constructor() {
    super('Eventbrite Singapore', 'https://www.eventbrite.sg');
    this.categories = [
      { name: 'All Events', path: '/d/singapore--singapore/events/' },
      { name: 'Music', path: '/d/singapore--singapore/music/' },
      { name: 'Food & Drink', path: '/d/singapore--singapore/food-and-drink/' },
      { name: 'Arts', path: '/d/singapore--singapore/arts/' },
      { name: 'Business', path: '/d/singapore--singapore/business/' },
      { name: 'Health', path: '/d/singapore--singapore/health/' },
    ];
  }

  async scrape(options = {}) {
    const events = [];
    const categoriesToScrape = options.category
      ? this.categories.filter(c => c.name.toLowerCase().includes(options.category.toLowerCase()))
      : [this.categories[0]]; // Default to all events

    for (const category of categoriesToScrape) {
      const url = `${this.baseUrl}${category.path}`;
      console.log(`Scraping ${category.name} from Eventbrite...`);

      const $ = await this.fetchPage(url);
      if (!$) continue;

      // Eventbrite card selectors
      const selectors = [
        '[class*="event-card"]',
        '[class*="discover-search-desktop-card"]',
        '[data-testid*="event"]',
        'article',
        '[class*="eds-event-card"]',
      ];

      for (const selector of selectors) {
        $(selector).each((i, element) => {
          if (i >= 20) return false;

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
    const titleSelectors = [
      '[class*="event-card__title"]',
      '[class*="title"]',
      'h2', 'h3',
      'a[class*="event"]',
    ];

    let title = '';
    let url = '';

    for (const sel of titleSelectors) {
      const $title = $el.find(sel).first();
      if ($title.length) {
        title = $title.text().trim();
        url = $title.attr('href') || $el.find('a').first().attr('href') || '';
        if (title && title.length > 3) break;
      }
    }

    // Get description
    const descSelectors = ['[class*="description"]', '[class*="summary"]', 'p'];
    let description = '';
    for (const sel of descSelectors) {
      const $desc = $el.find(sel).first();
      if ($desc.length) {
        description = $desc.text().trim().slice(0, 200);
        if (description) break;
      }
    }

    // Get date
    const dateSelectors = ['[class*="date"]', '[class*="time"]', 'time'];
    let date = '';
    for (const sel of dateSelectors) {
      const $date = $el.find(sel).first();
      if ($date.length) {
        date = $date.text().trim() || $date.attr('datetime') || '';
        if (date) break;
      }
    }

    // Get location
    const locationSelectors = ['[class*="location"]', '[class*="venue"]', '[class*="address"]'];
    let location = 'Singapore';
    for (const sel of locationSelectors) {
      const $loc = $el.find(sel).first();
      if ($loc.length) {
        location = $loc.text().trim() || 'Singapore';
        break;
      }
    }

    // Get price
    const priceSelectors = ['[class*="price"]', '[class*="ticket"]'];
    let price = 'Check website';
    for (const sel of priceSelectors) {
      const $price = $el.find(sel).first();
      if ($price.length) {
        price = $price.text().trim() || 'Check website';
        break;
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
      location,
      url,
      image,
      date: date || 'See website for dates',
      price,
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
