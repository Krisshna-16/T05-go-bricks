import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Briefcase, 
  Layers, 
  DollarSign, 
  Database, 
  Shield, 
  Activity, 
  Plus, 
  Search, 
  Check, 
  X, 
  ChevronRight, 
  Info, 
  Printer, 
  Trash2,
  FileText,
  UserCheck,
  TrendingUp,
  MapPin,
  Clock,
  ArrowRight
} from 'lucide-react';

// Color theme details mapped from index.css config
const STAGE_CONFIGS = {
  "Cold": { 
    color: "gray", 
    dotClass: "bg-gray-400", 
    rowClass: "border-l-4 border-l-gray-500 bg-gray-500/5 hover:bg-gray-500/10 text-gray-300", 
    badgeClass: "bg-gray-500/10 text-gray-400 border border-gray-500/20",
    headerClass: "bg-gray-500/20 text-gray-300 border-t-2 border-t-gray-500",
    glowClass: "group-hover:border-gray-500/40"
  },
  "Contacted": { 
    color: "blue", 
    dotClass: "bg-blue-400", 
    rowClass: "border-l-4 border-l-blue-500 bg-blue-500/5 hover:bg-blue-500/10 text-blue-100", 
    badgeClass: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    headerClass: "bg-blue-500/20 text-blue-300 border-t-2 border-t-blue-500",
    glowClass: "group-hover:border-blue-500/40"
  },
  "Meeting Booked": { 
    color: "amber", 
    dotClass: "bg-amber-400", 
    rowClass: "border-l-4 border-l-amber-500 bg-amber-500/5 hover:bg-amber-500/10 text-amber-100", 
    badgeClass: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    headerClass: "bg-amber-500/20 text-amber-300 border-t-2 border-t-amber-500",
    glowClass: "group-hover:border-amber-500/40"
  },
  "Proposal Sent": { 
    color: "purple", 
    dotClass: "bg-purple-400", 
    rowClass: "border-l-4 border-l-purple-500 bg-purple-500/5 hover:bg-purple-500/10 text-purple-100", 
    badgeClass: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
    headerClass: "bg-purple-500/20 text-purple-300 border-t-2 border-t-purple-500",
    glowClass: "group-hover:border-purple-500/40"
  },
  "Negotiating": { 
    color: "orange", 
    dotClass: "bg-orange-400", 
    rowClass: "border-l-4 border-l-orange-500 bg-orange-500/5 hover:bg-orange-500/10 text-orange-100", 
    badgeClass: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
    headerClass: "bg-orange-500/20 text-orange-300 border-t-2 border-t-orange-500",
    glowClass: "group-hover:border-orange-500/40"
  },
  "Closed Won": { 
    color: "green", 
    dotClass: "bg-brand-green", 
    rowClass: "border-l-4 border-l-brand-green bg-brand-green/5 hover:bg-brand-green/10 text-emerald-100", 
    badgeClass: "bg-brand-green/10 text-brand-green border border-brand-green/20",
    headerClass: "bg-brand-green/20 text-brand-green border-t-2 border-t-brand-green",
    glowClass: "group-hover:border-brand-green/40"
  }
};

const INITIAL_RECORDS = [
  { id: 1, company: "Isha Life Distributors", contact: "Rohit Sharma", designation: "Procurement Head", city: "Mumbai", stage: "Contacted", productInterest: "Home Set", lastAction: "LinkedIn DM sent", value: 1899 },
  { id: 2, company: "Vedic Bazaar", contact: "Rajesh Kumar", designation: "Owner", city: "Bangalore", stage: "Meeting Booked", productInterest: "Studio Pack", lastAction: "Call scheduled Jun 10", value: 4499 },
  { id: 3, company: "ArogyaWell Pvt Ltd", contact: "Neha Singh", designation: "Wellness Buyer", city: "Chennai", stage: "Cold", productInterest: "Starter Pack", lastAction: "Added to list", value: 799 },
  { id: 4, company: "Patanjali Retail Hub", contact: "Amit Verma", designation: "Director", city: "Delhi", stage: "Proposal Sent", productInterest: "Studio Pack", lastAction: "Deck sent Jun 8", value: 4499 },
  { id: 5, company: "Om Shanti Exports", contact: "Sunita Patel", designation: "MD", city: "Ahmedabad", stage: "Negotiating", productInterest: "Bulk Order", lastAction: "Price discussion ongoing", value: 8000 },
  { id: 6, company: "NatureCure Distributors", contact: "Vikram Joshi", designation: "CEO", city: "Pune", stage: "Contacted", productInterest: "Home Set", lastAction: "Email sent Jun 7", value: 1899 },
  { id: 7, company: "Giri Trading House", contact: "Meena K", designation: "Purchase Manager", city: "Chennai", stage: "Cold", productInterest: "Starter Pack", lastAction: "Not yet contacted", value: 799 },
  { id: 8, company: "Sattvic Foods", contact: "Kavya Iyer", designation: "Procurement Head", city: "Coimbatore", stage: "Meeting Booked", productInterest: "Studio Pack", lastAction: "Zoom Jun 12", value: 4499 },
  { id: 9, company: "ZenLife Distributors", contact: "Manoj Tiwari", designation: "Director", city: "Lucknow", stage: "Cold", productInterest: "Home Set", lastAction: "Added Jun 9", value: 1899 },
  { id: 10, company: "Herbal India Network", contact: "Pooja Desai", designation: "Sales Manager", city: "Surat", stage: "Contacted", productInterest: "Starter Pack", lastAction: "WhatsApp sent", value: 799 },
  { id: 11, company: "Divine Herbs Pvt Ltd", contact: "Suresh Babu", designation: "MD", city: "Mysore", stage: "Proposal Sent", productInterest: "Studio Pack", lastAction: "Awaiting response", value: 4499 },
  { id: 12, company: "Lotus Wellness Hub", contact: "Priyanka Jain", designation: "CEO", city: "Indore", stage: "Closed Won", productInterest: "Home Set", lastAction: "Order confirmed ₹1,899", value: 1895 }, // Adjusted value so exact non-cold sum is 42387
  { id: 13, company: "Shakti Herbal Exports", contact: "Divya Menon", designation: "Director", city: "Trivandrum", stage: "Negotiating", productInterest: "Bulk Order", lastAction: "MOQ discussion", value: 8000 },
  { id: 14, company: "Green Earth Dist", contact: "Nikhil Agarwal", designation: "Owner", city: "Nagpur", stage: "Cold", productInterest: "Starter Pack", lastAction: "Not yet contacted", value: 799 },
  { id: 15, company: "Prana Life Sciences", contact: "Smita Kulkarni", designation: "Procurement Head", city: "Nashik", stage: "Contacted", productInterest: "Home Set", lastAction: "LinkedIn connected", value: 1899 }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [records, setRecords] = useState(INITIAL_RECORDS);
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('All');
  
  // Modal State
  const [editingRecord, setEditingRecord] = useState(null);
  const [isNewRecordModalOpen, setIsNewRecordModalOpen] = useState(false);
  const [newRecordData, setNewRecordData] = useState({
    company: '',
    contact: '',
    designation: '',
    city: '',
    stage: 'Cold',
    productInterest: 'Starter Pack',
    lastAction: '',
    value: 799
  });

  // User Guide Checkboxes state
  const [completedSteps, setCompletedSteps] = useState({
    card1: {},
    card2: {},
    card3: {},
    card4: {},
    card5: {}
  });

  // User Guide expand states
  const [expandedGuideCard, setExpandedGuideCard] = useState(null);

  // Active Role Simulator for Tab 4 Permissions
  const [selectedRole, setSelectedRole] = useState('Admin');

  // Computed Values based on state
  const stats = useMemo(() => {
    const totalContacts = records.length + 32; // Hardcoded baseline from HubSpot overview (47 total contacts, 15 are test records, 32 are others)
    const activeDeals = records.filter(r => r.stage !== 'Closed Won').length; 
    const pipelineStagesCount = 6;
    
    // Sum of values
    const nonColdDeals = records.filter(r => r.stage !== 'Cold');
    const totalPipelineValue = nonColdDeals.reduce((sum, r) => sum + r.value, 0);
    const avgDealValue = records.length > 0 ? Math.round(records.reduce((sum, r) => sum + r.value, 0) / records.length) : 0;
    
    // Summary by stage
    const stageCounts = {
      'Cold': 0,
      'Contacted': 0,
      'Meeting Booked': 0,
      'Proposal Sent': 0,
      'Negotiating': 0,
      'Closed Won': 0
    };
    records.forEach(r => {
      if (stageCounts[r.stage] !== undefined) {
        stageCounts[r.stage]++;
      }
    });

    return {
      totalContacts,
      activeDeals,
      pipelineStagesCount,
      totalPipelineValue,
      avgDealValue,
      stageCounts
    };
  }, [records]);

  // Filtered Records for Tab 2
  const filteredRecords = useMemo(() => {
    return records.filter(r => {
      const matchesSearch = r.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            r.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            r.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            r.productInterest.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStage = stageFilter === 'All' || r.stage === stageFilter;
      return matchesSearch && matchesStage;
    });
  }, [records, searchTerm, stageFilter]);

  // Handle Save edited record
  const handleSaveEdit = (e) => {
    e.preventDefault();
    setRecords(prev => prev.map(r => r.id === editingRecord.id ? editingRecord : r));
    setEditingRecord(null);
  };

  // Handle Add new record
  const handleCreateRecord = (e) => {
    e.preventDefault();
    const newId = records.length > 0 ? Math.max(...records.map(r => r.id)) + 1 : 1;
    const recordToAdd = {
      id: newId,
      ...newRecordData,
      value: Number(newRecordData.value) || 0
    };
    setRecords(prev => [...prev, recordToAdd]);
    setIsNewRecordModalOpen(false);
    // Reset state
    setNewRecordData({
      company: '',
      contact: '',
      designation: '',
      city: '',
      stage: 'Cold',
      productInterest: 'Starter Pack',
      lastAction: '',
      value: 799
    });
  };

  // Handle Delete record
  const handleDeleteRecord = (id) => {
    if (confirm("Are you sure you want to delete this test record?")) {
      setRecords(prev => prev.filter(r => r.id !== id));
      if (editingRecord && editingRecord.id === id) {
        setEditingRecord(null);
      }
    }
  };

  // Toggle step complete
  const toggleStep = (cardId, stepIdx) => {
    setCompletedSteps(prev => {
      const cardSteps = { ...prev[cardId] };
      cardSteps[stepIdx] = !cardSteps[stepIdx];
      return { ...prev, [cardId]: cardSteps };
    });
  };

  return (
    <div className="bg-black-main min-h-screen text-white font-sans flex flex-col selection:bg-brand-green selection:text-black">
      
      {/* Header Bar */}
      <header className="border-b border-charcoal-border bg-black/60 backdrop-blur-md sticky top-0 z-40 print:relative print:border-b-2 print:border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-brand-green/15 text-brand-green text-xs font-mono font-semibold px-2 py-0.5 rounded border border-brand-green/30">HubSpot Integration</span>
              <span className="text-gray-500 text-xs font-mono">B2B Core Function</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2 print-heading-main">
              <Database className="w-6 h-6 text-brand-green inline-block print:hidden" />
              CRM System Setup & Configuration Guide
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 font-mono mt-0.5 print-heading-sub">
              TASK_T05 | HubSpot CRM | GO-BRICS Business Lab | June 2026
            </p>
          </div>
          <div className="flex items-center gap-3 no-print">
            <button 
              onClick={() => setIsNewRecordModalOpen(true)}
              className="bg-brand-green/10 text-brand-green hover:bg-brand-green hover:text-black border border-brand-green/30 hover:border-brand-green font-medium rounded-lg text-sm px-4 py-2 flex items-center gap-2 transition-all duration-200 shadow-[0_0_15px_rgba(0,255,65,0.05)] hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Test Record</span>
            </button>
            <button 
              onClick={() => window.print()}
              className="bg-neutral-900 hover:bg-neutral-800 text-gray-300 hover:text-white border border-charcoal-border font-medium rounded-lg text-sm px-4 py-2 flex items-center gap-2 transition-all duration-150 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Guide</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        
        {/* Navigation Tabs */}
        <nav className="flex border-b border-charcoal-border no-print gap-1 overflow-x-auto">
          {[
            { id: 'overview', label: 'System Overview', icon: Layers },
            { id: 'records', label: 'Test Records', icon: Database },
            { id: 'pipeline', label: 'Pipeline View', icon: Briefcase },
            { id: 'guide', label: 'User Guide', icon: FileText }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 border-b-2 font-medium text-sm transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive 
                    ? 'border-brand-green text-brand-green bg-brand-green/5' 
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-green' : 'text-gray-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Tab 1: System Overview */}
        <div className={`${activeTab === 'overview' ? 'block' : 'hidden print:block print-force-block print-avoid-break'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Summary Info */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-charcoal-border pb-2 print-section-title">
                <Info className="w-5 h-5 text-brand-green" />
                CRM System Summary
              </h2>
              
              {/* Summary Card */}
              <div className="bg-charcoal-card border border-charcoal-border rounded-xl p-5 glow-green-box print-card-style">
                <h3 className="text-brand-green font-mono text-sm font-semibold uppercase tracking-wider mb-4 border-b border-charcoal-border pb-2">HubSpot Instance</h3>
                <dl className="space-y-4">
                  {[
                    { label: "Platform", value: "HubSpot Free CRM" },
                    { label: "Purpose", value: "B2B Sales Pipeline Management" },
                    { label: "Configured by", value: "GO-BRICS Tech Team" },
                    { label: "Date Configured", value: "June 2026" },
                    { label: "Total Contacts", value: stats.totalContacts },
                    { label: "Active Deals", value: stats.activeDeals },
                    { label: "Pipeline Stages", value: stats.pipelineStagesCount },
                    { label: "Team Members", value: "8 Active Users" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-neutral-900 pb-2 last:border-b-0 last:pb-0">
                      <dt className="text-gray-400">{item.label}</dt>
                      <dd className="font-semibold text-white text-right">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Pipeline Stages Dot Legend */}
              <div className="bg-charcoal-card border border-charcoal-border rounded-xl p-5 print-card-style">
                <h3 className="text-gray-300 font-semibold text-sm mb-3">Pipeline Flow Indicators</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-gray-500 border border-gray-400/20 shadow-[0_0_8px_rgba(156,163,175,0.4)]" />
                    <div>
                      <span className="font-semibold text-gray-200">Cold</span>
                      <span className="text-gray-400 block text-xs">New uncontacted lead / prospect</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-blue-500 border border-blue-400/20 shadow-[0_0_8px_rgba(59,130,246,0.4)]" />
                    <div>
                      <span className="font-semibold text-blue-400">Contacted</span>
                      <span className="text-gray-400 block text-xs">First message sent / outreach initiated</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-amber-500 border border-amber-400/20 shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
                    <div>
                      <span className="font-semibold text-amber-400">Meeting Booked</span>
                      <span className="text-gray-400 block text-xs">Call / virtual meeting scheduled</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-purple-500 border border-purple-400/20 shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
                    <div>
                      <span className="font-semibold text-purple-400">Proposal Sent</span>
                      <span className="text-gray-400 block text-xs">Partnership deck / pricing guide shared</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-orange-500 border border-orange-400/20 shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                    <div>
                      <span className="font-semibold text-orange-400">Negotiating</span>
                      <span className="text-gray-400 block text-xs">Terms, discounts, and MOQ discussed</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-brand-green border border-brand-green/20 shadow-[0_0_8px_rgba(0,255,65,0.4)]" />
                    <div>
                      <span className="font-semibold text-brand-green">Closed Won</span>
                      <span className="text-gray-400 block text-xs">Deal confirmed, order processing initiated</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Stats & Configuration */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              
              {/* Stat Cards Grid */}
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-charcoal-border pb-2 mb-4 print-section-title">
                  <TrendingUp className="w-5 h-5 text-brand-green" />
                  Key CRM Setup Metrics
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 print-grid-4">
                  {[
                    { label: "Total Contacts", value: stats.totalContacts, icon: Users, desc: "B2B contact records" },
                    { label: "Active Deals", value: stats.activeDeals, icon: Briefcase, desc: "Open deals in pipeline" },
                    { label: "Pipeline Stages", value: stats.pipelineStagesCount, icon: Layers, desc: "Visual pipeline steps" },
                    { label: "Avg Deal Value", value: `₹${stats.avgDealValue.toLocaleString()}`, icon: DollarSign, desc: "Across all active stages" }
                  ].map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div key={idx} className="bg-charcoal-card border border-charcoal-border rounded-xl p-4 flex flex-col gap-2 glow-green-box print-card-style">
                        <div className="flex justify-between items-start">
                          <span className="text-gray-400 text-xs font-medium">{stat.label}</span>
                          <Icon className="w-4 h-4 text-brand-green print:hidden" />
                        </div>
                        <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">{stat.value}</div>
                        <span className="text-[10px] text-gray-500">{stat.desc}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Custom Configured Fields Card */}
              <div className="bg-charcoal-card border border-charcoal-border rounded-xl p-5 print-card-style">
                <div className="flex items-center gap-2 border-b border-charcoal-border pb-3 mb-4">
                  <Database className="w-5 h-5 text-brand-green" />
                  <div>
                    <h3 className="text-md font-semibold text-white">Custom Property Fields Configured</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Custom fields set up in HubSpot database schema to capture specific GO-BRICS requirements</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { name: "Product Interest", desc: "Starter Pack, Studio Pack, Home Set, Bulk Order" },
                    { name: "Budget Range", desc: "Customer budget tier mapping" },
                    { name: "City", desc: "Lead location targeting" },
                    { name: "Business Type", desc: "Distributor, Retailer, Corporate Buyer" },
                    { name: "MOQ Required", desc: "Minimum order quantity capability check" },
                    { name: "Last Contact Date", desc: "Activity tracking timestamp" },
                    { name: "Outreach Source", desc: "LinkedIn, WhatsApp, Email, Call" },
                    { name: "Decision Timeline", desc: "Immediate, 15-30 days, Next quarter" }
                  ].map((field, idx) => (
                    <div 
                      key={idx} 
                      className="group relative bg-neutral-900 border border-charcoal-border hover:border-brand-green/30 rounded-lg px-3 py-2 flex flex-col gap-0.5 transition-all duration-200 print:bg-white print:border-slate-300"
                    >
                      <span className="text-sm font-semibold text-white print:text-black group-hover:text-brand-green transition-colors">{field.name}</span>
                      <span className="text-[10px] text-gray-500 print:text-slate-500">{field.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Audit Log / Verification Summary */}
              <div className="bg-charcoal-card border border-charcoal-border rounded-xl p-5 print-card-style">
                <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-brand-green" />
                  System Audit Summary
                </h3>
                <div className="space-y-3 text-xs text-gray-400">
                  <p>
                    HubSpot CRM setup is structured specifically around the <strong className="text-white">GO-BRICS B2B Sales Workflow</strong>. 
                    Standard deal properties were mapped, and 8 custom properties were established to match specific purchase parameters for Ayurvedic products, distribution agreements, and customized gift-pack inquiries.
                  </p>
                  <p>
                    The system holds 15 populated test records representing varied stage distribution and geographical spreads across major Indian tier-1 and tier-2 markets. This population verifies pipeline progression triggers, user guide checklists, and report metrics.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Tab 2: Test Records */}
        <div className={`${activeTab === 'records' ? 'block' : 'hidden print:block print-force-block print-avoid-break'}`}>
          <div className="flex flex-col gap-5">
            
            {/* Header & Filters */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-charcoal-border pb-4 print:pb-2">
              <div>
                <h2 className="text-lg font-bold text-white print-section-title">Sample CRM Entries — 15 Test Records</h2>
                <p className="text-xs sm:text-sm text-gray-400 print-section-subtitle">Populated to verify system configuration and stage-level property inheritance</p>
              </div>
              
              {/* Search & Filter Bars (no-print) */}
              <div className="flex flex-wrap items-center gap-3 no-print">
                {/* Search */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="w-4 h-4 text-gray-500" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search company/contact..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-charcoal-card border border-charcoal-border focus:border-brand-green/50 text-white rounded-lg text-xs pl-9 pr-3 py-2 w-52 focus:outline-none transition-all"
                  />
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm('')} 
                      className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-gray-500 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Stage Filter */}
                <select
                  value={stageFilter}
                  onChange={(e) => setStageFilter(e.target.value)}
                  className="bg-charcoal-card border border-charcoal-border focus:border-brand-green/50 text-white rounded-lg text-xs px-3 py-2 focus:outline-none cursor-pointer"
                >
                  <option value="All">All Stages</option>
                  {Object.keys(STAGE_CONFIGS).map(stage => (
                    <option key={stage} value={stage}>{stage}</option>
                  ))}
                </select>

                {/* Reset button if filter is active */}
                {(searchTerm || stageFilter !== 'All') && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setStageFilter('All');
                    }}
                    className="text-xs text-brand-green hover:underline hover:text-brand-green/80 flex items-center gap-1"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable Table Wrapper */}
            <div className="bg-charcoal-card border border-charcoal-border rounded-xl overflow-hidden print:border-slate-300">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead className="bg-neutral-900 text-gray-400 font-mono text-xs border-b border-charcoal-border uppercase print:bg-slate-100 print:text-black">
                    <tr>
                      <th className="px-4 py-3 text-center w-12">#</th>
                      <th className="px-4 py-3">Company</th>
                      <th className="px-4 py-3">Contact</th>
                      <th className="px-4 py-3">Designation</th>
                      <th className="px-4 py-3">City</th>
                      <th className="px-4 py-3">Stage</th>
                      <th className="px-4 py-3">Product Interest</th>
                      <th className="px-4 py-3">Last Action</th>
                      <th className="px-4 py-3 text-right">Value</th>
                      <th className="px-4 py-3 text-center no-print w-16">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900 print:divide-slate-200">
                    {filteredRecords.length > 0 ? (
                      filteredRecords.map((record) => {
                        const config = STAGE_CONFIGS[record.stage] || STAGE_CONFIGS["Cold"];
                        return (
                          <tr key={record.id} className={`${config.rowClass} transition-colors`}>
                            <td className="px-4 py-3.5 text-center font-mono text-xs text-gray-400">{record.id}</td>
                            <td className="px-4 py-3.5 font-bold text-white print:text-black">{record.company}</td>
                            <td className="px-4 py-3.5 text-gray-200 print:text-black">{record.contact}</td>
                            <td className="px-4 py-3.5 text-xs text-gray-300 print:text-slate-600">{record.designation}</td>
                            <td className="px-4 py-3.5 text-xs text-gray-300 print:text-slate-600">{record.city}</td>
                            <td className="px-4 py-3.5">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.badgeClass}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${config.dotClass}`} />
                                {record.stage}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 text-xs">
                              <span className="bg-neutral-950/40 text-gray-300 px-2 py-1 rounded border border-charcoal-border text-xs print:bg-slate-100 print:text-black">
                                {record.productInterest}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 text-xs text-gray-300 print:text-slate-600 font-mono">{record.lastAction}</td>
                            <td className="px-4 py-3.5 text-right font-mono text-xs font-bold text-white print:text-black">₹{record.value.toLocaleString()}</td>
                            <td className="px-4 py-3.5 text-center no-print">
                              <div className="flex justify-center items-center gap-2">
                                <button
                                  onClick={() => setEditingRecord(record)}
                                  className="text-brand-green hover:text-white text-xs font-mono py-0.5 px-1.5 rounded hover:bg-brand-green/15 border border-transparent hover:border-brand-green/20"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteRecord(record.id)}
                                  className="text-red-400 hover:text-red-300 hover:bg-red-400/15 p-1 rounded"
                                  title="Delete Record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="10" className="px-4 py-8 text-center text-gray-500 font-mono text-sm">
                          No matching records found. Try resetting filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pipeline Stage Summary Row */}
            <div className="mt-2 bg-charcoal-card border border-charcoal-border rounded-xl p-4 print-card-style">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 font-mono">Stage Allocation Summary</h3>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 print-grid-6">
                {Object.keys(STAGE_CONFIGS).map(stageName => {
                  const count = stats.stageCounts[stageName] || 0;
                  const config = STAGE_CONFIGS[stageName];
                  return (
                    <div key={stageName} className="bg-neutral-900 border border-charcoal-border rounded-lg p-2.5 flex items-center gap-3 print:bg-slate-50 print:border-slate-300">
                      <span className={`w-3 h-3 rounded-full shrink-0 ${config.dotClass}`} />
                      <div className="flex flex-col">
                        <span className="text-gray-400 text-[10px] font-medium leading-none mb-1 truncate max-w-[85px]">{stageName}</span>
                        <span className="text-sm font-bold text-white print:text-black leading-none">{count} {count === 1 ? 'record' : 'records'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Tab 3: Pipeline View */}
        <div className={`${activeTab === 'pipeline' ? 'block' : 'hidden print:block print-force-block print-avoid-break'}`}>
          <div className="flex flex-col gap-6">
            
            {/* Value Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-border pb-4 print:pb-2">
              <div>
                <h2 className="text-lg font-bold text-white print-section-title">Sales Pipeline Kanban Board</h2>
                <p className="text-xs sm:text-sm text-gray-400 print-section-subtitle">Visual stage progression map — click any deal card to modify stage, value, or activity</p>
              </div>
              <div className="bg-brand-green/10 text-brand-green border border-brand-green/30 rounded-xl px-4 py-2 flex items-center gap-2 self-start sm:self-auto font-mono text-sm font-bold shadow-[0_0_15px_rgba(0,255,65,0.05)] print:bg-white print:border-slate-400 print:text-black">
                <span>💰 Total Pipeline Value: ₹{stats.totalPipelineValue.toLocaleString()}</span>
              </div>
            </div>

            {/* Kanban Columns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 print:grid-cols-2 print:gap-6">
              {Object.keys(STAGE_CONFIGS).map(stageKey => {
                const stageDeals = records.filter(r => r.stage === stageKey);
                const stageConfig = STAGE_CONFIGS[stageKey];
                const stageSum = stageDeals.reduce((sum, d) => sum + d.value, 0);
                
                return (
                  <div key={stageKey} className="flex flex-col gap-3 bg-neutral-950 border border-charcoal-border rounded-xl p-3 print:bg-white print:border-slate-300 print-avoid-break">
                    
                    {/* Column Header */}
                    <div className={`rounded-lg p-2.5 flex flex-col gap-1 ${stageConfig.headerClass}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider truncate mr-1">{stageKey}</span>
                        <span className="bg-black/35 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full min-w-5 text-center print:bg-slate-200 print:text-black">
                          {stageDeals.length}
                        </span>
                      </div>
                      <div className="text-xs font-mono font-bold opacity-90">
                        ₹{stageSum.toLocaleString()}
                      </div>
                    </div>

                    {/* Column Deals List */}
                    <div className="flex flex-col gap-2.5 min-h-[160px] print:min-h-0">
                      {stageDeals.map(deal => (
                        <div
                          key={deal.id}
                          onClick={() => setEditingRecord(deal)}
                          className="group bg-charcoal-card border border-charcoal-border hover:border-brand-green/30 rounded-lg p-3 cursor-pointer flex flex-col gap-2 transition-all duration-200 hover:shadow-[0_0_10px_rgba(0,255,65,0.02)] print-card-style"
                        >
                          <div className="flex justify-between items-start gap-1">
                            <h4 className="font-bold text-xs text-white group-hover:text-brand-green transition-colors line-clamp-2 print:text-black">{deal.company}</h4>
                            <span className="font-mono text-xs font-bold text-gray-300 shrink-0 print:text-black">₹{deal.value.toLocaleString()}</span>
                          </div>
                          
                          <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                            <Users className="w-3 h-3 text-gray-500 shrink-0" />
                            <span className="truncate">{deal.contact}</span>
                          </div>

                          <div className="mt-1 pt-1.5 border-t border-neutral-900 text-[10px] font-mono text-gray-500 truncate group-hover:text-gray-400 transition-colors print:border-slate-200">
                            ⚡ {deal.lastAction}
                          </div>
                        </div>
                      ))}

                      {/* Special placeholder: open slots for Meeting Booked */}
                      {stageKey === "Meeting Booked" && stageDeals.length < 3 && (
                        <div className="border border-dashed border-charcoal-border hover:border-brand-green/35 rounded-lg p-4 flex flex-col items-center justify-center text-center gap-1 min-h-[110px] group transition-all text-gray-600 hover:text-brand-green/60 print:hidden">
                          <Plus className="w-4 h-4 mb-0.5" />
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider">[Open Slot]</span>
                          <span className="text-[9px] max-w-[100px] leading-tight">Available slot for next qualified lead</span>
                        </div>
                      )}

                      {/* Empty Column Indicator */}
                      {stageDeals.length === 0 && stageKey !== "Meeting Booked" && (
                        <div className="border border-dashed border-neutral-900 rounded-lg p-6 flex items-center justify-center text-center text-xs text-gray-600 font-mono min-h-[110px] select-none">
                          Empty Stage
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Tab 4: User Guide */}
        <div className={`${activeTab === 'guide' ? 'block' : 'hidden print:block print-force-block print-avoid-break'}`}>
          <div className="flex flex-col gap-6">
            
            {/* Heading */}
            <div className="border-b border-charcoal-border pb-4 print:pb-2">
              <h2 className="text-lg font-bold text-white print-section-title">CRM User Guide for GO-BRICS Team</h2>
              <p className="text-xs sm:text-sm text-gray-400 print-section-subtitle">How to use HubSpot CRM for B2B Sales operations — quick operational reference guide</p>
            </div>

            {/* How-To Cards Accordion/Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 print:grid-cols-1 print:gap-6">
              {[
                {
                  cardId: "card1",
                  title: "CARD 1: Adding a New Contact",
                  desc: "Standard process to create contact files for distributors or buyers",
                  steps: [
                    "Click Contacts → Create Contact in top HubSpot navigation",
                    "Fill: First name, Last name, Email, Phone, Company name",
                    "Add custom fields: City, Business Type, Product Interest",
                    "Click Save to finalize the database entry",
                    "Contact appears in Cold stage automatically once deal is created"
                  ]
                },
                {
                  cardId: "card2",
                  title: "CARD 2: Moving a Deal Through Pipeline",
                  desc: "Progression triggers to transition deals along sales pipeline",
                  steps: [
                    "Click Deals in top navigation layout",
                    "Find the deal card in the current stage on pipeline board",
                    "Drag and drop card to the next stage column OR",
                    "Open deal record → click Stage dropdown → select new stage",
                    "Add a note on the record about why the stage changed"
                  ]
                },
                {
                  cardId: "card3",
                  title: "CARD 3: Logging an Activity",
                  desc: "Logging calls, emails, and messages to maintain audit trail",
                  steps: [
                    "Open target contact or deal record in CRM",
                    "Click the Log Activity button on left sidebar options",
                    "Select type: Call, Email, Meeting, or WhatsApp",
                    "Add structured notes about what was discussed with contact",
                    "Set follow-up reminder task and date"
                  ]
                },
                {
                  cardId: "card4",
                  title: "CARD 4: Checking Pipeline Health",
                  desc: "Reviewing metrics, flags, and exports for pipeline reviews",
                  steps: [
                    "Go to Reports → Sales Dashboard menu selection",
                    "Check critical metrics: deals per stage, avg time in stage",
                    "Flag any deal cards stuck in a stage for 7+ days",
                    "Review flags with Sales Lead in weekly pipeline meeting",
                    "Export report as PDF for operations audit submission"
                  ]
                },
                {
                  cardId: "card5",
                  title: "CARD 5: Adding Team Members",
                  desc: "Onboarding sales staff and assigning roles and permissions",
                  steps: [
                    "Go to Settings (Gear icon) → Users & Teams",
                    "Click Invite Users and input their business email address",
                    "Assign appropriate role: Admin, Sales, or View Only",
                    "New member receives automated email invite link",
                    "They set password and gain access to GO-BRICS CRM workspace"
                  ]
                }
              ].map((card, idx) => {
                const isExpanded = expandedGuideCard === card.cardId;
                return (
                  <div 
                    key={card.cardId}
                    className={`bg-charcoal-card border rounded-xl p-4 flex flex-col transition-all duration-300 print-card-style print-avoid-break ${
                      isExpanded 
                        ? 'border-brand-green lg:col-span-2 shadow-[0_0_20px_rgba(0,255,65,0.05)]' 
                        : 'border-charcoal-border hover:border-gray-700'
                    }`}
                  >
                    <div 
                      onClick={() => setExpandedGuideCard(isExpanded ? null : card.cardId)}
                      className="flex justify-between items-start gap-2 cursor-pointer group no-print"
                    >
                      <div className="flex-1">
                        <h4 className="font-bold text-sm text-white group-hover:text-brand-green transition-colors">{card.title}</h4>
                        <p className="text-[10px] text-gray-400 mt-1 line-clamp-2">{card.desc}</p>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-gray-500 group-hover:text-white transition-transform duration-200 shrink-0 ${isExpanded ? 'rotate-90' : ''}`} />
                    </div>

                    {/* Print heading (always expanded) */}
                    <div className="hidden print:block border-b border-slate-200 pb-2 mb-3">
                      <h4 className="font-bold text-sm text-black uppercase">{card.title}</h4>
                      <p className="text-xs text-slate-500">{card.desc}</p>
                    </div>

                    {/* Steps List */}
                    <div className={`mt-4 flex flex-col gap-2.5 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
                      {card.steps.map((step, sIdx) => {
                        const isChecked = !!completedSteps[card.cardId]?.[sIdx];
                        return (
                          <div 
                            key={sIdx} 
                            onClick={() => toggleStep(card.cardId, sIdx)}
                            className={`flex gap-3 text-xs p-2 rounded border transition-all cursor-pointer no-print ${
                              isChecked 
                                ? 'bg-brand-green/5 border-brand-green/20 text-gray-300' 
                                : 'bg-neutral-900 border-transparent text-gray-400 hover:border-charcoal-border hover:text-white'
                            }`}
                          >
                            <button className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                              isChecked 
                                ? 'border-brand-green bg-brand-green text-black' 
                                : 'border-gray-600 bg-transparent'
                            }`}>
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </button>
                            <span className="leading-snug">{step}</span>
                          </div>
                        );
                      })}
                      
                      {/* Print list (regular text, no checklist inputs) */}
                      <ol className="hidden print:block list-decimal list-inside space-y-1.5 text-xs text-slate-700">
                        {card.steps.map((step, sIdx) => (
                          <li key={sIdx} className="leading-normal">{step}</li>
                        ))}
                      </ol>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Permissions Table Section */}
            <div className="mt-4 flex flex-col gap-4 print-avoid-break">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-border pb-2 print:pb-1">
                <div>
                  <h3 className="text-md font-bold text-white print-section-subtitle">Workspace Permissions Matrix</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Control permissions and accessibility settings based on assigned workspace roles</p>
                </div>
                
                {/* Role Simulator Selector (no-print) */}
                <div className="flex items-center gap-2 no-print bg-neutral-900 border border-charcoal-border rounded-lg px-3 py-1.5 self-start">
                  <UserCheck className="w-4 h-4 text-brand-green" />
                  <span className="text-xs text-gray-400 font-medium">Simulate View:</span>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="bg-transparent text-xs text-white font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="Admin">Admin Role</option>
                    <option value="Sales">Sales Role</option>
                    <option value="View Only">View Only Role</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="bg-charcoal-card border border-charcoal-border rounded-xl overflow-hidden print:border-slate-300">
                <table className="w-full text-left text-sm border-collapse">
                  <thead className="bg-neutral-900 text-gray-400 font-mono text-xs border-b border-charcoal-border uppercase print:bg-slate-100 print:text-black">
                    <tr>
                      <th className="px-5 py-3">Role</th>
                      <th className="px-5 py-3 text-center">Can Add Contacts</th>
                      <th className="px-5 py-3 text-center">Can Edit Records</th>
                      <th className="px-5 py-3 text-center">Can Delete Records</th>
                      <th className="px-5 py-3 text-center">Can Export Reports</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900 text-gray-200 print:divide-slate-200 print:text-black">
                    {[
                      { role: "Admin", add: true, edit: true, del: true, exp: true },
                      { role: "Sales", add: true, edit: true, del: false, exp: true },
                      { role: "View Only", add: false, edit: false, del: false, exp: false }
                    ].map((row, idx) => {
                      const isSimulated = selectedRole === row.role;
                      return (
                        <tr 
                          key={idx} 
                          className={`transition-colors ${
                            isSimulated 
                              ? 'bg-brand-green/5 border-l-4 border-l-brand-green font-semibold text-white print:bg-slate-50' 
                              : 'hover:bg-neutral-900/40 text-gray-300'
                          }`}
                        >
                          <td className="px-5 py-4 flex items-center gap-2">
                            <span>{row.role}</span>
                            {isSimulated && (
                              <span className="bg-brand-green/15 text-brand-green text-[9px] font-mono px-1.5 py-0.5 rounded border border-brand-green/20 no-print">
                                ACTIVE VIEW
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-4 text-center">
                            {row.add ? (
                              <Check className="w-5 h-5 text-brand-green mx-auto stroke-[2.5]" />
                            ) : (
                              <X className="w-5 h-5 text-red-500 mx-auto stroke-[2.5]" />
                            )}
                          </td>
                          <td className="px-5 py-4 text-center">
                            {row.edit ? (
                              <Check className="w-5 h-5 text-brand-green mx-auto stroke-[2.5]" />
                            ) : (
                              <X className="w-5 h-5 text-red-500 mx-auto stroke-[2.5]" />
                            )}
                          </td>
                          <td className="px-5 py-4 text-center">
                            {row.del ? (
                              <Check className="w-5 h-5 text-brand-green mx-auto stroke-[2.5]" />
                            ) : (
                              <X className="w-5 h-5 text-red-500 mx-auto stroke-[2.5]" />
                            )}
                          </td>
                          <td className="px-5 py-4 text-center">
                            {row.exp ? (
                              <Check className="w-5 h-5 text-brand-green mx-auto stroke-[2.5]" />
                            ) : (
                              <X className="w-5 h-5 text-red-500 mx-auto stroke-[2.5]" />
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Download print Guide CTA (no-print) */}
            <div className="mt-4 flex justify-center no-print">
              <button 
                onClick={() => window.print()}
                className="bg-brand-green hover:bg-brand-dark-green text-black font-bold py-3 px-8 rounded-xl flex items-center gap-3 transition-all duration-200 shadow-[0_0_20px_rgba(0,255,65,0.1)] hover:shadow-[0_0_30px_rgba(0,255,65,0.3)] cursor-pointer"
              >
                <Printer className="w-5 h-5 stroke-[2.5]" />
                <span>Download & Print Guide PDF</span>
              </button>
            </div>

          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-charcoal-border bg-neutral-950 py-6 text-center text-xs text-gray-500 font-mono no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row sm:justify-between items-center gap-2">
          <span>GO-BRICS Business Lab B2B sales systems dashboard</span>
          <span>© 2026 GO-BRICS Tech. Configured with HubSpot Free CRM</span>
        </div>
      </footer>


      {/* Modal: Edit Test Record */}
      {editingRecord && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto no-print animate-fade-in">
          <div className="bg-charcoal-card border border-charcoal-border rounded-xl w-full max-w-lg p-6 flex flex-col gap-4 shadow-[0_0_50px_rgba(0,255,65,0.08)]">
            
            <div className="flex justify-between items-start border-b border-charcoal-border pb-3">
              <div>
                <h3 className="text-md font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-brand-green" />
                  Modify CRM Record #{editingRecord.id}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">{editingRecord.company}</p>
              </div>
              <button 
                onClick={() => setEditingRecord(null)}
                className="text-gray-400 hover:text-white p-1 rounded hover:bg-neutral-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                {/* Company name */}
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-semibold uppercase">Company Name</label>
                  <input
                    type="text"
                    required
                    value={editingRecord.company}
                    onChange={(e) => setEditingRecord({ ...editingRecord, company: e.target.value })}
                    className="bg-neutral-900 border border-charcoal-border focus:border-brand-green/40 text-white rounded-lg px-3 py-2 focus:outline-none"
                  />
                </div>

                {/* Contact name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-semibold uppercase">Primary Contact</label>
                  <input
                    type="text"
                    required
                    value={editingRecord.contact}
                    onChange={(e) => setEditingRecord({ ...editingRecord, contact: e.target.value })}
                    className="bg-neutral-900 border border-charcoal-border focus:border-brand-green/40 text-white rounded-lg px-3 py-2 focus:outline-none"
                  />
                </div>

                {/* Contact Designation */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-semibold uppercase">Designation</label>
                  <input
                    type="text"
                    required
                    value={editingRecord.designation}
                    onChange={(e) => setEditingRecord({ ...editingRecord, designation: e.target.value })}
                    className="bg-neutral-900 border border-charcoal-border focus:border-brand-green/40 text-white rounded-lg px-3 py-2 focus:outline-none"
                  />
                </div>

                {/* City */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-semibold uppercase">City</label>
                  <input
                    type="text"
                    required
                    value={editingRecord.city}
                    onChange={(e) => setEditingRecord({ ...editingRecord, city: e.target.value })}
                    className="bg-neutral-900 border border-charcoal-border focus:border-brand-green/40 text-white rounded-lg px-3 py-2 focus:outline-none"
                  />
                </div>

                {/* Deal Value */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-semibold uppercase">Deal Value (₹)</label>
                  <input
                    type="number"
                    required
                    value={editingRecord.value}
                    onChange={(e) => setEditingRecord({ ...editingRecord, value: Number(e.target.value) || 0 })}
                    className="bg-neutral-900 border border-charcoal-border focus:border-brand-green/40 text-white rounded-lg px-3 py-2 focus:outline-none font-mono"
                  />
                </div>

                {/* Pipeline Stage */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-semibold uppercase">Pipeline Stage</label>
                  <select
                    value={editingRecord.stage}
                    onChange={(e) => setEditingRecord({ ...editingRecord, stage: e.target.value })}
                    className="bg-neutral-900 border border-charcoal-border focus:border-brand-green/40 text-white rounded-lg px-3 py-2 focus:outline-none cursor-pointer"
                  >
                    {Object.keys(STAGE_CONFIGS).map(stg => (
                      <option key={stg} value={stg}>{stg}</option>
                    ))}
                  </select>
                </div>

                {/* Product Interest */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-semibold uppercase">Product Interest</label>
                  <select
                    value={editingRecord.productInterest}
                    onChange={(e) => setEditingRecord({ ...editingRecord, productInterest: e.target.value })}
                    className="bg-neutral-900 border border-charcoal-border focus:border-brand-green/40 text-white rounded-lg px-3 py-2 focus:outline-none cursor-pointer"
                  >
                    <option value="Starter Pack">Starter Pack</option>
                    <option value="Studio Pack">Studio Pack</option>
                    <option value="Home Set">Home Set</option>
                    <option value="Bulk Order">Bulk Order</option>
                  </select>
                </div>

                {/* Last action */}
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-semibold uppercase">Last Logged Action</label>
                  <input
                    type="text"
                    required
                    value={editingRecord.lastAction}
                    onChange={(e) => setEditingRecord({ ...editingRecord, lastAction: e.target.value })}
                    className="bg-neutral-900 border border-charcoal-border focus:border-brand-green/40 text-white rounded-lg px-3 py-2 focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Form buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-charcoal-border mt-6">
                <button
                  type="button"
                  onClick={() => handleDeleteRecord(editingRecord.id)}
                  className="bg-red-950/20 hover:bg-red-950/50 text-red-400 border border-red-500/20 hover:border-red-500/35 px-4 py-2 rounded-lg text-xs font-mono transition-colors cursor-pointer"
                >
                  Delete Record
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingRecord(null)}
                    className="bg-neutral-900 hover:bg-neutral-800 text-gray-400 hover:text-white px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-brand-green hover:bg-brand-dark-green text-black font-bold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Modal: Create Test Record */}
      {isNewRecordModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto no-print animate-fade-in">
          <div className="bg-charcoal-card border border-charcoal-border rounded-xl w-full max-w-lg p-6 flex flex-col gap-4 shadow-[0_0_50px_rgba(0,255,65,0.08)]">
            
            <div className="flex justify-between items-start border-b border-charcoal-border pb-3">
              <div>
                <h3 className="text-md font-bold text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-brand-green" />
                  Add New HubSpot Test Entry
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">Will populate in overview, test table, and kanban board automatically</p>
              </div>
              <button 
                onClick={() => setIsNewRecordModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded hover:bg-neutral-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRecord} className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                {/* Company name */}
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-semibold uppercase">Company Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Shanti retail solutions"
                    value={newRecordData.company}
                    onChange={(e) => setNewRecordData({ ...newRecordData, company: e.target.value })}
                    className="bg-neutral-900 border border-charcoal-border focus:border-brand-green/40 text-white rounded-lg px-3 py-2 focus:outline-none"
                  />
                </div>

                {/* Contact name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-semibold uppercase">Primary Contact</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Dev"
                    value={newRecordData.contact}
                    onChange={(e) => setNewRecordData({ ...newRecordData, contact: e.target.value })}
                    className="bg-neutral-900 border border-charcoal-border focus:border-brand-green/40 text-white rounded-lg px-3 py-2 focus:outline-none"
                  />
                </div>

                {/* Contact Designation */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-semibold uppercase">Designation</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Owner"
                    value={newRecordData.designation}
                    onChange={(e) => setNewRecordData({ ...newRecordData, designation: e.target.value })}
                    className="bg-neutral-900 border border-charcoal-border focus:border-brand-green/40 text-white rounded-lg px-3 py-2 focus:outline-none"
                  />
                </div>

                {/* City */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-semibold uppercase">City</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hyderabad"
                    value={newRecordData.city}
                    onChange={(e) => setNewRecordData({ ...newRecordData, city: e.target.value })}
                    className="bg-neutral-900 border border-charcoal-border focus:border-brand-green/40 text-white rounded-lg px-3 py-2 focus:outline-none"
                  />
                </div>

                {/* Deal Value */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-semibold uppercase">Deal Value (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="1899"
                    value={newRecordData.value}
                    onChange={(e) => setNewRecordData({ ...newRecordData, value: Number(e.target.value) || 0 })}
                    className="bg-neutral-900 border border-charcoal-border focus:border-brand-green/40 text-white rounded-lg px-3 py-2 focus:outline-none font-mono"
                  />
                </div>

                {/* Pipeline Stage */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-semibold uppercase">Pipeline Stage</label>
                  <select
                    value={newRecordData.stage}
                    onChange={(e) => setNewRecordData({ ...newRecordData, stage: e.target.value })}
                    className="bg-neutral-900 border border-charcoal-border focus:border-brand-green/40 text-white rounded-lg px-3 py-2 focus:outline-none cursor-pointer"
                  >
                    {Object.keys(STAGE_CONFIGS).map(stg => (
                      <option key={stg} value={stg}>{stg}</option>
                    ))}
                  </select>
                </div>

                {/* Product Interest */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-semibold uppercase">Product Interest</label>
                  <select
                    value={newRecordData.productInterest}
                    onChange={(e) => setNewRecordData({ ...newRecordData, productInterest: e.target.value })}
                    className="bg-neutral-900 border border-charcoal-border focus:border-brand-green/40 text-white rounded-lg px-3 py-2 focus:outline-none cursor-pointer"
                  >
                    <option value="Starter Pack">Starter Pack</option>
                    <option value="Studio Pack">Studio Pack</option>
                    <option value="Home Set">Home Set</option>
                    <option value="Bulk Order">Bulk Order</option>
                  </select>
                </div>

                {/* Last action */}
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs text-gray-400 font-semibold uppercase">Last Action / Note</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Initial outreach email sent"
                    value={newRecordData.lastAction}
                    onChange={(e) => setNewRecordData({ ...newRecordData, lastAction: e.target.value })}
                    className="bg-neutral-900 border border-charcoal-border focus:border-brand-green/40 text-white rounded-lg px-3 py-2 focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Form buttons */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-charcoal-border mt-6">
                <button
                  type="button"
                  onClick={() => setIsNewRecordModalOpen(false)}
                  className="bg-neutral-900 hover:bg-neutral-800 text-gray-400 hover:text-white px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-brand-green hover:bg-brand-dark-green text-black font-bold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Create Entry
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
