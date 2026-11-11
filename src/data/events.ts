export type FestType = 'Saturnalia' | 'Urja Sports Fest' | 'Mudra Dance Fest' | 'Thapar E-Summit' | 'Campus Food Gala';
export type EventCategory = 'Celebrity Concert' | 'Sports Tournament' | 'Dance & Theatre' | 'Tech & Hackathon' | 'Keynote & Debate';

export interface FestEvent {
  id: string;
  title: string;
  fest: FestType;
  category: EventCategory;
  venue: string;
  startTime: string; // e.g. "19:30"
  endTime: string;   // e.g. "22:30"
  day: 'Day 1 (Friday)' | 'Day 2 (Saturday)' | 'Day 3 (Sunday)';
  organizingSociety: string;
  expectedAttendance: number;
  currentAttendance: number;
  entryRule: 'Open to All TIET Students' | 'Urja Athletes & Delegates' | 'VIP & Guest Passes Only';
  isHeadlineStar: boolean;
  starPerformer?: string;
  description: string;
}

export interface VenueTelemetry {
  id: string;
  name: string;
  maxCapacity: number;
  currentOccupancy: number;
  status: 'Normal' | 'Crowded' | 'Gate Redirection Active';
  activeGate: string;
  medicalStation: string;
}

export interface HeadlineArtist {
  id: string;
  name: string;
  role: string;
  fest: FestType;
  eventTitle: string;
  timeSlot: string;
  venue: string;
  riderStatus: 'Stage Soundcheck Completed' | 'En Route from Chandigarh Airport' | 'Backstage Green Room Ready';
  bio: string;
}

export interface BroadcastNotice {
  id: string;
  timestamp: string;
  author: string;
  urgency: 'High' | 'Normal';
  message: string;
}

export const FEST_EVENTS: FestEvent[] = [
  {
    id: 'ev-1',
    title: 'Saturnalia Star Night: Seedhe Maut Live in Concert',
    fest: 'Saturnalia',
    category: 'Celebrity Concert',
    venue: 'Athletic Track Grounds',
    startTime: '20:00',
    endTime: '23:30',
    day: 'Day 3 (Sunday)',
    organizingSociety: 'Saturnalia Core Executive & Proctor Board',
    expectedAttendance: 4800,
    currentAttendance: 4420,
    entryRule: 'Open to All TIET Students',
    isHeadlineStar: true,
    starPerformer: 'Seedhe Maut & DJ Sez On The Beat',
    description: 'The monumental finale of Saturnalia 2026. High-voltage hip-hop performance, laser show, and campus fireworks.'
  },
  {
    id: 'ev-2',
    title: 'Battle of Bands (Acoustic & Heavy Metal)',
    fest: 'Saturnalia',
    category: 'Celebrity Concert',
    venue: 'Open Air Theatre (OAT)',
    startTime: '16:00',
    endTime: '19:30',
    day: 'Day 2 (Saturday)',
    organizingSociety: 'NOX - Music Society of Thapar',
    expectedAttendance: 1600,
    currentAttendance: 1350,
    entryRule: 'Open to All TIET Students',
    isHeadlineStar: false,
    description: '14 top college rock bands from across North India competing for the prestigious Saturnalia Golden Guitar.'
  },
  {
    id: 'ev-3',
    title: 'Urja Inter-Collegiate Football Final (TIET vs PEC)',
    fest: 'Urja Sports Fest',
    category: 'Sports Tournament',
    venue: 'Main Football Turf',
    startTime: '17:00',
    endTime: '19:00',
    day: 'Day 2 (Saturday)',
    organizingSociety: 'Thapar Sports Board',
    expectedAttendance: 1200,
    currentAttendance: 980,
    entryRule: 'Open to All TIET Students',
    isHeadlineStar: false,
    description: 'High stakes North-Zone championship final under floodlights. Commentary broadcasted live on campus radio.'
  },
  {
    id: 'ev-4',
    title: 'Mudra Western & Bollywood Group Dance Showcase',
    fest: 'Mudra Dance Fest',
    category: 'Dance & Theatre',
    venue: 'Main Auditorium',
    startTime: '18:30',
    endTime: '21:30',
    day: 'Day 2 (Saturday)',
    organizingSociety: 'Mudra - The Choreography Society',
    expectedAttendance: 1150,
    currentAttendance: 890,
    entryRule: 'Open to All TIET Students',
    isHeadlineStar: false,
    description: '10 university dance crews showcasing synchronized thematic contemporary and urban hip-hop routines.'
  },
  {
    id: 'ev-5',
    title: 'MakeThapar 36-Hour National Hackathon Finale',
    fest: 'Saturnalia',
    category: 'Tech & Hackathon',
    venue: 'CSED Complex Labs',
    startTime: '14:00',
    endTime: '18:00',
    day: 'Day 3 (Sunday)',
    organizingSociety: 'Creative Computing Society (CCS)',
    expectedAttendance: 600,
    currentAttendance: 540,
    entryRule: 'Open to All TIET Students',
    isHeadlineStar: false,
    description: 'Top 30 national hacker teams pitching AI agents, robotics, and fintech hardware to venture capitalists.'
  },
  {
    id: 'ev-6',
    title: 'Thapar E-Summit Keynote: Scaling Startups from Campus',
    fest: 'Thapar E-Summit',
    category: 'Keynote & Debate',
    venue: 'Tan Auditorium',
    startTime: '11:00',
    endTime: '13:00',
    day: 'Day 1 (Friday)',
    organizingSociety: 'Entrepreneurship Development Cell (EDC)',
    expectedAttendance: 850,
    currentAttendance: 780,
    entryRule: 'Open to All TIET Students',
    isHeadlineStar: true,
    starPerformer: 'Ankur Warikoo (Author & Angel Investor)',
    description: 'Fireside chat on building scalable products during engineering college, securing angel funding, and personal branding.'
  },
  {
    id: 'ev-7',
    title: 'Gourmet Food Truck & Culinary Bazaar',
    fest: 'Campus Food Gala',
    category: 'Celebrity Concert',
    venue: 'COS Lawns Promenade',
    startTime: '12:00',
    endTime: '22:00',
    day: 'Day 2 (Saturday)',
    organizingSociety: 'Rotaract Club of TIET',
    expectedAttendance: 2200,
    currentAttendance: 1450,
    entryRule: 'Open to All TIET Students',
    isHeadlineStar: false,
    description: 'Over 25 gourmet food stalls, artisanal mocktail bars, live acoustic buskers, and open-air board games.'
  }
];

export const VENUES_DATA: VenueTelemetry[] = [
  {
    id: 'v-track',
    name: 'Athletic Track Grounds',
    maxCapacity: 5000,
    currentOccupancy: 4420,
    status: 'Gate Redirection Active',
    activeGate: 'Gate 2 (Hostel J Side) Closed • Use North Gate 4',
    medicalStation: 'Mobile Red Cross Ambulance at Track Curve'
  },
  {
    id: 'v-oat',
    name: 'Open Air Theatre (OAT)',
    maxCapacity: 1800,
    currentOccupancy: 1350,
    status: 'Crowded',
    activeGate: 'Both East & West Ramps Open',
    medicalStation: 'First Aid Booth at OAT Entry'
  },
  {
    id: 'v-audi',
    name: 'Main Auditorium',
    maxCapacity: 1200,
    currentOccupancy: 890,
    status: 'Normal',
    activeGate: 'Main Glass Doors Open',
    medicalStation: 'Audi Foyer Medical Desk'
  },
  {
    id: 'v-cos',
    name: 'COS Lawns Promenade',
    maxCapacity: 2500,
    currentOccupancy: 1450,
    status: 'Normal',
    activeGate: 'Open Perimeter Walkway',
    medicalStation: 'Near Verka Milk Bar'
  },
  {
    id: 'v-turf',
    name: 'Main Sports Complex & Turf',
    maxCapacity: 1500,
    currentOccupancy: 980,
    status: 'Normal',
    activeGate: 'Sports Pavilion Gate',
    medicalStation: 'Sports Complex Physio Room'
  }
];

export const ARTISTS_DATA: HeadlineArtist[] = [
  {
    id: 'art-1',
    name: 'Seedhe Maut',
    role: 'Headline Hip-Hop Duo',
    fest: 'Saturnalia',
    eventTitle: 'Saturnalia Star Night',
    timeSlot: 'Sunday • 20:30 - 23:00',
    venue: 'Athletic Track Grounds',
    riderStatus: 'Backstage Green Room Ready',
    bio: 'Pioneers of Indian underground hip-hop. Bringing full band audio setup and explosive stage pyro for 5,000 Thapar students.'
  },
  {
    id: 'art-2',
    name: 'Ankur Warikoo',
    role: 'Keynote Speaker & Author',
    fest: 'Thapar E-Summit',
    eventTitle: 'Scaling Startups from Campus',
    timeSlot: 'Friday • 11:00 - 13:00',
    venue: 'Tan Auditorium',
    riderStatus: 'En Route from Chandigarh Airport',
    bio: 'Author of "Do Epic Shit" and founder of Nearbuy. Delivering an interactive masterclass on engineering entrepreneurship.'
  },
  {
    id: 'art-3',
    name: 'DJ Sez On The Beat',
    role: 'Music Producer & Turntablist',
    fest: 'Saturnalia',
    eventTitle: 'After-Hours EDM Transition',
    timeSlot: 'Sunday • 23:00 - 00:00',
    venue: 'Athletic Track Grounds',
    riderStatus: 'Stage Soundcheck Completed',
    bio: 'Legendary producer behind India’s biggest hip-hop anthems. Closing Saturnalia with an exclusive synthwave DJ set.'
  }
];

export const BROADCAST_NOTICES: BroadcastNotice[] = [
  {
    id: 'bc-1',
    timestamp: '10 Mins Ago',
    author: 'Proctor Office & Security Control',
    urgency: 'High',
    message: 'High crowd density at Athletic Grounds (Gate 2). Students directed to North Gate 4 near Hostel Q for expedited entry.'
  },
  {
    id: 'bc-2',
    timestamp: '25 Mins Ago',
    author: 'Saturnalia Core Committee',
    urgency: 'Normal',
    message: 'Battle of Bands finals running on schedule at Open Air Theatre. NOX soundcheck is crystal clear!'
  },
  {
    id: 'bc-3',
    timestamp: '1 Hour Ago',
    author: 'Thapar Sports Board',
    urgency: 'Normal',
    message: 'Urja Football Championship match kicks off at 5:00 PM on Main Turf. Live commentary in progress.'
  }
];
