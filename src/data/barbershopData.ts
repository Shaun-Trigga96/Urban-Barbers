import { Barber, LookbookItem, Service } from '../types';

export const BUSINESS_INFO = {
  name: 'Urban Barbers',
  tagline: 'Sharp cuts. Sharper standards.',
  foundedYear: 2016,
  address: '24 Kloof Street, Gardens, Cape Town, 8001, South Africa',
  addressShort: '24 Kloof Street, Gardens, Cape Town',
  phone: '+27 21 555 0142',
  phoneClean: '+27215550142',
  whatsappUrl: 'https://wa.me/27215550142?text=Hi%20Urban%20Barbers,%20I%20have%20an%20enquiry%20regarding%20an%20appointment.',
  email: 'bookings@urbanbarbers.co.za',
  timezone: 'Africa/Johannesburg',
  hoursDescription: {
    weekdays: 'Monday – Friday: 09:00 – 19:00',
    saturday: 'Saturday: 08:00 – 17:00',
    sunday: 'Sunday: Closed',
  },
  socials: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    tiktok: 'https://tiktok.com',
  },
  googleMapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.4357497216773!2d18.40932457639561!3d-33.930268573202525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc676646849401%3A0x62955f111e114cb!2s24%20Kloof%20St%2C%20Gardens%2C%20Cape%20Town%2C%208001%2C%20South%20Africa!5e0!3m2!1sen!2sza!4v1700000000000!5m2!1sen!2sza',
};

export const SERVICES: Service[] = [
  // Haircuts
  {
    id: 'classic-haircut',
    name: 'Classic Haircut',
    category: 'haircuts',
    categoryName: 'Haircuts',
    durationMinutes: 30,
    priceZAR: 150,
    description: 'Precision cut tailored to your head shape and hair texture, styled with premium matte clay.',
    featured: true,
    image: '/images/classic-cut.jpg',
  },
  {
    id: 'skin-fade',
    name: 'Skin Fade',
    category: 'haircuts',
    categoryName: 'Haircuts',
    durationMinutes: 45,
    priceZAR: 190,
    description: 'Ultra-clean zero-to-length gradient blend, finished with foil shaver and razor neck edge-up.',
    featured: true,
    image: '/images/skin-fade.jpg',
  },
  {
    id: 'taper-fade',
    name: 'Taper Fade',
    category: 'haircuts',
    categoryName: 'Haircuts',
    durationMinutes: 45,
    priceZAR: 180,
    description: 'Refined graduation at the temples and neckline while preserving clean weight through the sides.',
    image: '/images/taper-fade.jpg',
  },
  {
    id: 'scissor-cut',
    name: 'Scissor Cut',
    category: 'haircuts',
    categoryName: 'Haircuts',
    durationMinutes: 45,
    priceZAR: 200,
    description: 'Full shear-work styling for medium-to-long hair, focusing on texture, natural flow, and movement.',
    image: '/images/scissor-cut.jpg',
  },

  // Beard & Shave
  {
    id: 'beard-trim-shape',
    name: 'Beard Trim & Shape',
    category: 'beard',
    categoryName: 'Beard & Shave',
    durationMinutes: 20,
    priceZAR: 100,
    description: 'Detailed length reduction, cheek line razor definition, and organic argan conditioning oil.',
    image: '/images/beard-trim.jpg',
  },
  {
    id: 'hot-towel-shave',
    name: 'Hot Towel Shave',
    category: 'beard',
    categoryName: 'Beard & Shave',
    durationMinutes: 30,
    priceZAR: 150,
    description: 'Traditional straight razor shave with essential oil steamed towels, pre-shave cream, and soothing balm.',
    featured: true,
    image: '/images/hot-towel.jpg',
  },

  // Combos
  {
    id: 'cut-beard-combo',
    name: 'Cut + Beard Combo',
    category: 'combos',
    categoryName: 'Combos',
    durationMinutes: 60,
    priceZAR: 260,
    description: 'Any signature haircut paired with complete beard grooming, foil finish, and warm styling rinse.',
    featured: true,
    image: '/images/cut-beard-combo.jpg',
  },
  {
    id: 'the-full-works',
    name: 'The Full Works',
    category: 'combos',
    categoryName: 'Combos',
    durationMinutes: 90,
    priceZAR: 380,
    description: 'Signature cut, full beard sculpt, eucalyptus hot towel compress, scalp cleanse, and relaxing facial massage.',
    image: '/images/full-works.jpg',
  },

  // Kids & Extras
  {
    id: 'kids-cut',
    name: 'Kids Cut (under 12)',
    category: 'kids-extras',
    categoryName: 'Kids & Extras',
    durationMinutes: 30,
    priceZAR: 110,
    description: 'Patient, gentle styling for young gentlemen under 12. Fun, sharp, and easy to maintain.',
    image: '/images/kids-cut.jpg',
  },
  {
    id: 'line-up-edge-up',
    name: 'Line-Up / Edge-Up',
    category: 'kids-extras',
    categoryName: 'Kids & Extras',
    durationMinutes: 15,
    priceZAR: 70,
    description: 'Razor-crisp hairline detailing around the temples, ears, and neck between full haircuts.',
    image: '/images/line-up.jpg',
  },
  {
    id: 'hair-wash-style',
    name: 'Hair Wash & Styling',
    category: 'kids-extras',
    categoryName: 'Kids & Extras',
    durationMinutes: 15,
    priceZAR: 60,
    description: 'Invigorating tea tree scalp wash, blow-dry finish, and styling using premium pomade or sea salt spray.',
    image: '/images/wash-style.jpg',
  },
];

export const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: 'look-1',
    title: 'High Contrast Mid Skin Fade',
    category: 'fades',
    categoryLabel: 'Skin Fades',
    description: 'Seamless graduation down to the skin at temple height, paired with heavy textured matte crop on top.',
    image: '/images/skin-fade.jpg',
    barber: 'Sipho "Shaz" Dlamini',
    serviceId: 'skin-fade',
  },
  {
    id: 'look-2',
    title: 'Low Drop Taper & Razor Edge',
    category: 'fades',
    categoryLabel: 'Skin Fades',
    description: 'Subtle taper behind the ear and neck with clean straight-line hairline detailing.',
    image: '/images/taper-fade.jpg',
    barber: 'Sipho "Shaz" Dlamini',
    serviceId: 'taper-fade',
  },
  {
    id: 'look-3',
    title: 'Sculpted Beard & Razor Contour',
    category: 'beards',
    categoryLabel: 'Beard & Shave',
    description: 'Graduated sideburn-to-beard blend with sharp razor cheek line and organic balm finish.',
    image: '/images/beard-trim.jpg',
    barber: 'Lebo Mokoena',
    serviceId: 'beard-trim-shape',
  },
  {
    id: 'look-4',
    title: 'Modern Classic Scissor Silhouette',
    category: 'classics',
    categoryLabel: 'Classic Cuts',
    description: 'Full shear graduation for gentlemanly volume, scissor-over-comb sides, and satin sheen.',
    image: '/images/classic-cut.jpg',
    barber: 'Ryan Adams',
    serviceId: 'classic-haircut',
  },
  {
    id: 'look-5',
    title: 'Traditional Steamed Towel Shave',
    category: 'beards',
    categoryLabel: 'Beard & Shave',
    description: 'Triple hot eucalyptus compress with Japanese feather straight razor and cold rosewater tonic.',
    image: '/images/hot-towel.jpg',
    barber: 'Ryan Adams',
    serviceId: 'hot-towel-shave',
  },
  {
    id: 'look-6',
    title: 'Signature Cut & Beard Fusion',
    category: 'combos',
    categoryLabel: 'Combos',
    description: 'Harmonious skin taper merging directly into a full sculpted beard with razor-sharp cheek lines.',
    image: '/images/cut-beard-combo.jpg',
    barber: 'Sipho "Shaz" Dlamini',
    serviceId: 'cut-beard-combo',
  },
];

export const BARBERS: Barber[] = [
  {
    id: 'sipho-dlamini',
    name: 'Sipho "Shaz" Dlamini',
    nickname: 'Shaz',
    role: 'Master Barber',
    experienceYears: 12,
    specialty: 'Skin fades and designs',
    bio: 'With over a decade behind the chair across Cape Town and Johannesburg, Sipho is renowned for razor-sharp tapers and bespoke hair art. He blends meticulous geometric precision with unmatched street-smart style.',
    daysOff: [0], // Off Sunday only
    image: '/images/barber-sipho.jpg',
  },
  {
    id: 'ryan-adams',
    name: 'Ryan Adams',
    role: 'Senior Barber',
    experienceYears: 8,
    specialty: 'Classic cuts and hot towel shaves',
    bio: 'A traditional craftsman trained in classic British and European barbering, Ryan specializes in scissor work and straight-razor hot towel rituals. His steady hand and warm conversation make every visit an elevated escape.',
    daysOff: [0, 1], // Off Sunday and Monday
    image: '/images/barber-ryan.jpg',
  },
  {
    id: 'lebo-mokoena',
    name: 'Lebo Mokoena',
    role: 'Barber',
    experienceYears: 5,
    specialty: 'Beard sculpting and kids cuts',
    bio: 'Lebo brings vibrant energy, sharp attention to detail, and a calm, patient demeanor that both kids and beard aficionados appreciate. His precision beard fades and relaxed approach keep clients coming back.',
    daysOff: [0, 3], // Off Sunday and Wednesday
    image: '/images/barber-lebo.jpg',
  },
];

export const TESTIMONIALS = [
  {
    id: 't1',
    author: 'Kagiso M.',
    role: 'Gardens Local',
    content:
      'Sipho has been cutting my hair for four years now. The precision of his skin fades is genuinely unmatched anywhere in Cape Town. Easy booking, great atmosphere, always on time.',
    rating: 5,
    service: 'Skin Fade',
  },
  {
    id: 't2',
    author: 'David Van Der Merwe',
    role: 'Kloof Street Neighbor',
    content:
      'The hot towel shave with Ryan is an absolute ritual every fortnight. Fresh blade, authentic technique, and proper barbershop hospitality. You leave feeling like a new man.',
    rating: 5,
    service: 'Hot Towel Shave & Beard',
  },
  {
    id: 't3',
    author: 'Marcus Thorne',
    role: 'Architect, V&A Waterfront',
    content:
      'Urban Barbers strikes that rare balance: premium craft without the pretension. Lebo did a fantastic job with my beard taper. Worth every single cent.',
    rating: 5,
    service: 'Cut + Beard Combo',
  },
];

export const GALLERY_ITEMS = [
  {
    url: '/images/gallery-chair.jpg',
    alt: 'Vintage leather barber chair and grooming tools in Urban Barbers shop',
    caption: 'Traditional Leather Station',
  },
  {
    url: '/images/gallery-fade.jpg',
    alt: 'Barber executing a precision razor skin fade on client',
    caption: 'Precision Scissor & Razor Detailing',
  },
  {
    url: '/images/gallery-shave.jpg',
    alt: 'Straight razor hot towel shave preparation with steaming compress',
    caption: 'Classic Hot Towel Treatment',
  },
  {
    url: '/images/gallery-tools.jpg',
    alt: 'Styling station with premium pomades, tonics, and shears',
    caption: 'Handcrafted Grooming Products',
  },
];

export const WHY_CHOOSE_US = [
  {
    title: 'Master Craftsmen',
    description: 'Over 25 combined years of barbering experience specializing in contemporary skin fades, classic scissor silhouettes, and beard artistry.',
  },
  {
    title: 'Zero Waiting Room Chaos',
    description: 'We run on a strict 15-minute booking schedule. Your chair is reserved, your barber is ready, and your time is treated with respect.',
  },
  {
    title: 'Kloof Street Soul',
    description: 'Proudly rooted in the heart of Gardens since 2016. Fresh Cape Town espresso, good music, and honest conversation on every visit.',
  },
  {
    title: 'Sharper Standards Guarantee',
    description: 'Not 100% satisfied with your cut? Walk back in within 48 hours and we will refine or adjust your line-up free of charge.',
  },
];
