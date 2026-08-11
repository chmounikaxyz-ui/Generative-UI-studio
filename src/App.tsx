/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DynamicUISchema, PresetTemplate, ChatMessage, ThemeConfig, TableComponentData } from './types';
import { DEMO_BURN_RATE_SCHEMA, PRESET_TEMPLATES, getPresetSchema } from './data/presets';
import { Sidebar } from './components/Sidebar';
import { PromptBar } from './components/PromptBar';
import { MetricsBar } from './components/MetricsBar';
import { ComponentRenderer } from './components/ComponentRenderer';
import { SchemaInspectorModal } from './components/SchemaInspectorModal';
import { WorkflowPanel } from './components/WorkflowPanel';
import { ProjectsView } from './components/ProjectsView';
import { ChatsView } from './components/ChatsView';
import { ChatsHistoryView } from './components/ChatsHistoryView';
import { DesignSystemsView } from './components/DesignSystemsView';
import { TemplatesView } from './components/TemplatesView';
import { FoodRushApp } from './components/FoodRushApp';
import { RideXApp } from './components/RideXApp';
import { RemindMeApp } from './components/RemindMeApp';
import { HotelLuxApp } from './components/HotelLuxApp';
import { getThemeStyles } from './utils/themeUtils';
import { generateDynamicDomainSchema, ensureRichVisualComponents, synthesizeComponentForSectionTitle } from './utils/schemaSynthesizer';
import {
  Sparkles,
  Code,
  LayoutGrid,
  Eye,
  PanelLeft,
  ArrowLeft,
  Share2,
  Maximize2,
  Monitor,
  Tablet,
  Smartphone,
  Menu,
  Search,
  Bell,
  Settings,
  Loader2,
  Plus,
  Layers,
  Activity,
  Zap,
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Filter,
  Download,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DynamicIcon } from './components/DynamicIcon';

const getSidebarLinks = (schema: any) => {
  if (!schema) return [];

  // Use custom navigation provided by AI schema if present
  if (schema.customNavigation && Array.isArray(schema.customNavigation) && schema.customNavigation.length > 0) {
    return schema.customNavigation;
  }

  const id = (schema.id || '').toLowerCase();
  const title = (schema.title || '').toLowerCase();
  const category = (schema.category || '').toLowerCase();
  const desc = (schema.description || '').toLowerCase();
  const p = (schema.generatedPrompt || '').toLowerCase();
  const fullText = `${id} ${title} ${category} ${desc} ${p}`;

  // 1. Food Delivery, Swiggy, Zomato & Gourmet Food
  if (
    id.includes('foodrush') ||
    title.includes('food') ||
    fullText.includes('food delivery') ||
    fullText.includes('restaurant') ||
    fullText.includes('swiggy') ||
    fullText.includes('zomato') ||
    fullText.includes('gourmet food') ||
    fullText.includes('dining app') ||
    fullText.includes('pizza delivery') ||
    fullText.includes('burger delivery') ||
    fullText.includes('biryani')
  ) {
    return [
      { label: 'Restaurants', icon: 'Utensils', tabId: 'dashboard' },
      { label: 'Search & Menu', icon: 'Search', tabId: 'operations' },
      { label: 'Cart & Orders', icon: 'ShoppingBag', tabId: 'analytics' },
      { label: 'Offers & Deals', icon: 'Tag', tabId: 'settings' }
    ];
  }

  // 2. Healthcare, Medical, Patient, Doctor & Hospital (Check before SOS/Emergency!)
  if (
    id.includes('health') ||
    id.includes('patient') ||
    id.includes('medical') ||
    title.includes('health') ||
    title.includes('patient') ||
    title.includes('doctor') ||
    title.includes('hospital') ||
    category.includes('health') ||
    category.includes('medical') ||
    p.includes('health') ||
    p.includes('patient') ||
    p.includes('doctor') ||
    p.includes('hospital') ||
    p.includes('medical') ||
    p.includes('clinic')
  ) {
    return [
      { label: 'Patient Overview', icon: 'LayoutGrid', tabId: 'dashboard' },
      { label: 'Appointments & Triage', icon: 'Calendar', tabId: 'operations' },
      { label: 'Medical Records', icon: 'Activity', tabId: 'analytics' },
      { label: 'Clinic Settings', icon: 'Settings', tabId: 'settings' }
    ];
  }

  // 3. Safety, Emergency, SOS & Guardian (Only for dedicated panic / safety apps)
  if (
    id.includes('guardian') ||
    id.includes('safety') ||
    title.includes('guardian') ||
    category.includes('safety') ||
    p.includes('guardian') ||
    p.includes('sos panic') ||
    (p.includes('emergency') && !p.includes('health') && !p.includes('doctor'))
  ) {
    return [
      { label: 'SOS Command', icon: 'ShieldCheck', tabId: 'dashboard' },
      { label: 'GPS Telemetry', icon: 'Navigation', tabId: 'operations' },
      { label: 'Emergency Hotlines', icon: 'PhoneCall', tabId: 'analytics' },
      { label: 'Guardian Settings', icon: 'Settings', tabId: 'settings' }
    ];
  }

  // 4. Hiring, Recruitment, HR & Candidate Pipeline
  if (
    id.includes('hiring') ||
    title.includes('hiring') ||
    title.includes('candidate') ||
    category.includes('hr') ||
    p.includes('hiring') ||
    p.includes('recruitment') ||
    p.includes('candidate') ||
    p.includes('applicant') ||
    p.includes('interview')
  ) {
    return [
      { label: 'Recruitment Hub', icon: 'UserCheck', tabId: 'dashboard' },
      { label: 'Candidate Pipeline', icon: 'Layers', tabId: 'operations' },
      { label: 'Scorecards & Velocity', icon: 'TrendingUp', tabId: 'analytics' },
      { label: 'Role Settings', icon: 'Settings', tabId: 'settings' }
    ];
  }

  // 5. Inventory, SKU, Warehouse & E-Commerce
  if (
    id.includes('inventory') ||
    title.includes('inventory') ||
    category.includes('inventory') ||
    p.includes('inventory') ||
    p.includes('sku') ||
    p.includes('warehouse') ||
    p.includes('supply chain') ||
    p.includes('reorder')
  ) {
    return [
      { label: 'Stock Overview', icon: 'LayoutGrid', tabId: 'dashboard' },
      { label: 'Warehouse SKUs', icon: 'Layers', tabId: 'operations' },
      { label: 'Demand Forecast', icon: 'TrendingUp', tabId: 'analytics' },
      { label: 'Supplier Settings', icon: 'Settings', tabId: 'settings' }
    ];
  }

  // 6. Startup Burn Rate & Financial Runway
  if (
    id.includes('burn') ||
    title.includes('burn rate') ||
    title.includes('runway') ||
    p.includes('burn rate') ||
    p.includes('runway') ||
    p.includes('headcount')
  ) {
    return [
      { label: 'Runway Overview', icon: 'DollarSign', tabId: 'dashboard' },
      { label: 'Expense Ledger', icon: 'CreditCard', tabId: 'operations' },
      { label: 'Forecast Model', icon: 'TrendingUp', tabId: 'analytics' },
      { label: 'Finance Settings', icon: 'Settings', tabId: 'settings' }
    ];
  }

  // 7. SaaS, MRR, Revenue & Churn
  if (
    id.includes('saas') ||
    title.includes('saas') ||
    title.includes('mrr') ||
    category.includes('sales & saas') ||
    p.includes('mrr') ||
    p.includes('saas') ||
    p.includes('churn') ||
    p.includes('subscription')
  ) {
    return [
      { label: 'MRR Overview', icon: 'DollarSign', tabId: 'dashboard' },
      { label: 'Accounts Ledger', icon: 'CreditCard', tabId: 'operations' },
      { label: 'Retention Analytics', icon: 'TrendingUp', tabId: 'analytics' },
      { label: 'Billing Settings', icon: 'Settings', tabId: 'settings' }
    ];
  }

  // 8. Diet, Calorie, Nutrition & Meal Planner
  if (
    id.includes('diet') ||
    title.includes('diet') ||
    title.includes('nutri') ||
    p.includes('diet') ||
    p.includes('nutrition') ||
    p.includes('meal') ||
    p.includes('calorie') ||
    p.includes('macro')
  ) {
    return [
      { label: 'Meal Schedule', icon: 'Utensils', tabId: 'dashboard' },
      { label: 'Macro Nutrition', icon: 'PieChart', tabId: 'operations' },
      { label: 'Grocery Checklist', icon: 'ShoppingBag', tabId: 'analytics' },
      { label: 'Diet Goals', icon: 'Activity', tabId: 'settings' }
    ];
  }

  // 9. Fitness, Gym & Workout Tracker
  if (
    id.includes('fit') ||
    title.includes('fitness') ||
    p.includes('workout') ||
    p.includes('gym') ||
    p.includes('fitness') ||
    p.includes('exercise')
  ) {
    return [
      { label: 'Workouts Hub', icon: 'Activity', tabId: 'dashboard' },
      { label: 'Routine Log', icon: 'Clock', tabId: 'operations' },
      { label: 'Strength Analytics', icon: 'TrendingUp', tabId: 'analytics' },
      { label: 'Profile Settings', icon: 'Settings', tabId: 'settings' }
    ];
  }

  // 10. Habit & Focus OS / Task & Todo Planner
  if (
    id.includes('habit') ||
    title.includes('habit') ||
    title.includes('focus') ||
    p.includes('habit') ||
    p.includes('focus') ||
    p.includes('task') ||
    p.includes('todo') ||
    p.includes('planner')
  ) {
    return [
      { label: 'Habit Streaks', icon: 'CheckCircle', tabId: 'dashboard' },
      { label: 'Focus Routine', icon: 'Clock', tabId: 'operations' },
      { label: 'Time Analytics', icon: 'TrendingUp', tabId: 'analytics' },
      { label: 'Planner Settings', icon: 'Settings', tabId: 'settings' }
    ];
  }

  // 11. Education, Courses & Academy
  if (
    id.includes('learn') ||
    title.includes('course') ||
    category.includes('education') ||
    category.includes('learning') ||
    p.includes('learn') ||
    p.includes('course') ||
    p.includes('school') ||
    p.includes('academy') ||
    p.includes('curriculum')
  ) {
    return [
      { label: 'Academy Overview', icon: 'LayoutGrid', tabId: 'dashboard' },
      { label: 'Course Modules', icon: 'BookOpen', tabId: 'operations' },
      { label: 'Student Analytics', icon: 'TrendingUp', tabId: 'analytics' },
      { label: 'Course Settings', icon: 'Settings', tabId: 'settings' }
    ];
  }

  // 12. Ride Booking, Uber & Transport
  if (
    id.includes('ride') ||
    title.includes('ride') ||
    category.includes('transport') ||
    p.includes('ride') ||
    p.includes('uber') ||
    p.includes('cab') ||
    p.includes('taxi') ||
    p.includes('driver')
  ) {
    return [
      { label: 'Book Ride', icon: 'Navigation', tabId: 'dashboard' },
      { label: 'Trip History', icon: 'Clock', tabId: 'operations' },
      { label: 'Wallet & Safety', icon: 'ShieldCheck', tabId: 'analytics' },
      { label: 'Driver Mode', icon: 'Car', tabId: 'settings' }
    ];
  }

  // Dynamic fallback: Use capitalized schema category or topic title if available
  const domainLabel = schema.category || 'Dashboard';
  return [
    { label: `${domainLabel} Overview`, icon: 'LayoutGrid', tabId: 'dashboard' },
    { label: 'Operations & Execution', icon: 'Layers', tabId: 'operations' },
    { label: 'Performance Analytics', icon: 'TrendingUp', tabId: 'analytics' },
    { label: 'System Settings', icon: 'Settings', tabId: 'settings' }
  ];
};

export default function App() {
  const initialHistory: DynamicUISchema[] = [
    DEMO_BURN_RATE_SCHEMA,
    getSaasFallbackSchema("Set up SaaS MRR, customer churn rate, ARPU, and plan tier breakdown"),
    getHiringFallbackSchema("Build candidate recruitment pipeline with Kanban stages and interview feedback"),
    getInventoryFallbackSchema("Design inventory management dashboard with low stock alerts and demand forecasting"),
    getHabitFallbackSchema("Generate habit and focus tracking dashboard with daily completion and streak metrics")
  ];

  const [projectHistory, setProjectHistory] = useState<DynamicUISchema[]>(() => {
    try {
      const saved = localStorage.getItem('gui_studio_project_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const cleaned = parsed.filter(p => !p.id?.startsWith('booking_'));
          if (cleaned.length > 0) return cleaned;
        }
      }
    } catch (e) {
      console.error('Failed to load project history from localStorage', e);
    }
    return initialHistory;
  });
  const [currentSchema, setCurrentSchema] = useState<DynamicUISchema | null>(null);
  const [settingsNotifications, setSettingsNotifications] = useState<Record<string, boolean>>({
    'Email Digests': true,
    'Push Notifications': true,
    'Marketing Emails': false,
    'Security Alerts': true
  });
  const [activeDraftId, setActiveDraftId] = useState<string>('');
  const [dashboardState, setDashboardState] = useState<Record<string, any>>({});
  const [selectedModel, setSelectedModel] = useState<string>('Gemini 2.5 Flash');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<number>(0);
  const [generationStage, setGenerationStage] = useState<string>('Analyzing prompt intent...');
  const [skipGenerationDelay, setSkipGenerationDelay] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('gui_studio_project_history', JSON.stringify(projectHistory));
    } catch (e) {
      console.error('Failed to save project history to localStorage', e);
    }
  }, [projectHistory]);

  useEffect(() => {
    if (currentSchema) {
      setDashboardState(currentSchema.initialState || {});
    } else {
      setDashboardState({});
    }
  }, [currentSchema?.id]);

  const handleStateChange = (newVals: Record<string, any>) => {
    setDashboardState(prev => ({
      ...prev,
      ...newVals
    }));
  };

  const getDynamicSchema = (): DynamicUISchema | null => {
    if (!currentSchema) return null;

    // Normalize schema layout structures, resolving widgets/elements to components and resolving type aliases
    const normalizeSchema = (schema: DynamicUISchema): DynamicUISchema => {
      const cloned = JSON.parse(JSON.stringify(schema));
      const mapType = (type: string): string => {
        switch (type) {
          case 'data_table': return 'table';
          case 'kanban_board': return 'kanban';
          case 'alert_banner': return 'alert';
          default: return type;
        }
      };

      const normalizeSection = (sec: any) => {
        if (!sec) return sec;
        let rawComps = sec.components || sec.widgets || sec.elements || sec.cards || sec.items || [];
        if (!Array.isArray(rawComps)) {
          if (rawComps && typeof rawComps === 'object') {
            rawComps = [rawComps];
          } else {
            rawComps = [];
          }
        }
        if (rawComps.length === 0) {
          rawComps = [synthesizeComponentForSectionTitle(sec.title || '')];
        }
        return {
          ...sec,
          components: rawComps.map((comp: any) => {
            if (!comp) return comp;
            return {
              ...comp,
              type: mapType(comp.type)
            };
          })
        };
      };

      if (cloned.layout) {
        cloned.layout = (Array.isArray(cloned.layout) ? cloned.layout : [cloned.layout]).map(normalizeSection);
      }
      if (cloned.operationsLayout) {
        cloned.operationsLayout = (Array.isArray(cloned.operationsLayout) ? cloned.operationsLayout : [cloned.operationsLayout]).map(normalizeSection);
      }
      if (cloned.analyticsLayout) {
        cloned.analyticsLayout = (Array.isArray(cloned.analyticsLayout) ? cloned.analyticsLayout : [cloned.analyticsLayout]).map(normalizeSection);
      }
      return cloned;
    };

    const normalizedSchema = normalizeSchema(currentSchema);

    if (normalizedSchema.id === 'demo_burn_rate' || normalizedSchema.id === 'burn_rate') {
      const state = {
        headcount: 12,
        avgSalary: 11000,
        marketingBudget: 25000,
        serverCost: 12000,
        ...dashboardState
      };

      const grossBurn = (state.headcount * state.avgSalary) + state.marketingBudget + state.serverCost;
      const revenue = 65000;
      const netBurn = grossBurn - revenue;
      const bankBalance = 1850000;
      const runwayMonths = netBurn > 0 ? (bankBalance / netBurn) : 99;

      const dynamicSchema = JSON.parse(JSON.stringify(normalizedSchema)) as DynamicUISchema;

      // Ensure layout is array
      if (dynamicSchema.layout && !Array.isArray(dynamicSchema.layout)) {
        dynamicSchema.layout = typeof dynamicSchema.layout === 'object' ? [dynamicSchema.layout as any] : [];
      }

      (dynamicSchema.layout || []).forEach(sec => {
        if (!sec || !Array.isArray(sec.components)) return;
        sec.components.forEach(comp => {
          if (comp && comp.id === 'comp_calculator_headcount' && comp.type === 'calculator') {
            comp.inputs = comp.inputs.map(inp => {
              if (state[inp.id] !== undefined) {
                return { ...inp, value: state[inp.id] };
              }
              return inp;
            });
            comp.outputs = comp.outputs.map(out => {
              if (out.id === 'totalExp') {
                return { ...out, calculatedValue: grossBurn };
              }
              if (out.id === 'simRunway') {
                return { ...out, calculatedValue: runwayMonths };
              }
              return out;
            });
          }
        });
      });

      if (dynamicSchema.metrics) {
        dynamicSchema.metrics = dynamicSchema.metrics.map(m => {
          if (m.id === 'm1') {
            return { ...m, value: `${runwayMonths.toFixed(1)} Months` };
          }
          if (m.id === 'm3') {
            return { ...m, value: netBurn, subtext: `Gross Burn $${(grossBurn/1000).toFixed(0)}K | Revenue $${(revenue/1000).toFixed(0)}K` };
          }
          return m;
        });
      }

      const runwayChart = (dynamicSchema.layout || [])
        .flatMap(sec => sec ? (sec.components || []) : [])
        .find(c => c && c.id === 'comp_chart_runway');

      if (runwayChart && runwayChart.type === 'chart') {
        let currentCash = bankBalance;
        runwayChart.data = [
          { month: "Jan", cashReserve: 2500000, netBurn: 160000, revenue: 45000 },
          { month: "Feb", cashReserve: 2380000, netBurn: 155000, revenue: 48000 },
          { month: "Mar", cashReserve: 2240000, netBurn: 148000, revenue: 52000 },
          { month: "Apr", cashReserve: 2100000, netBurn: 142000, revenue: 56000 },
          { month: "May", cashReserve: 1970000, netBurn: 138000, revenue: 60000 },
          { month: "Jun (Now)", cashReserve: currentCash, netBurn: netBurn, revenue: revenue },
          { month: "Jul (Proj)", cashReserve: Math.max(0, currentCash - netBurn), netBurn: netBurn, revenue: revenue },
          { month: "Aug (Proj)", cashReserve: Math.max(0, currentCash - 2 * netBurn), netBurn: netBurn, revenue: revenue },
          { month: "Sep (Proj)", cashReserve: Math.max(0, currentCash - 3 * netBurn), netBurn: netBurn, revenue: revenue }
        ];
      }

      return dynamicSchema;
    }

    return normalizedSchema;
  };

  const activeRenderSchema = getDynamicSchema();
  const [activeNav, setActiveNav] = useState<string>('home');
  const [isViewingChatDetail, setIsViewingChatDetail] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [activeSubTab, setActiveSubTab] = useState<'dashboard' | 'operations' | 'analytics' | 'settings'>('dashboard');

  // Selected Template state for chat workflow
  const [selectedTemplate, setSelectedTemplate] = useState<PresetTemplate | null>(null);
  const [initialPrompt, setInitialPrompt] = useState<string>('');

  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  const handleNavChange = (nav: string) => {
    setActiveNav(nav);
    if (nav === 'chats') {
      setIsViewingChatDetail(false);
    }
  };

  const handleSelectTemplateForChat = (preset: PresetTemplate) => {
    setSelectedTemplate(preset);
    setInitialPrompt(preset.prompt);
    setCurrentSchema(null);
    setActiveNav('home');
    setIsViewingChatDetail(false);
  };

  const handleSelectDraft = (preset: PresetTemplate) => {
    if (preset.schema) {
      let clonedSchema: DynamicUISchema = {
        ...preset.schema,
        id: preset.id,
        generatedPrompt: preset.prompt
      };
      clonedSchema = ensureRichVisualComponents(clonedSchema, preset.prompt || preset.title);
      setCurrentSchema(clonedSchema);
      setActiveDraftId(preset.id);
      setActiveNav('chats');
      setIsViewingChatDetail(true);
      setActiveTab('preview');
    } else {
      handleSelectTemplateForChat(preset);
    }
  };

  const handleApplyThemeToActive = (themeConfig: ThemeConfig) => {
    const baseSchema = currentSchema || DEMO_BURN_RATE_SCHEMA;
    const updatedSchema: DynamicUISchema = {
      ...baseSchema,
      theme: themeConfig
    };
    setCurrentSchema(updatedSchema);
    setProjectHistory(prev => [updatedSchema, ...prev.filter(p => p.id !== updatedSchema.id)]);
    setActiveNav('chats');
    setIsViewingChatDetail(true);
    setActiveTab('preview');
  };

  const handleSelectTheme = (accentColor: string, style: 'modern' | 'minimal' | 'dense' | 'glass') => {
    handleApplyThemeToActive({ accentColor, style });
  };

  const handleNewChat = () => {
    setCurrentSchema(null);
    setActiveDraftId('');
    setSelectedTemplate(null);
    setInitialPrompt('');
    setActiveNav('home');
    setIsViewingChatDetail(false);
  };

  const handleSelectProject = (schema: DynamicUISchema) => {
    setCurrentSchema(schema);
    setActiveDraftId(schema.id);
    setActiveNav('chats');
    setIsViewingChatDetail(true);
    setActiveTab('preview');
  };

  const handleDeleteProject = (id: string) => {
    setProjectHistory(prev => prev.filter(p => p.id !== id));
    if (currentSchema?.id === id) {
      const remaining = projectHistory.filter(p => p.id !== id);
      if (remaining.length > 0) {
        setCurrentSchema(remaining[0]);
      } else {
        setCurrentSchema(null);
        setActiveNav('home');
      }
    }
  };

  const refineSchemaLocally = (schema: DynamicUISchema, promptText: string, targetSubTab: string = 'dashboard'): DynamicUISchema => {
    const promptLower = promptText.toLowerCase();
    const newSchema: DynamicUISchema = JSON.parse(JSON.stringify(schema));

    // 1. Theme accent updates
    if (promptLower.includes('indigo')) newSchema.theme.accentColor = 'indigo';
    else if (promptLower.includes('violet')) newSchema.theme.accentColor = 'violet';
    else if (promptLower.includes('amber')) newSchema.theme.accentColor = 'amber';
    else if (promptLower.includes('cyan')) newSchema.theme.accentColor = 'cyan';
    else if (promptLower.includes('rose')) newSchema.theme.accentColor = 'rose';
    else if (promptLower.includes('emerald')) newSchema.theme.accentColor = 'emerald';
    else if (promptLower.includes('sky')) newSchema.theme.accentColor = 'sky';

    const timestamp = Date.now();
    const isOpsPrompt = targetSubTab === 'operations' ||
      promptLower.includes('table') || promptLower.includes('record') || promptLower.includes('log') ||
      promptLower.includes('kanban') || promptLower.includes('queue') || promptLower.includes('dispatch') ||
      promptLower.includes('vendor') || promptLower.includes('workflow') || promptLower.includes('task');

    if (isOpsPrompt) {
      if (!newSchema.operationsLayout) newSchema.operationsLayout = [];
      if (newSchema.operationsLayout.length === 0) {
        newSchema.operationsLayout.push({ id: `sec_ops_${timestamp}`, title: "Operations Execution Workspace", gridCols: 1, components: [] });
      }

      if (promptLower.includes('table') || promptLower.includes('record') || promptLower.includes('log') || promptLower.includes('list') || targetSubTab === 'operations') {
        const newTable: TableComponentData = {
          id: `table_${timestamp}`,
          type: 'table',
          title: `Refined Operations Log (${promptText.slice(0, 20)})`,
          searchable: true,
          exportable: true,
          columns: [
            { key: "item", label: "Module / Record", type: "text" },
            { key: "category", label: "Category", type: "text" },
            { key: "status", label: "Status", type: "badge", badgeColorMap: { "Active": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", "Pending": "bg-amber-500/10 text-amber-600 border-amber-500/20" } }
          ],
          data: [
            { item: "System Telemetry Stream", category: "Core Ops", status: "Active" },
            { item: "Data Processing Node #4", category: "Analytics", status: "Active" },
            { item: "Automated Routine Dispatch", category: "Workflow", status: "Pending" }
          ]
        };
        newSchema.operationsLayout[0].components.push(newTable);
      }

      if (promptLower.includes('alert') || promptLower.includes('warning') || promptLower.includes('notice') || promptLower.includes('sos')) {
        const alertComponent = {
          id: `alert_${timestamp}`,
          type: 'alert' as const,
          title: 'System Advisory Alert',
          severity: (promptLower.includes('warning') || promptLower.includes('sos') ? 'warning' : 'info') as any,
          message: `Updated telemetry: "${promptText}"`,
          timestamp: 'Just now',
          actionLabel: 'Acknowledge'
        };
        newSchema.operationsLayout[0].components.unshift(alertComponent);
      }

      newSchema.assistantMessage = `Updated Operations Workspace: Added operational module for "${promptText.slice(0, 25)}".`;
    } else {
      if (!newSchema.layout || newSchema.layout.length === 0) {
        newSchema.layout = [{ id: `sec_${timestamp}`, gridCols: 1, components: [] }];
      }

      if (promptLower.includes('alert') || promptLower.includes('warning') || promptLower.includes('notice') || promptLower.includes('sos')) {
        const alertComponent = {
          id: `alert_${timestamp}`,
          type: 'alert' as const,
          title: 'System Advisory Alert',
          severity: (promptLower.includes('warning') || promptLower.includes('sos') ? 'warning' : 'info') as any,
          message: `Updated telemetry: "${promptText}"`,
          timestamp: 'Just now',
          actionLabel: 'Acknowledge'
        };
        newSchema.layout[0].components.unshift(alertComponent);
      }

      if (promptLower.includes('chart') || promptLower.includes('graph') || promptLower.includes('trend')) {
        const newChart = {
          id: `chart_${timestamp}`,
          type: 'chart' as const,
          chartType: (promptLower.includes('bar') ? 'bar' : promptLower.includes('pie') ? 'pie' : 'area') as any,
          title: `Analytics Trend (${promptText.slice(0, 25)})`,
          xAxisKey: 'period',
          dataKeys: [{ key: 'val', name: 'Performance Metric', color: '#10b981' }],
          data: [
            { period: 'Q1', val: 140 },
            { period: 'Q2', val: 210 },
            { period: 'Q3', val: 290 },
            { period: 'Q4', val: 380 }
          ]
        };
        newSchema.layout[0].components.push(newChart);
      }

      if (promptLower.includes('image') || promptLower.includes('photo') || promptLower.includes('banner') || promptLower.includes('picture') || promptLower.includes('hero')) {
        const newImage = {
          id: `img_${timestamp}`,
          type: 'image' as const,
          title: `Featured Visual Banner • ${promptText.slice(0, 30)}`,
          description: "Contextual high-resolution photography banner",
          url: promptLower.includes('food') || promptLower.includes('dish') || promptLower.includes('meal')
            ? "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80"
            : promptLower.includes('health') || promptLower.includes('patient') || promptLower.includes('hospital')
            ? "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80"
            : promptLower.includes('car') || promptLower.includes('ride')
            ? "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&auto=format&fit=crop&q=80"
            : promptLower.includes('tech') || promptLower.includes('saas') || promptLower.includes('code')
            ? "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80"
            : "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
          aspectRatio: "wide" as const
        };
        newSchema.layout[0].components.unshift(newImage);
      }

      newSchema.assistantMessage = `Updated Dashboard View: Added component for "${promptText.slice(0, 25)}".`;
    }

    newSchema.description = `${newSchema.description} • Refined: "${promptText}"`;
    return newSchema;
  };

  const handleGenerateUI = async (
    prompt: string,
    isRefine = false,
    customThemeOrImages?: ThemeConfig | string[],
    imagesArg?: string[]
  ) => {
    let customTheme: ThemeConfig | undefined = undefined;
    let images: string[] | undefined = undefined;

    if (Array.isArray(customThemeOrImages)) {
      images = customThemeOrImages;
    } else {
      customTheme = customThemeOrImages;
      images = imagesArg;
    }

    setIsLoading(true);
    setGenerationProgress(10);
    setGenerationStage('🔍 Analyzing natural language prompt & updating layout...');

    // Fast progress sequence (1.5 seconds)
    const totalDurationMs = 1500;
    const stepMs = 250;
    const steps = totalDurationMs / stepMs;
    let currentProgress = 10;

    for (let i = 0; i < steps; i++) {
      await new Promise(resolve => setTimeout(resolve, stepMs));
      currentProgress += (90 - 10) / steps;
      setGenerationProgress(Math.min(92, Math.round(currentProgress)));
    }

    setGenerationProgress(100);
    setGenerationStage('✨ Finalizing canvas layout & mounting interactive viewport...');
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      let resultSchema: DynamicUISchema;

      const existingMessages: ChatMessage[] = (isRefine && currentSchema?.messages && currentSchema.messages.length > 0)
        ? currentSchema.messages
        : [
            {
              id: `msg_u_0`,
              role: 'user',
              content: currentSchema?.generatedPrompt || prompt,
              timestamp: 'Just now'
            },
            {
              id: `msg_a_0`,
              role: 'assistant',
              content: currentSchema?.description || "Synthesized full interactive dashboard UI.",
              timestamp: 'Just now',
              sectionsUpdated: currentSchema?.layout?.length || 2
            }
          ];

      const userMsg: ChatMessage = {
        id: `msg_u_${Date.now()}`,
        role: 'user',
        content: prompt,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const updatedHistoryMessages = isRefine ? [...existingMessages, userMsg] : [userMsg];

      // Use a 25-second timeout with AbortController for Gemini generation
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 90000);

      let data: any = null;
      try {
        const reqPayload = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt,
            currentSchema: isRefine && currentSchema ? currentSchema : undefined,
            action: isRefine ? 'refine' : 'generate',
            theme: customTheme,
            model: selectedModel,
            images
          }),
          signal: controller.signal
        };

        let response = await fetch('/api/generate-ui', reqPayload);
        const contentType = response.headers.get('content-type') || '';
        
        // If relative fetch returned HTML fallback page, attempt direct server connection to port 3001
        if (!response.ok || contentType.includes('text/html')) {
          response = await fetch('http://localhost:3001/api/generate-ui', reqPayload);
        }

        clearTimeout(timeoutId);
        if (response.ok) {
          data = await response.json();
        }
      } catch (err) {
        console.warn("API call timed out or unfulfilled, proceeding with smart local schema synthesizer.");
      }

      const cleanAndTrimTitle = (title?: string, fallbackPrompt?: string): string => {
        const target = title || fallbackPrompt || "Custom Application";
        const clean = target
          .replace(/^(build|create|design|generate|make|set up|setup|show me|a|an|the|modern|premium|visually|appealing|mobile|web|ui)\s+/i, '')
          .trim();
        const words = clean.split(/\s+/);
        if (words.length > 5 || clean.length > 40) {
          const shortTitle = words.slice(0, 4).join(' ');
          return shortTitle.charAt(0).toUpperCase() + shortTitle.slice(1) + '...';
        }
        return clean.charAt(0).toUpperCase() + clean.slice(1);
      };

      const isDomainChange = currentSchema && (
        (prompt.toLowerCase().includes('hotel') && !currentSchema.generatedPrompt?.toLowerCase().includes('hotel')) ||
        (prompt.toLowerCase().includes('food') && !currentSchema.generatedPrompt?.toLowerCase().includes('food')) ||
        (prompt.toLowerCase().includes('ride') && !currentSchema.generatedPrompt?.toLowerCase().includes('ride')) ||
        (prompt.toLowerCase().includes('remind') && !currentSchema.generatedPrompt?.toLowerCase().includes('remind'))
      );

function mergeSchemas(currentSchema: DynamicUISchema, newSchema: DynamicUISchema, promptText: string): DynamicUISchema {
  const merged: DynamicUISchema = JSON.parse(JSON.stringify(currentSchema));
  
  if (newSchema.theme) {
    merged.theme = {
      ...(merged.theme || {}),
      ...newSchema.theme
    };
  }

  // Ensure currentSchema layout is normalized
  if (merged.layout && !Array.isArray(merged.layout)) {
    merged.layout = typeof merged.layout === 'object' ? [merged.layout as any] : [];
  }
  if (!merged.layout) merged.layout = [];

  // Ensure newSchema layout is normalized
  if (newSchema && newSchema.layout) {
    if (!Array.isArray(newSchema.layout)) {
      newSchema.layout = typeof newSchema.layout === 'object' ? [newSchema.layout as any] : [];
    }
  }

  if (newSchema.metrics && newSchema.metrics.length > 0) {
    const existingMetricIds = new Set((merged.metrics || []).map(m => m.id || m.label));
    const newMetricsToAdd = newSchema.metrics.filter(m => !existingMetricIds.has(m.id || m.label));
    merged.metrics = [...(merged.metrics || []), ...newMetricsToAdd];
  }

  if (newSchema.layout && newSchema.layout.length > 0) {
    const promptLower = promptText.toLowerCase();
    const isExplicitReset = promptLower.includes('start over') || promptLower.includes('reset canvas') || promptLower.includes('clear all');
    
    if (isExplicitReset) {
      merged.layout = newSchema.layout;
    } else {
      newSchema.layout.forEach(newSec => {
        if (!newSec) return;
        const matchingSec = merged.layout.find(s => s && s.title && newSec.title && s.title.toLowerCase() === newSec.title.toLowerCase());
        if (matchingSec) {
          if (!Array.isArray(matchingSec.components)) {
            matchingSec.components = [];
          }
          const existingCompIds = new Set(matchingSec.components.filter(c => c).map(c => c.id));
          (newSec.components || []).forEach(comp => {
            if (comp && !existingCompIds.has(comp.id)) {
              matchingSec.components.push(comp);
            }
          });
        } else {
          merged.layout.push(newSec);
        }
      });
    }
  }

  if (newSchema.operationsLayout && newSchema.operationsLayout.length > 0) {
    if (!merged.operationsLayout) merged.operationsLayout = [];
    if (!Array.isArray(merged.operationsLayout)) {
      merged.operationsLayout = typeof merged.operationsLayout === 'object' ? [merged.operationsLayout] : [];
    }
    const newOpsLayout = Array.isArray(newSchema.operationsLayout) ? newSchema.operationsLayout : [newSchema.operationsLayout];
    newOpsLayout.forEach(opsSec => {
      if (opsSec) {
        merged.operationsLayout!.push(opsSec);
      }
    });
  }

  merged.description = `${merged.description} • Refined: "${promptText}"`;
  if (newSchema.assistantMessage) {
    merged.assistantMessage = newSchema.assistantMessage;
  }

  return merged;
}

      if (data && data.schema) {
        if (isRefine && currentSchema && !isDomainChange) {
          resultSchema = mergeSchemas(currentSchema, data.schema, prompt);
        } else {
          resultSchema = data.schema;
        }
        resultSchema.title = cleanAndTrimTitle(resultSchema.title, prompt);
        resultSchema.connectionMode = data.connectionMode || 'gemini';
        resultSchema.fallbackError = data.error;
      } else if (isRefine && currentSchema && !isDomainChange) {
        resultSchema = refineSchemaLocally(currentSchema, prompt, activeSubTab);
        resultSchema.connectionMode = currentSchema.connectionMode;
        resultSchema.fallbackError = currentSchema.fallbackError;
      } else if (selectedTemplate && selectedTemplate.schema && !isDomainChange) {
        resultSchema = {
          ...selectedTemplate.schema,
          id: `schema_${Date.now()}`,
          generatedPrompt: prompt,
          title: selectedTemplate.title,
          description: selectedTemplate.description || `Generated from template "${selectedTemplate.title}"`,
          connectionMode: 'fallback',
          fallbackError: 'Generated from pre-defined local template.'
        };
      } else {
        resultSchema = generateDynamicDomainSchema(prompt, customTheme);
        resultSchema.connectionMode = 'fallback';
        resultSchema.fallbackError = 'API server is not responding. Using local schema synthesizer fallback.';
      }

      if (customTheme) {
        resultSchema = {
          ...resultSchema,
          theme: {
            ...(resultSchema.theme || {}),
            ...customTheme
          }
        };
      }

      if (isRefine && currentSchema && !isDomainChange) {
        resultSchema = {
          ...resultSchema,
          id: currentSchema.id,
          title: currentSchema.title,
          description: resultSchema.description || currentSchema.description
        };
      }

      // Universal Visual Enforcer: Guarantee Hero Banners, Category Pill Grids, Visual Cards & Menus for EVERY prompt
      resultSchema = ensureRichVisualComponents(resultSchema, prompt);

      const assistantReply: ChatMessage = {
        id: `msg_a_${Date.now()}`,
        role: 'assistant',
        content: resultSchema.assistantMessage || `I've updated the UI schema for: "${prompt}". Applied components and layout updates to the preview canvas.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sectionsUpdated: resultSchema.layout?.length || 2
      };

      const finalSchemaWithMessages: DynamicUISchema = {
        ...resultSchema,
        messages: [...updatedHistoryMessages, assistantReply]
      };

      setCurrentSchema(finalSchemaWithMessages);
      setProjectHistory(prev => [
        finalSchemaWithMessages,
        ...prev.filter(p => p.id !== finalSchemaWithMessages.id)
      ]);
      setSelectedTemplate(null);
      setInitialPrompt('');
      setActiveNav('chats');
      setIsViewingChatDetail(true);
      setActiveTab('preview');
    } catch (err: any) {
      console.error("UI Generation failed, using local generator:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
      {/* Left Navigation Sidebar */}
      <Sidebar
        activeDraftId={activeDraftId}
        onSelectDraft={handleSelectDraft}
        onNewChat={handleNewChat}
        activeNav={activeNav}
        setActiveNav={handleNavChange}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        userEmail="chmounikaxyz-4795"
        projects={projectHistory}
        onSelectProject={handleSelectProject}
        currentProjectId={currentSchema?.id}
      />

      {/* Main Studio Viewport */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#fafafa]">
        {activeNav === 'design_systems' ? (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <DesignSystemsView
              onApplyThemeToActive={handleApplyThemeToActive}
              onGenerateWithTheme={(prompt, theme) => handleGenerateUI(prompt, false, theme)}
              currentSchemaTitle={currentSchema?.title}
              activeAppTheme={currentSchema?.theme}
            />
          </div>
        ) : activeNav === 'templates' ? (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <TemplatesView
              onSelectPreset={handleSelectTemplateForChat}
              onNewChat={handleNewChat}
            />
          </div>
        ) : activeNav === 'projects' ? (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <ProjectsView
              projects={projectHistory}
              currentSchemaId={currentSchema?.id}
              onSelectProject={handleSelectProject}
              onDeleteProject={handleDeleteProject}
              onNewProjectClick={handleNewChat}
            />
          </div>
        ) : activeNav === 'chats' && !isViewingChatDetail ? (
          /* Full Page Chats History List View */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <ChatsHistoryView
              projects={projectHistory}
              currentSchemaId={currentSchema?.id}
              onSelectChat={handleSelectProject}
              onDeleteProject={handleDeleteProject}
              onNewChat={handleNewChat}
            />
          </div>
        ) : activeNav === 'home' && !currentSchema ? (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center my-auto">
            <PromptBar
              onGenerate={handleGenerateUI}
              isLoading={isLoading}
              currentPrompt={initialPrompt}
              hasActiveSchema={false}
              selectedTemplate={selectedTemplate}
              onClearTemplate={() => {
                setSelectedTemplate(null);
                setInitialPrompt('');
              }}
              onSelectTemplate={handleSelectTemplateForChat}
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
            />
          </div>
        ) : (
          /* Split Workspace Layout: Chat on Left, Preview on Right */
          <div className="flex-1 flex h-full overflow-hidden">
            {/* Left Chat Panel */}
            <ChatsView
              projects={projectHistory}
              currentSchema={activeRenderSchema}
              onSelectProject={handleSelectProject}
              onDeleteProject={handleDeleteProject}
              onNewChat={handleNewChat}
              onGenerate={handleGenerateUI}
              isLoading={isLoading}
              onBackToList={() => setIsViewingChatDetail(false)}
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
            />

            {/* Right Preview Workspace */}
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#fafafa]">
              {/* Top Header Navigation */}
              {activeRenderSchema ? (
                <header className="bg-white border-b border-zinc-200/80 px-4 py-2.5 flex items-center justify-between shrink-0 shadow-2xs">
                  <div className="flex items-center gap-3 min-w-0">
                    {sidebarCollapsed && (
                      <button
                        onClick={() => setSidebarCollapsed(false)}
                        className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
                      >
                        <PanelLeft className="w-4 h-4" />
                      </button>
                    )}

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm font-semibold text-zinc-900 truncate">
                          {activeRenderSchema.title}
                        </h2>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono font-medium border border-emerald-200 shrink-0">
                          Dynamic UI
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-500 truncate max-w-md">
                        {activeRenderSchema.description}
                      </p>
                    </div>
                  </div>

                  {/* View Tabs & Actions */}
                  <div className="flex items-center gap-3 shrink-0">
                    {/* Device Selector */}
                    {activeTab === 'preview' && (
                      <div className="flex items-center bg-zinc-100 p-0.5 rounded-lg border border-zinc-200/80 text-xs">
                        <button
                          onClick={() => setPreviewDevice('desktop')}
                          title="Desktop View"
                          className={`p-1.5 rounded-md transition-all cursor-pointer ${
                            previewDevice === 'desktop'
                              ? 'bg-white text-zinc-900 shadow-2xs font-semibold'
                              : 'text-zinc-500 hover:text-zinc-800'
                          }`}
                        >
                          <Monitor className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setPreviewDevice('tablet')}
                          title="Tablet View"
                          className={`p-1.5 rounded-md transition-all cursor-pointer ${
                            previewDevice === 'tablet'
                              ? 'bg-white text-zinc-900 shadow-2xs font-semibold'
                              : 'text-zinc-500 hover:text-zinc-800'
                          }`}
                        >
                          <Tablet className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setPreviewDevice('mobile')}
                          title="Mobile View"
                          className={`p-1.5 rounded-md transition-all cursor-pointer ${
                            previewDevice === 'mobile'
                              ? 'bg-white text-zinc-900 shadow-2xs font-semibold'
                              : 'text-zinc-500 hover:text-zinc-800'
                          }`}
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    <div className="flex items-center bg-zinc-100 p-0.5 rounded-lg border border-zinc-200/80 text-xs">
                      <button
                        onClick={() => setActiveTab('preview')}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
                          activeTab === 'preview'
                            ? 'bg-white text-zinc-900 shadow-2xs'
                            : 'text-zinc-600 hover:text-zinc-900'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('code')}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
                          activeTab === 'code'
                            ? 'bg-white text-zinc-900 shadow-2xs'
                            : 'text-zinc-600 hover:text-zinc-900'
                        }`}
                      >
                        <Code className="w-3.5 h-3.5" />
                        <span>Code / Schema</span>
                      </button>
                    </div>

                    <button
                      onClick={() => setIsInspectorOpen(true)}
                      className="bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-200 px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                    >
                      <Code className="w-3.5 h-3.5 text-zinc-500" />
                      <span>Inspect JSON</span>
                    </button>
                  </div>
                </header>
              ) : null}

              {/* Preview Content Area */}
              {(() => {
                const canvasStyles = getThemeStyles(activeRenderSchema?.theme);
                const isCodeTab = activeTab === 'code';
                
                // Outer container background and classes
                const outerBgClass = isCodeTab
                  ? 'bg-zinc-950'
                  : 'bg-[#f4f5f6] dark:bg-[#080a13] bg-grid-pattern';
                  
                const outerStyle = isCodeTab
                  ? {}
                  : {
                      '--grid-dot-color': canvasStyles.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(9,9,11,0.08)',
                      ...canvasStyles.fontFamilyStyle
                    };

                return (
                  <div
                    className={`flex-1 overflow-y-auto p-4 md:p-6 transition-colors duration-250 flex justify-center items-start ${outerBgClass}`}
                    style={outerStyle as React.CSSProperties}
                  >
                    {isCodeTab && activeRenderSchema ? (
                      <div className="w-full max-w-5xl bg-zinc-900 text-zinc-100 rounded-2xl p-6 font-mono text-xs overflow-x-auto shadow-lg border border-zinc-800 my-4">
                        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
                          <span className="text-zinc-400 font-semibold">schema.json</span>
                          <span className="text-[11px] text-emerald-400 font-bold">Validated Dynamic UI Schema</span>
                        </div>
                        <pre>{JSON.stringify(activeRenderSchema, null, 2)}</pre>
                      </div>
                    ) : activeRenderSchema ? (
                      /* Device Simulator Frame Wrapping */
                      (() => {
                        const isDesktop = previewDevice === 'desktop';
                        const isTablet = previewDevice === 'tablet';
                        const isMobile = previewDevice === 'mobile';

                        const frameContainerClass = isDesktop
                          ? 'w-full max-w-[1440px] my-4 transition-all duration-300'
                          : isTablet
                          ? 'w-[768px] h-[920px] border-[10px] border-zinc-900 dark:border-zinc-800 rounded-[28px] shadow-2xl overflow-hidden shrink-0 transition-all duration-300 my-6 bg-white dark:bg-zinc-950'
                          : 'w-[375px] h-[720px] border-[12px] border-zinc-950 dark:border-zinc-850 rounded-[44px] shadow-2xl overflow-hidden shrink-0 relative transition-all duration-300 my-8 bg-zinc-950';

                        const promptOrTitle = (activeRenderSchema?.generatedPrompt || activeRenderSchema?.title || '').toLowerCase();
                        const categoryStr = (activeRenderSchema?.category || '').toLowerCase();
                        const schemaId = (activeRenderSchema?.id || '').toLowerCase();

                        const isFoodApp = 
                          schemaId === 'foodrush_delivery' ||
                          promptOrTitle.includes('foodrush app') ||
                          promptOrTitle.includes('swiggy app');

                        if (isFoodApp) {
                          return (
                            <div className={frameContainerClass}>
                              <div className={`flex flex-col ${isDesktop ? 'w-full min-h-[685px] rounded-3xl border shadow-lg' : 'h-full w-full'} overflow-hidden`}>
                                <FoodRushApp />
                              </div>
                            </div>
                          );
                        }

                        const isRideApp = 
                          schemaId === 'ridex_mobility' ||
                          promptOrTitle.includes('ridex app') ||
                          promptOrTitle.includes('uber app');

                        if (isRideApp) {
                          return (
                            <div className={frameContainerClass}>
                              <div className={`flex flex-col ${isDesktop ? 'w-full min-h-[685px] rounded-3xl border shadow-lg' : 'h-full w-full'} overflow-hidden`}>
                                <RideXApp />
                              </div>
                            </div>
                          );
                        }

                        const isReminderApp = 
                          schemaId === 'remindme_app' ||
                          promptOrTitle.includes('remindme app');

                        if (isReminderApp) {
                          return (
                            <div className={frameContainerClass}>
                              <div className={`flex flex-col ${isDesktop ? 'w-full min-h-[685px] rounded-3xl border shadow-lg' : 'h-full w-full'} overflow-hidden`}>
                                <RemindMeApp />
                              </div>
                            </div>
                          );
                        }

                        const isHotelApp = 
                          schemaId === 'hotellux_app' ||
                          promptOrTitle.includes('hotellux app');

                        if (isHotelApp) {
                          return (
                            <div className={frameContainerClass}>
                              <div className={`flex flex-col ${isDesktop ? 'w-full min-h-[685px] rounded-3xl border shadow-lg' : 'h-full w-full'} overflow-hidden`}>
                                <HotelLuxApp />
                              </div>
                            </div>
                          );
                        }



                        const sidebarLinks = getSidebarLinks(activeRenderSchema);
                        const innerContent = (
                          <div className={`flex flex-col relative ${isDesktop ? 'w-full min-h-[680px] rounded-2xl border shadow-sm' : 'h-full w-full'} ${canvasStyles.cardBgClass} ${canvasStyles.cardBorderClass} overflow-hidden`}>
                            {isLoading && (
                              <div className="absolute inset-0 bg-white/40 dark:bg-black/45 backdrop-blur-[1px] z-[50] flex items-center justify-center pointer-events-none">
                                <div className="bg-white/95 dark:bg-zinc-900/95 border border-zinc-200/80 dark:border-zinc-800 shadow-md px-4 py-2 rounded-full flex items-center gap-2">
                                  <Loader2 className="w-3.5 h-3.5 text-emerald-650 animate-spin" />
                                  <span className="text-[11px] font-bold text-zinc-750 dark:text-zinc-250">Updating preview canvas...</span>
                                </div>
                              </div>
                            )}

                            {/* Unified Top Application Header Bar — Single Continuous Horizontal Line Across Full Width */}
                            <div className={`px-5 py-3.5 border-b ${canvasStyles.dividerBorderClass} flex items-center justify-between gap-4 shrink-0 ${canvasStyles.subCardBgClass} ${isMobile ? 'pt-7' : ''}`}>
                              <div className="flex items-center gap-3 min-w-0">
                                <div className={`w-8 h-8 rounded-xl ${canvasStyles.accentBgClass} text-white flex items-center justify-center font-black text-sm shadow-sm shrink-0`}>
                                  {(activeRenderSchema.title || 'A').charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <h2 className={`text-sm sm:text-base font-extrabold tracking-tight ${canvasStyles.textPrimaryClass} truncate`}>
                                      {(() => {
                                        const rawTitle = (activeRenderSchema.title || '').replace(/[\*\#\`\_]+/g, '').trim();
                                        const parts = rawTitle.split(/\s+[\-\:\|\—\–]\s+/);
                                        if (parts.length > 0 && parts[0].trim().length > 0) {
                                          return parts[0].trim();
                                        }
                                        const partsFallback = rawTitle.split(/[\-\:\|\—\–]/);
                                        if (partsFallback.length > 0 && partsFallback[0].trim().length > 0) {
                                          return partsFallback[0].trim();
                                        }
                                        return rawTitle;
                                      })()}
                                    </h2>
                                    <span className="hidden sm:inline-flex px-2 py-0.5 rounded-md border border-zinc-200 dark:border-zinc-800 text-[10px] font-mono font-semibold uppercase text-zinc-400 shrink-0">
                                      {activeRenderSchema.category || 'App Workspace'}
                                    </span>
                                  </div>
                                  <p className={`text-[10px] sm:text-xs ${canvasStyles.textSecondaryClass} max-w-2xl mt-0.5 leading-relaxed`}>
                                    {activeRenderSchema.description}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Main Body: Sidebar + Content Viewport */}
                            <div className={`flex ${isDesktop ? 'flex-row' : 'flex-col'} flex-1 min-h-0 overflow-hidden`}>
                              {/* On Mobile Device Frame: Mobile Navigation Pill Bar */}
                              {isMobile && sidebarLinks && sidebarLinks.length > 0 && (
                                <div className={`px-3 py-2 border-b ${canvasStyles.dividerBorderClass} flex items-center justify-between gap-2 overflow-x-auto shrink-0 ${canvasStyles.subCardBgClass}`}>
                                  <div className="flex items-center gap-1.5 overflow-x-auto w-full">
                                    {sidebarLinks.map(link => {
                                      const isActive = activeSubTab === link.tabId;
                                      return (
                                        <button
                                          key={link.tabId}
                                          onClick={() => setActiveSubTab(link.tabId as any)}
                                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all shrink-0 cursor-pointer ${
                                            isActive
                                              ? `${canvasStyles.accentBgClass} text-white shadow-2xs`
                                              : `${canvasStyles.textSecondaryClass} hover:${canvasStyles.textPrimaryClass} hover:bg-zinc-500/10`
                                          }`}
                                        >
                                          <DynamicIcon name={link.icon} className="w-3.5 h-3.5" />
                                          <span>{link.label}</span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}

                              {/* On Desktop & Tablet: Left Vertical App Sidebar */}
                              {!isMobile && sidebarLinks && sidebarLinks.length > 0 && (
                                <aside className={`w-52 lg:w-60 border-r ${canvasStyles.dividerBorderClass} ${canvasStyles.subCardBgClass} flex flex-col shrink-0 select-none`}>
                                  {/* Sidebar Navigation Items */}
                                  <div className="p-3 space-y-1 flex-1 overflow-y-auto">
                                    <div className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 px-3 py-1.5 mb-0.5">
                                      Menu & Modules
                                    </div>
                                    {sidebarLinks.map(link => {
                                      const isActive = activeSubTab === link.tabId;
                                      return (
                                        <button
                                          key={link.tabId}
                                          onClick={() => setActiveSubTab(link.tabId as any)}
                                          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                            isActive
                                              ? `${canvasStyles.accentBgClass} text-white shadow-xs`
                                              : `${canvasStyles.textSecondaryClass} hover:${canvasStyles.textPrimaryClass} hover:bg-zinc-500/10`
                                          }`}
                                        >
                                          <DynamicIcon name={link.icon} className="w-3.5 h-3.5 shrink-0" />
                                          <span className="truncate">{link.label}</span>
                                        </button>
                                      );
                                    })}
                                  </div>

                                  {/* Sidebar Footer Info */}
                                  <div className={`p-3 border-t ${canvasStyles.dividerBorderClass} text-[10px]`}>
                                    <div className="flex items-center justify-between text-zinc-400 font-mono">
                                      <span>Status:</span>
                                      <span className="text-emerald-500 font-bold flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        Live Workspace
                                      </span>
                                    </div>
                                  </div>
                                </aside>
                              )}

                      {/* Main Scrollable Viewport */}
                              {(() => {
                                const navLinks = sidebarLinks || [];
                                const tab1Id = navLinks[0]?.tabId || 'dashboard';
                                const tab2Id = navLinks[1]?.tabId || 'operations';
                                const tab3Id = navLinks[2]?.tabId || 'analytics';
                                const tab4Id = navLinks[3]?.tabId || 'settings';

                                const isOpsTab = activeSubTab !== tab1Id && (activeSubTab === 'operations' || activeSubTab === tab2Id);
                                const isAnalyticsTab = activeSubTab !== tab1Id && (activeSubTab === 'analytics' || activeSubTab === tab3Id);

                                // Detect settings/billing/account type tabs by tabId or label
                                const activeTabLabel = (navLinks.find(l => l.tabId === activeSubTab)?.label || '').toLowerCase();
                                const isSettingsTab = activeSubTab !== tab1Id && (
                                  activeSubTab === 'settings' || activeSubTab === tab4Id ||
                                  activeSubTab.includes('setting') || activeSubTab.includes('billing') || activeSubTab.includes('account') ||
                                  activeTabLabel.includes('setting') || activeTabLabel.includes('billing') || activeTabLabel.includes('account')
                                );

                                const isDashboardTab = activeSubTab === tab1Id || (!isOpsTab && !isAnalyticsTab && !isSettingsTab);

                                const getSectionTargetTab = (secTitle: string = '') => {
                                  const t = secTitle.toLowerCase();
                                  if (t.includes('setting') || t.includes('account') || t.includes('profile') || t.includes('preference')) return 'settings';
                                  if (t.includes('analytic') || t.includes('metric') || t.includes('chart') || t.includes('statistic') || t.includes('performance') || t.includes('insight') || t.includes('report') || t.includes('data')) return 'analytics';
                                  if (t.includes('operation') || t.includes('admin') || t.includes('task') || t.includes('kanban')) return 'operations';
                                  return 'dashboard';
                                };

                                return (
                                  <div className={`flex-1 min-h-0 overflow-y-auto ${isDesktop ? 'p-6 sm:p-8' : isTablet ? 'p-6' : 'p-3 sm:p-4'} space-y-6 ${canvasStyles.containerBgClass}`}>
                                    <div className="space-y-6 pb-16">
                                        {isDashboardTab && (
                                          <div className="space-y-8">
                                            {/* Visual Landing Showcase — charts/tables excluded, they go to Analytics tab */}
                                            {(activeRenderSchema?.layout || []).map(section => {
                                              if (getSectionTargetTab(section.title) !== 'dashboard') return null;

                                              let visualComps = (section?.components || []).filter(c =>
                                                c && c.type !== 'chart' && c.type !== 'calculator' && c.type !== 'kanban'
                                              );
                                              
                                              if (visualComps.length === 0) return null;
                                              return (
                                                <div key={section.id} className="space-y-3">
                                                  {section.title && (
                                                    <h3 className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-2 ${canvasStyles.textSecondaryClass}`}>
                                                      <LayoutGrid className="w-3.5 h-3.5 opacity-60" />
                                                      {section.title}
                                                    </h3>
                                                  )}
                                                  <div className={`grid grid-cols-1 ${
                                                    isMobile ? 'grid-cols-1'
                                                    : section.gridCols === 2 ? 'lg:grid-cols-2'
                                                    : section.gridCols === 3 ? 'lg:grid-cols-3'
                                                    : 'grid-cols-1'
                                                  } ${canvasStyles.densityGapClass}`}>
                                                    {visualComps.map(comp => (
                                                      <ComponentRenderer
                                                        key={comp.id}
                                                        component={comp}
                                                        theme={activeRenderSchema.theme}
                                                        onStateChange={handleStateChange}
                                                        device={previewDevice}
                                                      />
                                                    ))}
                                                  </div>
                                                </div>
                                              );
                                            })}
                                          </div>
                                        )}

                                     {isAnalyticsTab && (
                                       <>
                                         {/* Analytics Section Header */}
                                         <div className={`flex flex-col border-b ${canvasStyles.dividerBorderClass} pb-4`}>
                                           <h1 className={`text-base md:text-lg font-extrabold tracking-tight ${canvasStyles.textPrimaryClass}`}>
                                              {sidebarLinks.find(link => link.tabId === 'analytics')?.label || 'Performance Analytics'}
                                           </h1>
                                           <p className={`text-xs ${canvasStyles.textSecondaryClass} mt-0.5`}>
                                              Deep-dive { (sidebarLinks.find(link => link.tabId === 'analytics')?.label || 'Analytics').toLowerCase() } trends, historical stats, and charts.
                                           </p>
                                         </div>

                                         {/* KPI Metrics */}
                                         {activeRenderSchema.metrics && activeRenderSchema.metrics.length > 0 && (
                                           <MetricsBar metrics={activeRenderSchema.metrics} theme={activeRenderSchema.theme} device={previewDevice} />
                                         )}

                                         {/* Section Grid: Analytics Controls & Calculators */}
                                         <div className="space-y-8">
                                           {(() => {
                                             const analyticsSections = activeRenderSchema?.analyticsLayout && activeRenderSchema.analyticsLayout.length > 0
                                               ? activeRenderSchema.analyticsLayout
                                               : (activeRenderSchema?.layout || []).filter(sec => {
                                                   if (getSectionTargetTab(sec.title) === 'analytics') return true;
                                                   const comps = sec.components || [];
                                                   return comps.length > 0 && comps.every(c => c.type === 'chart' || c.type === 'calculator');
                                                 });
                                             
                                             if (analyticsSections && analyticsSections.length > 0) {
                                               return analyticsSections.map(section => (
                                                 <div key={section.id} className="space-y-3">
                                                   {section.title && (
                                                     <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${canvasStyles.textSecondaryClass}`}>
                                                       <TrendingUp className="w-3.5 h-3.5 opacity-60 text-sky-500" />
                                                       {section.title}
                                                     </h3>
                                                   )}
                                                   <div
                                                     className={`grid grid-cols-1 ${
                                                       isMobile 
                                                         ? 'grid-cols-1' 
                                                         : section.gridCols === 2 
                                                         ? 'lg:grid-cols-2' 
                                                         : section.gridCols === 3 
                                                         ? 'lg:grid-cols-3' 
                                                         : 'grid-cols-1'
                                                     } ${canvasStyles.densityGapClass}`}
                                                   >
                                                     {(section?.components || []).map(comp => (
                                                       <ComponentRenderer 
                                                         key={comp.id} 
                                                         component={comp} 
                                                         theme={activeRenderSchema.theme} 
                                                         onStateChange={handleStateChange}
                                                         device={previewDevice}
                                                       />
                                                     ))}
                                                   </div>
                                                 </div>
                                               ));
                                             }

                                             // Fallback Analytics Dashboard
                                             const appTitle = activeRenderSchema.title || 'Application';
                                             return (
                                               <div className="space-y-5">
                                                 {/* KPI Row */}
                                                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                   {[
                                                     { label: 'Total Users', val: '24,831', delta: '+12.4%', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                                                     { label: 'Active Sessions', val: '1,204', delta: '+5.2%', color: 'text-sky-500', bg: 'bg-sky-500/10' },
                                                     { label: 'Avg. Session Time', val: '18m 42s', delta: '+2.1%', color: 'text-violet-500', bg: 'bg-violet-500/10' },
                                                     { label: 'Satisfaction Score', val: '94.7%', delta: '+0.8%', color: 'text-amber-500', bg: 'bg-amber-500/10' }
                                                   ].map((kpi, i) => (
                                                     <div key={i} className={`p-4 rounded-xl border ${canvasStyles.cardBgClass} ${canvasStyles.cardBorderClass} ${canvasStyles.cardShadowClass} space-y-1.5`}>
                                                       <div className={`text-[10px] font-semibold ${canvasStyles.textSecondaryClass}`}>{kpi.label}</div>
                                                       <div className={`text-xl font-black ${canvasStyles.textPrimaryClass}`}>{kpi.val}</div>
                                                       <div className={`text-[9px] font-bold ${kpi.color} ${kpi.bg} px-1.5 py-0.5 rounded-full w-fit`}>{kpi.delta} this week</div>
                                                     </div>
                                                   ))}
                                                 </div>

                                                 {/* Bar Chart Visualization */}
                                                 <div className={`p-5 rounded-xl border ${canvasStyles.cardBgClass} ${canvasStyles.cardBorderClass} ${canvasStyles.cardShadowClass} space-y-3`}>
                                                   <div className="flex items-center justify-between">
                                                     <div>
                                                       <h3 className={`text-xs font-bold uppercase tracking-wider ${canvasStyles.textPrimaryClass}`}>Weekly Activity Overview</h3>
                                                       <p className={`text-[10px] ${canvasStyles.textSecondaryClass}`}>Daily engagement across {appTitle}</p>
                                                     </div>
                                                     <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">▲ Trending Up</span>
                                                   </div>
                                                   <div className="flex items-end gap-2 h-24 pt-2">
                                                     {[65, 82, 58, 91, 74, 88, 96].map((h, i) => (
                                                       <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full">
                                                         <div className="w-full h-16 flex items-end">
                                                           <div
                                                             className={`w-full rounded-t-md ${canvasStyles.accentBgClass} opacity-80 transition-all hover:opacity-100`}
                                                             style={{ height: `${h}%` }}
                                                           />
                                                         </div>
                                                         <span className="text-[8px] text-zinc-400 shrink-0 select-none">{['M','T','W','T','F','S','S'][i]}</span>
                                                       </div>
                                                     ))}
                                                   </div>
                                                 </div>

                                                 {/* Pie Chart + Top Actions */}
                                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                   <div className={`p-5 rounded-xl border ${canvasStyles.cardBgClass} ${canvasStyles.cardBorderClass} ${canvasStyles.cardShadowClass} space-y-3`}>
                                                     <h3 className={`text-xs font-bold uppercase tracking-wider ${canvasStyles.textPrimaryClass}`}>Usage Distribution</h3>
                                                     <div className="flex items-center gap-4">
                                                       <div className="relative w-20 h-20 shrink-0">
                                                         <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                                                           <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                                                           <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="42 58" strokeDashoffset="0" />
                                                           <circle cx="18" cy="18" r="15.9" fill="none" stroke="#6366f1" strokeWidth="3" strokeDasharray="30 70" strokeDashoffset="-42" />
                                                           <circle cx="18" cy="18" r="15.9" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="28 72" strokeDashoffset="-72" />
                                                         </svg>
                                                         <div className="absolute inset-0 flex items-center justify-center">
                                                           <span className={`text-[9px] font-bold ${canvasStyles.textPrimaryClass}`}>100%</span>
                                                         </div>
                                                       </div>
                                                       <div className="space-y-1.5 flex-1">
                                                         {[['Mobile', '42%', 'bg-amber-400'],['Desktop', '30%', 'bg-indigo-500'],['Tablet', '28%', 'bg-emerald-500']].map(([lbl, pct, clr], i) => (
                                                           <div key={i} className="flex items-center justify-between">
                                                             <div className="flex items-center gap-1.5">
                                                               <div className={`w-2 h-2 rounded-sm ${clr}`} />
                                                               <span className={`text-[10px] ${canvasStyles.textSecondaryClass}`}>{lbl}</span>
                                                             </div>
                                                             <span className={`text-[10px] font-bold ${canvasStyles.textPrimaryClass}`}>{pct}</span>
                                                           </div>
                                                         ))}
                                                       </div>
                                                     </div>
                                                   </div>

                                                   <div className={`p-5 rounded-xl border ${canvasStyles.cardBgClass} ${canvasStyles.cardBorderClass} ${canvasStyles.cardShadowClass} space-y-3`}>
                                                     <h3 className={`text-xs font-bold uppercase tracking-wider ${canvasStyles.textPrimaryClass}`}>Recent Activity</h3>
                                                     <div className="space-y-2">
                                                       {[
                                                         { action: 'New user registered', time: '2m ago', dot: 'bg-emerald-400' },
                                                         { action: 'Data export completed', time: '14m ago', dot: 'bg-sky-400' },
                                                         { action: 'Report generated', time: '1h ago', dot: 'bg-amber-400' },
                                                         { action: 'Settings updated', time: '3h ago', dot: 'bg-violet-400' },
                                                       ].map((ev, i) => (
                                                         <div key={i} className="flex items-center gap-2">
                                                           <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${ev.dot}`} />
                                                           <span className={`text-[10px] flex-1 ${canvasStyles.textPrimaryClass}`}>{ev.action}</span>
                                                           <span className="text-[9px] text-zinc-400">{ev.time}</span>
                                                         </div>
                                                       ))}
                                                     </div>
                                                   </div>
                                                 </div>
                                               </div>
                                             );
                                           })()}
                                         </div>
                                       </>
                                     )}

                                     {isOpsTab && (
                                       <>
                                         {/* Operations Top Header & Command Toolbar */}
                                         <div className={`flex flex-col md:flex-row md:items-center justify-between border-b ${canvasStyles.dividerBorderClass} pb-4 gap-4`}>
                                           <div>
                                             <div className="flex items-center gap-2">
                                               <h1 className={`text-base md:text-lg font-extrabold tracking-tight ${canvasStyles.textPrimaryClass}`}>
                                                 Operations & Execution Control
                                               </h1>
                                               <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20 uppercase">
                                                 Live Ops Mode
                                               </span>
                                             </div>
                                             <p className={`text-xs ${canvasStyles.textSecondaryClass} mt-0.5`}>
                                               Dedicated workspace for task boards, system ledgers, automated workflows, and dispatch queues.
                                             </p>
                                           </div>

                                           {/* Operational Toolbar Buttons */}
                                           <div className="flex items-center gap-2 shrink-0">
                                             <button
                                               onClick={() => {
                                                 const updated = refineSchemaLocally(activeRenderSchema, "Sync telemetry and trigger operational audit", 'operations');
                                                 setCurrentSchema(updated);
                                               }}
                                               className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${canvasStyles.subCardBgClass} ${canvasStyles.subCardBorderClass} ${canvasStyles.textPrimaryClass} hover:border-zinc-400`}
                                             >
                                               <RefreshCw className="w-3.5 h-3.5 text-emerald-500 animate-spin" />
                                               <span>Auto-Sync</span>
                                             </button>
                                             <button
                                               onClick={() => {
                                                 const updated = refineSchemaLocally(activeRenderSchema, "Trigger emergency operational diagnostic", 'operations');
                                                 setCurrentSchema(updated);
                                               }}
                                               className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${canvasStyles.accentBgClass} text-white hover:opacity-90`}
                                             >
                                               <Zap className="w-3.5 h-3.5" />
                                               <span>Run Diagnostics</span>
                                             </button>
                                           </div>
                                         </div>

                                         {/* Section Grid: Dedicated Operations Layout (Tables, Kanban, Action Lists, Forms) */}
                                         <div className="space-y-8">
                                           {(() => {
                                             const opsLayout = activeRenderSchema?.operationsLayout && activeRenderSchema.operationsLayout.length > 0
                                               ? activeRenderSchema.operationsLayout
                                               : (activeRenderSchema?.layout || []).map(sec => {
                                                   const opsComps = (sec?.components || []).filter(c => c && (c.type === 'table' || c.type === 'kanban' || c.type === 'action_list' || c.type === 'form' || c.type === 'alert'));
                                                   return { ...sec, components: opsComps };
                                                 }).filter(sec => sec.components.length > 0);

                                             if (opsLayout.length > 0) {
                                               return opsLayout.map(section => (
                                                 <div key={section.id} className="space-y-3">
                                                   {section.title && (
                                                     <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${canvasStyles.textSecondaryClass}`}>
                                                       <Layers className="w-3.5 h-3.5 opacity-60 text-amber-500" />
                                                       {section.title}
                                                     </h3>
                                                   )}
                                                   <div className="grid grid-cols-1 gap-6">
                                                     {(section?.components || []).map(comp => (
                                                       <ComponentRenderer 
                                                         key={comp.id} 
                                                         component={comp} 
                                                         theme={activeRenderSchema.theme} 
                                                         onStateChange={handleStateChange}
                                                         device={previewDevice}
                                                       />
                                                     ))}
                                                   </div>
                                                 </div>
                                               ));
                                             }

                                             // Fallback rich Operations workspace
                                             return (
                                               <div className="space-y-5">
                                                 {/* KPI Row */}
                                                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                   {[
                                                     { label: 'Tasks Completed', val: '847', delta: '+23 today', color: 'text-emerald-500', bg: 'bg-emerald-500/10', icon: '✅' },
                                                     { label: 'In Progress', val: '34', delta: '6 due soon', color: 'text-amber-500', bg: 'bg-amber-500/10', icon: '⏳' },
                                                     { label: 'Pending Review', val: '12', delta: '↑ 3 new', color: 'text-sky-500', bg: 'bg-sky-500/10', icon: '🔍' },
                                                     { label: 'Completion Rate', val: '96.1%', delta: '▲ Top 5%', color: 'text-violet-500', bg: 'bg-violet-500/10', icon: '🎯' }
                                                   ].map((kpi, i) => (
                                                     <div key={i} className={`p-4 rounded-xl border ${canvasStyles.cardBgClass} ${canvasStyles.cardBorderClass} ${canvasStyles.cardShadowClass} space-y-1.5`}>
                                                       <div className="flex items-center gap-1.5">
                                                         <span className="text-sm">{kpi.icon}</span>
                                                         <div className={`text-[10px] font-semibold ${canvasStyles.textSecondaryClass}`}>{kpi.label}</div>
                                                       </div>
                                                       <div className={`text-xl font-black ${canvasStyles.textPrimaryClass}`}>{kpi.val}</div>
                                                       <div className={`text-[9px] font-bold ${kpi.color} ${kpi.bg} px-1.5 py-0.5 rounded-full w-fit`}>{kpi.delta}</div>
                                                     </div>
                                                   ))}
                                                 </div>

                                                 {/* Progress Tracker */}
                                                 <div className={`p-5 rounded-xl border ${canvasStyles.cardBgClass} ${canvasStyles.cardBorderClass} ${canvasStyles.cardShadowClass} space-y-3`}>
                                                   <h3 className={`text-xs font-bold uppercase tracking-wider ${canvasStyles.textPrimaryClass}`}>Module Progress Tracker</h3>
                                                   <div className="space-y-3">
                                                     {[
                                                       { name: 'Data Sync Pipeline', pct: 88, color: 'bg-emerald-500' },
                                                       { name: 'User Onboarding Flow', pct: 65, color: 'bg-sky-500' },
                                                       { name: 'API Integration', pct: 42, color: 'bg-amber-500' },
                                                       { name: 'Report Generation', pct: 91, color: 'bg-violet-500' },
                                                     ].map((item, i) => (
                                                       <div key={i} className="space-y-1">
                                                         <div className="flex justify-between">
                                                           <span className={`text-[10px] font-semibold ${canvasStyles.textPrimaryClass}`}>{item.name}</span>
                                                           <span className={`text-[10px] font-bold ${canvasStyles.textSecondaryClass}`}>{item.pct}%</span>
                                                         </div>
                                                         <div className={`h-1.5 rounded-full w-full ${canvasStyles.subCardBgClass} overflow-hidden`}>
                                                           <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                                                         </div>
                                                       </div>
                                                     ))}
                                                   </div>
                                                 </div>

                                                 {/* Task Log + Assignments */}
                                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                   <div className={`p-5 rounded-xl border ${canvasStyles.cardBgClass} ${canvasStyles.cardBorderClass} ${canvasStyles.cardShadowClass} space-y-3`}>
                                                     <h3 className={`text-xs font-bold uppercase tracking-wider ${canvasStyles.textPrimaryClass}`}>Live Task Log</h3>
                                                     <div className="space-y-2">
                                                       {[
                                                         { time: '10:45', msg: 'Telemetry sync completed', status: 'success' },
                                                         { time: '09:30', msg: 'DB backup verified', status: 'success' },
                                                         { time: '08:15', msg: 'Queue processing started', status: 'info' },
                                                         { time: '07:00', msg: 'Scheduled workflow triggered', status: 'info' },
                                                       ].map((item, idx) => (
                                                         <div key={idx} className={`p-2.5 rounded-lg border ${canvasStyles.subCardBgClass} ${canvasStyles.subCardBorderClass} flex items-center gap-2 text-[10px]`}>
                                                           <span className="text-zinc-400 font-mono shrink-0">{item.time}</span>
                                                           <span className={`font-medium flex-1 ${canvasStyles.textPrimaryClass}`}>{item.msg}</span>
                                                           <span className={`px-1.5 py-0.5 rounded-md font-bold uppercase text-[8px] ${ item.status === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-sky-100 text-sky-700'}`}>{item.status}</span>
                                                         </div>
                                                       ))}
                                                     </div>
                                                   </div>
                                                   <div className={`p-5 rounded-xl border ${canvasStyles.cardBgClass} ${canvasStyles.cardBorderClass} ${canvasStyles.cardShadowClass} space-y-3`}>
                                                     <h3 className={`text-xs font-bold uppercase tracking-wider ${canvasStyles.textPrimaryClass}`}>Team Assignments</h3>
                                                     <div className="space-y-2.5">
                                                       {[
                                                         { name: 'Aura AI', role: 'Lead Dev', tasks: 14, avatar: '🤖' },
                                                         { name: 'Sarah K.', role: 'Designer', tasks: 8, avatar: '👩‍🎨' },
                                                         { name: 'James T.', role: 'QA Eng.', tasks: 11, avatar: '👨‍💻' },
                                                         { name: 'Priya M.', role: 'PM', tasks: 5, avatar: '📋' },
                                                       ].map((m, i) => (
                                                         <div key={i} className="flex items-center gap-2">
                                                           <div className="w-7 h-7 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-sm shrink-0">{m.avatar}</div>
                                                           <div className="flex-1">
                                                             <div className={`text-[10px] font-bold ${canvasStyles.textPrimaryClass}`}>{m.name}</div>
                                                             <div className={`text-[9px] ${canvasStyles.textSecondaryClass}`}>{m.role}</div>
                                                           </div>
                                                           <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${canvasStyles.subCardBgClass} ${canvasStyles.textSecondaryClass}`}>{m.tasks} tasks</span>
                                                         </div>
                                                       ))}
                                                     </div>
                                                   </div>
                                                 </div>
                                               </div>
                                             );
                                           })()}
                                         </div>

                                         {/* Workflows Panel */}
                                         {activeRenderSchema.workflows && activeRenderSchema.workflows.length > 0 && (
                                           <WorkflowPanel workflows={activeRenderSchema.workflows} theme={activeRenderSchema.theme} />
                                         )}
                                       </>
                                     )}
{isSettingsTab && (
                                       <div className="space-y-5">
                                         {/* Header */}
                                         <div className={`flex flex-col border-b ${canvasStyles.dividerBorderClass} pb-4`}>
                                           <h1 className={`text-base md:text-lg font-extrabold tracking-tight ${canvasStyles.textPrimaryClass}`}>Account & Settings</h1>
                                           <p className={`text-xs ${canvasStyles.textSecondaryClass} mt-0.5`}>Manage your profile, preferences, privacy, and subscription.</p>
                                         </div>

                                         {/* AI Generated Settings (if any) */}
                                         {(activeRenderSchema?.settingsLayout || []).concat(
                                           (activeRenderSchema?.layout || []).filter(sec => getSectionTargetTab(sec.title) === 'settings')
                                         ).map(section => (
                                           <div key={section.id} className="p-5 rounded-xl border space-y-4 bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/50">
                                             {section.title && (
                                                <h3 className={`text-xs font-bold uppercase tracking-wider ${canvasStyles.textPrimaryClass}`}>{section.title}</h3>
                                             )}
                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                               {(section.components || []).map(comp => (
                                                 <ComponentRenderer key={comp.id} component={comp} theme={activeRenderSchema.theme} />
                                               ))}
                                             </div>
                                           </div>
                                         ))}

                                         {/* Profile Card */}
                                         <div className={`p-5 rounded-xl border ${canvasStyles.cardBgClass} ${canvasStyles.cardBorderClass} ${canvasStyles.cardShadowClass} flex flex-col md:flex-row items-start md:items-center gap-4`}>
                                           <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-2xl font-black shadow-lg shrink-0">A</div>
                                           <div className="flex-1 space-y-0.5">
                                             <div className={`text-sm font-extrabold ${canvasStyles.textPrimaryClass}`}>{activeRenderSchema.title || 'Aura User'}</div>
                                             <div className={`text-[10px] ${canvasStyles.textSecondaryClass}`}>user@aura-studio.app</div>
                                             <div className="flex items-center gap-2 mt-1.5">
                                               <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/15 text-amber-600 border border-amber-400/30">⭐ Pro Member</span>
                                               <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-400/20">✓ Verified</span>
                                             </div>
                                           </div>
                                           <button
                                             onClick={() => {
                                               const newTitle = prompt("Enter new Profile / Workspace name:", activeRenderSchema.title || '');
                                               if (newTitle) {
                                                 const updated = { ...activeRenderSchema, title: newTitle };
                                                 setCurrentSchema(updated);
                                                 setProjectHistory(prev => prev.map(p => p.id === activeRenderSchema.id ? updated : p));
                                               }
                                             }}
                                             className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border cursor-pointer ${canvasStyles.subCardBgClass} ${canvasStyles.subCardBorderClass} ${canvasStyles.textPrimaryClass} hover:opacity-80 transition-all shrink-0`}
                                           >
                                             Edit Profile
                                           </button>
                                         </div>

                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                           {/* Accent Color Picker */}
                                           <div className={`p-5 rounded-xl border ${canvasStyles.cardBgClass} ${canvasStyles.cardBorderClass} ${canvasStyles.cardShadowClass} space-y-3`}>
                                             <h3 className={`text-xs font-bold uppercase tracking-wider ${canvasStyles.textPrimaryClass}`}>🎨 Theme & Appearance</h3>
                                             <div>
                                               <span className={`text-[10px] ${canvasStyles.textSecondaryClass} block mb-2`}>Accent Color</span>
                                               <div className="flex flex-wrap gap-2">
                                                 {['emerald', 'indigo', 'violet', 'amber', 'rose', 'sky', 'cyan'].map(color => (
                                                   <button
                                                     key={color}
                                                     onClick={() => {
                                                       const updated = { ...activeRenderSchema };
                                                       updated.theme = { ...updated.theme, accentColor: color };
                                                       setCurrentSchema(updated);
                                                       setProjectHistory(prev => prev.map(p => p.id === activeRenderSchema.id ? updated : p));
                                                     }}
                                                     className={`px-2.5 py-1 text-[9px] font-bold rounded-lg border capitalize cursor-pointer transition-all ${
                                                       activeRenderSchema.theme?.accentColor === color
                                                         ? `${canvasStyles.accentBgClass} text-white border-transparent shadow-sm`
                                                         : `${canvasStyles.subCardBgClass} ${canvasStyles.subCardBorderClass} ${canvasStyles.textSecondaryClass}`
                                                     }`}
                                                   >
                                                     {color}
                                                   </button>
                                                 ))}
                                               </div>
                                             </div>
                                             <div className={`pt-3 border-t ${canvasStyles.dividerBorderClass} space-y-2`}>
                                               <span className={`text-[10px] ${canvasStyles.textSecondaryClass} block`}>Display Mode</span>
                                               <div className="flex gap-2">
                                                 {['light', 'dark', 'warm', 'slate'].map(mode => {
                                                   const isActive = (activeRenderSchema.theme?.mode || 'light') === mode;
                                                   return (
                                                     <button
                                                       key={mode}
                                                       onClick={() => {
                                                         const updated = { ...activeRenderSchema };
                                                         updated.theme = { ...updated.theme, mode: mode as any };
                                                         setCurrentSchema(updated);
                                                         setProjectHistory(prev => prev.map(p => p.id === activeRenderSchema.id ? updated : p));
                                                       }}
                                                       className={`flex-1 py-1.5 text-[9px] font-bold rounded-lg border capitalize cursor-pointer transition-all ${
                                                         isActive
                                                           ? `${canvasStyles.accentBgClass} text-white border-transparent`
                                                           : `${canvasStyles.subCardBgClass} ${canvasStyles.subCardBorderClass} ${canvasStyles.textSecondaryClass}`
                                                       }`}
                                                     >
                                                       {mode}
                                                     </button>
                                                   );
                                                 })}
                                               </div>
                                             </div>
                                           </div>

                                           {/* Notification Toggles */}
                                           <div className={`p-5 rounded-xl border ${canvasStyles.cardBgClass} ${canvasStyles.cardBorderClass} ${canvasStyles.cardShadowClass} space-y-3`}>
                                             <h3 className={`text-xs font-bold uppercase tracking-wider ${canvasStyles.textPrimaryClass}`}>🔔 Notifications</h3>
                                             <div className="space-y-2.5">
                                               {[
                                                 { label: 'Email Digests', sub: 'Weekly summary reports' },
                                                 { label: 'Push Notifications', sub: 'Real-time activity alerts' },
                                                 { label: 'Marketing Emails', sub: 'Product updates & offers' },
                                                 { label: 'Security Alerts', sub: 'Login & access warnings' },
                                               ].map((n, i) => {
                                                 const isOn = !!settingsNotifications[n.label];
                                                 return (
                                                   <div key={i} className="flex items-center justify-between">
                                                     <div>
                                                       <div className={`text-[10px] font-semibold ${canvasStyles.textPrimaryClass}`}>{n.label}</div>
                                                       <div className={`text-[9px] ${canvasStyles.textSecondaryClass}`}>{n.sub}</div>
                                                     </div>
                                                     <button
                                                       onClick={() => {
                                                         setSettingsNotifications(prev => ({
                                                           ...prev,
                                                           [n.label]: !prev[n.label]
                                                         }));
                                                       }}
                                                       className={`w-9 h-5 rounded-full relative cursor-pointer transition-all border border-transparent ${isOn ? canvasStyles.accentBgClass : 'bg-zinc-200 dark:bg-zinc-700'}`}
                                                     >
                                                       <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${isOn ? 'left-4.5' : 'left-0.5'}`} />
                                                     </button>
                                                   </div>
                                                 );
                                               })}
                                             </div>
                                           </div>

                                           {/* Privacy Settings */}
                                           <div className={`p-5 rounded-xl border ${canvasStyles.cardBgClass} ${canvasStyles.cardBorderClass} ${canvasStyles.cardShadowClass} space-y-3`}>
                                             <h3 className={`text-xs font-bold uppercase tracking-wider ${canvasStyles.textPrimaryClass}`}>🔒 Privacy & Security</h3>
                                             <div className="space-y-2">
                                               {[
                                                 { label: 'Two-Factor Auth', val: 'Enabled', color: 'text-emerald-500' },
                                                 { label: 'Data Sharing', val: 'Off', color: 'text-rose-500' },
                                                 { label: 'Session Timeout', val: '30 min', color: canvasStyles.textSecondaryClass },
                                                 { label: 'Last Login', val: 'Today, 11:02 AM', color: canvasStyles.textSecondaryClass },
                                               ].map((row, i) => (
                                                 <div key={i} className={`flex justify-between items-center py-1.5 border-b ${canvasStyles.dividerBorderClass} last:border-0`}>
                                                   <span className={`text-[10px] ${canvasStyles.textSecondaryClass}`}>{row.label}</span>
                                                   <span className={`text-[10px] font-bold ${row.color}`}>{row.val}</span>
                                                 </div>
                                               ))}
                                             </div>
                                             <button
                                               onClick={() => {
                                                 alert("Password update requested! Check your registered email for reset instructions.");
                                               }}
                                               className="w-full py-2 rounded-lg text-[10px] font-bold border border-rose-400/30 text-rose-500 bg-rose-500/5 hover:bg-rose-500/10 cursor-pointer transition-all"
                                             >
                                               Change Password
                                             </button>
                                           </div>

                                           {/* Subscription Tier */}
                                           <div className={`p-5 rounded-xl border ${canvasStyles.cardBgClass} ${canvasStyles.cardBorderClass} ${canvasStyles.cardShadowClass} space-y-3 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5`}>
                                             <div className="flex items-center justify-between">
                                               <h3 className={`text-xs font-bold uppercase tracking-wider ${canvasStyles.textPrimaryClass}`}>⭐ Subscription</h3>
                                               <span className="px-2 py-0.5 text-[9px] font-bold bg-amber-400/20 text-amber-600 border border-amber-400/30 rounded-full">PRO PLAN</span>
                                             </div>
                                             <div className="space-y-2">
                                               {['Unlimited AI Generations', 'Priority API Access', 'Export to React/Vue/HTML', 'Team Collaboration (5 seats)'].map((feat, i) => (
                                                 <div key={i} className={`flex items-center gap-2 text-[10px] ${canvasStyles.textPrimaryClass}`}>
                                                   <span className="text-emerald-500 text-xs">✓</span> {feat}
                                                 </div>
                                               ))}
                                             </div>
                                             <div className={`pt-2 border-t ${canvasStyles.dividerBorderClass} flex justify-between items-center`}>
                                               <span className={`text-[10px] ${canvasStyles.textSecondaryClass}`}>Renews Jan 1, 2026</span>
                                               <button
                                                 onClick={() => {
                                                   alert("Upgrade plan requested! Redirecting to billing module...");
                                                 }}
                                                 className={`px-3 py-1.5 rounded-lg text-[10px] font-bold cursor-pointer ${canvasStyles.accentBgClass} text-white hover:opacity-90 transition-all`}
                                               >
                                                 Upgrade Plan
                                               </button>
                                             </div>
                                           </div>
                                         </div>

                                         {/* Metadata */}
                                         <div className={`p-4 rounded-xl border ${canvasStyles.cardBgClass} ${canvasStyles.cardBorderClass} ${canvasStyles.cardShadowClass}`}>
                                           <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[10px]">
                                             <div><span className={canvasStyles.textSecondaryClass}>Connection</span><div className={`font-bold mt-0.5 ${ activeRenderSchema.connectionMode === 'fallback' ? 'text-amber-500' : activeRenderSchema.connectionMode === 'gemini' ? 'text-blue-500' : 'text-emerald-500'}`}>{activeRenderSchema.connectionMode === 'fallback' ? 'Local Fallback' : activeRenderSchema.connectionMode === 'gemini' ? 'Gemini Active' : 'OpenRouter'}</div></div>
                                             <div><span className={canvasStyles.textSecondaryClass}>Schema ID</span><div className={`font-mono mt-0.5 text-zinc-400 truncate`}>{(activeRenderSchema.id || '').slice(0,12)}…</div></div>
                                             <div><span className={canvasStyles.textSecondaryClass}>Category</span><div className={`font-bold mt-0.5 ${canvasStyles.textPrimaryClass}`}>{activeRenderSchema.category || 'Custom'}</div></div>
                                             <div><span className={canvasStyles.textSecondaryClass}>Token Limit</span><div className={`font-mono font-bold mt-0.5 ${canvasStyles.textPrimaryClass}`}>{activeRenderSchema.connectionMode === 'fallback' ? 'N/A' : '4,000'}</div></div>
                                           </div>
                                         </div>
                                       </div>
                                    )}

                                    {/* Fallback rendering for any custom tab (not dashboard/ops/analytics/settings-type) */}
                                    {!isDashboardTab && !isOpsTab && !isAnalyticsTab && !isSettingsTab && (
                                      <>
                                        <div className={`flex flex-col border-b ${canvasStyles.dividerBorderClass} pb-4`}>
                                          <h1 className={`text-base md:text-lg font-extrabold tracking-tight ${canvasStyles.textPrimaryClass}`}>
                                            {sidebarLinks.find(link => link.tabId === activeSubTab)?.label || 'Module Workspace'}
                                          </h1>
                                          <p className={`text-xs ${canvasStyles.textSecondaryClass} mt-0.5`}>
                                            Tailored application views, visual cards, and operational controls.
                                          </p>
                                        </div>

                                        {/* KPI Metrics */}
                                        {activeRenderSchema.metrics && activeRenderSchema.metrics.length > 0 && (
                                          <MetricsBar metrics={activeRenderSchema.metrics} theme={activeRenderSchema.theme} device={previewDevice} />
                                        )}

                                        {/* Section Grid Components */}
                                        <div className="space-y-8">
                                          {(activeRenderSchema?.layout || []).map(section => (
                                            <div key={section.id} className="space-y-3">
                                              {section.title && (
                                                <h3 className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-2 ${canvasStyles.textSecondaryClass}`}>
                                                  <LayoutGrid className="w-3.5 h-3.5 opacity-60" />
                                                  {section.title}
                                                </h3>
                                              )}
                                              <div className={`grid grid-cols-1 ${
                                                section.gridCols === 2 ? 'lg:grid-cols-2' : section.gridCols === 3 ? 'lg:grid-cols-3' : 'grid-cols-1'
                                              } ${canvasStyles.densityGapClass}`}>
                                                {(section?.components || []).map(comp => (
                                                  <ComponentRenderer 
                                                    key={comp.id} 
                                                    component={comp} 
                                                    theme={activeRenderSchema.theme} 
                                                    onStateChange={handleStateChange}
                                                    device={previewDevice}
                                                  />
                                                ))}
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        </div>
                      );

                        return (
                          <div className={frameContainerClass}>
                            {/* Smartphone Island Notch */}
                            {isMobile && (
                              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4.5 bg-zinc-950 dark:bg-zinc-850 rounded-full z-30 flex items-center justify-center gap-1.5 px-3">
                                <span className="w-1 h-1 rounded-full bg-zinc-800 dark:bg-zinc-700" />
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-900/40 dark:bg-zinc-700/40" />
                              </div>
                            )}

                            {innerContent}
                          </div>
                        );
                      })()
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <PromptBar
                          onGenerate={handleGenerateUI}
                          isLoading={isLoading}
                          hasActiveSchema={false}
                          selectedModel={selectedModel}
                          setSelectedModel={setSelectedModel}
                        />
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>

      {/* Schema Modal Inspector */}
      {activeRenderSchema && (
        <SchemaInspectorModal
          schema={activeRenderSchema}
          isOpen={isInspectorOpen}
          onClose={() => setIsInspectorOpen(false)}
        />
      )}

      {/* Loading overlay modal removed for interactive conversational UI */}
    </div>
  );
}

// Fallbacks for Instant Preset Switching
function getSaasFallbackSchema(prompt: string): DynamicUISchema {
  return {
    id: 'gen_saas_mrr',
    title: "SaaS MRR & Customer Churn Control Panel",
    description: "Real-time subscription revenue analytics, churn rate monitoring, and tier growth forecast.",
    category: "Sales & SaaS",
    theme: { accentColor: "indigo", style: "modern" },
    generatedPrompt: prompt,
    metrics: [
      { id: 'm1', label: "Monthly Recurring Revenue", value: 84200, change: "+14.2%", trend: "up", subtext: "ARR $1.01M", format: "currency", sparkline: [62000, 68000, 72000, 78000, 81000, 84200] },
      { id: 'm2', label: "Logo Churn Rate", value: "2.1%", change: "-0.4%", trend: "up", subtext: "Lowest in 6 months", format: "percentage", sparkline: [3.2, 2.9, 2.7, 2.5, 2.3, 2.1] },
      { id: 'm3', label: "ARPU (Avg Revenue per User)", value: 148, change: "+$12", trend: "up", subtext: "Driven by Pro upgrades", format: "currency", sparkline: [120, 125, 132, 138, 142, 148] },
      { id: 'm4', label: "Active Subscribers", value: 568, change: "+42 this mo", trend: "up", subtext: "Net retention 112%", format: "number", sparkline: [420, 450, 485, 510, 538, 568] }
    ],
    initialState: {},
    layout: [
      {
        id: 's1',
        title: "MRR Trajectory & Subscription Breakdown",
        gridCols: 2,
        components: [
          {
            id: 'c1',
            type: 'chart',
            chartType: 'area',
            title: "MRR Growth & Expansion Revenue",
            subtitle: "Monthly revenue buildup ($)",
            xAxisKey: "month",
            dataKeys: [
              { key: "mrr", name: "MRR ($)", color: "#18181b" },
              { key: "expansion", name: "Expansion ($)", color: "#10b981" }
            ],
            data: [
              { month: "Jan", mrr: 62000, expansion: 4500 },
              { month: "Feb", mrr: 68000, expansion: 5200 },
              { month: "Mar", mrr: 72000, expansion: 6100 },
              { month: "Apr", mrr: 78000, expansion: 7400 },
              { month: "May", mrr: 81000, expansion: 8200 },
              { month: "Jun", mrr: 84200, expansion: 9100 }
            ]
          },
          {
            id: 'c2',
            type: 'chart',
            chartType: 'pie',
            title: "Subscriber Tier Distribution",
            subtitle: "Revenue share by plan tier",
            dataKeys: [{ key: "value", name: "Revenue ($)", color: "#18181b" }],
            data: [
              { name: "Enterprise ($499/mo)", value: 42000, color: "#18181b" },
              { name: "Pro Plan ($149/mo)", value: 28000, color: "#2563eb" },
              { name: "Starter ($49/mo)", value: 14200, color: "#10b981" }
            ]
          }
        ]
      }
    ],
    operationsLayout: [
      {
        id: 's_ops',
        title: "Enterprise Accounts Operations Ledger",
        gridCols: 1,
        components: [
          {
            id: 't1',
            type: 'table',
            title: "Top Enterprise Accounts Operations Ledger",
            searchable: true,
            exportable: true,
            columns: [
              { key: "company", label: "Company / Customer", type: "text" },
              { key: "tier", label: "Subscription Tier", type: "badge", badgeColorMap: { "Enterprise": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20", "Pro": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" } },
              { key: "mrr", label: "Monthly Spend", type: "currency" },
              { key: "status", label: "Account Health", type: "badge", badgeColorMap: { "Healthy": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", "At Risk": "bg-rose-500/10 text-rose-400 border-rose-500/20" } }
            ],
            data: [
              { company: "Acme Corp", tier: "Enterprise", mrr: 1499, status: "Healthy" },
              { company: "Nexus Systems", tier: "Enterprise", mrr: 2499, status: "Healthy" },
              { company: "CloudScale Inc", tier: "Enterprise", mrr: 1999, status: "At Risk" },
              { company: "Vortex Digital", tier: "Pro", mrr: 499, status: "Healthy" }
            ]
          }
        ]
      }
    ]
  };
}

function getHiringFallbackSchema(prompt: string): DynamicUISchema {
  return {
    id: 'gen_hiring_pipeline',
    title: "Candidate Recruitment & Interview Center",
    description: "Applicant pipeline, interview scorecard feedback, skill evaluation, and stage actions.",
    category: "HR & Operations",
    theme: { accentColor: "violet", style: "modern" },
    generatedPrompt: prompt,
    metrics: [
      { id: 'm1', label: "Open Roles", value: 8, change: "3 urgent", trend: "neutral", subtext: "Engineering & GTM", format: "number" },
      { id: 'm2', label: "Active Candidates", value: 42, change: "+12 this week", trend: "up", subtext: "Across 4 stages", format: "number" },
      { id: 'm3', label: "Avg Time to Hire", value: "24 Days", change: "-4 days", trend: "up", subtext: "Target: 21 days", format: "text" },
      { id: 'm4', label: "Offer Acceptance", value: "85%", change: "+5%", trend: "up", subtext: "8 of 10 accepted", format: "percentage" }
    ],
    initialState: {},
    layout: [
      {
        id: 's_dash_hiring',
        title: "Recruitment Performance Dashboard",
        gridCols: 1,
        components: [
          {
            id: 'c_hiring_chart',
            type: 'chart',
            chartType: 'bar',
            title: "Hiring Pipeline Velocity",
            xAxisKey: "dept",
            dataKeys: [{ key: "candidates", name: "Candidates", color: "#8b5cf6" }],
            data: [
              { dept: "Engineering", candidates: 18 },
              { dept: "Design", candidates: 8 },
              { dept: "Product", candidates: 10 },
              { dept: "Sales", candidates: 6 }
            ]
          }
        ]
      }
    ],
    operationsLayout: [
      {
        id: 's1',
        gridCols: 1,
        components: [
          {
            id: 'kanban_candidates',
            type: 'kanban',
            title: "Candidate Pipeline Stages",
            columns: [
              { id: 'applied', title: 'Screening (12)', color: '#18181b' },
              { id: 'interview', title: 'Technical Interview (8)', color: '#2563eb' },
              { id: 'offer', title: 'Offer Stage (3)', color: '#10b981' }
            ],
            items: [
              { id: 'c1', columnId: 'applied', title: 'Alex Mercer', subtitle: 'Senior Full Stack Engineer', assignee: 'Sarah (Recruiter)', priority: 'high' },
              { id: 'c2', columnId: 'interview', title: 'Elena Rostova', subtitle: 'Lead Product Designer', assignee: 'Michael (PM)', priority: 'high' },
              { id: 'c3', columnId: 'offer', title: 'David Kim', subtitle: 'DevOps Architect', assignee: 'VP Eng', priority: 'medium' }
            ]
          }
        ]
      }
    ]
  };
}

function getInventoryFallbackSchema(prompt: string): DynamicUISchema {
  return {
    id: 'gen_inventory',
    title: "E-Commerce Inventory & Supply Chain Monitor",
    description: "Real-time SKU stock levels, low-stock reorder alerts, and demand forecast.",
    category: "Operations",
    theme: { accentColor: "cyan", style: "modern" },
    generatedPrompt: prompt,
    metrics: [
      { id: 'm1', label: "Total SKUs Managed", value: 1240, change: "+15 new", trend: "up", format: "number" },
      { id: 'm2', label: "Low Stock Alerts", value: 4, change: "Requires reorder", trend: "down", format: "number" },
      { id: 'm3', label: "Warehouse Value", value: 420000, change: "+$25K", trend: "up", format: "currency" }
    ],
    initialState: {},
    layout: [
      {
        id: 's1',
        gridCols: 2,
        components: [
          {
            id: 'chart_demand',
            type: 'chart',
            chartType: 'line',
            title: "Weekly Demand Forecast & Stock Orders",
            xAxisKey: "week",
            dataKeys: [
              { key: "demand", name: "Demand (Units)", color: "#2563eb" },
              { key: "stock", name: "Stock Level", color: "#10b981" }
            ],
            data: [
              { week: "W1", demand: 450, stock: 1200 },
              { week: "W2", demand: 520, stock: 1050 },
              { week: "W3", demand: 610, stock: 890 },
              { week: "W4", demand: 700, stock: 720 }
            ]
          },
          {
            id: 'alert_stock',
            type: 'alert',
            title: "Reorder Needed for SKU #8842",
            severity: "warning",
            message: "Stock level for Ergonomic Desk Chair dropped to 14 units (Threshold: 25).",
            actionLabel: "Trigger Reorder Workflow"
          }
        ]
      }
    ],
    operationsLayout: [
      {
        id: 's_inv_ops',
        title: "Fulfillment Operations Log",
        gridCols: 1,
        components: [
          {
            id: 't_inv_sku',
            type: 'table',
            title: "SKU Warehouse Reorder Log",
            searchable: true,
            exportable: true,
            columns: [
              { key: "sku", label: "SKU Code", type: "text" },
              { key: "product", label: "Product Name", type: "text" },
              { key: "stock", label: "Current Stock", type: "number" },
              { key: "status", label: "Status", type: "badge", badgeColorMap: { "Low Stock": "bg-rose-500/10 text-rose-600 border-rose-500/20", "Optimal": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" } }
            ],
            data: [
              { sku: "SKU-8842", product: "Ergonomic Desk Chair", stock: 14, status: "Low Stock" },
              { sku: "SKU-9011", product: "Standing Desk 140cm", stock: 45, status: "Optimal" },
              { sku: "SKU-3320", product: "Dual Monitor Arm", stock: 8, status: "Low Stock" }
            ]
          }
        ]
      }
    ]
  };
}

function getHabitFallbackSchema(prompt: string): DynamicUISchema {
  return {
    id: 'gen_habit',
    title: "Personal Habit & Focus Operating System",
    description: "Track habit completion streaks, focus session logs, and wellness analytics.",
    category: "Personal Growth",
    theme: { accentColor: "rose", style: "modern" },
    generatedPrompt: prompt,
    metrics: [
      { id: 'm1', label: "Current Focus Streak", value: "12 Days", change: "Personal Best", trend: "up", format: "text" },
      { id: 'm2', label: "Weekly Completion Rate", value: "92%", change: "+8%", trend: "up", subtext: "36 of 39 habits logged", format: "percentage" },
      { id: 'm3', label: "Deep Work Hours", value: "34.5 hrs", change: "+4 hrs", trend: "up", format: "text" }
    ],
    initialState: {},
    layout: [
      {
        id: 's1',
        gridCols: 1,
        components: [
          {
            id: 'chart_habits',
            type: 'chart',
            chartType: 'bar',
            title: "Daily Completion Hours",
            xAxisKey: "day",
            dataKeys: [{ key: "hours", name: "Focus Hours", color: "#18181b" }],
            data: [
              { day: "Mon", hours: 6.5 },
              { day: "Tue", hours: 7.2 },
              { day: "Wed", hours: 8.0 },
              { day: "Thu", hours: 6.0 },
              { day: "Fri", hours: 6.8 }
            ]
          }
        ]
      }
    ],
    operationsLayout: [
      {
        id: 's_habit_ops',
        title: "Focus Log & Routine Entry",
        gridCols: 2,
        components: [
          {
            id: 'form_habit_log',
            type: 'form',
            title: "Log Today's Focus Session",
            submitLabel: "Log Session",
            fields: [
              { id: 'f1', name: 'activity', label: 'Activity Name', fieldType: 'text', placeholder: 'e.g. Deep Work / Coding' },
              { id: 'f2', name: 'duration', label: 'Duration (Minutes)', fieldType: 'number', placeholder: '60' }
            ]
          }
        ]
      }
    ]
  };
}
