const events = [
  {
    id: 'sunset', name: 'Sunset Sessions', category: 'Music', type: 'Outdoor', image: 'hero',
    alt: 'Concert crowd under purple stage lights', date: '2026-12-12', time: '17:00', price: 280,
    venue: 'Battery Park', address: 'Dock Road, V&A Waterfront, Cape Town',
    summary: 'Open-air DJ sets as the sun drops over the harbour.',
    description: 'Spend a summer evening by the water with Cape Town selectors playing soulful house and disco. Bring a light layer for the harbour breeze. Food stalls are available inside the venue.',
    organizer: 'Harbour Sound Collective', email: 'harbour-sound@outthere.example',
    schedule: [['17:00', 'Gates open'], ['18:00', 'Warm-up DJ set'], ['19:30', 'Headline set']]
  },
  {
    id: 'jazz', name: 'Jazz After Hours', category: 'Music', type: 'Indoor', image: 'jazz',
    alt: 'Microphone on a dimly lit stage', date: '2026-12-18', time: '19:00', price: 190,
    venue: 'The Armchair', address: '135 Lower Main Road, Observatory, Cape Town',
    summary: 'A late set of live jazz in an intimate Observatory room.',
    description: 'A local quartet moves from jazz standards to new South African compositions. Seating is first come, first served. Arrive early if you are coming with a group.',
    organizer: 'Late Note Collective', email: 'late-note@outthere.example',
    schedule: [['19:00', 'Doors open'], ['20:00', 'First set'], ['21:15', 'Second set']]
  },
  {
    id: 'clay', name: 'Clay & Coffee', category: 'Workshops', type: 'Indoor', image: 'clay',
    alt: 'Hands shaping clay on a pottery wheel', date: '2027-01-09', time: '10:00', price: 350,
    venue: 'Woodstock Exchange', address: '66 Albert Road, Woodstock, Cape Town',
    summary: 'Shape your first clay piece over a good cup of coffee.',
    description: 'Learn to hand-build a pinch pot in a small group. Clay, tools and a coffee are included. The studio will share collection instructions for your fired piece at the workshop.',
    organizer: 'Earthworks Studio', email: 'earthworks@outthere.example',
    schedule: [['10:00', 'Coffee and introductions'], ['10:20', 'Hand-building demo'], ['10:45', 'Make your own pot']]
  },
  {
    id: 'market', name: 'The Saturday Table', category: 'Food', type: 'Outdoor', image: 'market',
    alt: 'Warmly lit dining space', date: '2027-01-16', time: '09:00', price: 0,
    venue: 'The Old Biscuit Mill', address: '375 Albert Road, Woodstock, Cape Town',
    summary: 'Meet local makers and graze your way through a weekend market.',
    description: 'Browse seasonal produce, fresh bakes and small-batch pantry goods. Registration covers entry. Food and drinks are available for purchase from individual vendors.',
    organizer: 'Saturday Table Market', email: 'saturday-table@outthere.example',
    schedule: [['09:00', 'Market opens'], ['10:30', 'Maker demonstrations'], ['13:30', 'Last orders']]
  },
  {
    id: 'talk', name: 'Designing for Everyone', category: 'Talks', type: 'Indoor', image: 'talk',
    alt: 'Audience attending a conference talk', date: '2027-02-04', time: '18:00', price: 120,
    venue: 'Workshop17 Watershed', address: '17 Dock Road, V&A Waterfront, Cape Town',
    summary: 'Practical talks on accessibility from local designers and developers.',
    description: 'Hear how two Cape Town teams build accessibility into everyday product work. The evening includes case studies and an audience Q&A.',
    organizer: 'Cape Design Circle', email: 'cape-design@outthere.example',
    schedule: [['18:00', 'Welcome'], ['18:20', 'Lightning talks'], ['19:15', 'Audience Q&A']]
  },
  {
    id: 'cinema', name: 'Cinema Under the Stars', category: 'Film', type: 'Outdoor', image: 'cinema',
    alt: 'Rows of seats in a cinema', date: '2027-02-13', time: '18:30', price: 160,
    venue: 'Kirstenbosch Botanical Garden', address: 'Rhodes Drive, Newlands, Cape Town',
    summary: 'Pack a picnic for an evening of South African short films.',
    description: 'Watch a curated programme of local short films on the lawn. Bring a picnic blanket and warm clothing. If weather affects the screening, check with the organizer before travelling.',
    organizer: 'Open Frame Cinema', email: 'open-frame@outthere.example',
    schedule: [['18:30', 'Gates and picnic area open'], ['19:45', 'Short film programme'], ['21:15', 'Closing remarks']]
  }
];
