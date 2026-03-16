const DEFAULT_PROJECTS = [
  { name: 'Doja Cat', year: '2025', video: './videos/01_DOJA CAT.mp4', videoFull: 'https://pub-dbaef51aceed4b7aaef0999de39d1978.r2.dev/01_DOJA%20CAT.mp4', director: 'Christian Breslauer', production: 'London Alley', description: 'Don Toliver – Lose My Mind (feat. Doja Cat)' },
  { name: 'UFC', year: '2025', video: './videos/02_UFC.mp4', videoFull: 'https://pub-dbaef51aceed4b7aaef0999de39d1978.r2.dev/02_UFC.mp4', director: 'Shapxo', production: 'Shelter, Radioaktivefilm', description: 'UFC – This One Hits Different' },
  { name: 'Elife', year: '2025', video: './videos/03_ELIFE.mp4', videoFull: 'https://pub-dbaef51aceed4b7aaef0999de39d1978.r2.dev/03_ELIFE.mp4', director: 'Shapxo', production: 'BIG KAHUNA FILMS, Side', description: 'eLIFE – AI-Driven' },
  { name: 'Nike', year: '2025', video: './videos/04_NIKE.mp4', videoFull: 'https://pub-dbaef51aceed4b7aaef0999de39d1978.r2.dev/05_NIKE.mp4', director: 'Shapxo', production: 'Shooteurope', description: 'Nike Football – Haaland' },
  { name: 'Parions Sports', year: '2025', video: './videos/05_PARIONS-SPORTS.mp4', videoFull: 'https://pub-dbaef51aceed4b7aaef0999de39d1978.r2.dev/06_PARIONS-SPORTS.mp4', director: 'Shapxo', production: 'Caviar', description: 'Parions Sport' },
  { name: 'Polestar', year: '2025', video: './videos/06_POLESTAR.mp4', videoFull: 'https://pub-dbaef51aceed4b7aaef0999de39d1978.r2.dev/07_POLESTAR.mp4', director: 'Maksym Getman', production: 'Esse House', description: 'Polestar 2 – "So Much More"' },
  { name: 'Porsche', year: '2026', video: './videos/07_PORSCHE.mp4', videoFull: 'https://pub-dbaef51aceed4b7aaef0999de39d1978.r2.dev/08_PORSCHE.mp4', director: 'Maksym Getman', production: 'Esse House & NDA', description: 'Porsche 911 GT3 RS – To the One Who Follows' },
  { name: 'Nike', year: '2025', video: './videos/08_NIKE.mp4', videoFull: 'https://pub-dbaef51aceed4b7aaef0999de39d1978.r2.dev/09_NIKE.mp4', director: 'Shapxo', production: 'Shooteurope', description: 'Nike Football – Rodri' },
  { name: 'Yamaha', year: '2024', video: './videos/09_YAMAHA.mp4', videoFull: 'https://pub-dbaef51aceed4b7aaef0999de39d1978.r2.dev/10_YAMAHA.mp4', director: 'Shapxo', production: 'Dream Bear', description: 'Yamaha R1 – Moonblade' },
  { name: 'Riot Games', year: '2026', video: './videos/10_RIOT GAMES.mp4', videoFull: 'https://pub-dbaef51aceed4b7aaef0999de39d1978.r2.dev/11_RIOT%20GAMES.mp4', director: 'Kostiantyn Sen', production: 'Seek Studio', description: 'Valorant Champions Paris' },
  { name: 'Don Toliver', year: '2025', video: './videos/11_DON TOLIVER.mp4', videoFull: 'https://pub-dbaef51aceed4b7aaef0999de39d1978.r2.dev/12_DON%20TOLIVER.mp4', director: 'Shapxo x Whitetrashtyler', production: 'Dream Bear', description: 'Don Toliver – Tore Up' },
  { name: 'Twenty One Pilots', year: '2024', video: './videos/12_TWENTY ONE PILOTS.mp4', videoFull: 'https://pub-dbaef51aceed4b7aaef0999de39d1978.r2.dev/24_TWENTY%20ONE%20PILOTS.mp4', director: 'Jensen Noen', production: 'Blesscode', description: 'Twenty One Pilots – Paladin Strait' },
  { name: 'Madonna', year: '2023', video: './videos/13_MADONNA.mp4', videoFull: 'https://pub-dbaef51aceed4b7aaef0999de39d1978.r2.dev/13_MADONNA.mp4', director: 'Sasha Kasiuha', production: 'SKNX', description: 'Madonna – Hung Up ft. Tokischa' },
  { name: 'Peggy Gou', year: '2024', video: './videos/14_PEGGY GOU.mp4', videoFull: 'https://pub-dbaef51aceed4b7aaef0999de39d1978.r2.dev/22_PEGGY%20GOU.mp4', director: 'Alice Kunisue', production: 'ProdCo', description: 'Peggy Gou – Lobster Telephone' },
  { name: 'K1X', year: '2024', video: './videos/15_K1X.mp4', videoFull: 'https://pub-dbaef51aceed4b7aaef0999de39d1978.r2.dev/16_K1X.mp4', director: 'Shapxo', production: 'BWGTBLD x SIDE', description: 'K1X – OUTTA THIS WORLD' },
  { name: 'Polestar', year: '2024', video: './videos/16_POLESTAR.mp4', videoFull: 'https://pub-dbaef51aceed4b7aaef0999de39d1978.r2.dev/17_POLESTAR.mp4', director: 'Maksym Getman', production: 'Esse House', description: 'POLESTAR – The Silent Journey' },
  { name: 'Puma', year: '2021', video: './videos/17_PUMA.mp4', videoFull: 'https://pub-dbaef51aceed4b7aaef0999de39d1978.r2.dev/18_PUMA.mp4', director: 'Kostiantyn Sen', production: 'Seek Studio', description: 'PUMA – Mirage Tech' },
  { name: 'Navi', year: '2021', video: './videos/18_NAVI.mp4', videoFull: 'https://pub-dbaef51aceed4b7aaef0999de39d1978.r2.dev/19_NAVI.mp4', director: 'Kostiantyn Sen', production: 'Seek Studio', description: 'PUMA x NAVI' },
  { name: 'Yeat', year: '2024', video: './videos/19_YEAT_1.mp4', videoFull: 'https://pub-dbaef51aceed4b7aaef0999de39d1978.r2.dev/20_YEAT.mp4', director: 'Felix Brady', production: 'Stink Films', description: 'Yeat – Breathe' },
  { name: 'Chris Brown', year: '2023', video: './videos/20_CHRIS BROWN.mp4', videoFull: 'https://pub-dbaef51aceed4b7aaef0999de39d1978.r2.dev/21_CHRIS%20BROWN.mp4', director: 'Shapxo', production: 'Dreambear', description: 'Tyla Yaweh – City of Dreams ft. Chris Brown' },
  { name: 'Citroen', year: '2025', video: './videos/21_CITROEN.mp4', videoFull: 'https://pub-dbaef51aceed4b7aaef0999de39d1978.r2.dev/14_CITROEN.mp4', director: 'Shapxo', production: 'Quad x Radioaktivefilm', description: 'Citroen C5' },
  { name: 'Lisa', year: '2025', video: './videos/22_LISA.mp4', videoFull: 'https://pub-dbaef51aceed4b7aaef0999de39d1978.r2.dev/23_LISA.mp4', director: 'Christian Breslauer', production: 'London Alley', description: 'LISA – FUTW' }
];

function getProjects() {
  try {
    const stored = localStorage.getItem('bereg_projects');
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((p, i) => {
        const def = DEFAULT_PROJECTS[i] || {};
        return {
          ...def,
          ...p,
          description: p.description || def.description || '',
          videoFull: p.videoFull || def.videoFull || '',
          director: p.director === 'Director Name' ? (def.director || p.director) : p.director,
          production: p.production === 'Production Name' ? (def.production || p.production) : p.production
        };
      });
    }
  } catch (e) {}
  return DEFAULT_PROJECTS;
}

function saveProjects(projects) {
  localStorage.setItem('bereg_projects', JSON.stringify(projects));
}
