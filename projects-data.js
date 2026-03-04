const DEFAULT_PROJECTS = [
  { name: 'Doja Cat', year: '2024', video: './videos/01_DOJA CAT.mp4', director: 'Director Name', production: 'Production Name' },
  { name: 'UFC', year: '2024', video: './videos/02_UFC.mp4', director: 'Director Name', production: 'Production Name' },
  { name: 'Elife', year: '2023', video: './videos/03_ELIFE.mp4', director: 'Director Name', production: 'Production Name' },
  { name: 'Nike', year: '2024', video: './videos/04_NIKE.mp4', director: 'Director Name', production: 'Production Name' },
  { name: 'Parions Sports', year: '2024', video: './videos/05_PARIONS-SPORTS.mp4', director: 'Director Name', production: 'Production Name' },
  { name: 'Polestar', year: '2023', video: './videos/06_POLESTAR.mp4', director: 'Director Name', production: 'Production Name' },
  { name: 'Porsche', year: '2024', video: './videos/07_PORSCHE.mp4', director: 'Director Name', production: 'Production Name' },
  { name: 'Nike', year: '2024', video: './videos/08_NIKE.mp4', director: 'Director Name', production: 'Production Name' },
  { name: 'Yamaha', year: '2023', video: './videos/09_YAMAHA.mp4', director: 'Director Name', production: 'Production Name' },
  { name: 'Riot Games', year: '2024', video: './videos/10_RIOT GAMES.mp4', director: 'Director Name', production: 'Production Name' },
  { name: 'Don Toliver', year: '2024', video: './videos/11_DON TOLIVER.mp4', director: 'Director Name', production: 'Production Name' },
  { name: 'Twenty One Pilots', year: '2024', video: './videos/12_TWENTY ONE PILOTS.mp4', director: 'Director Name', production: 'Production Name' },
  { name: 'Madonna', year: '2023', video: './videos/13_MADONNA.mp4', director: 'Director Name', production: 'Production Name' },
  { name: 'Peggy Gou', year: '2023', video: './videos/14_PEGGY GOU.mp4', director: 'Director Name', production: 'Production Name' },
  { name: 'K1X', year: '2023', video: './videos/15_K1X.mp4', director: 'Director Name', production: 'Production Name' },
  { name: 'Polestar', year: '2023', video: './videos/16_POLESTAR.mp4', director: 'Director Name', production: 'Production Name' },
  { name: 'Puma', year: '2024', video: './videos/17_PUMA.mp4', director: 'Director Name', production: 'Production Name' },
  { name: 'Navi', year: '2023', video: './videos/18_NAVI.mp4', director: 'Director Name', production: 'Production Name' },
  { name: 'Yeat', year: '2024', video: './videos/19_YEAT_1.mp4', director: 'Director Name', production: 'Production Name' },
  { name: 'Chris Brown', year: '2024', video: './videos/20_CHRIS BROWN.mp4', director: 'Director Name', production: 'Production Name' },
  { name: 'Citroen', year: '2023', video: './videos/21_CITROEN.mp4', director: 'Director Name', production: 'Production Name' },
  { name: 'Lisa', year: '2024', video: './videos/22_LISA.mp4', director: 'Director Name', production: 'Production Name' }
];

function getProjects() {
  try {
    const stored = localStorage.getItem('bereg_projects');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {}
  return DEFAULT_PROJECTS;
}

function saveProjects(projects) {
  localStorage.setItem('bereg_projects', JSON.stringify(projects));
}
