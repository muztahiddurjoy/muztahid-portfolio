/* ============================================================
   THE FULL-STACK INNOVATOR — single source of truth (hardcoded)
   This mirrors the Payload CMS content model from project_prd.md
   so it can be swapped for the Local API later with no UI change.
   ============================================================ */

export type Category = 'robotics' | 'cloud' | 'hardware'
export type SkillCluster = 'hardware-perception' | 'software-backend' | 'devops-deployment'
export type AwardCategory = 'award' | 'competition' | 'leadership'

export const categoryMeta: Record<
  Category,
  { label: string; short: string; accentVar: string; hex: string }
> = {
  robotics: {
    label: 'Robotics & Autonomous Systems',
    short: 'Robotics',
    accentVar: 'var(--color-robotics)',
    hex: '#46e3ff',
  },
  cloud: {
    label: 'Cloud & Web Infrastructure',
    short: 'Cloud',
    accentVar: 'var(--color-cloud)',
    hex: '#8f7bff',
  },
  hardware: {
    label: 'Hardware Engineering',
    short: 'Hardware',
    accentVar: 'var(--color-hardware)',
    hex: '#ffb454',
  },
}

export const siteConfig = {
  name: 'Muztahid Rahman',
  shortName: 'Muztahid',
  role: 'Software & Robotics Engineer',
  location: 'Dhaka, Bangladesh',
  email: 'muztahid.appbaksho@gmail.com',
  github: 'https://github.com/muztahiddurjoy',
  linkedin: 'https://www.linkedin.com/in/muztahiddurjoy',
  availability: 'Open to Master’s opportunities · 2026 intake',
  nav: [
    { label: 'Projects', href: '#projects', index: '01' },
    { label: 'Skills', href: '#skills', index: '02' },
    { label: 'Timeline', href: '#timeline', index: '03' },
    { label: 'About', href: '#about', index: '04' },
  ],
}

export const hero = {
  badge: 'Available — Master’s 2026',
  // split for word/line stagger animation
  headline: ['Bridging', 'Autonomous Robotics', '& Scalable Software.'],
  subhead:
    'I engineer intelligent systems from hardware to the cloud — autonomous navigation stacks, production-grade web infrastructure, and the firmware in between. Currently seeking Master’s opportunities in Robotics & Autonomous Systems.',
  primaryCta: { label: 'View My Projects', href: '#projects' },
  secondaryCta: { label: 'Download Academic CV', href: '/cv' },
  marquee: [
    'ROS2',
    'SLAM',
    'Next.js',
    'NestJS',
    'STM32',
    'AWS',
    'Prisma',
    'C/C++',
    'LiDAR',
    'MongoDB',
    'Docker',
    'Python',
  ],
}

export const stats = [
  { value: 15, suffix: '+', label: 'Projects shipped' },
  { value: 50, suffix: '+', label: 'DB models designed' },
  { value: 18, suffix: '+', label: 'Technologies mastered' },
  { value: 3, suffix: '', label: 'Engineering disciplines' },
]

export type RepoLink = { label: string; url: string }
export type KeyMetric = { label: string; value: string }

export type Project = {
  slug: string
  title: string
  subtitle: string
  category: Category
  summary: string
  successMetric: string
  year: string
  role: string
  duration: string
  featured: boolean
  tech: string[]
  keyMetrics: KeyMetric[]
  // case study (FR-2.6)
  problem: string
  architecture: string[]
  result: string
  repoLinks: RepoLink[]
  features: string[]
  code: { filename: string; language: string; lines: string[] }
  gallery: { label: string; caption: string }[]
}

export const projects: Project[] = [
  {
    slug: 'autonomous-navigation-rover',
    title: 'Autonomous Navigation Stack',
    subtitle: 'BRACU Mongol-Tori · Mars Rover',
    category: 'robotics',
    summary:
      'A full ROS2 autonomy stack for a Mars-rover platform: SLAM mapping, LiDAR–IMU sensor fusion, and real-time path planning across unstructured terrain.',
    successMetric: '±15 cm nav accuracy @ 30 Hz',
    year: '2024',
    role: 'Autonomy & Software Lead',
    duration: 'Ongoing',
    featured: true,
    tech: ['ROS2', 'C/C++', 'Python', 'SLAM', 'LiDAR', 'OpenCV', 'Linux'],
    keyMetrics: [
      { label: 'Sensor inputs', value: '5+' },
      { label: 'Nav accuracy', value: '±15cm' },
      { label: 'Control loop', value: '30Hz' },
      { label: 'Competition', value: 'URC' },
    ],
    problem:
      'The rover must traverse rocky, GPS-denied terrain and make real-time decisions on constrained onboard compute. Wheel odometry drifts on loose regolith, GPS is unreliable between obstacles, and the control loop has a hard 33 ms budget — there is no room for a navigation stall when the rover is mid-incline.',
    architecture: [
      'A ROS2 graph splits perception, planning, and control into independent nodes communicating over DDS, so a stalled planner never blocks the motor watchdog.',
      'Sensor fusion combines LiDAR point clouds with IMU data through an EKF for drift-resistant odometry; stereo vision adds near-field obstacle depth.',
      'A custom C++ planner runs A* over a rolling costmap with obstacle inflation, while a mission-level state machine arbitrates waypoint following, recovery, and fail-safe stop.',
      'Low-level motor commands are clamped and rate-limited on an STM32 bridge, decoupling high-level intent from the physical drivetrain.',
    ],
    result:
      'The stack holds ±15 cm waypoint accuracy at a sustained 30 Hz control loop across five fused sensor inputs, qualifying the platform for University Rover Challenge autonomy runs. Recovery behaviours brought autonomous mission completion from intermittent to repeatable on test terrain.',
    repoLinks: [
      { label: 'github.com/muztahiddurjoy', url: 'https://github.com/muztahiddurjoy' },
      { label: 'Mongol-Tori — nav stack', url: 'https://github.com/muztahiddurjoy' },
    ],
    features: [
      'ROS2 DDS inter-process architecture',
      'SLAM-based real-time mapping & localization',
      'LiDAR + IMU sensor-fusion (EKF) pipeline',
      'C++ A* path planning with obstacle inflation',
      'Mission state machine + fail-safe recovery',
      'GPS waypoint nav with dead-reckoning fallback',
    ],
    code: {
      filename: 'src/nav_node.cpp',
      language: 'cpp',
      lines: [
        'class AutonomousNav : public rclcpp::Node {',
        'public:',
        '  AutonomousNav() : Node("autonomous_nav") {',
        '    odom_sub_ = create_subscription<Odometry>(',
        '      "/odom", 10, bind(&AutonomousNav::on_odom, this, _1));',
        '    cmd_pub_ = create_publisher<Twist>("/cmd_vel", 10);',
        '  }',
        'private:',
        '  void on_odom(const Odometry::SharedPtr msg) {',
        '    auto cmd = Twist();',
        '    double dx = waypoints_[wp_].x - msg->pose.pose.position.x;',
        '    cmd.linear.x = std::clamp(dx * 0.5, -1.0, 1.0);',
        '    cmd_pub_->publish(cmd);',
        '  }',
        '};',
      ],
    },
    gallery: [
      { label: 'Costmap', caption: 'Rolling costmap with inflated obstacles' },
      { label: 'Field test', caption: 'Autonomy run on test terrain' },
      { label: 'Sensor rig', caption: 'LiDAR + stereo perception head' },
    ],
  },
  {
    slug: 'enterprise-ecommerce-infrastructure',
    title: 'Enterprise E-Commerce Infrastructure',
    subtitle: 'zf-emart & zf-foods',
    category: 'cloud',
    summary:
      'A production, multi-tenant commerce platform powering multiple storefronts on one typed backend — inventory, payments, and order tracking in real time.',
    successMetric: '99.9% uptime · <200 ms responses',
    year: '2024',
    role: 'Full-Stack Engineer',
    duration: '6+ months',
    featured: true,
    tech: ['Next.js', 'NestJS', 'Prisma', 'PostgreSQL', 'AWS', 'Docker', 'TypeScript'],
    keyMetrics: [
      { label: 'DB models', value: '25+' },
      { label: 'API endpoints', value: '60+' },
      { label: 'Uptime', value: '99.9%' },
      { label: 'Response', value: '<200ms' },
    ],
    problem:
      'Multiple storefronts needed to run on one backend without leaking data across tenants, while handling thousands of SKUs, deeply nested category trees, and zero-downtime deploys. Auth had to work across several client applications at once.',
    architecture: [
      'A NestJS API enforces clean service–repository separation, with Prisma providing type-safe data access and migrations across 25+ relational models.',
      'A Next.js frontend handles SSR and client interactivity; tenancy is resolved per request so storefronts share logic but never share data.',
      'JWT auth with refresh-token rotation secures every client app; AWS SES (production access) drives transactional email on verified custom domains.',
      'Docker images ship through a CI/CD pipeline with health checks and rollbacks for zero-downtime releases.',
    ],
    result:
      'The platform sustains 99.9% uptime with sub-200 ms median responses across 60+ endpoints, synchronising inventory in real time across storefronts. Content editors update catalogs without engineering involvement.',
    repoLinks: [{ label: 'github.com/muztahiddurjoy', url: 'https://github.com/muztahiddurjoy' }],
    features: [
      'Multi-tenant storefront architecture',
      'JWT auth with refresh-token rotation',
      'Real-time inventory synchronization',
      'AWS SES on verified custom domains',
      'Prisma type-safe migrations',
      'Dockerized zero-downtime deploys',
    ],
    code: {
      filename: 'prisma/schema.prisma',
      language: 'prisma',
      lines: [
        'model Product {',
        '  id         String   @id @default(cuid())',
        '  name       String',
        '  slug       String   @unique',
        '  price      Decimal  @db.Decimal(10, 2)',
        '  sku        String   @unique',
        '  inventory  Int      @default(0)',
        '  category   Category @relation(fields: [categoryId], references: [id])',
        '  categoryId String',
        '  variants   ProductVariant[]',
        '  @@index([categoryId])',
        '  @@map("products")',
        '}',
      ],
    },
    gallery: [
      { label: 'Schema', caption: 'Normalised 25-model Prisma schema' },
      { label: 'Dashboard', caption: 'Role-based admin dashboard' },
      { label: 'Pipeline', caption: 'CI/CD with health checks' },
    ],
  },
  {
    slug: 'stm32-motor-control-firmware',
    title: 'Real-Time Motor-Control Firmware',
    subtitle: 'STM32 · ARM Cortex-M4',
    category: 'hardware',
    summary:
      'Bare-metal firmware bridging high-level autonomy intent to physical drivetrains — interrupt-driven sensor polling and closed-loop PID at 10 kHz+.',
    successMetric: '10 kHz polling · deterministic loop',
    year: '2024',
    role: 'Embedded Engineer',
    duration: '4 months',
    featured: false,
    tech: ['C/C++', 'STM32', 'ESP32', 'Digital Logic', 'Linux'],
    keyMetrics: [
      { label: 'Sample rate', value: '10kHz+' },
      { label: 'Jitter', value: '<5µs' },
      { label: 'PID loops', value: '4x' },
      { label: 'MCU', value: 'Cortex-M4' },
    ],
    problem:
      'Line-following and drivetrain control need deterministic timing: a polling-based IR array introduced jitter that the higher-level planner could not compensate for, and busy-wait loops starved the control task on a single core.',
    architecture: [
      'Sensor acquisition moved from polling to timer-driven interrupts, freeing the main loop and pinning sample timing under 5 µs of jitter.',
      'A DMA path streams ADC channels into a ring buffer so the CPU never blocks on conversion.',
      'Four independent PID loops run from a fixed-rate timer ISR; outputs are clamped and slew-limited before reaching the motor drivers.',
      'A thin command protocol over UART exposes setpoints to the ROS2 bridge, decoupling firmware from the autonomy stack.',
    ],
    result:
      'The firmware sustains 10 kHz+ sensor sampling with deterministic control timing, eliminating the jitter that previously destabilised line-following at speed. Verified against oscilloscope timing captures.',
    repoLinks: [{ label: 'github.com/muztahiddurjoy', url: 'https://github.com/muztahiddurjoy' }],
    features: [
      'Interrupt-driven (vs polling) sensor acquisition',
      'DMA-fed ADC ring buffer',
      'Four fixed-rate PID control loops',
      'Slew-limited motor outputs',
      'UART command protocol to ROS2 bridge',
      'Oscilloscope-verified timing',
    ],
    code: {
      filename: 'src/control_isr.c',
      language: 'c',
      lines: [
        'void TIM2_IRQHandler(void) {',
        '  if (TIM2->SR & TIM_SR_UIF) {',
        '    TIM2->SR &= ~TIM_SR_UIF;',
        '    for (int i = 0; i < N_MOTORS; i++) {',
        '      float err = setpoint[i] - encoder_rate[i];',
        '      integ[i] = clampf(integ[i] + err * DT, -I_MAX, I_MAX);',
        '      float u = KP*err + KI*integ[i] + KD*(err - prev[i])/DT;',
        '      motor_write(i, clampf(u, -PWM_MAX, PWM_MAX));',
        '      prev[i] = err;',
        '    }',
        '  }',
        '}',
      ],
    },
    gallery: [
      { label: 'Scope', caption: 'Timing capture @ 10 kHz' },
      { label: 'Board', caption: 'STM32 driver board' },
      { label: 'Bench', caption: 'Closed-loop bench test' },
    ],
  },
  {
    slug: 'appbaksho-platform',
    title: 'Startup Operations Platform',
    subtitle: 'Appbaksho',
    category: 'cloud',
    summary:
      'A ground-up startup build: the core platform, internal operations tooling, and automated legal-document generation — engineering well beyond the code.',
    successMetric: 'Weeks → hours legal turnaround',
    year: '2023',
    role: 'Founder & Lead Developer',
    duration: 'Ongoing',
    featured: false,
    tech: ['Next.js', 'Prisma', 'PostgreSQL', 'AWS', 'TypeScript', 'Docker'],
    keyMetrics: [
      { label: 'Clients shipped', value: '5+' },
      { label: 'Doc turnaround', value: '−95%' },
      { label: 'Deploys', value: 'CI/CD' },
      { label: 'Founded', value: '2023' },
    ],
    problem:
      'A new agency needed a full digital presence and business formation under tight timelines — code, internal tooling, and the non-technical machinery of legal and compliance documents, all at once.',
    architecture: [
      'A modular Next.js component architecture enabled rapid iteration without sacrificing production quality.',
      'A headless CMS integration let non-technical team members own content updates.',
      'An automated document-generation pipeline templated legal and compliance paperwork from structured inputs.',
      'AWS-backed deploys with monitoring closed the loop from client discovery to post-launch.',
    ],
    result:
      'Delivered 5+ production web products for SMB clients and cut legal paperwork turnaround from weeks to hours through automated generation — freeing the team to focus on delivery.',
    repoLinks: [{ label: 'github.com/muztahiddurjoy', url: 'https://github.com/muztahiddurjoy' }],
    features: [
      'Modular Next.js product architecture',
      'Headless CMS for non-technical editors',
      'Automated legal-document generation',
      'AWS deploys with monitoring',
      'End-to-end client delivery',
      'Reusable agency component library',
    ],
    code: {
      filename: 'lib/generate-doc.ts',
      language: 'typescript',
      lines: [
        'export async function generateDoc(template: Template, data: ClientData) {',
        '  const filled = render(template.body, data)',
        '  const pdf = await toPdf(filled, { margins: A4_MARGINS })',
        '  await s3.put(`docs/${data.clientId}/${template.id}.pdf`, pdf)',
        '  return { url: signedUrl(template.id), generatedAt: Date.now() }',
        '}',
      ],
    },
    gallery: [
      { label: 'Platform', caption: 'Agency platform website' },
      { label: 'Ops', caption: 'Internal operations tooling' },
      { label: 'Docs', caption: 'Generated compliance docs' },
    ],
  },
  {
    slug: 'fabrication-prototyping-pipeline',
    title: 'Rapid Fabrication Pipeline',
    subtitle: 'CAD → Slice → Print',
    category: 'hardware',
    summary:
      'End-to-end physical prototyping for robotic assemblies — CAD modelling through slice optimisation to production on Bambu Lab hardware.',
    successMetric: '30+ custom parts produced',
    year: '2024',
    role: 'Design & Fabrication',
    duration: 'Ongoing',
    featured: false,
    tech: ['Digital Logic', 'C/C++', 'Linux'],
    keyMetrics: [
      { label: 'Parts printed', value: '30+' },
      { label: 'Layer height', value: '0.12mm' },
      { label: 'Infill', value: 'Gyroid' },
      { label: 'Hardware', value: 'Bambu Lab' },
    ],
    problem:
      'Robotic assemblies need custom enclosures, sensor mounts, and brackets that no off-the-shelf part fits — each iteration must move from idea to validated physical part quickly and repeatably.',
    architecture: [
      'Components start as parametric CAD models with explicit tolerances and assembly constraints, validated against mechanical requirements.',
      'STL exports are sliced with purpose-tuned parameters — 0.12 mm precision layers, gyroid infill for strength, grid for speed — per part role.',
      'Prints run on Bambu Lab hardware with real-time monitoring; post-processing adds heat-set inserts and final assembly with electronics.',
      'A small parts library captures proven mounts so the next robot reuses rather than redesigns.',
    ],
    result:
      'Produced 30+ custom parts — enclosures, mounts, and sensor housings — that integrate directly into the rover and embedded builds, closing the loop between digital design and physical hardware.',
    repoLinks: [{ label: 'github.com/muztahiddurjoy', url: 'https://github.com/muztahiddurjoy' }],
    features: [
      'Parametric CAD with tolerance budgets',
      'Role-tuned slice profiles (gyroid / grid)',
      'Real-time print monitoring',
      'Heat-set insert post-processing',
      'Reusable mechanical parts library',
      'Direct integration into robotic builds',
    ],
    code: {
      filename: 'slicer/profile.cfg',
      language: 'ini',
      lines: [
        '[precision]',
        'layer_height = 0.12',
        'infill_pattern = gyroid',
        'infill_density = 35%',
        'wall_loops = 4',
        'support = tree_auto',
        'nozzle_temp = 220',
      ],
    },
    gallery: [
      { label: 'CAD', caption: 'Parametric assembly model' },
      { label: 'Slice', caption: 'Gyroid infill preview' },
      { label: 'Print', caption: 'Finished sensor housing' },
    ],
  },
  {
    slug: 'bot-engineers-internal-tools',
    title: 'Engineering Operations Tooling',
    subtitle: 'BOT Engineers',
    category: 'cloud',
    summary:
      'Internal dashboards for team management, sprint tracking, and deploy notifications — wiring GitHub webhooks into real-time build status.',
    successMetric: '3× faster deploy feedback',
    year: '2024',
    role: 'Chief Software Engineer',
    duration: 'Ongoing',
    featured: false,
    tech: ['Next.js', 'NestJS', 'Docker', 'AWS', 'TypeScript', 'Linux'],
    keyMetrics: [
      { label: 'Deploy speed', value: '3×' },
      { label: 'Team size', value: 'Cross-fn' },
      { label: 'Monorepo', value: 'Turbo' },
      { label: 'CI/CD', value: 'Automated' },
    ],
    problem:
      'A growing cross-functional team lacked visibility into sprints and deploys; build status lived in scattered tooling and code-review culture needed structure to scale.',
    architecture: [
      'A monorepo migration (Turborepo) unified apps and shared packages behind one build graph.',
      'Internal dashboards surface sprint state, team workload, and deploy history in one place.',
      'GitHub webhooks stream build and deploy events into a real-time status feed.',
      'CI/CD pipelines enforce checks and code-review gates before release.',
    ],
    result:
      'Tripled the speed of deploy feedback and standardised a review culture across the team — engineering throughput became visible and predictable.',
    repoLinks: [{ label: 'github.com/muztahiddurjoy', url: 'https://github.com/muztahiddurjoy' }],
    features: [
      'Turborepo monorepo migration',
      'Sprint + workload dashboards',
      'GitHub webhook build feed',
      'Automated CI/CD gates',
      'Code-review culture tooling',
      'Real-time deploy notifications',
    ],
    code: {
      filename: 'webhooks/deploy.ts',
      language: 'typescript',
      lines: [
        'router.post("/gh", verifySignature, async (req, res) => {',
        '  const { workflow_run } = req.body',
        '  if (workflow_run?.conclusion) {',
        '    await feed.push({',
        '      repo: workflow_run.repository.name,',
        '      status: workflow_run.conclusion,',
        '      at: workflow_run.updated_at,',
        '    })',
        '  }',
        '  res.sendStatus(204)',
        '})',
      ],
    },
    gallery: [
      { label: 'Board', caption: 'Sprint tracking board' },
      { label: 'Feed', caption: 'Real-time deploy feed' },
      { label: 'Mono', caption: 'Turborepo build graph' },
    ],
  },
  {
    slug: 'space-apps-telemetry',
    title: 'Satellite Telemetry Visualiser',
    subtitle: 'NASA Space Apps Challenge',
    category: 'cloud',
    summary:
      'A 48-hour build processing satellite telemetry for environmental monitoring, with real-time streaming visualisations across a cross-disciplinary team.',
    successMetric: '48-hour global hackathon build',
    year: '2023',
    role: 'Data & Frontend',
    duration: '48 hours',
    featured: false,
    tech: ['Python', 'Next.js', 'TypeScript'],
    keyMetrics: [
      { label: 'Sprint', value: '48h' },
      { label: 'Streams', value: 'Real-time' },
      { label: 'Scope', value: 'Global' },
      { label: 'Team', value: 'Cross-fn' },
    ],
    problem:
      'Raw satellite telemetry is dense and hard to interpret; an environmental-monitoring story needed to be legible to non-experts within a 48-hour window.',
    architecture: [
      'A Python pipeline ingests and normalises telemetry into a stream-friendly shape.',
      'A Next.js frontend renders real-time streaming graphs over the processed data.',
      'REST APIs decouple ingestion from visualisation so the team could work in parallel.',
      'Interaction patterns let reviewers drill from global view to a single signal.',
    ],
    result:
      'Shipped a working data-visualisation prototype inside the 48-hour sprint, translating satellite telemetry into an interactive environmental-monitoring story under hackathon constraints.',
    repoLinks: [{ label: 'github.com/muztahiddurjoy', url: 'https://github.com/muztahiddurjoy' }],
    features: [
      'Python telemetry ingestion pipeline',
      'Real-time streaming graphs',
      'REST API decoupling',
      'Global-to-signal drilldown',
      'Cross-disciplinary 48h delivery',
      'Environmental-monitoring narrative',
    ],
    code: {
      filename: 'pipeline/ingest.py',
      language: 'python',
      lines: [
        'def normalize(frame: TelemetryFrame) -> Reading:',
        '    return Reading(',
        '        ts=frame.epoch,',
        '        band=frame.channel,',
        '        value=scale(frame.raw, frame.gain),',
        '        quality=flag(frame.snr),',
        '    )',
      ],
    },
    gallery: [
      { label: 'Stream', caption: 'Real-time telemetry graphs' },
      { label: 'Map', caption: 'Global monitoring view' },
      { label: 'Team', caption: '48-hour sprint' },
    ],
  },
]

/* ---- Skills ecosystem (FR-3) ---- */
export const skillClusterMeta: Record<
  SkillCluster,
  { label: string; blurb: string; icon: string }
> = {
  'hardware-perception': {
    label: 'Hardware & Perception',
    blurb: 'Firmware, sensors, and the physical layer',
    icon: 'Cpu',
  },
  'software-backend': {
    label: 'Software & Backend',
    blurb: 'Typed services, data, and product UIs',
    icon: 'Code2',
  },
  'devops-deployment': {
    label: 'DevOps & Deployment',
    blurb: 'Pipelines, cloud, and shipping',
    icon: 'Cloud',
  },
}

export type Skill = {
  name: string
  cluster: SkillCluster
  level: number // 0-100, drives the bar/ring viz
  projects: string[] // related project slugs (FR-3.2)
}

export const skills: Skill[] = [
  // hardware & perception
  { name: 'C/C++', cluster: 'hardware-perception', level: 92, projects: ['autonomous-navigation-rover', 'stm32-motor-control-firmware'] },
  { name: 'ROS2', cluster: 'hardware-perception', level: 88, projects: ['autonomous-navigation-rover'] },
  { name: 'STM32', cluster: 'hardware-perception', level: 85, projects: ['stm32-motor-control-firmware'] },
  { name: 'ESP32', cluster: 'hardware-perception', level: 80, projects: ['stm32-motor-control-firmware'] },
  { name: 'SLAM', cluster: 'hardware-perception', level: 78, projects: ['autonomous-navigation-rover'] },
  { name: 'LiDAR', cluster: 'hardware-perception', level: 76, projects: ['autonomous-navigation-rover'] },
  { name: 'OpenCV', cluster: 'hardware-perception', level: 74, projects: ['autonomous-navigation-rover'] },
  { name: 'Digital Logic', cluster: 'hardware-perception', level: 82, projects: ['stm32-motor-control-firmware', 'fabrication-prototyping-pipeline'] },
  // software & backend
  { name: 'Next.js', cluster: 'software-backend', level: 95, projects: ['enterprise-ecommerce-infrastructure', 'appbaksho-platform', 'bot-engineers-internal-tools', 'space-apps-telemetry'] },
  { name: 'NestJS', cluster: 'software-backend', level: 90, projects: ['enterprise-ecommerce-infrastructure', 'bot-engineers-internal-tools'] },
  { name: 'Prisma', cluster: 'software-backend', level: 90, projects: ['enterprise-ecommerce-infrastructure', 'appbaksho-platform'] },
  { name: 'TypeScript', cluster: 'software-backend', level: 93, projects: ['enterprise-ecommerce-infrastructure', 'appbaksho-platform', 'bot-engineers-internal-tools', 'space-apps-telemetry'] },
  { name: 'Java (DSA)', cluster: 'software-backend', level: 84, projects: [] },
  { name: 'Python', cluster: 'software-backend', level: 86, projects: ['autonomous-navigation-rover', 'space-apps-telemetry'] },
  { name: 'PostgreSQL', cluster: 'software-backend', level: 88, projects: ['enterprise-ecommerce-infrastructure', 'appbaksho-platform'] },
  { name: 'MongoDB', cluster: 'software-backend', level: 80, projects: [] },
  // devops & deployment
  { name: 'AWS', cluster: 'devops-deployment', level: 85, projects: ['enterprise-ecommerce-infrastructure', 'appbaksho-platform', 'bot-engineers-internal-tools'] },
  { name: 'Docker', cluster: 'devops-deployment', level: 86, projects: ['enterprise-ecommerce-infrastructure', 'bot-engineers-internal-tools'] },
  { name: 'Vercel', cluster: 'devops-deployment', level: 88, projects: ['appbaksho-platform', 'space-apps-telemetry'] },
  { name: 'CI/CD', cluster: 'devops-deployment', level: 84, projects: ['enterprise-ecommerce-infrastructure', 'bot-engineers-internal-tools'] },
  { name: 'Linux', cluster: 'devops-deployment', level: 87, projects: ['autonomous-navigation-rover', 'stm32-motor-control-firmware'] },
  { name: 'GitHub Actions', cluster: 'devops-deployment', level: 82, projects: ['bot-engineers-internal-tools'] },
]

/* ---- Awards / competitions / leadership timeline (FR-4) ---- */
export type Award = {
  id: string
  title: string
  organization: string
  date: string // ISO
  dateLabel: string
  category: AwardCategory
  description: string
  link?: string
  featured: boolean
}

export const awards: Award[] = [
  {
    id: 'wice-gold',
    title: 'WICE Gold Medal',
    organization: 'World Invention Competition & Exhibition',
    date: '2024-08-01',
    dateLabel: 'Aug 2024',
    category: 'award',
    description:
      'Awarded the Gold Medal at an international invention competition for an engineered systems entry — recognising technical depth and real-world impact among a global field.',
    featured: true,
  },
  {
    id: 'future-capitalism',
    title: 'Future of Capitalism — Startup Competition',
    organization: 'Startup Competition',
    date: '2024-04-01',
    dateLabel: 'Apr 2024',
    category: 'competition',
    description:
      'Competed in a startup competition pitching a venture concept — sharpening business acumen, communication, and the ability to frame engineering work as product value.',
    featured: true,
  },
  {
    id: 'bot-chief',
    title: 'Chief Software Engineer',
    organization: 'BOT Engineers',
    date: '2024-01-01',
    dateLabel: '2024 — Present',
    category: 'leadership',
    description:
      'Leads a cross-functional engineering team building production web applications and internal tooling — architected CI/CD pipelines, drove a Turborepo migration, and established a code-review culture.',
    featured: false,
  },
  {
    id: 'mongol-tori',
    title: 'AI & Autonomy Engineer',
    organization: 'BRACU Mongol-Tori Robotics Team',
    date: '2023-09-01',
    dateLabel: '2023 — Present',
    category: 'leadership',
    description:
      'Develops autonomous navigation stacks with ROS2 and SLAM for unstructured terrain, and programs low-level motor drivers on STM32 — bridging perception, planning, and physical control on a Mars-rover platform.',
    featured: true,
  },
  {
    id: 'nasa-space-apps',
    title: 'NASA Space Apps Challenger',
    organization: 'NASA International Space Apps Challenge',
    date: '2023-10-01',
    dateLabel: 'Oct 2023',
    category: 'competition',
    description:
      'Built a satellite-telemetry data-visualisation prototype for environmental monitoring in a 48-hour global hackathon, collaborating across disciplines under sprint constraints.',
    featured: false,
  },
  {
    id: 'appbaksho-founder',
    title: 'Founder & Lead Developer',
    organization: 'Appbaksho',
    date: '2023-03-01',
    dateLabel: '2023 — Present',
    category: 'leadership',
    description:
      'Founded a software agency delivering full-stack products for local businesses — handling discovery, database design, AWS deployment, and post-launch monitoring end to end.',
    featured: false,
  },
]

/* ---- About / mission (FR-5) ---- */
export const about = {
  photo: { label: 'Muztahid Rahman', caption: 'Lab · rover · pitch' },
  mission: 'Build like the W123 — over-engineered, mechanically pure, and made to outlast its creator.',
  narrative: [
    'I’m a software and robotics engineer who is most at home where the two collide — writing the firmware that moves a motor, the autonomy that decides where it goes, and the cloud platform that watches it all. I lead engineering at BOT Engineers, build autonomous systems with BRACU Mongol-Tori, and founded Appbaksho to ship real products for real businesses.',
    'What drives me is the bridge between disciplines: the moment a stereo camera’s depth map becomes a path the rover can actually drive, or when a typed schema turns a chaotic catalog into a system that runs itself. I want to study that bridge formally — to go deeper into perception, planning, and the systems engineering that lets intelligent machines act reliably in the physical world.',
    'I’m seeking a Master’s in Robotics & Autonomous Systems where I can pair academic rigor with the build-and-ship instinct I’ve sharpened across competitions, a startup, and a robotics team — and turn it toward research that puts autonomy on harder, less forgiving terrain.',
  ],
  education: {
    degree: 'B.Sc. in Computer Science',
    university: 'BRAC University',
    status: 'Ongoing',
    coursework: [
      'Data Structures & Algorithms',
      'Digital Logic Design',
      'Computer Architecture',
      'Operating Systems',
      'Database Management',
      'Linear Algebra',
    ],
  },
  contact: {
    heading: 'Let’s build something that ships.',
    blurb:
      'Whether it’s a research collaboration, a Master’s opportunity, or a system that needs bridging hardware and software — the inbox is open.',
  },
}
