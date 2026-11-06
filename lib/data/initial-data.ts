import { 
  SiteSettings, 
  HomepageContent, 
  Service, 
  Project, 
  BlogPost, 
  BlogCategory, 
  MediaAsset, 
  Enquiry, 
  Testimonial,
  PageContent 
} from './types';

export const initialSettings: SiteSettings = {
  company_name: "AURA FORGE",
  tagline: "Architectural Stall Fabrication & Immersive Exhibition Solutions",
  logo_url: "",
  email: "connect@auraforge-expo.com",
  phone: "+91 98201 44552",
  whatsapp: "+91 98201 44552",
  address: "Studio 4B, Industrial Art District, Hubli-Dharwad Expressway / BKC Annexe",
  city: "Mumbai & Bengaluru",
  country: "India / Global Projects",
  google_maps_url: "https://maps.google.com",
  linkedin_url: "https://linkedin.com/company/auraforge",
  instagram_url: "https://instagram.com/auraforge.expo",
  facebook_url: "https://facebook.com/auraforgeexpo",
  twitter_url: "https://x.com/auraforge",
  youtube_url: "https://youtube.com/@auraforge",
  seo_title: "AURA FORGE | Premium 3D Exhibition Stall Fabrication & Architecture",
  seo_description: "Premier exhibition stall design, custom fabrication, and turnkey execution company creating world-class architectural brand experiences for international expos.",
  footer_text: "Engineered for distinction. We design, fabricate, and install bespoke exhibition pavilions, modular stall environments, and corporate trade show spaces globally.",
  copyright_text: "© 2026 AURA FORGE EXHIBITIONS & ARCHITECTURE. All rights reserved."
};

export const initialHomepage: HomepageContent = {
  hero_badge: "BESPOKE EXHIBITION ARCHITECTURE & FABRICATION",
  hero_title_line1: "WE BUILD EXPERIENCES.",
  hero_title_line2: "YOU BUILD CONNECTIONS.",
  hero_subtitle: "Transforming spaces into extraordinary brand experiences through innovative exhibition stall design, precision fabrication and flawless turnkey execution.",
  hero_cta_primary: "Explore Our Projects",
  hero_cta_secondary: "Start Your Project",
  hero_3d_model_url: "",
  about_heading: "TURNING IDEAS INTO REMARKABLE SPACES",
  about_subheading: "PRECISION CRAFTSMANSHIP MEETS ARCHITECTURAL VISION",
  about_paragraph1: "We are a professional stall fabrication and exhibition solutions company specializing in designing, developing and executing customized exhibition spaces. From concept to completion, we combine creativity, engineering and craftsmanship to bring brands to life.",
  about_paragraph2: "With over 45,000 sq.ft of in-house CNC carpentry, heavy metal fabrication workshops, laser cutting facilities, and paint booths, our team ensures every millimetre meets rigorous global expo standards.",
  about_image_url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80",
  stat_years: "16+",
  stat_years_label: "Years of Craftsmanship",
  stat_projects: "850+",
  stat_projects_label: "Turnkey Stalls Fabricated",
  stat_venues: "48+",
  stat_venues_label: "Global Expo Venues",
  stat_rate: "99.4%",
  stat_rate_label: "On-Time Handover Rate",
  story_section_badge: "SIGNATURE 3D EXPERIENCE",
  story_section_title: "THE ANATOMY OF A BESPOKE STALL",
  story_section_desc: "Watch the seamless step-by-step structural assembly of a modern 120 sqm exhibition pavilion from ground layout to final VIP handover.",
  services_heading: "ENGINEERED CAPABILITIES",
  services_subheading: "COMPREHENSIVE FABRICATION & SPATIAL SOLUTIONS",
  portfolio_heading: "CURATED PORTFOLIO",
  portfolio_subheading: "WORLD-CLASS ARCHITECTURAL EXHIBITION PAVILIONS",
  why_us_heading: "WHY DISCERNING BRANDS CHOOSE US",
  why_us_subheading: "THE AURA FORGE ENGINEERING ADVANTAGE",
  process_heading: "HOW WE BRING VISIONS TO LIFE",
  process_subheading: "OUR FIVE-PHASE TURNKEY DELIVERY LIFECYCLE",
  blog_heading: "INSIGHTS, IDEAS & INSPIRATION",
  blog_subheading: "PERSPECTIVES ON SPATIAL DESIGN & EXPO ROI",
  contact_heading: "LET'S BUILD SOMETHING EXTRAORDINARY.",
  contact_subheading: "SCHEDULE A PRIVATE CONSULTATION WITH OUR PRINCIPAL SPATIAL ARCHITECTS"
};

export const initialServices: Service[] = [
  {
    id: "srv-1",
    slug: "custom-exhibition-stall-fabrication",
    title: "Custom Exhibition Stall Fabrication",
    short_description: "Bespoke, multi-tiered structural pavilions fabricated with precision engineering, premium materials, and custom architectural finishes.",
    full_description: "Our custom stall fabrication service delivers fully tailor-made spatial environments. We fabricate every element from structural steel gantries, curved laminate bulkheads, architectural acoustic slatted walls, and flush integrated showcases. Perfect for flagship brand presence at high-profile international expos.",
    image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    icon_name: "Layers",
    features: [
      "Custom structural steel & aluminum frameworks",
      "Curved CNC-routed timber and acoustic wall panels",
      "Seamless flush joints with premium matte PU paint finish",
      "Reinforced double-decker mezzanine load calculations"
    ],
    deliverables: [
      "Full structural engineering drawings",
      "Pre-installation mock-up inspection in our workshop",
      "Dedicated onsite project manager & structural crews",
      "Certified structural safety sign-offs"
    ],
    display_order: 1,
    is_active: true
  },
  {
    id: "srv-2",
    slug: "modular-stall-fabrication",
    title: "Modular Stall Fabrication",
    short_description: "High-grade, reconfigurable aluminum systems that combine rapid setup, sustainability, and ultra-sleek contemporary aesthetics.",
    full_description: "Built for brands running multi-city exhibition calendars. Our modular systems integrate engineered tension fabric, magnetic graphic cassettes, and concealed lock systems. Gain up to 40% cost efficiency across multiple expos without compromising an inch on luxury presentation.",
    image_url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    icon_name: "Grid",
    features: [
      "High-tensile anodized aluminum profile framing",
      "Toolless quick-lock rapid assembly connectors",
      "High-fidelity silicone-edge graphic (SEG) fabric walls",
      "Flat-pack compact flight cases for global freight"
    ],
    deliverables: [
      "Modular re-adaptation layout schematics",
      "Custom flight casing & inventory barcoding",
      "Express overnight assembly crew",
      "Post-expo maintenance & climate-controlled warehousing"
    ],
    display_order: 2,
    is_active: true
  },
  {
    id: "srv-3",
    slug: "exhibition-stall-design",
    title: "Exhibition Stall Design",
    short_description: "Hyper-realistic 3D spatial design, visitor journey choreography, lighting design, and virtual reality walkthroughs.",
    full_description: "Before a single beam is cut, our spatial design team sculpts your booth in cinematic detail. We calibrate sightlines, visitor foot-traffic density, focal product placement, and acoustic zones. Clients experience their booth via 3D interactive VR previews.",
    image_url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
    icon_name: "Compass",
    features: [
      "Photorealistic 4K 3D isometric & interior renderings",
      "Biometric & heat-mapped visitor flow simulations",
      "Lumen & Kelvin calibrated lighting calculation plans",
      "Detailed 2D CAD fabrication joinery blueprints"
    ],
    deliverables: [
      "Full 3D visualization render deck (10+ angles)",
      "Interactive 360-degree virtual reality walkthrough link",
      "Exhibition organizer approval drawing submission package",
      "Comprehensive material specification schedule"
    ],
    display_order: 3,
    is_active: true
  },
  {
    id: "srv-4",
    slug: "corporate-event-fabrication",
    title: "Corporate Event Fabrication",
    short_description: "Monumental stage sets, keynote backdrops, experiential demo hubs, and interactive product reveal environments.",
    full_description: "From global summits and tech developer conferences to corporate shareholder galas. We fabricate monumental stages, LED video tunnels, curved panoramic backdrops, VIP media lounges, and custom demo kiosks with millimetre precision.",
    image_url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
    icon_name: "Sparkles",
    features: [
      "Ultra-wide seamless curved LED backdrops and trusses",
      "Acoustically damped presenter podiums & speaker lounges",
      "Concealed cable trays & high-capacity power distribution",
      "Automated revolving stages and motorized reveal curtains"
    ],
    deliverables: [
      "Full venue load-in & load-out timeline management",
      "Certified rigging and hanging truss calculations",
      "Standby electrical and audio-visual technicians",
      "Rapid post-event strike within strict venue deadlines"
    ],
    display_order: 4,
    is_active: true
  },
  {
    id: "srv-5",
    slug: "retail-and-promotional-displays",
    title: "Retail and Promotional Displays",
    short_description: "Architectural brand pop-ups, airport luxury showcases, and interactive point-of-sale retail experiential kiosks.",
    full_description: "Captivate high-value shoppers with tactile luxury fixtures, brushed brass accents, edge-lit toughened acrylic showcases, and integrated touchscreens. Designed for luxury retail environments, duty-free airports, and high-street flagship pop-up stores.",
    image_url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    icon_name: "ShoppingBag",
    features: [
      "Museum-grade anti-reflective glass display cases",
      "Precision CNC brass, champagne gold and blackened steel trims",
      "Concealed security sensors and RFID product triggers",
      "Integrated micro-spotlights with 95+ CRI color rendering"
    ],
    deliverables: [
      "Retail mall approval documentation and fire safety proofs",
      "Pre-wired plug-and-play internal power looms",
      "Modular flat-pack shipping packaging",
      "Field maintenance warranty and glass replacement support"
    ],
    display_order: 5,
    is_active: true
  },
  {
    id: "srv-6",
    slug: "interior-and-commercial-fabrication",
    title: "Interior and Commercial Fabrication",
    short_description: "Permanent corporate experience centers, innovation labs, boardroom feature installations, and executive briefing suites.",
    full_description: "We translate our temporary exhibition excellence into permanent architectural marvels. We construct immersive corporate discovery centers, briefing rooms, interactive lobby installations, and high-concept client reception lounges that make lasting statements.",
    image_url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    icon_name: "Building",
    features: [
      "Architectural Grade A fire-rated composite cladding",
      "Bespoke parametric acoustic wood slatted walls",
      "Concealed climate-controlled AV rack cabinetry",
      "Integrated building management system (BMS) controls"
    ],
    deliverables: [
      "Architectural MEP coordinated shop drawings",
      "Sample finish mockups and material certifications",
      "Factory-controlled joinery fabrication",
      "Comprehensive 3-year warranty and maintenance protocol"
    ],
    display_order: 6,
    is_active: true
  }
];

export const initialProjects: Project[] = [
  {
    id: "proj-1",
    slug: "nexora-automotive-pavilion",
    title: "Nexora Electric Mobility Pavilion",
    client_name: "Nexora Motors International",
    category: "Custom Exhibition Stalls",
    location: "Pragati Maidan, New Delhi (Auto Expo)",
    event_name: "International Auto Expo",
    year: "2025",
    area_sqm: "280 sqm",
    featured_image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1400&q=80"
    ],
    description: "A show-stopping 280 sqm two-tier custom pavilion featuring an elevated VIP lounge, 360-degree revolving car turntable, and a 24-meter curved ultra-fine pitch LED ribbon. Fabricated using high-strength steel trusses clad in seamless matte charcoal panels and warm champagne gold accents.",
    challenge: "The client required a mezzanine lounge capable of hosting 40 VIP guests while maintaining a completely pillar-free central showcase zone for two prototype electric vehicles.",
    solution: "Engineered a cantilevered bridge truss supported only by reinforced perimeter towers, allowing unobstructed 360-degree photography of the hero vehicles below.",
    materials: ["Blackened Structural Steel", "Curved Acoustic Wood Slats", "Frosted LED Diffusers", "Champagne Gold Anodized Aluminum"],
    is_featured: true,
    display_order: 1,
    status: "published"
  },
  {
    id: "proj-2",
    slug: "solaris-aerospace-summit",
    title: "Solaris Aerospace & Defense Expo",
    client_name: "Solaris Defense Technologies",
    category: "Corporate Exhibitions",
    location: "Dubai World Trade Centre (DWTC)",
    event_name: "Global Aerospace Summit",
    year: "2025",
    area_sqm: "160 sqm",
    featured_image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80"
    ],
    description: "Sleek, futuristic exhibition booth reflecting aerodynamic excellence. Highlights include an overhead suspended halo ring with holographic brand projections, sound-isolated executive meeting pods, and interactive radar-tactile display pedestals.",
    challenge: "Strict safety and acoustic requirements for confidential defense briefings within a noisy international exhibition hall.",
    solution: "Fabricated double-glazed acoustic glass conference suites with acoustic ceiling baffles achieving 42 dB sound attenuation in the middle of the expo hall.",
    materials: ["Aerospace-grade Aluminum", "Acoustic Double Glazing", "Graphite High-Pressure Laminate", "Laser-cut Mesh"],
    is_featured: true,
    display_order: 2,
    status: "published"
  },
  {
    id: "proj-3",
    slug: "lumina-biotech-pavilion",
    title: "Lumina Life Sciences Experience Booth",
    client_name: "Lumina BioSciences AG",
    category: "Modular Exhibition Stalls",
    location: "Messe Frankfurt, Germany",
    event_name: "CPHI Worldwide",
    year: "2025",
    area_sqm: "120 sqm",
    featured_image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1400&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80"
    ],
    description: "A clean, clinical, yet warm architectural exhibition space. Built with modular aluminum substructure engineered for re-use across Frankfurt, Milan, and Philadelphia expos, featuring back-lit stretch fabric ceilings and recessed product showcases.",
    challenge: "Creating an organic, high-end architectural feel while adhering strictly to a reusable, rapid-install modular kit of parts.",
    solution: "Concealed all modular joints behind flush magnetic architectural reveals and paired them with custom fabricated real timber meeting elements.",
    materials: ["Engineered Modular Profiles", "Micro-perforated Light Ceilings", "Natural Oak Veneers", "Ultra-clear Tempered Glass"],
    is_featured: true,
    display_order: 3,
    status: "published"
  },
  {
    id: "proj-4",
    slug: "krono-luxury-timepieces",
    title: "Krono Horology Pop-Up Gallery",
    client_name: "Krono Geneva",
    category: "Retail Displays",
    location: "Chhatrapati Shivaji Maharaj International Airport T2, Mumbai",
    event_name: "Luxury Watchmakers Showcase",
    year: "2024",
    area_sqm: "75 sqm",
    featured_image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1400&q=80"
    ],
    description: "An ultra-luxury retail showcase crafted with satin-brushed brass, dark Italian travertine flooring, and custom-engineered motorized showcase columns with biometric locking mechanisms.",
    challenge: "Airport security regulations permitting only 4-hour night-time installation windows with zero hot work (no welding or wet painting onsite).",
    solution: "100% pre-fabricated modular joinery assembled in our workshops, dry-fitted, and installed using silent mechanical fasteners in two night shifts.",
    materials: ["Satin Brushed Brass", "Italian Travertine Cladding", "Anti-reflective Museum Glass", "Supple Charcoal Leather"],
    is_featured: true,
    display_order: 4,
    status: "published"
  },
  {
    id: "proj-5",
    slug: "vertex-cloud-keynote-arena",
    title: "Vertex Global Cloud Conference Arena",
    client_name: "Vertex Cloud Systems",
    category: "Event Fabrication",
    location: "Bangalore International Exhibition Centre (BIEC)",
    event_name: "Vertex Horizons Tech Summit",
    year: "2024",
    area_sqm: "450 sqm",
    featured_image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1400&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80"
    ],
    description: "Monumental stage set design with 32-meter panoramic LED screen, suspended architectural light portal arches, speaker green rooms, and hands-on developer demo pods.",
    challenge: "Extremely heavy hanging loads exceeding conventional hall rigging points.",
    solution: "Designed ground-supported box-truss goalposts with integrated counterweights seamlessly cloaked behind architectural black scrim.",
    materials: ["Ground Support Truss System", "Matte Black Acoustic Felt", "RGBW Pixel Neon Flex", "Engineered Stage Flooring"],
    is_featured: false,
    display_order: 5,
    status: "published"
  },
  {
    id: "proj-6",
    slug: "aether-clean-energy-booth",
    title: "Aether Clean Energy Innovation Hub",
    client_name: "Aether Energy Corporation",
    category: "Custom Exhibition Stalls",
    location: "Hitex Exhibition Center, Hyderabad",
    event_name: "Renewable Energy Expo",
    year: "2024",
    area_sqm: "180 sqm",
    featured_image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80"
    ],
    description: "An eco-conscious architectural booth featuring certified recycled aluminum frames, preserved living moss wall installations, and solar-kinetic interactive kinetic sculptures.",
    challenge: "Demonstrating the client's carbon-neutral mission through tangible, sustainable fabrication materials.",
    solution: "100% recyclable timber, low-VOC waterborne finishes, and reusable modular core structures resulting in zero construction waste to landfill.",
    materials: ["Preserved Reindeer Moss", "Recycled Aluminum Extrusions", "FSC Certified Birch Plywood", "Low-VOC Organic Paints"],
    is_featured: true,
    display_order: 6,
    status: "published"
  }
];

export const initialBlogs: BlogPost[] = [
  {
    id: "blog-1",
    slug: "future-of-exhibition-stall-fabrication-2026",
    title: "The Future of Exhibition Stall Fabrication: Architecture, LED Volumes & Kinetic Surfaces",
    excerpt: "How modern spatial engineering is bridging the divide between physical architectural pavilions and real-time interactive digital environments.",
    content: `## The Evolution of Trade Show Architecture

The days of generic aluminum octanorm booths and static poster panels are officially behind us. In 2026, premier global trade shows — from CES in Las Vegas to GITEX in Dubai and Auto Expo in Delhi — demand an uncompromising level of architectural sophistication.

### 1. Kinetic Structural Elements
Brands are no longer satisfied with static walls. We are engineering motorized louvers, revolving product pedestals, and responsive overhead lighting rigs that breathe life into the exhibition space as visitors approach.

### 2. Seamless LED Volumes Clad in Architectural Finishes
Rather than mounting bulky TVs onto drywall, cutting-edge fabricators integrate ultra-fine pitch LED panels flush into CNC-milled graphite and champagne gold surrounds. The boundary between digital content and physical timber disappears.

### 3. Sustainable Modular Engineering
True sustainability is not a buzzword; it is an engineering discipline. By developing proprietary precision quick-connect aluminum sub-frames, our clients can reuse primary structural skeletons across six consecutive expos, reskinning only brand graphics and finish panels.

> "An exhibition stall is not merely a sales booth; it is a temporary flagship embassy for your brand's ambitions."

### 4. Acoustic Sanctuary Zones
Exhibition halls are notoriously noisy. Introducing double-glazed acoustic glass meeting pods and parametric slatted wood baffles turns an executive meeting zone into a serene sanctuary where multi-million-dollar partnerships get closed.`,
    featured_image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    category: "Design & Technology",
    tags: ["Exhibition Architecture", "3D Fabrication", "LED Walls", "Trade Show ROI"],
    author_name: "Ar. Vikramaditya Rathore",
    author_role: "Head of Spatial Architecture",
    published_at: "2026-03-15",
    status: "published",
    read_time: "5 min read",
    seo_title: "Future of Exhibition Stall Fabrication 2026 | AURA FORGE",
    seo_description: "Explore the newest innovations in architectural exhibition booth design, kinetic structures, and LED volumes."
  },
  {
    id: "blog-2",
    slug: "modular-vs-custom-stall-fabrication-guide",
    title: "Modular vs. Custom Stall Fabrication: Which Strategy Delivers Superior Expo ROI?",
    excerpt: "A comprehensive financial and architectural breakdown to help enterprise marketing leaders select the optimal booth construction method.",
    content: `## The Strategic Dilemma: Bespoke Custom vs. High-End Modular

When planning your international trade show calendar, selecting the right fabrication methodology dictates your budget, logistics, brand perception, and return on investment.

### Custom Fabrication: The Unrivaled Showstopper
* **Best for:** Annual flagship events, milestone product launches, automotive pavilions, high-stakes keynotes.
* **Aesthetic Freedom:** Unlimited. Organic curves, two-story double decker mezzanines, water features, bespoke ceiling canopies.
* **Investment:** Higher initial expenditure, but unmatched command over trade show floor attention.

### High-Grade Modular Fabrication: Precision Agility
* **Best for:** Brands attending 4–12 exhibitions per calendar year across multiple domestic or international venues.
* **Speed:** 60% faster setup and dismantle times, reducing hall rental overtime surcharges.
* **Financial Advantage:** Up to 45% total cost reduction amortized over a 3-year expo cycle.

### The Hybrid Solution: AURA FORGE's Proven Formula
Most enterprise leaders achieve peak results using our **Hybrid Architectural Model**: an engineered modular core chassis coupled with customized feature woodwork, artisan metal trims, and bespoke reception counters.`,
    featured_image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    category: "Strategy & ROI",
    tags: ["Modular Stalls", "Custom Fabrication", "Budget Planning", "Expo Strategy"],
    author_name: "Sneha Kapadia",
    author_role: "VP of Project Execution",
    published_at: "2026-02-28",
    status: "published",
    read_time: "6 min read",
    seo_title: "Modular vs Custom Stall Fabrication Guide | AURA FORGE",
    seo_description: "Compare cost, timeline, and impact of modular versus bespoke custom exhibition stalls."
  },
  {
    id: "blog-3",
    slug: "how-to-plan-exhibition-stall-turnkey-execution",
    title: "The Ultimate 120-Day Timeline for Flawless Exhibition Stall Execution",
    excerpt: "Avoid last-minute expo floor crises with our battle-tested project management milestone roadmap from initial brief to ribbon cutting.",
    content: `## Why Flawless Execution Demands Rigid Discipline

Exhibition halls operate on unforgiving deadlines. If hall doors open at 9:00 AM on Day 1, your booth must be fully powered, cleaned, inspected, and staffed at 8:00 AM sharp. There are no extensions.

### T-Minus 120 Days: Concept & Feasibility
- Define core marketing objectives and product showcase requirements.
- Calculate visitor capacity and VIP meeting room requirements.
- Engage your spatial fabrication partner for initial 3D conceptual designs.

### T-Minus 90 Days: Final CAD & Organizer Approvals
- Approve 3D renders, materials schedule, and lighting plans.
- Submit structural engineering calculations to exhibition venue authorities.
- Secure hanging truss points, three-phase power connections, and water/compressed air feeds.

### T-Minus 45 Days: Workshop Pre-Fabrication & Dry Assembly
- CNC cutting of wall panels, framework welding, and acrylic laser fabrication.
- Full structural mock-up assembly inside our 45,000 sq.ft facility.
- Client dry-run walkthrough and final finish approval.

### T-Minus 7 Days: Onsite Load-In & Turnkey Handover
- Day 1: Floor layout, power distribution, and structural steel erection.
- Day 2: Wall panels, acoustic cladding, and suspended truss rigging.
- Day 3: Lighting calibration, LED screen testing, and graphics application.
- Day 4: Deep architectural cleaning, VIP furniture placement, and handover sign-off.`,
    featured_image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
    category: "Project Management",
    tags: ["Turnkey Delivery", "Project Timeline", "Booth Setup", "Checklist"],
    author_name: "Rohan Varma",
    author_role: "Senior Operations Director",
    published_at: "2026-01-18",
    status: "published",
    read_time: "4 min read",
    seo_title: "120-Day Exhibition Stall Execution Timeline | AURA FORGE",
    seo_description: "Master your exhibition project management with our 120-day timeline checklist."
  },
  {
    id: "blog-4",
    slug: "sustainable-materials-green-exhibitions",
    title: "Eco-Engineering: The Rise of Zero-Waste Exhibition Architecture",
    excerpt: "How sustainable material science is revolutionizing temporary pavilion fabrication without sacrificing luxury aesthetics.",
    content: `## Transforming Waste into Wonder

Historically, the trade show industry produced staggering quantities of post-event landfill waste. At AURA FORGE, we are spearheading the transition toward circular exhibition design.

### Non-Toxic Waterborne PU Coatings
Traditional solvent paints release harmful VOCs during rapid indoor setups. We have converted 100% of our paint lines to zero-VOC waterborne coatings that cure with ultra-high scratch resistance and a rich satin sheen.

### Living Architectural Installations
Incorporating preserved Scandinavian moss, stabilized botanical greenery, and kinetic water vapor walls creates biophilic focal points that lower visitor heart rates and encourage longer dwell times.

### Closed-Loop Recycling Programs
Every scrap of aluminum extrusion, acrylic offcut, and steel framing is tracked and recycled back into raw material supply chains.`,
    featured_image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    category: "Sustainability",
    tags: ["Green Expo", "Circular Design", "Eco Materials", "Biophilic Architecture"],
    author_name: "Ananya Deshmukh",
    author_role: "Director of Sustainable Materials",
    published_at: "2025-12-10",
    status: "published",
    read_time: "5 min read",
    seo_title: "Zero-Waste Exhibition Architecture | AURA FORGE",
    seo_description: "Learn about closed-loop sustainable materials transforming international trade shows."
  }
];

export const initialCategories: BlogCategory[] = [
  { id: "cat-1", name: "Design & Technology", slug: "design-and-technology", description: "Spatial design, 3D modeling, kinetic tech, and LED integrations." },
  { id: "cat-2", name: "Strategy & ROI", slug: "strategy-and-roi", description: "Trade show planning, budget optimization, and lead generation." },
  { id: "cat-3", name: "Project Management", slug: "project-management", description: "Timelines, venue logistics, engineering approvals, and handover." },
  { id: "cat-4", name: "Sustainability", slug: "sustainability", description: "Circular materials, green booths, and carbon-conscious fabrication." }
];

export const initialMedia: MediaAsset[] = [
  {
    id: "med-1",
    title: "Nexora Pavilion Main Angle",
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80",
    file_type: "image/jpeg",
    file_size: "2.4 MB",
    alt_text: "Nexora Electric Mobility 280 sqm custom pavilion",
    category: "Projects"
  },
  {
    id: "med-2",
    title: "Aerospace Summit Overhead Truss",
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80",
    file_type: "image/jpeg",
    file_size: "3.1 MB",
    alt_text: "Solaris aerospace pavilion with circular halo truss",
    category: "Projects"
  },
  {
    id: "med-3",
    title: "Lumina Biotech Clean Modular Booth",
    url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1400&q=80",
    file_type: "image/jpeg",
    file_size: "1.9 MB",
    alt_text: "Lumina modular pharmaceutical exhibition booth",
    category: "Projects"
  },
  {
    id: "med-4",
    title: "Luxury Watch Pop-Up Airport Showcase",
    url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80",
    file_type: "image/jpeg",
    file_size: "2.2 MB",
    alt_text: "Krono Geneva bespoke retail exhibition gallery",
    category: "Retail"
  },
  {
    id: "med-5",
    title: "Keynote Arena Stage Rigging",
    url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1400&q=80",
    file_type: "image/jpeg",
    file_size: "3.8 MB",
    alt_text: "Vertex global cloud keynote stage set fabrication",
    category: "Events"
  },
  {
    id: "med-6",
    title: "Sustainable Green Pavilion Detail",
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
    file_type: "image/jpeg",
    file_size: "2.0 MB",
    alt_text: "Aether clean energy pavilion moss wall and timber finish",
    category: "Projects"
  }
];

export const initialEnquiries: Enquiry[] = [
  {
    id: "enq-101",
    name: "Rajesh Malhotra",
    company: "Tata Advanced Systems",
    email: "r.malhotra@tata-advanced.com",
    phone: "+91 98112 34991",
    service_required: "Custom Exhibition Stall Fabrication",
    event_location: "DefExpo / Aero India, Bengaluru",
    event_date: "2026-11-20",
    stall_size: "180 sqm Island Booth",
    project_description: "Require an island exhibition booth with double-decker VIP discussion room, interactive drone showcase tables, and 12-meter high branding gantry.",
    budget_range: "₹45L - ₹65L",
    status: "new",
    admin_notes: "High priority lead. Received RFQ documents. Arranging 3D concept deck presentation for Monday.",
    created_at: "2026-11-05T14:32:00Z"
  },
  {
    id: "enq-102",
    name: "Dr. Elena Rostova",
    company: "Novartis Healthcare Global",
    email: "elena.rostova@novartis.com",
    phone: "+41 61 324 1111",
    service_required: "Modular Stall Fabrication",
    event_location: "BIEC Bengaluru / CPHI India",
    event_date: "2026-12-12",
    stall_size: "100 sqm Corner Booth",
    project_description: "Need a high-precision modular structure that can be dismantled, stored, and re-erected at our next symposium in Mumbai next February.",
    budget_range: "$35,000 - $50,000",
    status: "in_progress",
    admin_notes: "Initial CAD drawings submitted. Client requested revised quote with custom timber acoustic meeting room.",
    created_at: "2026-11-04T09:15:00Z"
  },
  {
    id: "enq-103",
    name: "Marcus Sterling",
    company: "Apex Hypercars UK",
    email: "m.sterling@apex-motors.co.uk",
    phone: "+44 20 7946 0912",
    service_required: "Custom Exhibition Stall Fabrication",
    event_location: "Geneva International Motor Show",
    event_date: "2027-03-05",
    stall_size: "350 sqm Multi-tier Pavilion",
    project_description: "Turnkey luxury pavilion required for electric hypercar unveil. Requires rotating illuminated plinths and private lounge with security detail access.",
    budget_range: "£120,000 - £180,000",
    status: "contacted",
    admin_notes: "Discovery call completed with their London brand agency. NDA executed.",
    created_at: "2026-11-02T16:45:00Z"
  },
  {
    id: "enq-104",
    name: "Pooja Singhania",
    company: "Singhania Fine Jewels",
    email: "pooja@singhaniajewels.in",
    phone: "+91 99300 88219",
    service_required: "Retail and Promotional Displays",
    event_location: "Jio World Convention Centre, Mumbai (IIJS Signature)",
    event_date: "2027-01-08",
    stall_size: "72 sqm Peninsula Booth",
    project_description: "Ultra-high security display cases, satin champagne gold metal joinery, Italian marble counters, and custom jewelry spot lighting with 98 CRI.",
    budget_range: "₹25L - ₹35L",
    status: "converted",
    admin_notes: "Contract signed! Advance payment of 40% cleared. Workshop fabrication commencing this week.",
    created_at: "2026-10-28T11:20:00Z"
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "test-1",
    client_name: "Vikram Singhal",
    client_company: "Nexora Motors",
    client_role: "Head of Brand Experience",
    client_avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    project_name: "Auto Expo Flagship Pavilion",
    testimonial_text: "AURA FORGE turned what looked like an impossible architectural drawing into reality on the expo floor. Their attention to flush finishes, lighting temperatures, and flawless on-time handover was world class.",
    rating: 5,
    display_order: 1
  },
  {
    id: "test-2",
    client_name: "Sarah Lindqvist",
    client_company: "Lumina BioSciences",
    client_role: "Global Events Director",
    client_avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    project_name: "Frankfurt CPHI Modular Booth",
    testimonial_text: "Our German team was blown away by the precision of the modular joinery. The booth was handed over 18 hours ahead of schedule with zero punch list defects. An absolute dream partner.",
    rating: 5,
    display_order: 2
  },
  {
    id: "test-3",
    client_name: "Karan Oberoi",
    client_company: "Vertex Cloud Systems",
    client_role: "Chief Marketing Officer",
    client_avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    project_name: "450 sqm Tech Summit Arena",
    testimonial_text: "From heavy structural steel load calculations to the micro-calibration of our 32-meter LED ribbon, AURA FORGE executed with military precision. They are the gold standard in exhibition engineering.",
    rating: 5,
    display_order: 3
  }
];

export const initialPages: Record<string, PageContent> = {
  about: {
    id: "page-about",
    page_slug: "about",
    hero_title: "CRAFTING SPATIAL EXCELLENCE",
    hero_subtitle: "Where industrial engineering meets architectural elegance. We build environments where world-class brands command attention.",
    banner_image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80",
    body_content: "Founded on the philosophy that temporary exhibition spaces should carry the rigor and permanence of civic architecture, AURA FORGE has grown into a premier international fabrication powerhouse. With 45,000+ sq.ft of mechanized production facilities, advanced 5-axis CNC routers, automated paint suites, and an elite crew of structural riggers, we transform empty exhibition concrete into iconic brand territories.",
    meta_title: "About AURA FORGE | Turnkey Exhibition Stall Fabrication",
    meta_description: "Learn about our 45,000 sq.ft fabrication facilities, master craftsmen, structural engineers, and global exhibition capabilities."
  },
  services: {
    id: "page-services",
    page_slug: "services",
    hero_title: "ENGINEERED CAPABILITIES",
    hero_subtitle: "From single bespoke pavilions to nationwide multi-expo modular rollouts, our fabrication solutions are calibrated for total excellence.",
    banner_image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80",
    body_content: "Every exhibition brief requires an individualized balance of speed, structural load capacity, aesthetic punch, and budget optimization. Explore our six core engineering divisions.",
    meta_title: "Exhibition Fabrication Services | AURA FORGE",
    meta_description: "Custom stalls, modular systems, 3D spatial design, retail pop-ups, corporate stage sets, and permanent commercial interiors."
  },
  contact: {
    id: "page-contact",
    page_slug: "contact",
    hero_title: "COMMISSION YOUR PAVILION",
    hero_subtitle: "Connect directly with our principal spatial designers and structural engineers to initiate your project brief.",
    banner_image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    body_content: "Whether you have an upcoming expo in Mumbai, Delhi, Dubai, Frankfurt, or Singapore, our team is equipped to take your project from initial 3D visualization through to turnkey on-site handover.",
    meta_title: "Contact AURA FORGE | Exhibition Project Consultation",
    meta_description: "Get in touch for bespoke exhibition stall design and fabrication quotations."
  }
};

