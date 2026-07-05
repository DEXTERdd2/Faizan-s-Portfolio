import type { ProjectPreviewVariant } from "@/types";

export type { ProjectPreviewVariant } from "@/types";

export type PreviewStat = { label: string; value: string; delta?: string };

export type PreviewRow = {
  primary: string;
  secondary: string;
  meta: string;
  status: string;
  statusTone?: "green" | "amber" | "blue" | "violet" | "rose" | "slate";
  avatar?: string;
};

export type PreviewConfig = {
  appName: string;
  accent: string;
  accentSoft: string;
  sidebarBg: string;
  nav: string[];
  activeNav: number;
  pageTitle: string;
  pageAction?: string;
  stats: PreviewStat[];
  columns: string[];
  rows: PreviewRow[];
  /** Grid cards instead of table (media library) */
  gridItems?: { label: string; tone: string }[];
};

const toneClass: Record<NonNullable<PreviewRow["statusTone"]>, string> = {
  green: "bg-emerald-500/15 text-emerald-300",
  amber: "bg-amber-500/15 text-amber-300",
  blue: "bg-blue-500/15 text-blue-300",
  violet: "bg-violet-500/15 text-violet-300",
  rose: "bg-rose-500/15 text-rose-300",
  slate: "bg-white/10 text-white/55",
};

export function statusClass(tone: PreviewRow["statusTone"] = "slate") {
  return toneClass[tone];
}

export const defaultVariantByProject: Record<string, ProjectPreviewVariant> = {
  "pearly-ecommerce": "dashboard",
  "healthcare-ehr": "patients",
  "translation-platform": "projects",
  "cv-parser-ai": "candidates",
  "twilio-platform": "messages",
  "ride-management": "drivers",
  "gaming-backend": "players",
  "enterprise-erp": "inventory",
  "travel-tour": "bookings",
};

export function resolveVariant(
  projectId: string,
  variant?: ProjectPreviewVariant
): ProjectPreviewVariant {
  return variant ?? defaultVariantByProject[projectId] ?? "users";
}

export function getPreviewConfig(
  projectId: string,
  variant: ProjectPreviewVariant
): PreviewConfig {
  const v = resolveVariant(projectId, variant);

  const configs: Record<string, Partial<Record<ProjectPreviewVariant, PreviewConfig>>> = {
    "pearly-ecommerce": {
      cover: {
        appName: "Pearly Admin",
        accent: "#c4a574",
        accentSoft: "rgba(196,165,116,0.15)",
        sidebarBg: "#12151c",
        nav: ["Dashboard", "Orders", "Products", "Customers", "CMS", "Settings"],
        activeNav: 0,
        pageTitle: "Store Overview",
        pageAction: "New Order",
        stats: [
          { label: "Revenue", value: "$48.2k", delta: "+12%" },
          { label: "Orders", value: "1,284", delta: "+8%" },
          { label: "Customers", value: "892", delta: "+5%" },
        ],
        columns: ["Customer", "Order", "Total", "Status"],
        rows: [
          { primary: "Amelia Chen", secondary: "#ORD-9281", meta: "$420.00", status: "Shipped", statusTone: "green", avatar: "AC" },
          { primary: "James Wright", secondary: "#ORD-9274", meta: "$189.50", status: "Processing", statusTone: "amber", avatar: "JW" },
          { primary: "Sofia Laurent", secondary: "#ORD-9268", meta: "$760.00", status: "Delivered", statusTone: "green", avatar: "SL" },
          { primary: "Noah Patel", secondary: "#ORD-9261", meta: "$95.00", status: "Pending", statusTone: "blue", avatar: "NP" },
        ],
      },
      dashboard: {
        appName: "Pearly Admin",
        accent: "#c4a574",
        accentSoft: "rgba(196,165,116,0.15)",
        sidebarBg: "#12151c",
        nav: ["Dashboard", "Orders", "Products", "Customers", "CMS", "Analytics"],
        activeNav: 0,
        pageTitle: "Admin Dashboard",
        stats: [
          { label: "Active Users", value: "24", delta: "3 online" },
          { label: "Today Sales", value: "$3,840", delta: "+18%" },
          { label: "Support Tickets", value: "12", delta: "4 open" },
        ],
        columns: ["Team Member", "Role", "Last Active", "Status"],
        rows: [
          { primary: "Sarah Mitchell", secondary: "Store Admin", meta: "2 min ago", status: "Online", statusTone: "green", avatar: "SM" },
          { primary: "David Kim", secondary: "Manager", meta: "14 min ago", status: "Online", statusTone: "green", avatar: "DK" },
          { primary: "Emma Brooks", secondary: "Support", meta: "1 hr ago", status: "Away", statusTone: "amber", avatar: "EB" },
          { primary: "Alex Rivera", secondary: "Content Editor", meta: "3 hr ago", status: "Offline", statusTone: "slate", avatar: "AR" },
        ],
      },
      users: {
        appName: "Pearly Admin",
        accent: "#c4a574",
        accentSoft: "rgba(196,165,116,0.15)",
        sidebarBg: "#12151c",
        nav: ["Dashboard", "Orders", "Products", "Customers", "CMS", "Settings"],
        activeNav: 3,
        pageTitle: "Customer Accounts",
        pageAction: "Add Customer",
        stats: [
          { label: "Total Users", value: "892" },
          { label: "VIP Members", value: "64" },
          { label: "New This Week", value: "38" },
        ],
        columns: ["Customer", "Email", "Orders", "Status"],
        rows: [
          { primary: "Amelia Chen", secondary: "amelia@email.com", meta: "14 orders", status: "VIP", statusTone: "violet", avatar: "AC" },
          { primary: "James Wright", secondary: "james@email.com", meta: "6 orders", status: "Active", statusTone: "green", avatar: "JW" },
          { primary: "Sofia Laurent", secondary: "sofia@email.com", meta: "22 orders", status: "VIP", statusTone: "violet", avatar: "SL" },
          { primary: "Noah Patel", secondary: "noah@email.com", meta: "3 orders", status: "Active", statusTone: "green", avatar: "NP" },
        ],
      },
      products: {
        appName: "Pearly Admin",
        accent: "#c4a574",
        accentSoft: "rgba(196,165,116,0.15)",
        sidebarBg: "#12151c",
        nav: ["Dashboard", "Orders", "Products", "Inventory", "CMS", "Settings"],
        activeNav: 2,
        pageTitle: "Product Catalog",
        pageAction: "Add Product",
        stats: [
          { label: "Live Products", value: "186" },
          { label: "Low Stock", value: "8" },
          { label: "Drafts", value: "12" },
        ],
        columns: ["Product", "SKU", "Price", "Stock"],
        rows: [
          { primary: "Pearl Drop Earrings", secondary: "PEARL-001", meta: "$189", status: "In Stock", statusTone: "green", avatar: "PD" },
          { primary: "Gold Chain Necklace", secondary: "GOLD-014", meta: "$420", status: "Low", statusTone: "amber", avatar: "GC" },
          { primary: "Silver Bangle Set", secondary: "SLV-028", meta: "$95", status: "In Stock", statusTone: "green", avatar: "SB" },
          { primary: "Diamond Studs", secondary: "DIA-007", meta: "$760", status: "In Stock", statusTone: "green", avatar: "DS" },
        ],
      },
      media: {
        appName: "Pearly CMS",
        accent: "#c4a574",
        accentSoft: "rgba(196,165,116,0.15)",
        sidebarBg: "#12151c",
        nav: ["Pages", "Blog", "Banners", "Media", "SEO", "Settings"],
        activeNav: 3,
        pageTitle: "Media Library",
        pageAction: "Upload",
        stats: [
          { label: "Assets", value: "248" },
          { label: "Homepage", value: "12" },
          { label: "Blog", value: "86" },
        ],
        columns: [],
        rows: [],
        gridItems: [
          { label: "hero-banner.jpg", tone: "#c4a574" },
          { label: "collection-fall.png", tone: "#8b7355" },
          { label: "product-grid.webp", tone: "#a89070" },
          { label: "blog-cover.jpg", tone: "#6b5b45" },
          { label: "lookbook-01.png", tone: "#d4bc94" },
          { label: "sale-banner.jpg", tone: "#9a8468" },
        ],
      },
    },
    "healthcare-ehr": {
      cover: {
        appName: "MedSync EHR",
        accent: "#14b8a6",
        accentSoft: "rgba(20,184,166,0.15)",
        sidebarBg: "#0f172a",
        nav: ["Dashboard", "Patients", "Appointments", "Billing", "Records", "Reports"],
        activeNav: 1,
        pageTitle: "Patient Registry",
        pageAction: "Add Patient",
        stats: [
          { label: "Active Patients", value: "50,284" },
          { label: "Today's Visits", value: "142" },
          { label: "Pending Labs", value: "28" },
        ],
        columns: ["Patient", "MRN", "Physician", "Status"],
        rows: [
          { primary: "Robert Hayes", secondary: "MRN-10482", meta: "Dr. Patel", status: "In Care", statusTone: "green", avatar: "RH" },
          { primary: "Maria Gonzalez", secondary: "MRN-10479", meta: "Dr. Singh", status: "Scheduled", statusTone: "blue", avatar: "MG" },
          { primary: "Thomas Lee", secondary: "MRN-10471", meta: "Dr. Chen", status: "Discharged", statusTone: "slate", avatar: "TL" },
          { primary: "Anna Kowalski", secondary: "MRN-10465", meta: "Dr. Patel", status: "Critical", statusTone: "rose", avatar: "AK" },
        ],
      },
      patients: {
        appName: "MedSync EHR",
        accent: "#14b8a6",
        accentSoft: "rgba(20,184,166,0.15)",
        sidebarBg: "#0f172a",
        nav: ["Dashboard", "Patients", "Appointments", "Billing", "Records", "Reports"],
        activeNav: 1,
        pageTitle: "Patient Management",
        pageAction: "Register Patient",
        stats: [
          { label: "Total Records", value: "50k+" },
          { label: "Admitted", value: "38" },
          { label: "Outpatient", value: "104" },
        ],
        columns: ["Patient", "Department", "Last Visit", "Status"],
        rows: [
          { primary: "Robert Hayes", secondary: "Cardiology", meta: "Today", status: "In Care", statusTone: "green", avatar: "RH" },
          { primary: "Maria Gonzalez", secondary: "Pediatrics", meta: "Tomorrow", status: "Scheduled", statusTone: "blue", avatar: "MG" },
          { primary: "Thomas Lee", secondary: "Orthopedics", meta: "Feb 12", status: "Follow-up", statusTone: "amber", avatar: "TL" },
          { primary: "Anna Kowalski", secondary: "Emergency", meta: "Today", status: "Critical", statusTone: "rose", avatar: "AK" },
        ],
      },
    },
    "translation-platform": {
      cover: {
        appName: "TransFlow",
        accent: "#3b82f6",
        accentSoft: "rgba(59,130,246,0.15)",
        sidebarBg: "#111827",
        nav: ["Dashboard", "Projects", "Translators", "Glossary", "QA", "Analytics"],
        activeNav: 1,
        pageTitle: "Translation Projects",
        pageAction: "New Project",
        stats: [
          { label: "Active Projects", value: "48" },
          { label: "Translators", value: "126" },
          { label: "Words Today", value: "84k" },
        ],
        columns: ["Project", "Languages", "Progress", "Status"],
        rows: [
          { primary: "Legal Contract Pack", secondary: "EN → DE, FR", meta: "78%", status: "In Progress", statusTone: "blue", avatar: "LC" },
          { primary: "Product Localization", secondary: "EN → ES, PT", meta: "92%", status: "Review", statusTone: "amber", avatar: "PL" },
          { primary: "Marketing Campaign", secondary: "EN → JA, KO", meta: "45%", status: "In Progress", statusTone: "blue", avatar: "MC" },
          { primary: "Support Docs v3", secondary: "EN → AR, TR", meta: "100%", status: "Complete", statusTone: "green", avatar: "SD" },
        ],
      },
      projects: {
        appName: "TransFlow",
        accent: "#3b82f6",
        accentSoft: "rgba(59,130,246,0.15)",
        sidebarBg: "#111827",
        nav: ["Dashboard", "Projects", "Translators", "Glossary", "QA", "Analytics"],
        activeNav: 1,
        pageTitle: "Project Workspace",
        stats: [
          { label: "API Requests", value: "50k/day" },
          { label: "Team Members", value: "126" },
          { label: "QA Score", value: "98.4%" },
        ],
        columns: ["Assignee", "Project", "Due Date", "Status"],
        rows: [
          { primary: "Elena Rossi", secondary: "Legal Contract Pack", meta: "Mar 18", status: "Translating", statusTone: "blue", avatar: "ER" },
          { primary: "Kenji Tanaka", secondary: "Product Localization", meta: "Mar 15", status: "Review", statusTone: "amber", avatar: "KT" },
          { primary: "Carlos Mendez", secondary: "Marketing Campaign", meta: "Mar 22", status: "Translating", statusTone: "blue", avatar: "CM" },
          { primary: "Aisha Khan", secondary: "Support Docs v3", meta: "Mar 10", status: "Approved", statusTone: "green", avatar: "AK" },
        ],
      },
    },
    "cv-parser-ai": {
      cover: {
        appName: "ParseAI",
        accent: "#8b5cf6",
        accentSoft: "rgba(139,92,246,0.15)",
        sidebarBg: "#0c0a14",
        nav: ["Dashboard", "Candidates", "Pipelines", "Templates", "Integrations", "Settings"],
        activeNav: 1,
        pageTitle: "Parsed Candidates",
        pageAction: "Upload CVs",
        stats: [
          { label: "Parsed Today", value: "1,248" },
          { label: "Accuracy", value: "95%" },
          { label: "In Queue", value: "86" },
        ],
        columns: ["Candidate", "Role Match", "Score", "Status"],
        rows: [
          { primary: "Daniel Foster", secondary: "Senior .NET Dev", meta: "96%", status: "Matched", statusTone: "green", avatar: "DF" },
          { primary: "Priya Sharma", secondary: "Full Stack", meta: "91%", status: "Review", statusTone: "amber", avatar: "PS" },
          { primary: "Marcus Webb", secondary: "Backend Lead", meta: "88%", status: "Matched", statusTone: "green", avatar: "MW" },
          { primary: "Lisa Nguyen", secondary: "AI Engineer", meta: "94%", status: "Exported", statusTone: "violet", avatar: "LN" },
        ],
      },
      candidates: {
        appName: "ParseAI",
        accent: "#8b5cf6",
        accentSoft: "rgba(139,92,246,0.15)",
        sidebarBg: "#0c0a14",
        nav: ["Dashboard", "Candidates", "Pipelines", "Templates", "Integrations", "Settings"],
        activeNav: 1,
        pageTitle: "AI Candidate Pipeline",
        stats: [
          { label: "Bulk Jobs", value: "24" },
          { label: "ATS Synced", value: "892" },
          { label: "Avg Score", value: "92%" },
        ],
        columns: ["Candidate", "Skills Extracted", "Confidence", "Status"],
        rows: [
          { primary: "Daniel Foster", secondary: "C#, Azure, SQL", meta: "96%", status: "Ready", statusTone: "green", avatar: "DF" },
          { primary: "Priya Sharma", secondary: "React, Node, TS", meta: "91%", status: "Parsing", statusTone: "blue", avatar: "PS" },
          { primary: "Marcus Webb", secondary: ".NET, Docker, AWS", meta: "88%", status: "Ready", statusTone: "green", avatar: "MW" },
          { primary: "Lisa Nguyen", secondary: "Python, OpenAI, ML", meta: "94%", status: "Exported", statusTone: "violet", avatar: "LN" },
        ],
      },
    },
    "twilio-platform": {
      cover: {
        appName: "CommHub",
        accent: "#f43f5e",
        accentSoft: "rgba(244,63,94,0.15)",
        sidebarBg: "#18181b",
        nav: ["Dashboard", "Campaigns", "Contacts", "Voice", "WhatsApp", "Analytics"],
        activeNav: 2,
        pageTitle: "Contact Directory",
        pageAction: "Import Contacts",
        stats: [
          { label: "Messages/mo", value: "1M+" },
          { label: "Active Contacts", value: "24,680" },
          { label: "Delivery Rate", value: "99.2%" },
        ],
        columns: ["Contact", "Channel", "Last Message", "Status"],
        rows: [
          { primary: "Acme Corp", secondary: "WhatsApp", meta: "2 min ago", status: "Active", statusTone: "green", avatar: "AC" },
          { primary: "Nova Retail", secondary: "SMS", meta: "14 min ago", status: "Campaign", statusTone: "blue", avatar: "NR" },
          { primary: "TechStart Inc", secondary: "Voice", meta: "1 hr ago", status: "Active", statusTone: "green", avatar: "TS" },
          { primary: "Global Logistics", secondary: "SMS", meta: "3 hr ago", status: "Paused", statusTone: "amber", avatar: "GL" },
        ],
      },
      messages: {
        appName: "CommHub",
        accent: "#f43f5e",
        accentSoft: "rgba(244,63,94,0.15)",
        sidebarBg: "#18181b",
        nav: ["Dashboard", "Campaigns", "Contacts", "Voice", "WhatsApp", "Analytics"],
        activeNav: 1,
        pageTitle: "Campaign Users",
        stats: [
          { label: "SMS Sent", value: "842k" },
          { label: "Voice Calls", value: "12k" },
          { label: "WhatsApp", value: "186k" },
        ],
        columns: ["User", "Segment", "Channel", "Status"],
        rows: [
          { primary: "Sarah Mitchell", secondary: "Enterprise", meta: "WhatsApp", status: "Subscribed", statusTone: "green", avatar: "SM" },
          { primary: "David Kim", secondary: "SMB", meta: "SMS", status: "Subscribed", statusTone: "green", avatar: "DK" },
          { primary: "Emma Brooks", secondary: "Trial", meta: "Voice", status: "Pending", statusTone: "amber", avatar: "EB" },
          { primary: "Alex Rivera", secondary: "Enterprise", meta: "SMS", status: "Opt-out", statusTone: "slate", avatar: "AR" },
        ],
      },
    },
    "ride-management": {
      cover: {
        appName: "FleetTrack",
        accent: "#f59e0b",
        accentSoft: "rgba(245,158,11,0.15)",
        sidebarBg: "#1c1917",
        nav: ["Live Map", "Drivers", "Rides", "Payments", "Reports", "Settings"],
        activeNav: 1,
        pageTitle: "Driver Management",
        pageAction: "Add Driver",
        stats: [
          { label: "Active Drivers", value: "284" },
          { label: "On Trip", value: "67" },
          { label: "Avg ETA", value: "4.2 min" },
        ],
        columns: ["Driver", "Vehicle", "Location", "Status"],
        rows: [
          { primary: "Mike Johnson", secondary: "Toyota Camry", meta: "Downtown", status: "On Trip", statusTone: "blue", avatar: "MJ" },
          { primary: "Sarah Ali", secondary: "Honda Civic", meta: "Airport", status: "Available", statusTone: "green", avatar: "SA" },
          { primary: "Chris Park", secondary: "Tesla Model 3", meta: "Midtown", status: "On Trip", statusTone: "blue", avatar: "CP" },
          { primary: "Fatima Hassan", secondary: "Nissan Altima", meta: "Uptown", status: "Offline", statusTone: "slate", avatar: "FH" },
        ],
      },
      drivers: {
        appName: "FleetTrack",
        accent: "#f59e0b",
        accentSoft: "rgba(245,158,11,0.15)",
        sidebarBg: "#1c1917",
        nav: ["Live Map", "Drivers", "Rides", "Payments", "Reports", "Settings"],
        activeNav: 1,
        pageTitle: "Driver Directory",
        stats: [
          { label: "Fleet Size", value: "284" },
          { label: "GPS Active", value: "98%" },
          { label: "Rating Avg", value: "4.8" },
        ],
        columns: ["Driver", "Phone", "Trips Today", "Status"],
        rows: [
          { primary: "Mike Johnson", secondary: "+1 555-0142", meta: "18 trips", status: "On Trip", statusTone: "blue", avatar: "MJ" },
          { primary: "Sarah Ali", secondary: "+1 555-0198", meta: "12 trips", status: "Available", statusTone: "green", avatar: "SA" },
          { primary: "Chris Park", secondary: "+1 555-0176", meta: "21 trips", status: "On Trip", statusTone: "blue", avatar: "CP" },
          { primary: "Fatima Hassan", secondary: "+1 555-0133", meta: "0 trips", status: "Offline", statusTone: "slate", avatar: "FH" },
        ],
      },
    },
    "gaming-backend": {
      cover: {
        appName: "GameCore Admin",
        accent: "#22d3ee",
        accentSoft: "rgba(34,211,238,0.15)",
        sidebarBg: "#0a0e17",
        nav: ["Dashboard", "Players", "Matches", "Leaderboards", "Anti-cheat", "Settings"],
        activeNav: 1,
        pageTitle: "Player Registry",
        pageAction: "Ban User",
        stats: [
          { label: "Online Now", value: "10,842" },
          { label: "Matches Live", value: "1,284" },
          { label: "Peak Today", value: "12.4k" },
        ],
        columns: ["Player", "Rank", "Level", "Status"],
        rows: [
          { primary: "ShadowNova", secondary: "Diamond II", meta: "Lv. 84", status: "In Match", statusTone: "blue", avatar: "SN" },
          { primary: "PixelStorm", secondary: "Platinum I", meta: "Lv. 72", status: "Online", statusTone: "green", avatar: "PS" },
          { primary: "NeonBlade", secondary: "Master", meta: "Lv. 96", status: "In Match", statusTone: "blue", avatar: "NB" },
          { primary: "VoidRunner", secondary: "Gold III", meta: "Lv. 58", status: "Idle", statusTone: "amber", avatar: "VR" },
        ],
      },
      players: {
        appName: "GameCore Admin",
        accent: "#22d3ee",
        accentSoft: "rgba(34,211,238,0.15)",
        sidebarBg: "#0a0e17",
        nav: ["Dashboard", "Players", "Matches", "Leaderboards", "Anti-cheat", "Settings"],
        activeNav: 1,
        pageTitle: "Player Management",
        stats: [
          { label: "Registered", value: "2.4M" },
          { label: "Concurrent", value: "10k+" },
          { label: "Banned", value: "142" },
        ],
        columns: ["Player", "Region", "Win Rate", "Status"],
        rows: [
          { primary: "ShadowNova", secondary: "EU-West", meta: "62%", status: "Active", statusTone: "green", avatar: "SN" },
          { primary: "PixelStorm", secondary: "US-East", meta: "58%", status: "Active", statusTone: "green", avatar: "PS" },
          { primary: "NeonBlade", secondary: "APAC", meta: "71%", status: "Flagged", statusTone: "rose", avatar: "NB" },
          { primary: "VoidRunner", secondary: "EU-West", meta: "49%", status: "Active", statusTone: "green", avatar: "VR" },
        ],
      },
    },
    "enterprise-erp": {
      cover: {
        appName: "ERP Nexus",
        accent: "#6366f1",
        accentSoft: "rgba(99,102,241,0.15)",
        sidebarBg: "#111827",
        nav: ["Dashboard", "Inventory", "Billing", "Accounting", "Users", "Reports"],
        activeNav: 4,
        pageTitle: "System Users",
        pageAction: "Invite User",
        stats: [
          { label: "Total Users", value: "1,842" },
          { label: "Departments", value: "24" },
          { label: "Modules", value: "200+" },
        ],
        columns: ["User", "Department", "Role", "Status"],
        rows: [
          { primary: "Jennifer Walsh", secondary: "Finance", meta: "Admin", status: "Active", statusTone: "green", avatar: "JW" },
          { primary: "Michael Torres", secondary: "Operations", meta: "Manager", status: "Active", statusTone: "green", avatar: "MT" },
          { primary: "Rachel Kim", secondary: "Inventory", meta: "Editor", status: "Active", statusTone: "green", avatar: "RK" },
          { primary: "Brian Okafor", secondary: "HR", meta: "Viewer", status: "Pending", statusTone: "amber", avatar: "BO" },
        ],
      },
      inventory: {
        appName: "ERP Nexus",
        accent: "#6366f1",
        accentSoft: "rgba(99,102,241,0.15)",
        sidebarBg: "#111827",
        nav: ["Dashboard", "Inventory", "Billing", "Accounting", "Users", "Reports"],
        activeNav: 1,
        pageTitle: "Inventory Management",
        stats: [
          { label: "SKUs", value: "8,420" },
          { label: "Warehouses", value: "12" },
          { label: "Low Stock", value: "34" },
        ],
        columns: ["Item", "Warehouse", "Quantity", "Status"],
        rows: [
          { primary: "Server Rack Unit", secondary: "WH-NYC-01", meta: "142 units", status: "In Stock", statusTone: "green", avatar: "SR" },
          { primary: "Network Switch", secondary: "WH-LON-02", meta: "28 units", status: "Low", statusTone: "amber", avatar: "NS" },
          { primary: "Office Supplies", secondary: "WH-CHI-01", meta: "890 units", status: "In Stock", statusTone: "green", avatar: "OS" },
          { primary: "Laptop Fleet", secondary: "WH-SF-03", meta: "56 units", status: "Reorder", statusTone: "rose", avatar: "LF" },
        ],
      },
    },
    "travel-tour": {
      cover: {
        appName: "TourMaster",
        accent: "#0ea5e9",
        accentSoft: "rgba(14,165,233,0.15)",
        sidebarBg: "#0c1222",
        nav: ["Dashboard", "Bookings", "Packages", "Customers", "Payments", "Reports"],
        activeNav: 1,
        pageTitle: "Booking Management",
        pageAction: "New Booking",
        stats: [
          { label: "Bookings", value: "5,284" },
          { label: "This Month", value: "428" },
          { label: "Revenue", value: "$842k" },
        ],
        columns: ["Customer", "Destination", "Dates", "Status"],
        rows: [
          { primary: "John & Mary Smith", secondary: "Bali, Indonesia", meta: "Apr 12–22", status: "Confirmed", statusTone: "green", avatar: "JS" },
          { primary: "Ahmed Hassan", secondary: "Istanbul, Turkey", meta: "May 3–10", status: "Pending", statusTone: "amber", avatar: "AH" },
          { primary: "Emily Watson", secondary: "Swiss Alps", meta: "Jun 15–22", status: "Confirmed", statusTone: "green", avatar: "EW" },
          { primary: "Carlos Ruiz", secondary: "Tokyo, Japan", meta: "Jul 1–14", status: "Processing", statusTone: "blue", avatar: "CR" },
        ],
      },
      bookings: {
        appName: "TourMaster",
        accent: "#0ea5e9",
        accentSoft: "rgba(14,165,233,0.15)",
        sidebarBg: "#0c1222",
        nav: ["Dashboard", "Bookings", "Packages", "Customers", "Payments", "Reports"],
        activeNav: 3,
        pageTitle: "Customer Directory",
        stats: [
          { label: "Customers", value: "3,842" },
          { label: "Repeat", value: "42%" },
          { label: "VIP", value: "186" },
        ],
        columns: ["Customer", "Email", "Bookings", "Status"],
        rows: [
          { primary: "John Smith", secondary: "john@email.com", meta: "8 trips", status: "VIP", statusTone: "violet", avatar: "JS" },
          { primary: "Ahmed Hassan", secondary: "ahmed@email.com", meta: "3 trips", status: "Active", statusTone: "green", avatar: "AH" },
          { primary: "Emily Watson", secondary: "emily@email.com", meta: "5 trips", status: "VIP", statusTone: "violet", avatar: "EW" },
          { primary: "Carlos Ruiz", secondary: "carlos@email.com", meta: "1 trip", status: "New", statusTone: "blue", avatar: "CR" },
        ],
      },
    },
  };

  const projectConfigs = configs[projectId];
  if (!projectConfigs) {
    return fallbackConfig(v);
  }

  const config =
    projectConfigs[v] ??
    projectConfigs.cover ??
    projectConfigs[defaultVariantByProject[projectId] ?? "users"] ??
    fallbackConfig(v);

  return config;
}

function fallbackConfig(variant: ProjectPreviewVariant): PreviewConfig {
  return {
    appName: "Admin Panel",
    accent: "#b15f2c",
    accentSoft: "rgba(177,95,44,0.15)",
    sidebarBg: "#111827",
    nav: ["Dashboard", "Users", "Reports", "Settings"],
    activeNav: 1,
    pageTitle: variant === "users" ? "User Management" : "Dashboard",
    pageAction: "Add User",
    stats: [
      { label: "Total Users", value: "1,248" },
      { label: "Active", value: "892" },
      { label: "New", value: "38" },
    ],
    columns: ["User", "Email", "Role", "Status"],
    rows: [
      { primary: "Sarah Mitchell", secondary: "sarah@company.com", meta: "Admin", status: "Active", statusTone: "green", avatar: "SM" },
      { primary: "David Kim", secondary: "david@company.com", meta: "Manager", status: "Active", statusTone: "green", avatar: "DK" },
      { primary: "Emma Brooks", secondary: "emma@company.com", meta: "Editor", status: "Away", statusTone: "amber", avatar: "EB" },
      { primary: "Alex Rivera", secondary: "alex@company.com", meta: "Viewer", status: "Offline", statusTone: "slate", avatar: "AR" },
    ],
  };
}
