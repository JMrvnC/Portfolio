export interface ProjectImage {
  src: string;
  alt: string;
  caption: string;
}

export interface Project {
  /** Key used by openProjectModal(); must stay stable, it is in the markup. */
  id: string;
  /** Short title for the card. */
  title: string;
  /** Longer title for the modal header. Falls back to `title`. */
  fullTitle?: string;
  status: 'Completed' | 'In Progress' | 'Live';
  role?: string;
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
  {
    id: 'artifacts',
    title: 'ARtifacts Explorer',
    fullTitle: 'ARtifacts Explorer',
    status: 'Completed',
    summary:
      'AR museum platform featuring interactive artifact exploration through Unity AR and web integration.',
    longDescription:
      'ARtifacts Explorer represents the cutting edge of museum technology, combining traditional web presence with groundbreaking augmented reality experiences. The project consists of two main components: a fully-featured museum website and a revolutionary AR mobile application. The website serves as the digital gateway to the museum, featuring detailed artifact catalogs, virtual tours, educational resources, and visitor information. The AR mobile app transforms the physical museum experience by overlaying digital information onto real artifacts, creating an interactive layer that tells stories, provides historical context, and engages visitors in ways never before possible.',
    technologies: ['Unity AR', 'ARCore/ARKit', 'Hostinger', '3D Modeling', 'C#'],
    cardTech: ['Unity AR', 'ARCore', '3D Modeling'],
    features: [
      'Real-time AR artifact recognition and overlay',
      'Interactive 3D models with detailed information',
      'Audio narration and visual storytelling',
      'Web promotion and mobile ar integration',
      'Content management system for museum staff',
      'Analytics dashboard for visitor engagement tracking',
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
        caption: 'Responsive museum website design',
      },
      {
        src: 'Assets/Images/Unity/sample3.jpg',
        alt: 'AR Experience',
        caption: 'Immersive AR storytelling experience',
      },
    ],
    link: 'https://artifactsmalvar.com',
  },
  {
    id: 'artexpo',
    title: 'ArtExpo',
    fullTitle: 'ArtExpo E-commerce Platform',
    status: 'Completed',
    summary:
      'Art e-commerce platform with portfolio management and secure payment processing.',
    longDescription:
      'ArtExpo is a comprehensive e-commerce solution designed specifically for the art industry. Built on WordPress with WooCommerce integration, the platform provides galleries, artists, and collectors with a powerful tool for buying and selling artwork online. The system includes advanced features such as artist portfolio management, detailed artwork catalogs with high-resolution images, secure payment processing, and sophisticated inventory tracking. The platform also includes customer relationship management tools, sales analytics, and automated email marketing capabilities.',
    technologies: ['WordPress', 'WooCommerce', 'PHP', 'MySQL', 'PayPal API', 'Stripe'],
    cardTech: ['WordPress', 'WooCommerce'],
    features: [
      'Artist portfolio management system',
      'High-resolution image galleries with zoom functionality',
      'Secure payment processing with multiple gateways',
      'Advanced search and filtering by style, medium, price',
      'Automated invoice generation and order tracking',
      'Customer wishlist and favorites functionality',
      'Admin dashboard with sales analytics',
      'Mobile-responsive design for all devices',
    ],
    images: [
      {
        src: 'Assets/Images/ArtExpo/Sunset.png',
        alt: 'ArtExpo Homepage',
        caption: 'Modern and elegant homepage design',
      },
      {
        src: 'Assets/Images/ArtExpo/artExpo1.png',
        alt: 'Product Gallery',
        caption: 'Interactive artwork gallery with filtering',
      },
      {
        src: 'Assets/Images/ArtExpo/artExpo2.png',
        alt: 'Artist Profile',
        caption: 'Detailed artist portfolio pages',
      },
      {
        src: 'Assets/Images/ArtExpo/artExpo3.png',
        alt: 'Shopping Cart',
        caption: 'Streamlined checkout process',
      },
    ],
  },
  {
    id: 'arktech-web',
    title: 'Arktech Website',
    fullTitle: 'Arktech Corporate Website',
    status: 'Completed',
    summary:
      'Full-stack PHP solution with custom CMS for HR management and application tracking.',
    longDescription:
      'The Arktech website project involved a complete technological transformation from a traditional WordPress site to a custom full-stack PHP solution. This rebuild was driven by the need for advanced HR management capabilities and better performance. The new system includes a sophisticated content management system specifically designed for HR operations, including application tracking, employee onboarding workflows, and comprehensive candidate management. The frontend provides an engaging corporate presence while the backend empowers HR teams with powerful tools for managing their recruitment pipeline.',
    technologies: ['PHP', 'MySQL', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'AJAX'],
    cardTech: ['PHP', 'CMS'],
    features: [
      'Custom-built HR management system',
      'Application tracking and candidate pipeline',
      'Automated email notifications for applicants',
      'Document upload and management system',
      'Employee onboarding workflow automation',
      'Role-based access control for different departments',
      'Analytics dashboard for recruitment metrics',
      'Mobile-responsive design for all devices',
    ],
    images: [
      {
        src: 'Assets/Images/Arktech/arktech.png',
        alt: 'Arktech Homepage',
        caption: 'Modern corporate website design',
      },
      {
        src: 'Assets/Images/Arktech/company.png',
        alt: 'Company Profile',
        caption: 'Company information and values section',
      },
      {
        src: 'Assets/Images/Arktech/home.png',
        alt: 'Services Overview',
        caption: 'Services and capabilities showcase',
      },
    ],
  },
  {
    id: 'sakto-space',
    title: 'SaktoSpace',
    status: 'In Progress',
    role: 'Development Assistant',
    summary:
      'AR e-commerce platform with Flutter frontend and Laravel backend. Assisted in development.',
    longDescription:
      'SaktoSpace is an innovative augmented reality e-commerce platform that combines mobile commerce with immersive AR experiences. Built with Flutter for the mobile frontend and Laravel for the robust backend API, the application allows users to visualize products in their physical space before purchase. The platform features a comprehensive product catalog, shopping cart, order management, and secure payment processing, all enhanced with AR capabilities that let customers see how items would look in their environment. As a development assistant on this project, I contributed to implementing AR features, API integration, and user interface components.',
    technologies: ['Flutter', 'Dart', 'Laravel', 'PHP', 'MySQL', 'AR Flutter Plugin', 'REST API'],
    cardTech: ['Flutter', 'Laravel', 'AR', 'MySQL'],
    features: [
      'AR product visualization in real environment',
      'Full e-commerce functionality with cart and checkout',
      'Laravel backend API with MySQL database',
      'User authentication and profile management',
      'Product catalog with categories and search',
      'Order tracking and history',
      'Secure payment integration',
      'Admin panel for product management',
    ],
    images: [
      {
        src: 'Assets/Images/SaktoSpace/SaktoShopProducts.jpg',
        alt: 'SaktoSpace Shopping Interface',
        caption: 'Product browsing and shopping interface',
      },
      {
        src: 'Assets/Images/SaktoSpace/SaktoProductInfo.jpg',
        alt: 'Product Details',
        caption: 'Detailed product information view',
      },
      {
        src: 'Assets/Images/SaktoSpace/SaktoProductManage.jpg',
        alt: 'Product Management',
        caption: 'Product management interface',
      },
      {
        src: 'Assets/Images/SaktoSpace/SaktoAdmin.jpg',
        alt: 'Admin Dashboard',
        caption: 'Administrative dashboard for store management',
      },
    ],
  },
  {
    id: 'sentrisafe',
    title: 'SentriSafe',
    status: 'Completed',
    role: 'Development Assistant',
    summary:
      'Crime reporting app with map integration and community features. Assisted in development.',
    longDescription:
      'SentriSafe is a community-focused crime reporting application designed to enhance public safety through real-time information sharing. Developed with Flutter for a seamless cross-platform mobile experience, the app integrates mapping technology to display crime locations and incidents in an intuitive interface. Users can report crimes, view announcements from local authorities, and engage with the community through commenting features. The Laravel backend manages user data, crime reports, notifications, and community interactions, while ensuring data privacy and security. As a development assistant on this project, I helped implement the map integration, commenting system, and various frontend features.',
    technologies: ['Flutter', 'Dart', 'Laravel', 'PHP', 'MySQL', 'Google Maps API', 'Firebase'],
    cardTech: ['Flutter', 'Laravel', 'Maps'],
    features: [
      'Interactive map showing crime locations and incidents',
      'Crime reporting with photo and location capture',
      'Real-time crime announcements and alerts',
      'Community commenting and discussion features',
      'User authentication and verification',
      'Push notifications for nearby incidents',
      'Crime statistics and heat maps',
      'Admin dashboard for content moderation',
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
  {
    id: 'sohocafe',
    title: 'SohoCafe',
    status: 'Completed',
    role: 'Development Assistant',
    summary: 'Cafe e-commerce platform with ordering system and admin dashboard.',
    longDescription:
      'SohoCafe is a complete cafe management and ordering platform that bridges the gap between customers and cafe operations. Built with Flutter for a smooth mobile experience and Laravel for robust backend operations, the application provides customers with an intuitive menu browsing and ordering interface while giving cafe administrators powerful tools to manage products, orders, and business operations. The system includes real-time order tracking, inventory management, and sales analytics. As a development assistant on this project, I contributed to building the ordering flow, admin dashboard features, and integrating the mobile app with the backend API.',
    technologies: ['Flutter', 'Dart', 'Laravel', 'PHP', 'MySQL', 'REST API'],
    cardTech: ['Flutter', 'Laravel', 'E-commerce'],
    features: [
      'Mobile menu browsing with categories and search',
      'Shopping cart and checkout system',
      'Real-time order tracking and status updates',
      'Admin dashboard for order management',
      'Product and inventory management',
      'Sales analytics and reporting',
      'User authentication and profiles',
      'Order history and reordering',
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
];

/** The card thumbnail is the first exhibit unless a project overrides it. */
export function thumbnailFor(project: Project): string {
  return project.thumbnail ?? project.images[0].src;
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
