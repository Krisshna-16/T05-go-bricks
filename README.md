# GO-BRICS CRM System Setup & Configuration Guide
### TASK_T05 | HubSpot CRM Setup & Documentation | June 2026

A premium, interactive React-based documentation web application that maps out a fully configured HubSpot CRM system for the **GO-BRICS Business Lab B2B Sales function**. It includes real-time KPI indicators, a searchable database table, a dynamic Kanban-style pipeline, step-by-step interactive operational guides, and optimized print styles.

---

## 🎨 Design System & Aesthetics
Following the GO-BRICS design system guidelines:
*   **Colors**: Black (`#0A0A0A`) background, Neon Green (`#00FF41`) interactive elements/accents, Charcoal (`#1A1A1A`) cards with `#2E2E2E` borders, White text.
*   **Typography**: `Inter` font family loaded dynamically via Google Fonts.
*   **Micro-interactions**: Hover card glows, neon text shadows, smooth tab transitions, and animated fade-in states.
*   **Print Optimization**: Customized `@media print` style sheet that:
    *   Hides navigation menus, action buttons, role selectors, and empty state cards.
    *   Forces all 4 documentation tabs to render sequentially in a clean, vertical, high-contrast black-and-white grid.
    *   Applies print-friendly margins (1.2cm) and page break optimizations (`page-break-inside: avoid`).

---

## 🚀 Key Interactive Features

### 1. Tab 1 — System Overview
*   **CRM Configuration Card**: Summary of HubSpot CRM setup parameters (Platform: Free CRM, Purpose, Configured by, Active Deals, stages, contacts).
*   **Real-time Stat Cards**: Dynamic cards showing total contacts (47), active deals, stage count, and average deal value.
*   **Custom Property Badges**: Showcases the 8 custom fields added to HubSpot schema to capture product interest, budget tier, region, decision timeline, MOQ requirements, and contact frequency.
*   **Pipeline Stages**: Visual flow indicator showing colored dot indicators (Cold 🔵, Contacted 🟡, Meeting Booked 🟠, Proposal Sent 🟣, Negotiating 🔴, Closed Won 🟢).

### 2. Tab 2 — Test Records
*   **Interactive Table**: 15 test records populated to verify data model integrity and property inheritance.
*   **Stage Highlight Color-Coding**: Custom row highlights (Cold = grey, Contacted = blue, Meeting Booked = amber, Proposal Sent = purple, Negotiating = orange, Closed Won = green).
*   **Search & Filters (UI)**: Live client name/company/city search box and stage filter dropdown.
*   **Data Editors**: Edit or delete test cases using form modals; edits immediately propagate to overall metrics, table, and Kanban columns.

### 3. Tab 3 — Pipeline View
*   **CSS Grid Kanban Board**: 6 columns representing the sales pipeline. Each header shows active deal count and total stage valuation.
*   **Deal Cards**: Details company name, deal value, primary contact name, and last logged activity.
*   **Open Slot Placeholder**: Visual dashed slot for the "Meeting Booked" column.
*   **Synchronized Values**: Calculations updates instantly when records are edited, adding up to the total pipeline value of `₹42,387` for active deals.

### 4. Tab 4 — User Guide
*   **5 How-To Action Guides**: Interactive checklist steps for adding contacts, logging activity, checking health, moving deals, and adding team members.
*   **Permissions Matrix**: Roles (Admin, Sales, View Only) versus CRUD operations.
*   **Role Simulator**: Allows user to select their role and see active permissions highlighted dynamically.

---

## 🛠️ Technical Stack
*   **Core**: React 19, Vite 8, JavaScript (ES6+).
*   **Styles**: Tailwind CSS v4 (configured via `@tailwindcss/vite` plugin).
*   **Icons**: Lucide React.
*   **Fonts**: Inter (Google Fonts).

---

## 💻 Running the Project Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Development Server
```bash
npm run dev
```

### 3. Build Production Bundle
```bash
npm run build
```
The compiled output is saved in the `/dist` directory.
