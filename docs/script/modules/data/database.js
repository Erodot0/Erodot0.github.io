'use strict';
//job img path
const jobIconPath = './assets/images/';
//social icon path
const socialIconPath = './assets/images/social-icon/';

//skills
export const skills = {
  core: [
    { name: 'Go', level: 'Advanced' },
    { name: 'Fiber', level: 'Advanced' },
    { name: 'PostgreSQL', level: 'Proficient' },
    { name: 'Docker', level: 'Proficient' },
    { name: 'TypeScript', level: 'Proficient' },
  ],
  used: [
    { name: 'React', level: 'Proficient' },
    { name: 'Node.js', level: 'Proficient' },
    { name: 'GraphQL', level: 'Proficient' },
    { name: 'TailwindCSS', level: 'Proficient' },
    { name: 'MongoDB', level: 'Proficient' },
  ],
  learning: [
    { name: 'Kubernetes', level: 'Beginner' },
    { name: 'gRPC', level: 'Beginner' },
    { name: 'Redis', level: 'Beginner' },
    { name: 'Next.js', level: 'Beginner' },
    { name: 'AWS', level: 'Beginner' },
  ],
};

//projects db
export const projects = [
  {
    title: 'Task Tracker API',
    description:
      'Freelance teams struggled to monitor tasks; built a Go/Fiber API with JWT auth. Result: shortened project reporting time by 30%.',
    stack: ['Go', 'Fiber', 'Postgres'],
    github: 'https://github.com/Erodot0/task-tracker',
    live: 'https://task-tracker.example.com',
    outcome: '-30% reporting time',
  },
  {
    title: 'Portfolio Builder',
    description:
      'Bootstrapping devs needed a fast way to showcase work; created a React/Vite template generator. Live sites load 50% faster.',
    stack: ['React', 'Vite', 'Tailwind'],
    github: 'https://github.com/Erodot0/portfolio-builder',
    live: 'https://portfolio-builder.example.com',
    outcome: '50% faster load times',
  },
  {
    title: 'IoT Energy Dashboard',
    description:
      'Homeowners lacked insight into energy usage; built a Node/GraphQL dashboard with real-time charts. Helped cut consumption by 15%.',
    stack: ['Node', 'GraphQL', 'MongoDB'],
    github: 'https://github.com/Erodot0/iot-energy-dashboard',
    live: 'https://energy.example.com',
    outcome: '-15% energy consumption',
  },
];

//job db
export const job = [
  {
    company: 'Develhope',
    role: 'Junior Full Stack Web Developer',
    period: '2022',
    src: `${jobIconPath}develhope.jpg`,
    alt: 'Develhope logo',
    summary:
      'Internship progressing from frontend to backend, delivering production web app as team lead.',
    responsibilities: [
      'Developed features with React and Node',
      'Led agile sprints for a 4-person intern team',
    ],
    results: ['Shipped MVP used by 50+ students'],
  },
  {
    company: 'Kodland',
    role: 'Web Developing Tutor',
    period: '2023–Present',
    src: `${jobIconPath}kodland.jpg`,
    alt: 'Kodland logo',
    summary:
      'Teach coding fundamentals to young students in live online classes.',
    responsibilities: [
      'Run weekly HTML/CSS/JS workshops',
      'Prepare detailed progress reports for parents',
    ],
    results: ['98% student course completion'],
  },
];

//social db
export const socials = [
  {
    name: 'Github',
    src: `${socialIconPath}github.png`,
    href: 'https://github.com/Erodot0',
  },
  {
    name: 'Linkedin',
    src: `${socialIconPath}linkedin.png`,
    href: 'https://www.linkedin.com/in/janmanpreet/',
  },
  {
    name: 'Telegram',
    src: `${socialIconPath}telegram.png`,
    href: 'https://t.me/Janmanpreet',
  },
  {
    name: 'Instagram',
    src: `${socialIconPath}instagram.png`,
    href: 'https://www.instagram.com/j.singh27/',
  },
];
