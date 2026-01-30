# Singapore Events Scraper Bot

A Node.js web scraper that fetches interesting events and activities in Singapore from multiple sources.

## Installation

```bash
npm install
```

## Usage

```bash
# Run with curated events list (recommended - reliable)
npm start -- --demo

# Run scrapers (may be blocked by websites)
npm start

# Filter by category
npm start -- --demo --category food
npm start -- --demo --category nature

# Output as JSON
npm start -- --demo --format json

# Save to file
npm start -- --demo --format json --output events.json

# Limit results
npm start -- --demo --limit 10

# Use specific source
npm start -- --source timeout
npm start -- --source eventbrite
npm start -- --source curated
```

## Options

| Option | Description |
|--------|-------------|
| `-d, --demo` | Use curated list of Singapore events (reliable, no scraping) |
| `-s, --source <source>` | Specific source: timeout, visitsg, eventbrite, curated |
| `-c, --category <category>` | Filter by category (food, nature, attractions, etc.) |
| `-f, --format <format>` | Output format: console (default) or json |
| `-l, --limit <number>` | Limit number of results (default: 50) |
| `-o, --output <file>` | Output file for JSON format |

## Categories

- Attractions
- Culture & Heritage
- Art & Museums
- Food & Drink
- Nightlife
- Nature & Outdoors
- Shopping
- Entertainment

## Sources

- **TimeOut Singapore** - Popular things to do and events
- **Visit Singapore** - Official tourism board listings
- **Eventbrite Singapore** - Local events and activities
- **Curated List** - Hand-picked popular Singapore attractions (use `--demo`)

## Note

Web scraping may be blocked by some websites. Use the `--demo` flag for a reliable curated list of Singapore events and attractions.
