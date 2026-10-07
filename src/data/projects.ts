export interface ProjectImage {
  src: string;
  alt: string;
  caption: string;
}

export type ProjectTier = 'primary' | 'supplemental';

export interface Project {
  /** Key used by openProjectModal(); must stay stable, it is in the markup. */
  id: string;
  /** Short title for the card. */
  title: string;
  /** Longer title for the modal header. Falls back to `title`. */
  fullTitle?: string;
  status: 'Completed' | 'In Progress' | 'Live';
  role?: string;
  /** primary = main Operations grid; supplemental = Annex C. */
  tier: ProjectTier;
  /** One-or-two sentence blurb on the card. */
  summary: string;
  /** Full write-up shown in the modal. */
  longDescription: string;
  /** Complete stack, listed in the modal. */
  technologies: string[];
  /** The two to four technologies worth surfacing on the card. */
  cardTech: string[];
  features: string[];
  images: ProjectImage[];
  /** Overrides the card thumbnail, which is otherwise the first image. */
  thumbnail?: string;
  link?: string;
}

export const projects: Project[] = [
  // --- Primary case files ---
  {
    id: 'artifacts',
    title: 'ARtifacts Explorer',
    fullTitle: 'ARtifacts Explorer',
    status: 'Completed',
    tier: 'primary',
    role: 'Software Developer',
    summary:
      'Unity and C# AR app that overlays historical artifacts with audible, interactive educational content for museum visitors.',
    longDescription:
      'ARtifacts Explorer is an augmented reality application built with Unity and C# for museum visitors. It places historical artifacts into an audible and interactive educational experience: visitors can explore pieces through AR overlays, hear narration, and engage with context that is hard to convey from a label alone. The work focused on the AR mobile experience and integrating artifact content into a clear visitor flow.',
    technologies: ['Unity AR', 'C#', 'ARCore/ARKit', '3D Modeling'],
    cardTech: ['Unity AR', 'C#', 'ARCore'],
    features: [
      'AR presentation of historical artifacts in situ',
      'Audible narration paired with interactive overlays',
      'Educational context for museum visitors',
      'Built with Unity and C# for mobile AR platforms',
    ],
    images: [
      {
        src: 'Assets/Images/Unity/nakatayo head.jpg',
        alt: 'AR Museum Interface',
        caption: 'Main AR interface showing artifact recognition',
      },
      {
        src: 'Assets/Images/Unity/sample1.jpg',
        alt: '3D Artifact Model',
        caption: 'Interactive 3D artifact models',
      },
      {
        src: 'Assets/Images/Unity/sample2.jpg',
        alt: 'Museum Website',
        caption: 'Related museum application presence',
      },
      {
        src: 'Assets/Images/Unity/sample3.jpg',
        alt: 'AR Experience',
        caption: 'AR storytelling experience',
      },
    ],
  },
  {
    id: 'sohocafe',
    title: 'SohoCafe',
    status: 'Completed',
    tier: 'primary',
    role: 'Software Developer',
    summary:
      'Cafe management and ordering platform on PHP and MySQL (WAMP), with ordering flows, admin dashboard, and sales reports.',
    longDescription:
      'SohoCafe is a cafe management and ordering platform built with pure PHP and MySQL on the WAMP stack. The project covers customer ordering flows, a comprehensive admin dashboard for product and inventory management, and sales analytics reports that help streamline day-to-day cafe operations. Work included contributing to and building the ordering path, admin tools, and reporting pieces of the system.',
    technologies: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'WAMP'],
    cardTech: ['PHP', 'MySQL', 'WAMP'],
    features: [
      'Customer ordering flows for cafe menus',
      'Admin dashboard for products and inventory',
      'Sales analytics reports for operations',
      'PHP and MySQL on a local WAMP stack',
    ],
    images: [
      {
        src: 'Assets/Images/SohoCafe/SohoCafeHome.jpg',
        alt: 'SohoCafe Home',
        caption: 'Cafe homepage and featured items',
      },
      {
        src: 'Assets/Images/SohoCafe/SohoMenu.jpg',
        alt: 'Menu Browsing',
        caption: 'Interactive menu with categories',
      },
      {
        src: 'Assets/Images/SohoCafe/SohoCart.jpg',
        alt: 'Shopping Cart',
        caption: 'Cart and checkout interface',
      },
      {
        src: 'Assets/Images/SohoCafe/SohoAdminDash.jpg',
        alt: 'Admin Dashboard',
        caption: 'Administrative dashboard overview',
      },
      {
        src: 'Assets/Images/SohoCafe/SohoAdminOrderList.jpg',
        alt: 'Order Management',
        caption: 'Order list and management panel',
      },
    ],
  },
  {
    id: 'arktech-web',
    title: 'Arktech Website',
    fullTitle: 'Arktech Corporate Website',
    status: 'Completed',
    tier: 'primary',
    role: 'Software Developer Intern',
    summary:
      'PHP web app with AJAX, DataTables, and an admin CMS built during the Arktech internship to streamline data workflows.',
    longDescription:
      'Developed and deployed during a Software Developer internship at Arktech Philippines Inc. (February–May 2025). The project is a PHP web application that uses AJAX-powered asynchronous operations, dynamic DataTables integration, and an administrative CMS to streamline data management and improve user workflows. The frontend supports the corporate presence while the backend gives staff clearer tools for managing records and day-to-day operations.',
    technologies: ['PHP', 'MySQL', 'HTML5', 'CSS3', 'JavaScript', 'AJAX', 'DataTables'],
    cardTech: ['PHP', 'AJAX', 'CMS'],
    features: [
      'AJAX-powered asynchronous operations',
      'Dynamic DataTables for manageable record views',
      'Administrative CMS for content and data workflows',
      'Deployed PHP application for staff use',
    ],
    images: [
      {
        src: 'Assets/Images/Arktech/arktech.png',
        alt: 'Arktech Homepage',
        caption: 'Corporate website design',
      },
      {
        src: 'Assets/Images/Arktech/company.png',
        alt: 'Company Profile',
        caption: 'Company information section',
      },
      {
        src: 'Assets/Images/Arktech/home.png',
        alt: 'Services Overview',
        caption: 'Services and capabilities showcase',
      },
    ],
    link: 'https://arktechph.com/',
  },
  {
    id: 'sentrisafe',
    title: 'SentriSafe',
    status: 'Completed',
    tier: 'primary',
    role: 'Development Assistant',
    summary:
      'Community crime-reporting app with map integration. Assisted on maps, commenting, and frontend features.',
    longDescription:
      'SentriSafe is a community-focused crime reporting application built with Flutter on the client and Laravel on the backend. It uses mapping to show incident locations and lets users report crimes, read announcements, and discuss through comments. As a Development Assistant, contributions covered map integration, the commenting system, and assorted frontend features, without claiming sole ownership of the full product.',
    technologies: ['Flutter', 'Dart', 'Laravel', 'PHP', 'MySQL', 'Google Maps API', 'Firebase'],
    cardTech: ['Flutter', 'Laravel', 'Maps'],
    features: [
      'Interactive map of crime locations and incidents',
      'Crime reporting with photo and location capture',
      'Community commenting on reports and announcements',
      'Laravel backend for reports, users, and notifications',
    ],
    images: [
      {
        src: 'Assets/Images/SentriSafe/ssCrimeMap.jpg',
        alt: 'Crime Map Interface',
        caption: 'Interactive crime map with incident markers',
      },
      {
        src: 'Assets/Images/SentriSafe/ssAppCall.jpg',
        alt: 'Emergency Call Feature',
        caption: 'In-app emergency call functionality',
      },
      {
        src: 'Assets/Images/SentriSafe/ssProfile.jpg',
        alt: 'User Profile',
        caption: 'User profile and settings',
      },
      {
        src: 'Assets/Images/SentriSafe/ssUserControl.jpg',
        alt: 'User Controls',
        caption: 'User management and control panel',
      },
      {
        src: 'Assets/Images/SentriSafe/ssLoginWeb.jpg',
        alt: 'Web Login Interface',
        caption: 'Web-based login and authentication',
      },
    ],
  },

  // --- Supplemental case files (Annex C) ---
  {
    id: 'artexpo',
    title: 'ArtExpo',
    fullTitle: 'ArtExpo E-commerce Platform',
    status: 'Completed',
    tier: 'supplemental',
    summary:
      'WordPress and WooCommerce storefront for galleries and artists, with catalogs and payment integrations.',
    longDescription:
      'ArtExpo is an art-focused e-commerce site on WordPress and WooCommerce. It supports artist portfolios, artwork catalogs, and checkout through payment gateways such as PayPal and Stripe. Listed here as a supplemental case file alongside primary resume highlights.',
    technologies: ['WordPress', 'WooCommerce', 'PHP', 'MySQL', 'PayPal API', 'Stripe'],
    cardTech: ['WordPress', 'WooCommerce'],
    features: [
      'Artist portfolio and artwork catalog pages',
      'Checkout with common payment gateways',
      'Admin tools for products and orders',
    ],
    images: [
      {
        src: 'Assets/Images/ArtExpo/Sunset.png',
        alt: 'Sample artwork',
        caption: 'Sample artwork',
      },
      {
        src: 'Assets/Images/ArtExpo/artExpo1.png',
        alt: 'Account settings',
        caption: 'Account settings',
      },
      {
        src: 'Assets/Images/ArtExpo/artExpo2.png',
        alt: 'Ticket handling support',
        caption: 'Ticket handling support',
      },
      {
        src: 'Assets/Images/ArtExpo/artExpo3.png',
        alt: 'Product tracker',
        caption: 'Product tracker',
      },
    ],
  },
  {
    id: 'sakto-space',
    title: 'SaktoSpace',
    status: 'Completed',
    tier: 'supplemental',
    role: 'Development Assistant',
    summary:
      'AR e-commerce app (Flutter + Laravel). Assisted on AR features, API integration, and UI components.',
    longDescription:
      'SaktoSpace is an AR e-commerce platform with a Flutter client and Laravel API. Shoppers can browse products and use AR to visualize items in their space. As a Development Assistant, work covered AR-related features, API integration, and UI components. Listed as a supplemental case file.',
    technologies: ['Flutter', 'Dart', 'Laravel', 'PHP', 'MySQL', 'AR Flutter Plugin', 'REST API'],
    cardTech: ['Flutter', 'Laravel', 'AR'],
    features: [
      'AR product visualization in a real environment',
      'Catalog, cart, and order flows via Laravel API',
      'Assisted implementation of AR and UI pieces',
    ],
    images: [
      {
        src: 'Assets/Images/SaktoSpace/SaktoShopProducts.jpg',
        alt: 'SaktoSpace Shopping Interface',
        caption: 'Product browsing interface',
      },
      {
        src: 'Assets/Images/SaktoSpace/SaktoProductInfo.jpg',
        alt: 'Product Details',
        caption: 'Product information view',
      },
      {
        src: 'Assets/Images/SaktoSpace/SaktoProductManage.jpg',
        alt: 'Product Management',
        caption: 'Product management interface',
      },
      {
        src: 'Assets/Images/SaktoSpace/SaktoAdmin.jpg',
        alt: 'Admin Dashboard',
        caption: 'Store admin dashboard',
      },
    ],
  },
  {
    id: 'defect-detector',
    title: 'Defect Detector',
    status: 'Completed',
    tier: 'supplemental',
    role: 'Software Developer',
    summary:
      'Python computer-vision tool that flags bumps, scratches, dents, and other surface defects on metal parts.',
    longDescription:
      'Defect Detector is an independent project that uses Python and computer vision techniques (including YOLO) to identify surface defects on metal parts—bumps, scratches, dents, and similar imperfections. Screenshots are not filed yet; this entry stays honest with an evidence-pending placeholder until exhibits can be attached.',
    technologies: ['Python', 'Computer Vision', 'YOLO'],
    cardTech: ['Python', 'YOLO', 'CV'],
    features: [
      'Automatic detection of surface defects on metal parts',
      'Targets bumps, scratches, dents, and similar imperfections',
      'Built with Python and computer vision tooling',
    ],
    images: [],
  },
];

export const primaryProjects = projects.filter((p) => p.tier === 'primary');
export const supplementalProjects = projects.filter((p) => p.tier === 'supplemental');

/** The card thumbnail is the first exhibit unless a project overrides it. */
export function thumbnailFor(project: Project): string | undefined {
  return project.thumbnail ?? project.images[0]?.src;
}

/** Two-digit file number shown on the folder tab, e.g. "03". */
export function fileNumberFor(index: number): string {
  return String(index + 1).padStart(2, '0');
}

/**
 * Shape handed to public/script.js for the modal. Keyed by id so the script can
 * look a project up directly, and trimmed to only what the modal renders.
 */
export function toModalPayload(list: Project[] = projects) {
  return Object.fromEntries(
    list.map((project) => [
      project.id,
      {
        title: project.fullTitle ?? project.title,
        longDescription: project.longDescription,
        technologies: project.technologies,
        features: project.features,
        images: project.images,
        status: project.status,
        ...(project.role ? { role: project.role } : {}),
        ...(project.link ? { link: project.link } : {}),
      },
    ])
  );
}
