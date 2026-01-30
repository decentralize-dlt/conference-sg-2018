#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import { TimeOutScraper, VisitSingaporeScraper, EventbriteScraper, SampleEventsScraper } from './scrapers/index.js';

const SCRAPERS = {
  timeout: TimeOutScraper,
  visitsg: VisitSingaporeScraper,
  eventbrite: EventbriteScraper,
  curated: SampleEventsScraper,
};

async function displayBanner() {
  console.log(chalk.cyan('\n╔══════════════════════════════════════════════════════════════╗'));
  console.log(chalk.cyan('║') + chalk.yellow.bold('     🇸🇬 Singapore Events & Activities Scraper Bot 🇸🇬      ') + chalk.cyan('║'));
  console.log(chalk.cyan('╚══════════════════════════════════════════════════════════════╝\n'));
}

async function displayEvent(event, index) {
  console.log(chalk.cyan(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`));
  console.log(chalk.yellow.bold(`#${index + 1}`) + ' ' + chalk.white.bold(event.title));
  console.log(chalk.cyan(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`));

  if (event.category) {
    console.log(chalk.magenta('📁 Category: ') + event.category);
  }
  if (event.description) {
    console.log(chalk.green('📝 Description: ') + event.description);
  }
  if (event.location) {
    console.log(chalk.blue('📍 Location: ') + event.location);
  }
  if (event.date) {
    console.log(chalk.yellow('📅 Date: ') + event.date);
  }
  if (event.price) {
    console.log(chalk.red('💰 Price: ') + event.price);
  }
  if (event.url) {
    console.log(chalk.gray('🔗 Link: ') + chalk.underline(event.url));
  }
  console.log(chalk.dim(`   Source: ${event.source}`));
}

async function displaySummary(events) {
  const bySource = {};
  const byCategory = {};

  events.forEach(e => {
    bySource[e.source] = (bySource[e.source] || 0) + 1;
    byCategory[e.category] = (byCategory[e.category] || 0) + 1;
  });

  console.log(chalk.cyan('\n\n══════════════════════════════════════════════════════════════'));
  console.log(chalk.yellow.bold('                        📊 SUMMARY                            '));
  console.log(chalk.cyan('══════════════════════════════════════════════════════════════\n'));

  console.log(chalk.white.bold(`Total Events Found: ${events.length}\n`));

  console.log(chalk.magenta.bold('By Source:'));
  Object.entries(bySource).forEach(([source, count]) => {
    console.log(`  • ${source}: ${count} events`);
  });

  console.log(chalk.green.bold('\nBy Category:'));
  Object.entries(byCategory).forEach(([category, count]) => {
    console.log(`  • ${category}: ${count} events`);
  });

  console.log(chalk.cyan('\n══════════════════════════════════════════════════════════════\n'));
}

async function runScrapers(options) {
  const allEvents = [];
  const sources = options.source ? [options.source] : Object.keys(SCRAPERS);

  for (const sourceKey of sources) {
    const ScraperClass = SCRAPERS[sourceKey];
    if (!ScraperClass) {
      console.log(chalk.red(`Unknown source: ${sourceKey}`));
      continue;
    }

    const scraper = new ScraperClass();
    try {
      console.log(chalk.blue(`\n🔍 Fetching from ${scraper.name}...`));
      const events = await scraper.scrape({ category: options.category });
      allEvents.push(...events);
      console.log(chalk.green(`✓ Found ${events.length} items from ${scraper.name}`));
    } catch (error) {
      console.log(chalk.red(`✗ Error scraping ${scraper.name}: ${error.message}`));
    }
  }

  return allEvents;
}

async function main() {
  program
    .name('sg-events')
    .description('Scrape interesting events and activities in Singapore')
    .version('1.0.0')
    .option('-s, --source <source>', 'Specific source to scrape (timeout, visitsg, eventbrite, curated)')
    .option('-c, --category <category>', 'Filter by category')
    .option('-f, --format <format>', 'Output format: console (default) or json', 'console')
    .option('-l, --limit <number>', 'Limit number of results', '50')
    .option('-o, --output <file>', 'Output file for JSON format')
    .option('-d, --demo', 'Use curated list of Singapore events (reliable, no web scraping)')
    .parse();

  const options = program.opts();

  await displayBanner();

  console.log(chalk.white('Starting Singapore Events Scraper...\n'));

  let events;

  if (options.demo || options.source === 'curated') {
    console.log(chalk.dim('Using curated list of Singapore events...\n'));
    const scraper = new SampleEventsScraper();
    events = await scraper.scrape({ category: options.category });
  } else {
    console.log(chalk.dim('Sources: TimeOut Singapore, Visit Singapore, Eventbrite'));
    console.log(chalk.dim('This may take a moment...\n'));
    console.log(chalk.yellow('Tip: Use --demo flag for reliable curated events list\n'));
    events = await runScrapers(options);
  }
  const limitedEvents = events.slice(0, parseInt(options.limit));

  if (options.format === 'json') {
    const output = JSON.stringify(limitedEvents, null, 2);
    if (options.output) {
      const fs = await import('fs');
      fs.writeFileSync(options.output, output);
      console.log(chalk.green(`\n✓ Results saved to ${options.output}`));
    } else {
      console.log(output);
    }
  } else {
    if (limitedEvents.length === 0) {
      console.log(chalk.yellow('\n⚠️  No events found. This could be due to:'));
      console.log(chalk.dim('   • Website structure changes'));
      console.log(chalk.dim('   • Network connectivity issues'));
      console.log(chalk.dim('   • Rate limiting from the websites'));
      console.log(chalk.dim('\nTry running again or check your internet connection.'));
    } else {
      console.log(chalk.green.bold(`\n🎉 Found ${limitedEvents.length} interesting things to do in Singapore!\n`));

      for (let i = 0; i < limitedEvents.length; i++) {
        await displayEvent(limitedEvents[i], i);
      }

      await displaySummary(limitedEvents);
    }
  }

  console.log(chalk.cyan('Happy exploring Singapore! 🌴\n'));
}

main().catch(error => {
  console.error(chalk.red('Fatal error:'), error.message);
  process.exit(1);
});
