// Edit homepage content here. Keep media in public/images/ or public/videos/.
export default {
  lang: 'en',
  appearance: 'soft',
  url: '',
  name: 'Chen Yang',
  tabTitle: 'Chen',
  nativeName: '楊宸',
  field: 'Robot Learning', // Used in the social sharing title.
  description: 'Personal academic homepage — research, projects, and experience.',
  portrait: { src: 'images/chen-yang-portrait.png', alt: 'Portrait of Chen Yang', position: 'center' },
  bio: [
    'Hi there! I’m a final-year undergraduate student at The Chinese University of Hong Kong, Shenzhen, majoring in Electrical and Computer Engineering.',
    'I’m interested in robot learning and reinforcement learning. My long-term goal is to build physical AGI: general-purpose robots that can learn, adapt, and act in the real world.',
    'I’m seeking Ph.D. opportunities starting in Fall 2027. If you think my background could be a good fit for your group, please feel free to reach out.',
  ],
  interests: [],
  links: [
    { label: 'Email', icon: 'mail', url: 'mailto:chenyang@link.cuhk.edu.cn' },
    { label: 'Scholar', icon: 'scholar', url: 'https://scholar.google.com/citations?user=tNRqNdMAAAAJ' },
    { label: 'GitHub', icon: 'github', url: 'https://github.com/yangchen73' },
    { label: 'CV', icon: 'file', url: 'cv.pdf' },
  ],
  research: [
    {
      id: 'spectral-skills',
      title: 'Learning Expressive and Compositional Motion Representation via Spectral Skills',
      venue: 'arXiv preprint',
      year: '2026',
      authors: 'Feiyang Wu, Chenxiao Gao, Chen Yang, Ye Zhao, Bo Dai, Anqi Wu',
      summary: 'A predictive motion representation that enables one humanoid controller to track diverse motions, chain skills, and compose new behaviors by steering in skill space.',
      media: { type: 'image', src: 'images/spectral-skills-teaser.png', alt: 'A Unitree G1 switches and combines motion skills while following a loop.', fit: 'natural', width: 2400, height: 984 },
      links: [
        { label: 'Paper', url: 'https://arxiv.org/abs/2609.37677' },
        { label: 'Project Page', url: 'https://spectral-skill.github.io/' },
      ],
    },
    {
      id: 'embodichain',
      title: 'EmbodiChain',
      venue: '',
      year: '',
      authors: 'Core contributor',
      summary: 'An end-to-end, GPU-accelerated platform for embodied AI. EmbodiChain brings simulation, automated data generation, and robot learning into a modular workflow for developing and evaluating real-world robotic systems.',
      contribution: '',
      media: { type: 'image', src: 'images/embodichain-teaser.jpg', alt: 'EmbodiChain teaser showing simulated environments and robot tasks.', fit: 'natural', width: 1983, height: 1120 },
      links: [
        { label: 'Website', url: 'https://dexforce.com/embodichain/index.html' },
        { label: 'Code', url: 'https://github.com/DexForce/EmbodiChain' },
      ],
      details: '',
    },
    {
      id: 'smart-stop-snoring-pillow',
      title: 'Smart Stop-Snoring Pillow',
      venue: '',
      year: '',
      authors: '',
      summary: 'A soft robotic system integrating pressure sensors, valves, airbags, an air pump, and an embedded controller. It estimates airflow for precise airbag control and uses only pressure signals to detect snoring and estimate heart and respiratory rates.',
      contribution: '',
      media: { type: 'video', src: 'videos/smart-stop-snoring-pillow.mp4', poster: 'images/smart-stop-snoring-pillow-poster.jpg', alt: 'Bench-top demonstration of the pneumatic pillow airbag inflating and deflating.', width: 640, height: 368 },
      links: [],
      details: '',
    },
  ],
  news: [
    { date: '2026.09', datetime: '2026-09', text: 'Our Spectral Skills preprint is out, and the work won Best Paper at the IROS 2026 workshop on compositional and modular learning.', url: '' },
    { date: '2026.06', datetime: '2026-06', text: 'Started a summer research internship at Georgia Tech.', url: '' },
    { date: '2026.01', datetime: '2026-01', text: 'Started a research internship at DexForce.', url: '' },
  ],
  experience: [
    {
      institution: 'Georgia Institute of Technology', role: 'Research Intern', period: 'Jun–Sep 2026',
      supervisors: [
        { name: 'Ye Zhao', url: 'https://me.gatech.edu/faculty/zhao' },
        { name: 'Anqi Wu', url: 'https://ml.gatech.edu/people/anqi-wu' },
      ],
      mentor: { name: 'Feiyang Wu', url: 'https://feiyangwu.com/' },
      logo: 'images/georgia-tech-mark.svg', logoTight: true, url: 'https://www.gatech.edu/',
    },
    {
      institution: 'DexForce', role: 'Research Intern', period: 'Jan 2026 — Present',
      supervisors: [
        { name: 'Guiliang Liu', url: 'https://guiliang.me/' },
        { name: 'Kui Jia', url: 'https://sds.cuhk.edu.cn/en/teacher/1159' },
      ],
      mentor: { name: 'Yueci Deng', url: 'https://yuecideng.github.io/' },
      logo: 'images/dexforce-mark.svg', url: 'https://en.dexforce.com/',
    },
    {
      institution: 'Shenzhen Research Institute of Big Data', role: 'Algorithm Intern', period: 'Apr–Aug 2024',
      mentor: { name: 'Yingjun Shen', url: 'https://scholar.google.com/citations?user=bsTP7BkAAAAJ&hl=zh-CN' },
      logo: 'images/sribd-logo.png', logoSeal: true, url: 'https://www.sribd.cn/en',
    },
    {
      institution: 'Soft Robotics Lab', role: 'Research Assistant', period: 'Sep 2023–Apr 2024',
      supervisors: [{ name: 'Jian Zhu', url: 'https://rail.cuhk.edu.cn/people/319' }],
      logo: 'images/cuhk-shenzhen-logo.png', logoCrest: true, url: 'https://rail.cuhk.edu.cn/team/325',
    },
  ],
  education: [
    {
      institution: 'The Chinese University of Hong Kong, Shenzhen',
      role: 'Undergraduate · Electrical and Computer Engineering',
      period: 'Sep 2022 — Present', advisor: '', detail: '', logo: 'images/cuhk-shenzhen-logo.png', logoCrest: true, url: 'https://www.cuhk.edu.cn/en',
      honors: [
        { name: 'Dean’s List', years: '2023, 2024, 2025, 2026' },
        { name: 'Academic Award', years: '2023, 2024' },
        { name: 'Creativity and Innovation Award', years: '2024' },
      ],
    },
    {
      institution: 'University of California, Berkeley', role: 'Visiting Student · EECS',
      period: 'Sep–Dec 2024', advisor: '', detail: '', logo: 'images/berkeley-icon.webp', logoTight: true, url: 'https://www.berkeley.edu/',
    },
  ],
  teaching: [
    {
      role: 'Teaching Assistant',
      institution: 'CUHK-Shenzhen',
      courses: [
        { code: 'ECE3080', title: 'Introduction to Embedded Systems', term: '2026–27 Term 1', url: 'https://www.cuhk.edu.cn/en/course/17817' },
        { code: 'ECE3810', title: 'Embedded Systems Laboratory', term: '2026–27 Term 1', url: 'https://www.cuhk.edu.cn/en/course/17818' },
        { code: 'PHY1001', title: 'Mechanics', term: '2023–24 Term 2', url: 'https://www.cuhk.edu.cn/en/course/17707' },
      ],
    },
  ],
  updated: '',
};
