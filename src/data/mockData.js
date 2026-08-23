export const CATEGORIES = [
  { id: 'all', name: 'All Properties', icon: 'Building2' },
  { id: 'short-let', name: 'Short-Lets', icon: 'Palmtree' },
  { id: 'luxury-villa', name: 'Luxury Villas', icon: 'Sparkles' },
  { id: 'penthouse', name: 'Penthouses', icon: 'Building' },
  { id: 'apartment', name: 'Apartments', icon: 'Home' },
  { id: 'commercial', name: 'Commercial', icon: 'Briefcase' }
];

export const POPULAR_DESTINATIONS = [
  { name: 'London, UK', count: '142 properties', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80' },
  { name: 'Dubai, UAE', count: '98 properties', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80' },
  { name: 'Paris, France', count: '115 properties', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80' },
  { name: 'New York, USA', count: '160 properties', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80' },
  { name: 'Lagos, Nigeria', count: '85 properties', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=600&q=80' }
];

export const MOCK_PROPERTIES = [
  {
    id: 'gd-101',
    title: 'The Skyview Horizon Penthouse',
    location: 'Mayfair, London',
    address: '14 Berkeley Square, Mayfair, London W1J 6CB',
    price: 850,
    pricePeriod: 'night',
    type: 'penthouse',
    isShortLet: true,
    isVerified: true,
    isSuperhost: true,
    rating: 4.96,
    reviewsCount: 38,
    beds: 4,
    baths: 4.5,
    maxGuests: 8,
    sqft: 3800,
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Experience absolute peak luxury overlooking Hyde Park. Featuring floor-to-ceiling glass wrapping around panoramic city views, private elevator access, temperature-controlled wine cellar, rooftop plunge pool, and 24/7 dedicated concierge service.',
    amenities: [
      'Private Rooftop Pool', '24/7 Concierge', 'High-Speed Wi-Fi',
      'Private Elevator', 'Underground Parking', 'Smart Home Automation',
      'Chef Kitchen', 'Wine Cellar', 'Air Conditioning', 'EV Charger'
    ],
    host: {
      id: 'host-01',
      name: 'Eleanor Vance',
      role: 'Superhost & Property Owner',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      responseRate: '100%',
      responseTime: 'within an hour',
      phone: '+44 20 7946 0192',
      email: 'eleanor.vance@godirect-vip.com',
      joinedYear: '2022'
    }
  },
  {
    id: 'gd-102',
    title: 'The Azure Waterfront Villa',
    location: 'Palm Jumeirah, Dubai',
    address: 'Frond M, Palm Jumeirah, Dubai, UAE',
    price: 1400,
    pricePeriod: 'night',
    type: 'luxury-villa',
    isShortLet: true,
    isVerified: true,
    isSuperhost: true,
    rating: 4.98,
    reviewsCount: 52,
    beds: 6,
    baths: 7,
    maxGuests: 12,
    sqft: 7200,
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An architectural masterpiece on the iconic Palm Jumeirah. Private beach access, infinity pool seamlessly blending with the Arabian Gulf skyline, private dock, sauna, and outdoor cinema theater.',
    amenities: [
      'Private Beach Access', 'Infinity Pool', 'Private Dock',
      'Sauna & Spa', 'Outdoor Cinema', 'Butler Service',
      'High-Speed Wi-Fi', 'Security System', 'Full Chef Kitchen'
    ],
    host: {
      id: 'host-02',
      name: 'Tariq Al-Mansoori',
      role: 'Verified Property Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      responseRate: '98%',
      responseTime: 'within 30 minutes',
      phone: '+971 50 123 4567',
      email: 'tariq@almansoorirealty.com',
      joinedYear: '2021'
    }
  },
  {
    id: 'gd-103',
    title: 'Minimalist Haus in Kensington',
    location: 'Kensington, London',
    address: '42 Victoria Road, Kensington, London W8 5RH',
    price: 4500,
    pricePeriod: 'month',
    type: 'apartment',
    isShortLet: false,
    isVerified: true,
    isSuperhost: false,
    rating: 4.88,
    reviewsCount: 19,
    beds: 2,
    baths: 2,
    maxGuests: 4,
    sqft: 1450,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Elegantly furnished Victorian townhouse conversion featuring Japanese Scandinavian interior design, oak herringbone flooring, marble bathrooms, and a landscaped private garden terrace.',
    amenities: [
      'Private Garden Terrace', 'Herringbone Hardwood', 'High-Speed Fiber Wi-Fi',
      'Underfloor Heating', 'Miele Appliances', 'Concierge Service'
    ],
    host: {
      id: 'host-03',
      name: 'Sophia Sterling',
      role: 'Private Landlord',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      responseRate: '95%',
      responseTime: 'within 2 hours',
      phone: '+44 20 7123 9876',
      email: 'sophia@sterlingproperties.co.uk',
      joinedYear: '2023'
    }
  },
  {
    id: 'gd-104',
    title: 'Eiffel View Executive Suite',
    location: '7th Arrondissement, Paris',
    address: '18 Avenue de La Bourdonnais, 75007 Paris, France',
    price: 620,
    pricePeriod: 'night',
    type: 'short-let',
    isShortLet: true,
    isVerified: true,
    isSuperhost: true,
    rating: 4.95,
    reviewsCount: 64,
    beds: 3,
    baths: 2.5,
    maxGuests: 6,
    sqft: 1900,
    images: [
      'https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Breathtaking classic Haussmannian apartment with unobstructed views of the Eiffel Tower. Features 3.5m high ceilings, original plaster mouldings, brass fixtures, and a wraparound balcony.',
    amenities: [
      'Eiffel Tower View', 'Wraparound Balcony', 'Wine Cooler',
      'Daily Housekeeping Available', 'High-Speed Wi-Fi', 'Air Conditioning'
    ],
    host: {
      id: 'host-04',
      name: 'Jean-Luc Dubois',
      role: 'Luxury Host & Collector',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      responseRate: '100%',
      responseTime: 'within a few minutes',
      phone: '+33 1 42 68 55 00',
      email: 'jeanluc.dubois@paris-lux.fr',
      joinedYear: '2020'
    }
  },
  {
    id: 'gd-105',
    title: 'Ikoyi Crest Waterfront Estate',
    location: 'Ikoyi, Lagos',
    address: 'Glover Road, Ikoyi, Lagos, Nigeria',
    price: 750,
    pricePeriod: 'night',
    type: 'luxury-villa',
    isShortLet: true,
    isVerified: true,
    isSuperhost: true,
    rating: 4.97,
    reviewsCount: 41,
    beds: 5,
    baths: 6,
    maxGuests: 10,
    sqft: 5200,
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6c563aaec9?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Premier waterfront sanctuary in the heart of Ikoyi. Offers 24/7 uninterrupted solar power grid, jet-ski pontoon access, private swimming pool, armed perimeter security, and state-of-the-art home theater.',
    amenities: [
      '24/7 Power Grid & Solar', 'Waterfront Dock', 'Swimming Pool',
      'Armed Security Guard', 'Home Cinema', 'Chef & Driver Available',
      'High-Speed Wi-Fi', 'Smart Access Control'
    ],
    host: {
      id: 'host-05',
      name: 'Chief Adebayo Okonjo',
      role: 'Verified Property Owner',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
      responseRate: '99%',
      responseTime: 'within 15 minutes',
      phone: '+234 803 123 4567',
      email: 'adebayo@ikoyicrest.com',
      joinedYear: '2022'
    }
  },
  {
    id: 'gd-106',
    title: 'Manhattan Sky Tower Residence',
    location: 'Tribeca, New York',
    address: '56 Leonard Street, Tribeca, New York, NY 10013',
    price: 12500,
    pricePeriod: 'month',
    type: 'penthouse',
    isShortLet: false,
    isVerified: true,
    isSuperhost: false,
    rating: 4.92,
    reviewsCount: 28,
    beds: 3,
    baths: 3.5,
    maxGuests: 6,
    sqft: 2800,
    images: [
      'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Iconic cantilevered residence in Tribeca. Features 11-foot ceilings, solid oak floors, custom Molteni kitchen, lap pool access, private wine storage, and breathtaking skyline views of One World Trade.',
    amenities: [
      'Doorman & Concierge', '75ft Swimming Pool', 'Fitness Center & Sauna',
      'Private Storage', 'Wine Cellar', 'Pet Friendly'
    ],
    host: {
      id: 'host-06',
      name: 'Marcus Vance',
      role: 'Tribeca Real Estate Holdings',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
      responseRate: '96%',
      responseTime: 'within an hour',
      phone: '+1 212 555 0199',
      email: 'marcus@tribecaholdings.com',
      joinedYear: '2021'
    }
  }
];

export const INITIAL_MESSAGES = [
  {
    id: 'msg-01',
    propertyId: 'gd-101',
    hostId: 'host-01',
    sender: 'Eleanor Vance',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    lastMessage: 'Good evening! I saw your inquiry about booking Mayfair Skyview for next week. Would you like me to reserve the private elevator setup for your arrival?',
    timestamp: '10:42 AM',
    unread: true,
    history: [
      { sender: 'guest', text: 'Hi Eleanor, is the private plunge pool heated during October?', time: '10:30 AM' },
      { sender: 'host', text: 'Good evening! Yes, the plunge pool is heated to a comfortable 32°C year-round. Would you like me to reserve the private elevator setup for your arrival?', time: '10:42 AM' }
    ]
  },
  {
    id: 'msg-02',
    propertyId: 'gd-102',
    hostId: 'host-02',
    sender: 'Tariq Al-Mansoori',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    lastMessage: 'Marhaba! We can arrange private yacht transfer from Dubai Marina directly to the villa dock.',
    timestamp: 'Yesterday',
    unread: false,
    history: [
      { sender: 'guest', text: 'Can we dock a 45ft boat at the private dock?', time: 'Yesterday 3:15 PM' },
      { sender: 'host', text: 'Marhaba! Yes, the dock supports yachts up to 60ft with full water and shore power connections. We can also arrange private yacht transfer from Dubai Marina directly to the villa dock.', time: 'Yesterday 3:45 PM' }
    ]
  }
];
