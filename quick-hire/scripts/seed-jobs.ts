import 'dotenv/config';
import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

const Job = mongoose.model('Job', JobSchema);

const FAKE_JOBS = [
  {
    title: 'Senior Backend Developer',
    company: 'TechFlow Inc',
    location: 'Remote',
    category: 'Engineering',
    description:
      'Build scalable APIs and services. Experience with Node.js, ' +
      'NestJS, and MongoDB required. Join our distributed team.',
  },
  {
    title: 'Frontend Engineer',
    company: 'Pixel Labs',
    location: 'San Francisco, CA',
    category: 'Technology',
    description:
      'Create beautiful, responsive UIs with React and Next.js. ' +
      'Strong CSS and TypeScript skills preferred.',
  },
  {
    title: 'UX Designer',
    company: 'Design Studio Co',
    location: 'New York, NY',
    category: 'Design',
    description:
      'Own the end-to-end design process for our product suite. ' +
      'Figma, user research, and prototyping experience required.',
  },
  {
    title: 'Sales Representative',
    company: 'Growth Sales Ltd',
    location: 'Chicago, IL',
    category: 'Sales',
    description:
      'Drive new business and manage key accounts. Base salary plus ' +
      'commission. B2B SaaS experience a plus.',
  },
  {
    title: 'Marketing Manager',
    company: 'BrandWave',
    location: 'Austin, TX',
    category: 'Marketing',
    description:
      'Lead content, SEO, and campaign strategy. Manage a small ' +
      'team and work with product and sales.',
  },
  {
    title: 'Financial Analyst',
    company: 'Summit Finance',
    location: 'Boston, MA',
    category: 'Finance',
    description:
      'Support budgeting, forecasting, and reporting. CFA or ' +
      'equivalent experience preferred.',
  },
  {
    title: 'DevOps Engineer',
    company: 'CloudScale',
    location: 'Remote',
    category: 'Engineering',
    description:
      'Maintain CI/CD, Kubernetes, and cloud infrastructure. ' +
      'AWS or GCP experience required.',
  },
  {
    title: 'Product Manager',
    company: 'Product First',
    location: 'Seattle, WA',
    category: 'Business',
    description:
      'Define roadmap and work with engineering and design. ' +
      'Strong analytical and communication skills.',
  },
  {
    title: 'HR Business Partner',
    company: 'PeopleOps',
    location: 'Denver, CO',
    category: 'Human Resource',
    description:
      'Support hiring, onboarding, and employee relations. ' +
      'Experience in fast-growing tech companies.',
  },
  {
    title: 'Data Engineer',
    company: 'DataDriven Inc',
    location: 'Remote',
    category: 'Technology',
    description:
      'Build data pipelines and warehouses. SQL, Python, and ' +
      'Spark experience required.',
  },
  {
    title: 'Junior Software Developer',
    company: 'StarterTech',
    location: 'Portland, OR',
    category: 'Engineering',
    description:
      'Learn and contribute to our web applications. Mentorship ' +
      'provided. CS degree or bootcamp okay.',
  },
  {
    title: 'Graphic Designer',
    company: 'Visual Studio',
    location: 'Los Angeles, CA',
    category: 'Design',
    description:
      'Create marketing assets, illustrations, and brand materials. ' +
      'Adobe Creative Suite proficiency required.',
  },
  {
    title: 'Account Executive',
    company: 'Enterprise Solutions',
    location: 'Dallas, TX',
    category: 'Sales',
    description:
      'Close enterprise deals and nurture relationships. Experience ' +
      'with long sales cycles preferred.',
  },
  {
    title: 'Content Writer',
    company: 'Content Hub',
    location: 'Remote',
    category: 'Marketing',
    description:
      'Write blog posts, docs, and marketing copy. SEO knowledge ' +
      'and technical writing experience a plus.',
  },
  {
    title: 'Accountant',
    company: 'Ledger Plus',
    location: 'Philadelphia, PA',
    category: 'Finance',
    description:
      'Handle month-end close, reconciliations, and compliance. ' +
      'CPA or working toward CPA preferred.',
  },
  {
    title: 'Full Stack Developer',
    company: 'Stack Labs',
    location: 'Miami, FL',
    category: 'Technology',
    description:
      'Work on both frontend and backend features. React and Node ' +
      'experience required.',
  },
  {
    title: 'QA Engineer',
    company: 'Quality First',
    location: 'Atlanta, GA',
    category: 'Engineering',
    description:
      'Design and automate tests. Experience with Cypress, Jest, ' +
      'or similar tools.',
  },
  {
    title: 'Business Analyst',
    company: 'Strategy Corp',
    location: 'Washington, DC',
    category: 'Business',
    description:
      'Gather requirements and define processes. Strong Excel and ' +
      'presentation skills required.',
  },
  {
    title: 'Recruiter',
    company: 'Talent Find',
    location: 'Remote',
    category: 'Human Resource',
    description:
      'Source and hire for engineering and product roles. Tech ' +
      'recruiting experience preferred.',
  },
  {
    title: 'Mobile Developer',
    company: 'AppWorks',
    location: 'San Diego, CA',
    category: 'Engineering',
    description:
      'Build iOS and Android apps with React Native or Flutter. ' +
      'Published apps in portfolio preferred.',
  },
  {
    title: 'UI Designer',
    company: 'Interface Co',
    location: 'Minneapolis, MN',
    category: 'Design',
    description:
      'Design interfaces for web and mobile. Component systems and ' +
      'design systems experience a plus.',
  },
  {
    title: 'Inside Sales Rep',
    company: 'Velocity Sales',
    location: 'Phoenix, AZ',
    category: 'Sales',
    description:
      'Qualify leads and book meetings for the sales team. Strong ' +
      'phone and CRM skills.',
  },
  {
    title: 'Growth Marketing Specialist',
    company: 'Scale Marketing',
    location: 'Remote',
    category: 'Marketing',
    description:
      'Run paid campaigns and experiments. Google Ads and Meta Ads ' +
      'experience required.',
  },
  {
    title: 'Financial Controller',
    company: 'Control Finance',
    location: 'Houston, TX',
    category: 'Finance',
    description:
      'Own financial reporting and internal controls. CPA and ' +
      'prior controller experience required.',
  },
  {
    title: 'Security Engineer',
    company: 'SecureNet',
    location: 'Remote',
    category: 'Technology',
    description:
      'Implement security best practices and respond to incidents. ' +
      'Security certifications a plus.',
  },
  {
    title: 'Scrum Master',
    company: 'Agile Teams',
    location: 'Columbus, OH',
    category: 'Business',
    description:
      'Facilitate ceremonies and remove blockers. CSM or similar ' +
      'certification preferred.',
  },
  {
    title: 'HR Coordinator',
    company: 'People First',
    location: 'Nashville, TN',
    category: 'Human Resource',
    description:
      'Support recruiting, onboarding, and HR operations. Entry-level ' +
      'role with growth potential.',
  },
  {
    title: 'Backend Developer',
    company: 'API Labs',
    location: 'Detroit, MI',
    category: 'Engineering',
    description:
      'Develop and maintain microservices. Experience with Go, Java, ' +
      'or Node.js required.',
  },
  {
    title: 'Brand Designer',
    company: 'Brand House',
    location: 'San Jose, CA',
    category: 'Design',
    description:
      'Define and evolve brand identity across all touchpoints. ' +
      'Portfolio showing brand systems required.',
  },
  {
    title: 'Sales Engineer',
    company: 'Solution Sales',
    location: 'Charlotte, NC',
    category: 'Sales',
    description:
      'Demo product and support technical evaluations. Technical ' +
      'background and presentation skills required.',
  },
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is not set. Add it to .env or the environment.');
    process.exit(1);
  }
  await mongoose.connect(uri);
  const existing = await Job.countDocuments();
  if (existing > 0) {
    console.log(`Found ${existing} existing job(s). Inserting additional jobs.`);
  }
  const result = await Job.insertMany(FAKE_JOBS);
  console.log(`Inserted ${result.length} jobs into MongoDB.`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
