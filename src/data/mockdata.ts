// ==========================================
// TYPES & INTERFACES
// ==========================================

export type ProjectStatus = 'Active' | 'Completed' | 'On Hold' | 'Archived';
export type ProjectHealth = 'Healthy' | 'At Risk' | 'Critical';

export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type TaskStatus = 'Not Started' | 'In Progress' | 'Completed' | 'Blocked' | 'Overdue';

export type ExpenseStatus = 'Pending' | 'Approved' | 'Rejected' | 'Request Changes';
export type ExpenseCategory = 'Materials' | 'Labor' | 'Equipment' | 'Transportation' | 'Utilities' | 'Permits' | 'Other';

export interface Project {
  id: string;
  code: string;
  name: string;
  category: string;
  description: string;
  location: {
    city: string;
    state: string;
    country: string;
    address: string;
  };
  startDate: string;
  expectedCompletion: string;
  totalBudget: number;
  approvedSpending: number;
  pendingExpenses: number;
  progress: number; // 0 to 100
  status: ProjectStatus;
  health: ProjectHealth;
  manager: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
  coverImage: string;
  updateApprovalRequired: boolean;
  expenseApprovalRequired: boolean;
}

export interface Milestone {
  id: string;
  projectId: string;
  name: string;
  description: string;
  startDate: string;
  targetDate: string;
  status: 'Planned' | 'In Progress' | 'Completed' | 'On Hold';
  progress: number;
}

export interface Task {
  id: string;
  projectId: string;
  projectName: string;
  milestoneId?: string;
  milestoneName?: string;
  title: string;
  description: string;
  assignee: {
    id: string;
    name: string;
    avatar: string;
  };
  priority: TaskPriority;
  status: TaskStatus;
  progress: number;
  startDate: string;
  dueDate: string;
  estimatedCost: number;
}

export interface Expense {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  description: string;
  category: ExpenseCategory;
  amount: number;
  dateSubmitted: string;
  vendor: string;
  paymentMethod: string;
  submittedBy: {
    id: string;
    name: string;
    avatar: string;
  };
  status: ExpenseStatus;
  receiptUrl: string;
  rejectionReason?: string;
}

export interface Evidence {
  id: string;
  projectId: string;
  projectName: string;
  taskId?: string;
  taskTitle?: string;
  milestoneId?: string;
  imageUrl: string;
  caption: string;
  uploadedBy: {
    id: string;
    name: string;
    avatar: string;
  };
  uploadedAt: string;
  locationTag?: string;
  fileSize: string;
}

export interface FieldUpdate {
  id: string;
  projectId: string;
  projectName: string;
  progressPercent: number;
  summary: string;
  accomplishments: string[];
  issues: string[];
  nextSteps: string[];
  evidenceIds: string[];
  submittedBy: {
    id: string;
    name: string;
    avatar: string;
  };
  submittedAt: string;
  status: 'Approved' | 'Pending Review' | 'Changes Requested';
}

export interface LocationItem {
  id: string;
  city: string;
  state: string;
  country: string;
  projectCount: number;
  activeProjects: number;
  totalBudget: number;
  healthBreakdown: {
    healthy: number;
    atRisk: number;
    critical: number;
  };
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Project Manager' | 'Field Inspector';
  avatar: string;
  status: 'Active' | 'Inactive';
  assignedProjectsCount: number;
  lastActive: string;
}

export interface ActivityLog {
  id: string;
  actor: {
    name: string;
    avatar: string;
  };
  action: string;
  target: string;
  entityType: 'Project' | 'Expense' | 'Task' | 'Evidence' | 'Update';
  projectId?: string;
  timestamp: string;
  status?: 'Completed' | 'Pending' | 'Flagged';
}

export interface CashFlowChartData {
  month: string;
  cashflow: number;
  inflow: number;
  budgetCap: number;
}


// ==========================================
// MOCK DATASETS
// ==========================================

export const MOCK_TEAM: TeamMember[] = [
  {
    id: 'usr_1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@company.com',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    status: 'Active',
    assignedProjectsCount: 5,
    lastActive: 'Just now'
  },
  {
    id: 'usr_2',
    name: 'David Okafor',
    email: 'david.o@company.com',
    role: 'Project Manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    status: 'Active',
    assignedProjectsCount: 2,
    lastActive: '12 mins ago'
  },
  {
    id: 'usr_3',
    name: 'Elena Rostova',
    email: 'elena.r@company.com',
    role: 'Project Manager',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    status: 'Active',
    assignedProjectsCount: 2,
    lastActive: '1 hour ago'
  },
  {
    id: 'usr_4',
    name: 'Marcus Vance',
    email: 'marcus.v@company.com',
    role: 'Field Inspector',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    status: 'Active',
    assignedProjectsCount: 1,
    lastActive: '3 hours ago'
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj_1',
    code: 'PRJ-2026-001',
    name: 'Victoria Island Commercial Tower',
    category: 'Commercial Construction',
    description: '14-story high-rise commercial space with subterranean parking and green energy automation.',
    location: {
      city: 'Victoria Island',
      state: 'Lagos',
      country: 'Nigeria',
      address: 'Plot 1042 Adeola Odeku Street'
    },
    startDate: '2026-01-15',
    expectedCompletion: '2027-06-30',
    totalBudget: 1250000,
    approvedSpending: 420000,
    pendingExpenses: 35000,
    progress: 42,
    status: 'Active',
    health: 'Healthy',
    manager: {
      id: 'usr_2',
      name: 'David Okafor',
      email: 'david.o@company.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    updateApprovalRequired: true,
    expenseApprovalRequired: true
  },
  {
    id: 'proj_2',
    code: 'PRJ-2026-002',
    name: 'Maitama Luxury Residential Estate',
    category: 'Residential Development',
    description: 'Exclusive gated community comprising 24 luxury smart villas with underground utility grid.',
    location: {
      city: 'Maitama',
      state: 'Abuja',
      country: 'Nigeria',
      address: 'Gana Street Extension'
    },
    startDate: '2026-02-01',
    expectedCompletion: '2026-11-15',
    totalBudget: 850000,
    approvedSpending: 610000,
    pendingExpenses: 82000,
    progress: 68,
    status: 'Active',
    health: 'At Risk',
    manager: {
      id: 'usr_3',
      name: 'Elena Rostova',
      email: 'elena.r@company.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'
    },
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    updateApprovalRequired: true,
    expenseApprovalRequired: true
  },
  {
    id: 'proj_3',
    code: 'PRJ-2026-003',
    name: 'Port Harcourt Logistics Hub',
    category: 'Industrial Logistics',
    description: '5,000 sq. meter warehousing and automated distribution node with heavy equipment access.',
    location: {
      city: 'Port Harcourt',
      state: 'Rivers',
      country: 'Nigeria',
      address: 'Trans-Amadi Industrial Layout'
    },
    startDate: '2025-09-10',
    expectedCompletion: '2026-08-30',
    totalBudget: 620000,
    approvedSpending: 590000,
    pendingExpenses: 45000,
    progress: 88,
    status: 'Active',
    health: 'Critical',
    manager: {
      id: 'usr_2',
      name: 'David Okafor',
      email: 'david.o@company.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
    updateApprovalRequired: true,
    expenseApprovalRequired: true
  },
  {
    id: 'proj_4',
    code: 'PRJ-2026-004',
    name: 'Ikeja Data Center Facility',
    category: 'Infrastructure & Tech',
    description: 'Tier-III certified data storage node featuring dual-grid redundant cooling systems.',
    location: {
      city: 'Ikeja',
      state: 'Lagos',
      country: 'Nigeria',
      address: 'Mobolaji Bank Anthony Way'
    },
    startDate: '2026-04-01',
    expectedCompletion: '2026-12-20',
    totalBudget: 2100000,
    approvedSpending: 310000,
    pendingExpenses: 12000,
    progress: 18,
    status: 'Active',
    health: 'Healthy',
    manager: {
      id: 'usr_3',
      name: 'Elena Rostova',
      email: 'elena.r@company.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'
    },
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
    updateApprovalRequired: true,
    expenseApprovalRequired: true
  }
];

export const MOCK_MILESTONES: Milestone[] = [
  {
    id: 'ms_1',
    projectId: 'proj_1',
    name: 'Foundation & Substructure',
    description: 'Piling works, subterranean excavation, and basement slab reinforcement.',
    startDate: '2026-01-15',
    targetDate: '2026-04-15',
    status: 'Completed',
    progress: 100
  },
  {
    id: 'ms_2',
    projectId: 'proj_1',
    name: 'Superstructure Framing',
    description: 'Structural steel assembly and concrete core pour up to Floor 14.',
    startDate: '2026-04-16',
    targetDate: '2026-09-30',
    status: 'In Progress',
    progress: 45
  },
  {
    id: 'ms_3',
    projectId: 'proj_2',
    name: 'Roofing & Exterior Cladding',
    description: 'Weatherproofing, luxury tiling, and external facade panel installation.',
    startDate: '2026-05-01',
    targetDate: '2026-08-15',
    status: 'In Progress',
    progress: 60
  }
];

export const MOCK_TASKS: Task[] = [
  {
    id: 'tsk_1',
    projectId: 'proj_1',
    projectName: 'Victoria Island Commercial Tower',
    milestoneId: 'ms_2',
    milestoneName: 'Superstructure Framing',
    title: 'Install Floor 6 Concrete Beams',
    description: 'Reinforce heavy load-bearing concrete pillars and inspect rebar alignment.',
    assignee: {
      id: 'usr_2',
      name: 'David Okafor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    priority: 'High',
    status: 'In Progress',
    progress: 65,
    startDate: '2026-08-01',
    dueDate: '2026-08-18',
    estimatedCost: 45000
  },
  {
    id: 'tsk_2',
    projectId: 'proj_2',
    projectName: 'Maitama Luxury Residential Estate',
    milestoneId: 'ms_3',
    milestoneName: 'Roofing & Exterior Cladding',
    title: 'Villa 10 Solar Roof Installation',
    description: 'Mount photovoltaic panel frame grids and verify electrical conduit feeds.',
    assignee: {
      id: 'usr_3',
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'
    },
    priority: 'Critical',
    status: 'Blocked',
    progress: 30,
    startDate: '2026-08-05',
    dueDate: '2026-08-14',
    estimatedCost: 28000
  },
  {
    id: 'tsk_3',
    projectId: 'proj_3',
    projectName: 'Port Harcourt Logistics Hub',
    title: 'Perimeter Security Fence Wiring',
    description: 'Deploy fiber-optic intrusion perimeter wires and test central sensor array.',
    assignee: {
      id: 'usr_4',
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
    },
    priority: 'Medium',
    status: 'Completed',
    progress: 100,
    startDate: '2026-07-20',
    dueDate: '2026-08-08',
    estimatedCost: 15000
  },
  {
    id: 'tsk_4',
    projectId: 'proj_4',
    projectName: 'Ikeja Data Center Facility',
    title: 'HVAC Ducting Duct Laying',
    description: 'Lay high-velocity chill air channels in Server Room Alpha.',
    assignee: {
      id: 'usr_3',
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'
    },
    priority: 'High',
    status: 'Overdue',
    progress: 15,
    startDate: '2026-07-25',
    dueDate: '2026-08-09',
    estimatedCost: 60000
  }
];

export const MOCK_EXPENSES: Expense[] = [
  {
    id: 'exp_101',
    projectId: 'proj_1',
    projectName: 'Victoria Island Commercial Tower',
    title: 'High-Tensile Steel Rebar Supply Batch #4',
    description: 'Purchase of 25 metric tons of 16mm deformed steel bars for Floor 7 casting.',
    category: 'Materials',
    amount: 25500,
    dateSubmitted: '2026-08-10',
    vendor: 'Lagos Industrial Metals Ltd',
    paymentMethod: 'Bank Wire Transfer',
    submittedBy: {
      id: 'usr_2',
      name: 'David Okafor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    status: 'Pending',
    receiptUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600'
  },
  {
    id: 'exp_102',
    projectId: 'proj_2',
    projectName: 'Maitama Luxury Residential Estate',
    title: 'Heavy Crane Rental (3 Days)',
    description: '50-ton hydraulic mobile crane hire for lifting roofing timber trusses.',
    category: 'Equipment',
    amount: 18200,
    dateSubmitted: '2026-08-09',
    vendor: 'Abuja Heavy Machinery Rentals',
    paymentMethod: 'Corporate Card',
    submittedBy: {
      id: 'usr_3',
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'
    },
    status: 'Pending',
    receiptUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600'
  },
  {
    id: 'exp_103',
    projectId: 'proj_3',
    projectName: 'Port Harcourt Logistics Hub',
    title: 'Site Diesel Generator Fuel Top-up',
    description: '3,000 Liters of Automotive Gas Oil (AGO) for site backup generator operations.',
    category: 'Utilities',
    amount: 9400,
    dateSubmitted: '2026-08-07',
    vendor: 'TotalEnergies Retail Depot',
    paymentMethod: 'Bank Wire Transfer',
    submittedBy: {
      id: 'usr_2',
      name: 'David Okafor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    status: 'Approved',
    receiptUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600'
  },
  {
    id: 'exp_104',
    projectId: 'proj_2',
    projectName: 'Maitama Luxury Residential Estate',
    title: 'Unplanned Subsoil Drainage Piping',
    description: 'Emergency procurement of PVC drainage conduits due to unexpected underground seepage.',
    category: 'Materials',
    amount: 14500,
    dateSubmitted: '2026-08-02',
    vendor: 'Capital Plumbing Supplies',
    paymentMethod: 'Direct Debit',
    submittedBy: {
      id: 'usr_3',
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'
    },
    status: 'Request Changes',
    receiptUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600',
    rejectionReason: 'Please attach official site engineer verification letter before re-submitting.'
  }
];

export const MOCK_EVIDENCE: Evidence[] = [
  {
    id: 'ev_1',
    projectId: 'proj_1',
    projectName: 'Victoria Island Commercial Tower',
    taskId: 'tsk_1',
    taskTitle: 'Install Floor 6 Concrete Beams',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=800',
    caption: 'Floor 6 eastern quadrant beam casting complete. Pressure inspection passed.',
    uploadedBy: {
      id: 'usr_2',
      name: 'David Okafor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    uploadedAt: '2026-08-11 08:30 AM',
    locationTag: 'Lagos, NG (6.4281° N, 3.4219° E)',
    fileSize: '3.4 MB'
  },
  {
    id: 'ev_2',
    projectId: 'proj_2',
    projectName: 'Maitama Luxury Residential Estate',
    taskId: 'tsk_2',
    taskTitle: 'Villa 10 Solar Roof Installation',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    caption: 'Roofing trusses delivered to site. Unloading blocked by supplier vehicle breakdown.',
    uploadedBy: {
      id: 'usr_3',
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'
    },
    uploadedAt: '2026-08-10 03:15 PM',
    locationTag: 'Abuja, NG (9.0765° N, 7.3986° E)',
    fileSize: '4.1 MB'
  },
  {
    id: 'ev_3',
    projectId: 'proj_3',
    projectName: 'Port Harcourt Logistics Hub',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
    caption: 'Main storage bay concrete flooring polished and cured.',
    uploadedBy: {
      id: 'usr_4',
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
    },
    uploadedAt: '2026-08-08 11:45 AM',
    locationTag: 'Port Harcourt, NG (4.8156° N, 7.0498° E)',
    fileSize: '2.8 MB'
  }
];

export const MOCK_UPDATES: FieldUpdate[] = [
  {
    id: 'upd_1',
    projectId: 'proj_1',
    projectName: 'Victoria Island Commercial Tower',
    progressPercent: 42,
    summary: 'Concrete casting on Floor 6 was completed ahead of monsoon rain forecast. Steel rebar installation for Floor 7 framework started.',
    accomplishments: [
      'Poured 120 cubic meters of high-density concrete',
      'Structural stress testing verified by structural engineer',
      'Safety netting upgraded along perimeter elevations'
    ],
    issues: [
      'Cement batch price increased by 4% due to fuel transport surcharges'
    ],
    nextSteps: [
      'Begin Floor 7 column formwork',
      'Receive electrical conduit shipment on Thursday'
    ],
    evidenceIds: ['ev_1'],
    submittedBy: {
      id: 'usr_2',
      name: 'David Okafor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    submittedAt: '2026-08-11 09:00 AM',
    status: 'Approved'
  },
  {
    id: 'upd_2',
    projectId: 'proj_2',
    projectName: 'Maitama Luxury Residential Estate',
    progressPercent: 68,
    summary: 'Villa 10-12 roofing framing paused due to transport delay from primary timber vendor.',
    accomplishments: [
      'Completed exterior waterproofing coat on Villas 1-8',
      'Underground electrical line trenching reaches 90%'
    ],
    issues: [
      'Supplier vehicle breakdown holding up solar mounting brackets'
    ],
    nextSteps: [
      'Expedite secondary logistics provider',
      'Resume roof beam alignment by Friday morning'
    ],
    evidenceIds: ['ev_2'],
    submittedBy: {
      id: 'usr_3',
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'
    },
    submittedAt: '2026-08-10 04:30 PM',
    status: 'Pending Review'
  }
];

export const MOCK_LOCATIONS: LocationItem[] = [
  {
    id: 'loc_1',
    city: 'Lagos State',
    state: 'Lagos',
    country: 'Nigeria',
    projectCount: 2,
    activeProjects: 2,
    totalBudget: 3350000,
    healthBreakdown: {
      healthy: 2,
      atRisk: 0,
      critical: 0
    }
  },
  {
    id: 'loc_2',
    city: 'Federal Capital Territory',
    state: 'Abuja',
    country: 'Nigeria',
    projectCount: 1,
    activeProjects: 1,
    totalBudget: 850000,
    healthBreakdown: {
      healthy: 0,
      atRisk: 1,
      critical: 0
    }
  },
  {
    id: 'loc_3',
    city: 'Rivers State',
    state: 'Port Harcourt',
    country: 'Nigeria',
    projectCount: 1,
    activeProjects: 1,
    totalBudget: 620000,
    healthBreakdown: {
      healthy: 0,
      atRisk: 0,
      critical: 1
    }
  }
];

export const MOCK_ACTIVITIES: ActivityLog[] = [
  {
    id: 'act_101',
    actor: {
      name: 'David Okafor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    action: 'submitted an expense claim',
    target: '$25,500 (Steel Rebar Batch #4)',
    entityType: 'Expense',
    projectId: 'proj_1',
    timestamp: '15 mins ago',
    status: 'Pending'
  },
  {
    id: 'act_102',
    actor: {
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
    },
    action: 'approved field update for',
    target: 'Victoria Island Commercial Tower',
    entityType: 'Update',
    projectId: 'proj_1',
    timestamp: '1 hour ago',
    status: 'Completed'
  },
  {
    id: 'act_103',
    actor: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'
    },
    action: 'flagged task as blocked:',
    target: 'Villa 10 Solar Roof Installation',
    entityType: 'Task',
    projectId: 'proj_2',
    timestamp: '3 hours ago',
    status: 'Flagged'
  },
  {
    id: 'act_104',
    actor: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
    },
    action: 'uploaded 2 site evidence photos to',
    target: 'Port Harcourt Logistics Hub',
    entityType: 'Evidence',
    projectId: 'proj_3',
    timestamp: 'Yesterday at 04:15 PM',
    status: 'Completed'
  }
];

export const MOCK_CASH_FLOW_DATA: CashFlowChartData[] = [
  { month: 'Jan', cashflow: 120000, inflow: 180000, budgetCap: 250000 },
  { month: 'Feb', cashflow: 195000, inflow: 210000, budgetCap: 250000 },
  { month: 'Mar', cashflow: 342323, inflow: 115000, budgetCap: 350000 },
  { month: 'Apr', cashflow: 210000, inflow: 280000, budgetCap: 300000 },
  { month: 'May', cashflow: 285000, inflow: 310000, budgetCap: 350000 },
  { month: 'Jun', cashflow: 180000, inflow: 240000, budgetCap: 300000 },
  { month: 'Jul', cashflow: 260000, inflow: 290000, budgetCap: 320000 }
];