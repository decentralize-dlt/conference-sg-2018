/**
 * Sample curated events data for Singapore
 * These are popular attractions and recurring events that are typically available
 */
export const SAMPLE_EVENTS = [
  // Attractions
  {
    source: 'Curated List',
    title: 'Gardens by the Bay',
    description: 'Iconic waterfront gardens featuring Supertree Grove, Cloud Forest, and Flower Dome conservatories. A must-visit attraction with stunning light shows.',
    category: 'Attractions',
    location: '18 Marina Gardens Dr, Singapore 018953',
    date: 'Daily, 5am-2am (Outdoor gardens)',
    url: 'https://www.gardensbythebay.com.sg/',
    price: 'Free (Outdoor) / S$20-53 (Conservatories)',
  },
  {
    source: 'Curated List',
    title: 'Marina Bay Sands SkyPark',
    description: 'Observation deck on the 57th floor offering panoramic views of Singapore skyline and Marina Bay.',
    category: 'Attractions',
    location: '10 Bayfront Ave, Singapore 018956',
    date: 'Daily, 11am-9pm',
    url: 'https://www.marinabaysands.com/sands-skypark.html',
    price: 'S$26-32',
  },
  {
    source: 'Curated List',
    title: 'Sentosa Island',
    description: 'Resort island featuring beaches, Universal Studios, S.E.A. Aquarium, cable car rides, and Adventure Cove Waterpark.',
    category: 'Attractions',
    location: 'Sentosa Island, Singapore',
    date: 'Daily',
    url: 'https://www.sentosa.com.sg/',
    price: 'Free entry (attractions priced separately)',
  },
  {
    source: 'Curated List',
    title: 'Singapore Zoo & Night Safari',
    description: 'World-renowned zoo with open-concept enclosures. Night Safari offers unique nocturnal wildlife viewing experience.',
    category: 'Attractions',
    location: '80 Mandai Lake Rd, Singapore 729826',
    date: 'Zoo: 8:30am-6pm / Night Safari: 6:15pm-midnight',
    url: 'https://www.mandai.com/',
    price: 'S$48-59 per attraction',
  },
  {
    source: 'Curated List',
    title: 'Universal Studios Singapore',
    description: 'Southeast Asia\'s first Hollywood movie theme park featuring thrilling rides, shows, and attractions across 7 themed zones.',
    category: 'Attractions',
    location: '8 Sentosa Gateway, Singapore 098269',
    date: 'Daily, 10am-7pm (hours vary)',
    url: 'https://www.rwsentosa.com/en/attractions/universal-studios-singapore',
    price: 'S$82-92',
  },

  // Cultural & Heritage
  {
    source: 'Curated List',
    title: 'Chinatown Heritage Walk',
    description: 'Explore vibrant streets filled with traditional shophouses, temples, and street food. Visit Buddha Tooth Relic Temple.',
    category: 'Culture & Heritage',
    location: 'Chinatown, Singapore',
    date: 'Daily',
    url: 'https://www.visitsingapore.com/see-do-singapore/places-to-see/chinatown/',
    price: 'Free',
  },
  {
    source: 'Curated List',
    title: 'Little India Walking Tour',
    description: 'Colorful neighborhood with temples, spice shops, and authentic Indian cuisine. Don\'t miss Sri Veeramakaliamman Temple.',
    category: 'Culture & Heritage',
    location: 'Little India, Singapore',
    date: 'Daily',
    url: 'https://www.visitsingapore.com/see-do-singapore/places-to-see/little-india/',
    price: 'Free',
  },
  {
    source: 'Curated List',
    title: 'Kampong Glam & Arab Street',
    description: 'Historic Muslim quarter featuring the stunning Sultan Mosque, trendy cafes, and boutique shops selling textiles and perfumes.',
    category: 'Culture & Heritage',
    location: 'Kampong Glam, Singapore',
    date: 'Daily',
    url: 'https://www.visitsingapore.com/see-do-singapore/places-to-see/kampong-glam/',
    price: 'Free',
  },
  {
    source: 'Curated List',
    title: 'National Gallery Singapore',
    description: 'Southeast Asia\'s largest visual arts institution housed in the former Supreme Court and City Hall buildings.',
    category: 'Art & Museums',
    location: '1 St Andrew\'s Rd, Singapore 178957',
    date: 'Daily, 10am-7pm',
    url: 'https://www.nationalgallery.sg/',
    price: 'S$20 (Singaporeans/PRs free)',
  },
  {
    source: 'Curated List',
    title: 'ArtScience Museum',
    description: 'Iconic lotus-shaped museum featuring interactive exhibitions blending art, science, and technology. Future World permanent exhibit.',
    category: 'Art & Museums',
    location: '6 Bayfront Ave, Singapore 018974',
    date: 'Daily, 10am-7pm',
    url: 'https://www.marinabaysands.com/museum.html',
    price: 'S$17-26',
  },

  // Food & Drink
  {
    source: 'Curated List',
    title: 'Maxwell Food Centre',
    description: 'Famous hawker center home to Tian Tian Chicken Rice. Experience authentic local street food at affordable prices.',
    category: 'Food & Drink',
    location: '1 Kadayanallur St, Singapore 069184',
    date: 'Daily, varies by stall',
    url: 'https://www.visitsingapore.com/dining-drinks-singapore/local-food/hawker-centres/maxwell-food-centre/',
    price: 'S$3-10 per dish',
  },
  {
    source: 'Curated List',
    title: 'Lau Pa Sat Festival Market',
    description: 'Victorian-era hawker center famous for BBQ satay street. Great atmosphere for evening dining.',
    category: 'Food & Drink',
    location: '18 Raffles Quay, Singapore 048582',
    date: 'Daily, 24 hours (some stalls vary)',
    url: 'https://www.laupasat.biz/',
    price: 'S$5-15 per dish',
  },
  {
    source: 'Curated List',
    title: 'Tiong Bahru Neighbourhood',
    description: 'Hip neighborhood with art deco architecture, indie cafes, bakeries, and a traditional wet market.',
    category: 'Food & Drink',
    location: 'Tiong Bahru, Singapore',
    date: 'Daily',
    url: 'https://www.visitsingapore.com/see-do-singapore/places-to-see/tiong-bahru/',
    price: 'Varies',
  },
  {
    source: 'Curated List',
    title: 'Clarke Quay Nightlife',
    description: 'Riverside entertainment district with bars, clubs, and restaurants. Perfect for evening drinks and nightlife.',
    category: 'Nightlife',
    location: '3 River Valley Rd, Singapore 179024',
    date: 'Daily, afternoon to late night',
    url: 'https://www.clarkequay.com.sg/',
    price: 'Varies',
  },

  // Nature & Outdoors
  {
    source: 'Curated List',
    title: 'MacRitchie Reservoir TreeTop Walk',
    description: '250m suspension bridge at 25m height offering views of the rainforest canopy. Great for nature walks and hiking.',
    category: 'Nature & Outdoors',
    location: 'MacRitchie Reservoir Park, Singapore',
    date: 'Tue-Fri 9am-5pm, Sat-Sun 8:30am-5pm',
    url: 'https://www.nparks.gov.sg/gardens-parks-and-nature/parks-and-nature-reserves/central-catchment-nature-reserve',
    price: 'Free',
  },
  {
    source: 'Curated List',
    title: 'Southern Ridges Walk',
    description: '10km trail connecting parks with iconic Henderson Waves bridge. Stunning views of the city and harbor.',
    category: 'Nature & Outdoors',
    location: 'Southern Ridges, Singapore',
    date: 'Daily, 24 hours',
    url: 'https://www.nparks.gov.sg/gardens-parks-and-nature/parks-and-nature-reserves/the-southern-ridges',
    price: 'Free',
  },
  {
    source: 'Curated List',
    title: 'Pulau Ubin Island',
    description: 'Rustic offshore island accessible by bumboat. Explore kampong life, rent bikes, and visit Chek Jawa wetlands.',
    category: 'Nature & Outdoors',
    location: 'Pulau Ubin, Singapore',
    date: 'Daily, 6am-9pm (last boat)',
    url: 'https://www.nparks.gov.sg/gardens-parks-and-nature/parks-and-nature-reserves/pulau-ubin-and-chek-jawa',
    price: 'S$4 bumboat fare',
  },
  {
    source: 'Curated List',
    title: 'East Coast Park',
    description: 'Beachfront park perfect for cycling, rollerblading, BBQ, and seafood dining at East Coast Lagoon Food Village.',
    category: 'Nature & Outdoors',
    location: 'East Coast Park, Singapore',
    date: 'Daily, 24 hours',
    url: 'https://www.nparks.gov.sg/gardens-parks-and-nature/parks-and-nature-reserves/east-coast-park',
    price: 'Free (bike rental S$8-15/hr)',
  },

  // Shopping
  {
    source: 'Curated List',
    title: 'Orchard Road Shopping',
    description: 'Singapore\'s premier shopping belt with malls like ION Orchard, Ngee Ann City, and Paragon.',
    category: 'Shopping',
    location: 'Orchard Road, Singapore',
    date: 'Daily, 10am-10pm (most malls)',
    url: 'https://www.orchardroad.org/',
    price: 'Varies',
  },
  {
    source: 'Curated List',
    title: 'Haji Lane Shopping',
    description: 'Narrow street with indie boutiques, vintage shops, street art, and quirky cafes in Kampong Glam.',
    category: 'Shopping',
    location: 'Haji Lane, Singapore',
    date: 'Daily, varies by shop',
    url: 'https://www.visitsingapore.com/see-do-singapore/places-to-see/kampong-glam/',
    price: 'Varies',
  },

  // Entertainment
  {
    source: 'Curated List',
    title: 'Spectra Light & Water Show',
    description: 'Free nightly light and water show at Marina Bay Sands Event Plaza featuring lasers, fountains, and music.',
    category: 'Entertainment',
    location: 'Marina Bay Sands Event Plaza',
    date: 'Daily, 8pm & 9pm (Fri-Sat add 10pm)',
    url: 'https://www.marinabaysands.com/entertainment/spectra.html',
    price: 'Free',
  },
  {
    source: 'Curated List',
    title: 'Wings of Time Sentosa',
    description: 'Spectacular night show with lasers, water jets, pyrotechnics, and 3D projection mapping over the sea.',
    category: 'Entertainment',
    location: 'Siloso Beach, Sentosa',
    date: 'Daily, 7:40pm & 8:40pm',
    url: 'https://www.sentosa.com.sg/en/things-to-do/attractions/wings-of-time/',
    price: 'S$21-23',
  },
  {
    source: 'Curated List',
    title: 'Jewel Changi Airport',
    description: 'Stunning nature-themed entertainment complex with world\'s tallest indoor waterfall (Rain Vortex), canopy park, and shopping.',
    category: 'Entertainment',
    location: '78 Airport Blvd, Singapore 819666',
    date: 'Daily, 24 hours (shops 10am-10pm)',
    url: 'https://www.jewelchangiairport.com/',
    price: 'Free (Canopy Park S$24-54)',
  },

  // Unique Experiences
  {
    source: 'Curated List',
    title: 'Singapore Flyer',
    description: 'Giant observation wheel at 165m offering breathtaking 360-degree views of the Marina Bay skyline.',
    category: 'Attractions',
    location: '30 Raffles Ave, Singapore 039803',
    date: 'Daily, 2pm-10pm',
    url: 'https://www.singaporeflyer.com/',
    price: 'S$33-40',
  },
  {
    source: 'Curated List',
    title: 'Merlion Park',
    description: 'Iconic half-lion, half-fish statue spouting water into Marina Bay. Singapore\'s most famous landmark.',
    category: 'Attractions',
    location: '1 Fullerton Rd, Singapore 049213',
    date: 'Daily, 24 hours',
    url: 'https://www.visitsingapore.com/see-do-singapore/recreation-leisure/viewpoints/merlion-park/',
    price: 'Free',
  },
  {
    source: 'Curated List',
    title: 'Escape Room Games',
    description: 'Various escape room venues across Singapore including Lost SG, Captivate, and The Escape Artist.',
    category: 'Entertainment',
    location: 'Various locations',
    date: 'Varies',
    url: 'https://www.klook.com/en-SG/activity/87702-escapist-singapore/',
    price: 'S$25-40 per person',
  },
];

export class SampleEventsScraper {
  constructor() {
    this.name = 'Curated Singapore Events';
  }

  async scrape(options = {}) {
    console.log('Loading curated Singapore events...');

    let events = [...SAMPLE_EVENTS];

    if (options.category) {
      const categoryLower = options.category.toLowerCase();
      events = events.filter(e =>
        e.category.toLowerCase().includes(categoryLower)
      );
    }

    return events;
  }
}
