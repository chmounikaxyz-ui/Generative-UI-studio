import { DynamicUISchema, ThemeConfig } from '../types';

/**
 * Intelligent Dynamic Schema Synthesizer
 * Ensures EVERY prompt generates a unique, professional, domain-specific UI
 * matching real-world applications instead of generic corporate fallbacks.
 */

export function generateDynamicDomainSchema(
  prompt: string,
  customTheme?: ThemeConfig
): DynamicUISchema {
  const p = prompt.toLowerCase();
  const timestamp = Date.now();

  // Helper to construct a clean title from prompt
  const cleanTitle = prompt
    .replace(/[\*\#\`\_]+/g, '')
    .replace(/^(build|create|design|generate|make|set up|setup|show me|a|an)\s+/i, '')
    .trim();
  const words = cleanTitle.split(/\s+/);
  const trimmed = words.length > 5 ? words.slice(0, 5).join(' ') + '...' : cleanTitle;
  const capitalizedTitle = trimmed ? trimmed.charAt(0).toUpperCase() + trimmed.slice(1) : "Application Workflow";

  // 0.000000 SAFETY, GUARDIAN & SOS EMERGENCY APP
  if (
    p.includes('guardian') ||
    p.includes('safety') ||
    p.includes('emergency') ||
    p.includes('sos') ||
    p.includes('protection') ||
    p.includes('shield') ||
    p.includes('security app')
  ) {
    return {
      id: `guardian_${timestamp}`,
      title: `GuardianSphere • Real-Time Personal Safety & SOS Command`,
      description: "24/7 personal emergency response, instant SOS alert dispatch, live GPS location tracking, and safe route navigation.",
      category: "Personal Safety & Emergency",
      theme: customTheme || { accentColor: "amber", style: "modern" },
      generatedPrompt: prompt,
      metrics: [],
      initialState: {},
      layout: [
        {
          id: `sec_safety_hero_${timestamp}`,
          gridCols: 1,
          components: [
            {
              id: `safety_hero_banner_${timestamp}`,
              type: 'image',
              title: "GuardianSphere • Live GPS Emergency Shield & SOS Dispatch",
              description: "Instant one-tap SOS broadcast to trusted contacts, nearest emergency services, and live satellite location sharing.",
              url: "https://images.unsplash.com/photo-1508873696983-2df515122519?w=1200&auto=format&fit=crop&q=80",
              aspectRatio: "wide"
            }
          ]
        },
        {
          id: `sec_safety_actions_${timestamp}`,
          gridCols: 1,
          components: [
            {
              id: `action_safety_${timestamp}`,
              type: 'action_list',
              title: "Instant Emergency Response Controls",
              description: "One-tap emergency triggers and safety monitoring tools",
              actions: [
                { id: "sa1", title: "🚨 TRIGGER ONE-TAP SOS PANIC ALERT", description: "Instantly alerts trusted contacts & emergency response center with your live GPS location", icon: "AlertTriangle", buttonText: "Trigger SOS Now" },
                { id: "sa2", title: "📡 Share Live 24/7 GPS Tracking Link", description: "Stream real-time location telemetry to family members and verified guardians", icon: "MapPin", buttonText: "Share Live Link" },
                { id: "sa3", title: "🛡️ SafeWalk Companion & Fake Call", description: "Simulate an urgent incoming phone call or activate timed arrival countdown timer", icon: "ShieldCheck", buttonText: "Activate Companion" },
                { id: "sa4", title: "📞 Direct Emergency Hotlines (911 / Police / Medical)", description: "Direct one-click connection to local police, medical dispatch, and roadside assistance", icon: "PhoneCall", buttonText: "Call Hotline" }
              ]
            }
          ]
        }
      ],
      assistantMessage: `I've synthesized GuardianSphere — a real-time personal safety and emergency command center for "${prompt}". It features high-resolution satellite GPS mapping, one-tap SOS panic triggers, live location streaming, and direct hotline dials.`
    };
  }

  // 0.00000 DIET & NUTRITION / MEAL PLANNER / GROCERY
  if (
    p.includes('diet') ||
    p.includes('nutrition') ||
    p.includes('meal') ||
    p.includes('calorie') ||
    p.includes('macro') ||
    p.includes('grocery') ||
    (p.includes('food') && p.includes('plan'))
  ) {
    return {
      id: `diet_${timestamp}`,
      title: `NutriAI • Gourmet Diet, Calorie & Meal Planner`,
      description: "Track daily calorie targets, macronutrient goals, personalized 5-course meal schedules, and auto-generated grocery shopping lists.",
      category: "Health & Nutrition",
      theme: customTheme || { accentColor: "emerald", style: "modern" },
      generatedPrompt: prompt,
      metrics: [
        { id: 'm1', label: "Daily Calorie Target", value: "1,850 / 2,200 kcal", change: "350 kcal remaining", trend: "up", subtext: "Optimal caloric deficit", format: "text", sparkline: [1950, 2100, 1800, 2050, 1900, 1850] },
        { id: 'm2', label: "Protein Intake Goal", value: "142g / 150g", change: "+12g vs yesterday", trend: "up", subtext: "High protein lean goal", format: "text", sparkline: [120, 128, 135, 138, 140, 142] },
        { id: 'm3', label: "Water Hydration", value: "2.4 L / 3.0 L", change: "80% completed", trend: "up", subtext: "6 of 8 glasses logged", format: "text", sparkline: [1.8, 2.0, 2.1, 2.2, 2.3, 2.4] },
        { id: 'm4', label: "Weekly Net Deficit", value: "-2,450 kcal", change: "Fat burn phase", trend: "up", subtext: "On track for -0.5 kg/wk", format: "text", sparkline: [1800, 1950, 2100, 2250, 2350, 2450] }
      ],
      initialState: {},
      layout: [
        {
          id: `sec_diet_hero_${timestamp}`,
          gridCols: 1,
          components: [
            {
              id: `diet_hero_banner_${timestamp}`,
              type: 'image',
              title: "NutriAI Daily Meal & Fitness Planner • 7-Day High-Protein Keto Plan",
              description: "Personalized meal timing, macro breakdown, recipe chef notes, and one-click smart grocery ordering.",
              url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&auto=format&fit=crop&q=80",
              aspectRatio: "wide"
            }
          ]
        },
        {
          id: `sec_diet_grid_${timestamp}`,
          gridCols: 2,
          components: [
            {
              id: `table_meals_${timestamp}`,
              type: 'table',
              title: "Today's Personalized Meal Schedule",
              description: "Calorie & macronutrient log by meal course",
              searchable: true,
              exportable: true,
              columns: [
                { key: "meal", label: "Meal Course", type: "text" },
                { key: "dish", label: "Recommended Dish", type: "text" },
                { key: "calories", label: "Calories (kcal)", type: "number" },
                { key: "protein", label: "Protein (g)", type: "text" },
                { key: "status", label: "Status", type: "badge", badgeColorMap: { "Logged": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", "Upcoming": "bg-amber-500/10 text-amber-600 border-amber-500/20" } }
              ],
              data: [
                { meal: "Breakfast (08:00 AM)", dish: "Avocado & Poached Egg Protein Toast", calories: 420, protein: "28g", status: "Logged" },
                { meal: "Morning Snack (11:00 AM)", dish: "Greek Yogurt & Mixed Berry Bowl", calories: 180, protein: "16g", status: "Logged" },
                { meal: "Lunch (01:30 PM)", dish: "Grilled Salmon & Quinoa Harvest Salad", calories: 580, protein: "45g", status: "Logged" },
                { meal: "Pre-Workout (05:00 PM)", dish: "Whey Isolate & Banana Smoothie", calories: 240, protein: "30g", status: "Upcoming" },
                { meal: "Dinner (08:00 PM)", dish: "Herb Grilled Chicken Breast & Asparagus", calories: 430, protein: "42g", status: "Upcoming" }
              ]
            },
            {
              id: `chart_macro_pie_${timestamp}`,
              type: 'chart',
              chartType: 'pie',
              title: "Macronutrient Energy Distribution",
              subtitle: "Daily target split (Protein, Carbs, Fats)",
              dataKeys: [{ key: "value", name: "Macro Share (%)", color: "#10b981" }],
              data: [
                { name: "Protein (40%)", value: 40, color: "#10b981" },
                { name: "Complex Carbs (35%)", value: 35, color: "#3b82f6" },
                { name: "Healthy Fats (25%)", value: 25, color: "#f59e0b" }
              ]
            }
          ]
        },
        {
          id: `sec_diet_grocery_${timestamp}`,
          gridCols: 1,
          components: [
            {
              id: `action_grocery_${timestamp}`,
              type: 'action_list',
              title: "Smart Grocery & Ingredient Shopping List",
              description: "Auto-generated ingredient checklist for your weekly meal plan",
              actions: [
                { id: "g1", title: "Fresh Norwegian Salmon Fillets (500g)", description: "Rich in Omega-3 & lean protein • Seafood aisle", icon: "CheckCircle", buttonText: "In Cart" },
                { id: "g2", title: "Organic Hass Avocados & Baby Spinach", description: "Healthy fats & micronutrients • Produce aisle", icon: "ShoppingBag", buttonText: "Add Item" },
                { id: "g3", title: "Plain Greek Yogurt & Organic Blueberries", description: "Probiotics & antioxidants • Dairy aisle", icon: "ShoppingBag", buttonText: "Add Item" },
                { id: "g4", title: "Quinoa, Almond Milk & Extra Virgin Olive Oil", description: "Complex carbohydrates & pantry essentials", icon: "ShoppingBag", buttonText: "Add Item" }
              ]
            }
          ]
        }
      ],
      assistantMessage: `I've synthesized a personalized AI Diet & Nutrition Planner UI schema for "${prompt}". It features daily calorie/macro trackers, an interactive 5-course meal schedule table, macronutrient pie distribution, and an auto-generated weekly grocery shopping list.`
    };
  }

  // 0.00000 LANGUAGE TUTOR & SPEAKING PRACTICE HUB / VOCABULARY
  if (
    p.includes('language') ||
    p.includes('tutor') ||
    p.includes('speaking') ||
    p.includes('vocab') ||
    p.includes('french') ||
    p.includes('spanish') ||
    p.includes('english') ||
    p.includes('german') ||
    p.includes('fluency') ||
    p.includes('pronunciation') ||
    (p.includes('learn') && (p.includes('word') || p.includes('speak') || p.includes('talk') || p.includes('tutor') || p.includes('hub')))
  ) {
    return {
      id: `lang_tutor_${timestamp}`,
      title: `LingoAI • Interactive Language Tutor & Speaking Practice Hub`,
      description: "Real-time AI speaking sessions, pronunciation accuracy scoring, active CEFR vocabulary tracking, and dialogue drills.",
      category: "Education & Language",
      theme: customTheme || { accentColor: "indigo", style: "modern" },
      generatedPrompt: prompt,
      metrics: [
        { id: 'm1', label: "Speaking Proficiency", value: "82 / 100", change: "+6.5% this week", trend: "up", subtext: "CEFR Level B2 Upper-Intermediate", format: "number", sparkline: [65, 70, 74, 78, 80, 82] },
        { id: 'm2', label: "Active Vocabulary", value: "1,420 Words", change: "+45 new terms", trend: "up", subtext: "94% long-term memory retention", format: "number", sparkline: [1200, 1260, 1310, 1360, 1390, 1420] },
        { id: 'm3', label: "Pronunciation Score", value: "91% Accuracy", change: "Native cadence match", trend: "up", subtext: "Pitch, intonation & phonetics", format: "percentage", sparkline: [82, 85, 87, 89, 90, 91] },
        { id: 'm4', label: "Daily Speaking Streak", value: "14 Days", change: "Personal record", trend: "up", subtext: "Target: 15 mins daily conversation", format: "text", sparkline: [4, 6, 8, 10, 12, 14] }
      ],
      initialState: {},
      layout: [
        {
          id: `sec_lang_hero_${timestamp}`,
          gridCols: 1,
          components: [
            {
              id: `lang_hero_${timestamp}`,
              type: 'image',
              title: "LingoAI • Real-Time AI Language Coach & Accent Practice",
              description: "Interactive voice dialogue, situational conversation scenarios, real-time grammar feedback, and high-frequency word flashcards.",
              url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&auto=format&fit=crop&q=80",
              aspectRatio: "wide"
            }
          ]
        },
        {
          id: `sec_lang_grid_${timestamp}`,
          gridCols: 2,
          components: [
            {
              id: `chart_proficiency_${timestamp}`,
              type: 'chart',
              chartType: 'area',
              title: "Speaking Proficiency & Fluency Trend",
              subtitle: "Weekly progress across Vocabulary, Grammar & Accent Accuracy",
              xAxisKey: "week",
              dataKeys: [
                { key: "fluency", name: "Fluency Score", color: "#6366f1" },
                { key: "grammar", name: "Grammar Accuracy (%)", color: "#10b981" }
              ],
              data: [
                { week: "Wk 1", fluency: 65, grammar: 72 },
                { week: "Wk 2", fluency: 70, grammar: 78 },
                { week: "Wk 3", fluency: 75, grammar: 82 },
                { week: "Wk 4", fluency: 82, grammar: 89 }
              ]
            },
            {
              id: `table_active_vocab_${timestamp}`,
              type: 'table',
              title: "Active Vocabulary & Expression Vault",
              description: "CEFR level, word definitions, and audio practice status",
              searchable: true,
              exportable: true,
              columns: [
                { key: "word", label: "Word / Phrase", type: "text" },
                { key: "meaning", label: "English Translation", type: "text" },
                { key: "level", label: "CEFR Level", type: "badge", badgeColorMap: { "A2": "bg-sky-500/10 text-sky-600 border-sky-500/20", "B1": "bg-indigo-500/10 text-indigo-600 border-indigo-500/20", "B2": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", "C1": "bg-purple-500/10 text-purple-600 border-purple-500/20" } },
                { key: "mastery", label: "Mastery Score", type: "text" },
                { key: "status", label: "Review Status", type: "badge", badgeColorMap: { "Mastered": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", "Due Today": "bg-amber-500/10 text-amber-600 border-amber-500/20" } }
              ],
              data: [
                { word: "Bienveillance", meaning: "Benevolence / Kindness", level: "C1", mastery: "96%", status: "Mastered" },
                { word: "Épanouissement", meaning: "Fulfillment / Flourishing", level: "C1", mastery: "88%", status: "Mastered" },
                { word: "Incontournable", meaning: "Essential / Unmissable", level: "B2", mastery: "92%", status: "Mastered" },
                { word: "Dépaysement", meaning: "Change of scenery", level: "B2", mastery: "78%", status: "Due Today" },
                { word: "Insolite", meaning: "Unusual / Quirky", level: "B1", mastery: "84%", status: "Due Today" }
              ]
            }
          ]
        },
        {
          id: `sec_lang_actions_${timestamp}`,
          gridCols: 1,
          components: [
            {
              id: `action_interactive_sessions_${timestamp}`,
              type: 'action_list',
              title: "Interactive AI Speaking Sessions & Dialogue Drills",
              description: "Practice immersive real-time audio scenarios with instant accent feedback",
              actions: [
                { id: "la1", title: "🎙️ Start 15-Min Live AI Voice Conversation", description: "Topic: Ordering gourmet dinner & wine at a French Bistro • B2 Level", icon: "Mic", buttonText: "Begin Speaking Session" },
                { id: "la2", title: "🎧 Pronunciation & Phonetics Accent Drill", description: "Practice nasal vowels, liaison rules, and intonation pitch curve", icon: "Volume2", buttonText: "Start Drill" },
                { id: "la3", title: "📝 Spaced Repetition Vocabulary Speed Quiz", description: "20 Flashcards due for review • Spaced repetition algorithm", icon: "Zap", buttonText: "Launch Flashcards" }
              ]
            }
          ]
        },
        {
          id: `sec_lang_courses_${timestamp}`,
          gridCols: 2,
          components: [
            {
              id: `lang_course_card1_${timestamp}`,
              type: 'image',
              title: "French Bistro Dialogue & Conversation Masterclass",
              description: "12 Interactive Audio Scenarios • CEFR B2 Speaking Practice with AI Coach",
              url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80",
              aspectRatio: "video"
            },
            {
              id: `lang_course_card2_${timestamp}`,
              type: 'image',
              title: "Phonetics, Liaison & Accent Pitch Curve Training",
              description: "Real-time Voice Waveform Analysis • 98% Intonation Match Target",
              url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80",
              aspectRatio: "video"
            }
          ]
        }
      ],
      assistantMessage: `I've synthesized a full interactive AI Language Tutor & Speaking Practice UI schema for "${prompt}". It features a speaking proficiency trend graph, active vocabulary vault table with CEFR levels, high-res situational course imagery, and AI voice dialogue drill controls.`
    };
  }

  // 0.0000 STUDY & SYLLABUS PLANNER / ACADEMIC TIMETABLE
  if (
    p.includes('study') ||
    p.includes('syllabus') ||
    p.includes('timetable') ||
    p.includes('exam') ||
    p.includes('academic') ||
    p.includes('course planner') ||
    p.includes('student')
  ) {
    return {
      id: `study_${timestamp}`,
      title: `EduPlan • AI Academic Timetable & Syllabus Tracker`,
      description: "Personalized study timetable, exam countdown, syllabus completion tracker, and AI focus recommendations.",
      category: "Education & Academic",
      theme: customTheme || { accentColor: "sky", style: "modern" },
      generatedPrompt: prompt,
      metrics: [
        { id: 'm1', label: "Syllabus Coverage", value: "78%", change: "+8% this week", trend: "up", subtext: "32 of 41 topics completed", format: "percentage", sparkline: [50, 58, 64, 70, 74, 78] },
        { id: 'm2', label: "Total Focus Hours", value: "34.5 hrs", change: "+4.2 hrs vs target", trend: "up", subtext: "Avg 5.8 hrs / day", format: "text", sparkline: [22, 25, 28, 30, 32, 34.5] },
        { id: 'm3', label: "Upcoming Exams", value: "3 Papers", change: "First exam in 4 days", trend: "neutral", subtext: "Operating Systems, DSA, Networks", format: "text", sparkline: [5, 4, 4, 3, 3, 3] },
        { id: 'm4', label: "Revision Mastery", value: "92 / 100", change: "High retention score", trend: "up", subtext: "Based on active recall quizzes", format: "number", sparkline: [80, 84, 86, 88, 90, 92] }
      ],
      initialState: {},
      layout: [
        {
          id: `sec_study_hero_${timestamp}`,
          gridCols: 1,
          components: [
            {
              id: `study_hero_${timestamp}`,
              type: 'image',
              title: "AI Personal Study Timetable & Exam Preparation Hub",
              description: "Structured daily focus blocks, topic-by-topic syllabus tracker, active recall flashcards, and exam countdowns.",
              url: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1200&auto=format&fit=crop&q=80",
              aspectRatio: "wide"
            }
          ]
        },
        {
          id: `sec_study_grid_${timestamp}`,
          gridCols: 2,
          components: [
            {
              id: `table_timetable_${timestamp}`,
              type: 'table',
              title: "Personalized Daily Study Timetable",
              description: "Time-blocked revision schedule and active recall sessions",
              searchable: true,
              exportable: true,
              columns: [
                { key: "time", label: "Time Slot", type: "text" },
                { key: "subject", label: "Subject", type: "text" },
                { key: "topic", label: "Syllabus Topic / Chapter", type: "text" },
                { key: "priority", label: "Priority", type: "badge", badgeColorMap: { "High": "bg-rose-500/10 text-rose-600 border-rose-500/20", "Medium": "bg-amber-500/10 text-amber-600 border-amber-500/20" } },
                { key: "status", label: "Status", type: "badge", badgeColorMap: { "Completed": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", "In Progress": "bg-sky-500/10 text-sky-600 border-sky-500/20" } }
              ],
              data: [
                { time: "09:00 AM - 10:30 AM", subject: "Data Structures", topic: "Graph Traversal (DFS/BFS & Shortest Path)", priority: "High", status: "Completed" },
                { time: "11:00 AM - 12:30 PM", subject: "Operating Systems", topic: "Process Synchronization & Semaphore Locks", priority: "High", status: "In Progress" },
                { time: "02:00 PM - 03:30 PM", subject: "Computer Networks", topic: "TCP/IP Handshake & Congestion Control", priority: "Medium", status: "Scheduled" },
                { time: "04:30 PM - 06:00 PM", subject: "System Design", topic: "Database Sharding & Caching Strategies", priority: "High", status: "Scheduled" }
              ]
            },
            {
              id: `chart_syllabus_${timestamp}`,
              type: 'chart',
              chartType: 'bar',
              title: "Syllabus Completion % by Subject",
              subtitle: "Topics mastered vs remaining in curriculum",
              xAxisKey: "subject",
              dataKeys: [
                { key: "completed", name: "Completed (%)", color: "#0284c7" },
                { key: "target", name: "Target (%)", color: "#10b981" }
              ],
              data: [
                { subject: "Data Structures", completed: 88, target: 100 },
                { subject: "Operating Systems", completed: 75, target: 100 },
                { subject: "Computer Networks", completed: 70, target: 100 },
                { subject: "System Design", completed: 80, target: 100 }
              ]
            }
          ]
        },
        {
          id: `sec_study_checklist_${timestamp}`,
          gridCols: 1,
          components: [
            {
              id: `action_study_${timestamp}`,
              type: 'action_list',
              title: "AI-Generated Action Plans & Study Goals",
              description: "Recommended active recall and practice problem sets",
              actions: [
                { id: "s1", title: "Solve 10 LeetCode Graph Problems (Medium/Hard)", description: "Focus on Dijkstra & Topological Sort algorithms", icon: "Code", buttonText: "Start Practice" },
                { id: "s2", title: "Revise Operating Systems Page Replacement Notes", description: "Review FIFO, LRU, and Optimal page replacement algorithms", icon: "BookOpen", buttonText: "Open Notes" },
                { id: "s3", title: "Complete Mock Test Paper 3 — Computer Networks", description: "Time limit: 60 minutes • 30 Multiple choice questions", icon: "FileText", buttonText: "Take Test" }
              ]
            }
          ]
        }
      ],
      assistantMessage: `I've synthesized a comprehensive AI Study Planner UI schema based on your request "${prompt}". It includes a personalized study timetable, syllabus completion bar chart, exam countdown metrics, and active recall action items.`
    };
  }

  // 0.00 FOOD & DINING / FOODRUSH / SWIGGY / ZOMATO / PIZZA / BURGER / BIRYANI APP
  if (
    p.includes('food') ||
    p.includes('dining') ||
    p.includes('restaurant') ||
    p.includes('swiggy') ||
    p.includes('zomato') ||
    p.includes('foodrush') ||
    p.includes('pizza') ||
    p.includes('burger') ||
    p.includes('biryani') ||
    p.includes('gourmet')
  ) {
    return {
      id: `foodrush_${timestamp}`,
      title: `FoodRush • Gourmet Food Delivery & Restaurant Platform`,
      description: "Order gourmet meals from top-rated local restaurants with guaranteed 20-minute delivery, live GPS order tracking, and exclusive discounts.",
      category: "Food Delivery & Dining",
      theme: customTheme || { accentColor: "amber", style: "modern" },
      generatedPrompt: prompt,
      metrics: [
        {
          id: 'm1',
          label: "Active Local Restaurants",
          value: "2,450+ Places",
          change: "+18 new today",
          trend: "up",
          subtext: "Guaranteed 20-min express delivery",
          format: "text",
          sparkline: [2100, 2200, 2300, 2380, 2410, 2450]
        },
        {
          id: 'm2',
          label: "Average Delivery Time",
          value: "18.4 Mins",
          change: "-2.1 mins faster",
          trend: "up",
          subtext: "Hot & fresh thermal pouch dispatch",
          format: "text",
          sparkline: [24, 22, 21, 20, 19, 18.4]
        },
        {
          id: 'm3',
          label: "Customer Delight Rating",
          value: "4.92 ★",
          change: "+0.06 overall score",
          trend: "up",
          subtext: "Based on 38,400+ food reviews",
          format: "text",
          sparkline: [4.80, 4.84, 4.87, 4.89, 4.91, 4.92]
        }
      ],
      initialState: {
        address: "123 Green Park, Sector 4",
        search: "Pizza, Biryani, Burgers",
        coupon: "FOODRUSH50"
      },
      layout: [
        {
          id: 'sec_food_hero',
          gridCols: 1,
          components: [
            {
              id: `food_hero_banner_${timestamp}`,
              type: 'image',
              title: "Craving Gourmet Pizza or Biryani? FOODRUSH FEAST • UP TO 50% OFF",
              description: "Order from 2000+ top rated local restaurants with guaranteed 20-minute delivery. Claim your offer now!",
              url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80",
              aspectRatio: "wide"
            }
          ]
        },
        {
          id: 'sec_food_categories',
          gridCols: 1,
          components: [
            {
              id: `food_cats_${timestamp}`,
              type: 'food_category_grid',
              title: "What's on your mind?",
              categories: [
                { id: "cat_pizza", name: "Pizza", imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&auto=format&fit=crop&q=80", offerText: "UP TO 50% OFF" },
                { id: "cat_burgers", name: "Burgers", imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&auto=format&fit=crop&q=80", offerText: "FLAT 20% OFF" },
                { id: "cat_biryani", name: "Biryani", imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&auto=format&fit=crop&q=80", offerText: "FREE EXPRESS" },
                { id: "cat_chinese", name: "Chinese", imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200&auto=format&fit=crop&q=80", offerText: "TOP RATED" },
                { id: "cat_desserts", name: "Desserts", imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=200&auto=format&fit=crop&q=80", offerText: "SWEET DEALS" },
                { id: "cat_south_indian", name: "South Indian", imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=200&auto=format&fit=crop&q=80", offerText: "AUTHENTIC" },
                { id: "cat_north_indian", name: "North Indian", imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=200&auto=format&fit=crop&q=80", offerText: "BESTSELLER" },
                { id: "cat_healthy", name: "Healthy", imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&auto=format&fit=crop&q=80", offerText: "FRESH SALADS" }
              ]
            }
          ]
        },
        {
          id: 'sec_top_restaurants',
          gridCols: 1,
          components: [
            {
              id: `top_restaurants_list_${timestamp}`,
              type: 'restaurant_list',
              title: "Top Restaurants Near You",
              subtitle: "Handpicked gourmet places with fast 20-minute delivery and 4.7+ star ratings",
              restaurants: [
                {
                  id: "r1",
                  name: "The Artisan Pizza Project",
                  cuisine: "Italian • Woodfired Pizza • Gourmet Pasta",
                  rating: 4.9,
                  reviewsCount: "1.8k+",
                  deliveryTime: "20-25 mins",
                  distance: "1.2 km",
                  priceForTwo: "$18",
                  offerBadge: "50% OFF UP TO $10",
                  imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80"
                },
                {
                  id: "r2",
                  name: "Royal Hyderabadi Biryani House",
                  cuisine: "Hyderabadi • Mughlai • Authentic Kebabs",
                  rating: 4.8,
                  reviewsCount: "4.2k+",
                  deliveryTime: "25-30 mins",
                  distance: "2.4 km",
                  priceForTwo: "$22",
                  offerBadge: "FREE EXPRESS DELIVERY",
                  imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80"
                },
                {
                  id: "r3",
                  name: "Burger Craft & Milkshake Bar",
                  cuisine: "American • Angus Burgers • Craft Shakes",
                  rating: 4.7,
                  reviewsCount: "950+",
                  deliveryTime: "15-20 mins",
                  distance: "0.8 km",
                  priceForTwo: "$15",
                  offerBadge: "FLAT 20% OFF",
                  imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80"
                }
              ]
            }
          ]
        },
        {
          id: 'sec_popular_dishes',
          gridCols: 1,
          components: [
            {
              id: `food_menu_${timestamp}`,
              type: 'food_menu',
              title: "Trending Bestseller Dishes",
              subtitle: "Most ordered dishes near you right now",
              items: [
                {
                  id: "m1",
                  name: "Woodfired Neapolitan Margherita Pizza",
                  description: "San Marzano tomato sauce, fresh buffalo mozzarella, virgin olive oil, and sweet basil leaves.",
                  price: 15.99,
                  rating: 4.9,
                  imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=80",
                  isVeg: true,
                  isBestseller: true,
                  category: "Pizzas"
                },
                {
                  id: "m4",
                  name: "Special Chicken Dum Biryani Handi",
                  description: "Slow-cooked basmati rice with marinated chicken, saffron, mint raita & mirchi salan.",
                  price: 16.99,
                  rating: 4.9,
                  imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&auto=format&fit=crop&q=80",
                  isVeg: false,
                  isBestseller: true,
                  category: "Biryani"
                },
                {
                  id: "m6",
                  name: "Smokey Angus Truffle Burger",
                  description: "Double Angus beef patty, aged cheddar, caramelized onions, black truffle aioli on brioche.",
                  price: 13.99,
                  rating: 4.9,
                  imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80",
                  isVeg: false,
                  isBestseller: true,
                  category: "Burgers"
                }
              ]
            }
          ]
        }
      ],
      assistantMessage: `I've synthesized a high-quality Food Delivery & Dining UI schema based on your request "${prompt}". It includes a hero offer banner, category circles ("What's on your mind?"), top-rated restaurant card grid with rating badges, delivery times, and bestseller food menus.`
    };
  }

  // 0.0 RIDE-BOOKING & TRANSPORT / RIDEX / UBER / CAB / TAXI / DRIVER APP
  if (
    p.includes('ride') ||
    p.includes('ridex') ||
    p.includes('uber') ||
    p.includes('cab') ||
    p.includes('taxi') ||
    p.includes('driver') ||
    p.includes('transport')
  ) {
    return {
      id: `ridex_${timestamp}`,
      title: `RideX • Next-Gen Urban Mobility & Ride Booking Platform`,
      description: "Book instant rides, estimate fares, track drivers live, manage digital wallet payments, access emergency safety tools, and view live trip analytics.",
      category: "Ride-Booking & Transport",
      theme: customTheme || { accentColor: "cyan", style: "modern" },
      generatedPrompt: prompt,
      metrics: [
        {
          id: 'm1',
          label: "Active Drivers Online",
          value: "4,820 Drivers",
          change: "+12.4% vs last week",
          trend: "up",
          subtext: "High coverage in Sector 4 & Downtown",
          format: "text",
          sparkline: [3800, 4100, 4350, 4500, 4700, 4820]
        },
        {
          id: 'm2',
          label: "Average Pickup ETA",
          value: "2.4 Mins",
          change: "-0.5 min faster",
          trend: "up",
          subtext: "Optimal vehicle dispatch density",
          format: "text",
          sparkline: [3.8, 3.4, 3.1, 2.8, 2.5, 2.4]
        },
        {
          id: 'm3',
          label: "Completed Rides Today",
          value: 18450,
          change: "+14.8% YoY",
          trend: "up",
          subtext: "Peak surge between 5 PM - 8 PM",
          format: "number",
          sparkline: [12000, 14200, 15800, 16900, 17500, 18450]
        },
        {
          id: 'm4',
          label: "Passenger Satisfaction",
          value: "4.94 ★",
          change: "+0.08 rating score",
          trend: "up",
          subtext: "Based on 14,200 verified trip reviews",
          format: "text",
          sparkline: [4.82, 4.85, 4.88, 4.90, 4.92, 4.94]
        }
      ],
      initialState: {
        pickup: "742 Evergreen Terrace, Sector 4",
        destination: "Grand City Airport (Terminal 3)",
        rideType: "Go ($12.80)",
        promoCode: "RIDEXFIRST"
      },
      layout: [
        {
          id: 'sec_ridex_hero',
          gridCols: 1,
          components: [
            {
              id: `ridex_map_hero_${timestamp}`,
              type: 'image',
              title: "Ready for Your Next Trip? RideX Express • Up to 30% OFF",
              description: "Book 24/7 urban rides, instant moto, comfort sedans & luxury SUVs with live GPS driver tracking.",
              url: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&auto=format&fit=crop&q=80",
              aspectRatio: "wide"
            }
          ]
        },
        {
          id: 'sec_ridex_categories',
          gridCols: 1,
          components: [
            {
              id: 'ridex_cat_grid',
              type: 'food_category_grid',
              title: "What's on your mind? Choose Ride Category",
              categories: [
                { id: "cat_moto", name: "RideX Moto", icon: "Bike", offerText: "FASTEST", imageUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=200&auto=format&fit=crop&q=80" },
                { id: "cat_go", name: "RideX Go", icon: "Car", offerText: "POPULAR", imageUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=200&auto=format&fit=crop&q=80" },
                { id: "cat_comfort", name: "Comfort", icon: "Car", offerText: "TOP DRIVERS", imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=200&auto=format&fit=crop&q=80" },
                { id: "cat_lux", name: "RideX Lux", icon: "Crown", offerText: "EXECUTIVE SUV", imageUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=200&auto=format&fit=crop&q=80" },
                { id: "cat_airport", name: "Airport", icon: "Navigation", offerText: "FLAT $25", imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200&auto=format&fit=crop&q=80" },
                { id: "cat_rental", name: "Hourly Cab", icon: "Clock", offerText: "FLEXIBLE", imageUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=200&auto=format&fit=crop&q=80" }
              ]
            }
          ]
        },
        {
          id: 'sec_top_drivers',
          gridCols: 1,
          components: [
            {
              id: 'top_drivers_grid',
              type: 'restaurant_list',
              title: "Top Rated Nearby Drivers & Vehicles",
              subtitle: "Verified drivers with 4.9+ star ratings, clean vehicles & 3-minute arrival",
              restaurants: [
                {
                  id: "d1",
                  name: "Marcus Vance • Toyota Camry Hybrid",
                  cuisine: "Midnight Silver Sedan • Clean & Sanitized",
                  rating: 4.94,
                  reviewsCount: "3.4k+ trips",
                  deliveryTime: "3 mins away",
                  distance: "0.4 km",
                  priceForTwo: "$12.80",
                  offerBadge: "TOP PARTNER • 3 MINS",
                  imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80",
                  isVegOnly: false,
                  isPromoted: true
                },
                {
                  id: "d2",
                  name: "Elena Rostova • Honda Accord Executive",
                  cuisine: "Pearl White Sedan • High Rated Driver",
                  rating: 4.98,
                  reviewsCount: "2.1k+ trips",
                  deliveryTime: "4 mins away",
                  distance: "0.8 km",
                  priceForTwo: "$18.50",
                  offerBadge: "COMFORT CLASS",
                  imageUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80",
                  isVegOnly: false,
                  isPromoted: false
                },
                {
                  id: "d3",
                  name: "David Chen • BMW X5 Luxury SUV",
                  cuisine: "Deep Onyx Black SUV • 6 Leather Seats",
                  rating: 4.95,
                  reviewsCount: "1.8k+ trips",
                  deliveryTime: "6 mins away",
                  distance: "1.2 km",
                  priceForTwo: "$28.90",
                  offerBadge: "LUXURY EXECUTIVE",
                  imageUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80",
                  isVegOnly: false,
                  isPromoted: false
                }
              ]
            }
          ]
        },
        {
          id: 'sec_ride_passes',
          gridCols: 1,
          components: [
            {
              id: 'ride_passes_menu',
              type: 'food_menu',
              title: "Popular Ride Passes & Savings Bundles",
              subtitle: "Save up to 40% on daily commutes with RideX Pass",
              items: [
                {
                  id: "rp1",
                  name: "Daily Commute Pass (10 Rides)",
                  description: "Flat 25% discount on all morning & evening peak hour rides within city limits.",
                  price: 49.99,
                  rating: 4.9,
                  imageUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&auto=format&fit=crop&q=80",
                  isVeg: true,
                  isBestseller: true,
                  category: "Passes"
                },
                {
                  id: "rp2",
                  name: "Airport Express Transfer Pass",
                  description: "Guaranteed priority pickup with zero surge pricing for 4 airport trips.",
                  price: 35.00,
                  rating: 4.9,
                  imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&auto=format&fit=crop&q=80",
                  isVeg: true,
                  isBestseller: true,
                  category: "Airport"
                },
                {
                  id: "rp3",
                  name: "RideX Moto Solo Pack (15 Rides)",
                  description: "Ultra-affordable bike taxi pass for fast solo trips across town.",
                  price: 19.99,
                  rating: 4.8,
                  imageUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400&auto=format&fit=crop&q=80",
                  isVeg: true,
                  isBestseller: true,
                  category: "Moto"
                }
              ]
            }
          ]
        }
      ]
    };
  }

  // 0.00 REMINDER, SMART ALARM, AI PERSONAL ASSISTANT, TASKS & CALENDAR
  if (
    p.includes('remindme') ||
    p.includes('reminder') ||
    p.includes('reminders') ||
    p.includes('smart alarm') ||
    p.includes('alarm app') ||
    p.includes('assistant') ||
    p.includes('ai chat') ||
    p.includes('voice command') ||
    p.includes('voice assistant') ||
    p.includes('task') ||
    p.includes('calendar') ||
    p.includes('study') ||
    p.includes('planner') ||
    p.includes('timetable') ||
    p.includes('syllabus') ||
    p.includes('personal assistant')
  ) {
    return {
      id: `remindme_${timestamp}`,
      title: `AI Personal Command Center • Tasks, Voice & Reminders`,
      description: "AI-driven personal assistant for managing daily tasks, voice commands, calendar schedules, smart alarms, and productivity automation.",
      category: "AI Personal Assistant & Reminders",
      theme: customTheme || { accentColor: "indigo", style: "modern" },
      generatedPrompt: prompt,
      metrics: [
        {
          id: 'm1',
          label: "Active Reminders & Tasks",
          value: "8 Items",
          change: "+3 scheduled today",
          trend: "up",
          subtext: "5 completed so far today",
          format: "text",
          sparkline: [4, 5, 6, 7, 8, 8]
        },
        {
          id: 'm2',
          label: "Habit & Goal Streak",
          value: "12 Days 🔥",
          change: "+1 day streak",
          trend: "up",
          subtext: "Personal best: 28 Days",
          format: "text",
          sparkline: [7, 8, 9, 10, 11, 12]
        }
      ],
      assistantMessage: `I've generated a high-fidelity AI Personal Command Center based on your request "${prompt}". It features an interactive AI Voice & Chat Assistant stream, real-time task management, calendar event scheduler, smart alarms with math locks, and daily habit tracking.`,
      initialState: {},
      layout: []
    };
  }

  // 0.000 LUXURY HOTEL & RESORT BOOKING / HOTEL / RESORT / VILLA / SUITES / STAY / RESERVATION
  if (
    p.includes('hotel') ||
    p.includes('resort') ||
    p.includes('villa') ||
    p.includes('suite') ||
    p.includes('stay') ||
    p.includes('booking') ||
    p.includes('hospitality') ||
    p.includes('room')
  ) {
    return {
      id: `hotel_${timestamp}`,
      title: `Grand Horizon Luxury Hotel & Resort Portal`,
      description: "Book five-star oceanfront villas, luxury penthouses, spa retreats, private dining, and manage concierge guest reservations.",
      category: "Hotel & Resort Booking",
      theme: customTheme || { accentColor: "amber", style: "modern" },
      generatedPrompt: prompt,
      metrics: [
        { id: 'm1', label: "Available Suites", value: "18 Suites", change: "4 Penthouses left", trend: "up", subtext: "High seasonal demand", format: "text", sparkline: [12, 14, 15, 16, 17, 18] },
        { id: 'm2', label: "Average Nightly Rate", value: "$520", change: "+12.4% vs peak", trend: "up", subtext: "Includes breakfast & spa", format: "currency", sparkline: [420, 450, 480, 500, 510, 520] },
        { id: 'm3', label: "Guest Satisfaction", value: "4.95 ★", change: "99.2% positive", trend: "up", subtext: "Based on 3,420 reviews", format: "text", sparkline: [4.8, 4.85, 4.9, 4.92, 4.94, 4.95] },
        { id: 'm4', label: "Resort Occupancy", value: "92.8%", change: "Near full capacity", trend: "up", subtext: "Peak holiday bookings", format: "percentage", sparkline: [82, 85, 88, 90, 91, 92.8] }
      ],
      initialState: {},
      layout: [
        {
          id: 'sec_hotel_hero',
          gridCols: 1,
          components: [
            {
              id: `hotel_hero_${timestamp}`,
              type: 'image',
              title: "Experience Unrivaled Luxury — Oceanfront Villas & Private Infinity Pools",
              description: "Book direct for complimentary spa credits, 24/7 butler service, private helipad transfers, and sunset dining.",
              url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=80",
              aspectRatio: "wide"
            }
          ]
        },
        {
          id: 'sec_hotel_categories',
          gridCols: 1,
          components: [
            {
              id: `hotel_cats_${timestamp}`,
              type: 'food_category_grid',
              title: "Explore Luxury Accommodation Suites & Villas",
              categories: [
                { id: "h1", name: "Oceanfront Villa", icon: "Sun", offerText: "PRIVATE POOL", imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200&auto=format&fit=crop&q=80" },
                { id: "h2", name: "Penthouse Suite", icon: "Crown", offerText: "360 VIEW", imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=200&auto=format&fit=crop&q=80" },
                { id: "h3", name: "Presidential Suite", icon: "Star", offerText: "BUTLER INCLUDED", imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=200&auto=format&fit=crop&q=80" },
                { id: "h4", name: "Wellness Spa Chalet", icon: "Heart", offerText: "ALL INCLUSIVE", imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=200&auto=format&fit=crop&q=80" },
                { id: "h5", name: "Overwater Bungalow", icon: "Compass", offerText: "BALCONY JACUZZI", imageUrl: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=200&auto=format&fit=crop&q=80" }
              ]
            }
          ]
        },
        {
          id: 'sec_hotel_listings',
          gridCols: 1,
          components: [
            {
              id: `hotel_list_${timestamp}`,
              type: 'restaurant_list',
              title: "Top Rated Luxury Suites & Private Residences",
              subtitle: "Handpicked five-star suites with direct beach access, king beds, and VIP guest privileges",
              restaurants: [
                {
                  id: "res1",
                  name: "The Royal Oceanfront Horizon Villa",
                  cuisine: "3 King Bedrooms • Private Infinity Pool • Helipad",
                  rating: 4.98,
                  reviewsCount: "1.2k reviews",
                  deliveryTime: "Direct Beach Access",
                  distance: "0.1 km",
                  priceForTwo: "$680 / night",
                  offerBadge: "FLAT 20% OFF WEEKDAYS",
                  imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
                  isVegOnly: false,
                  isPromoted: true
                },
                {
                  id: "res2",
                  name: "Grand Skylight Penthouse Suite",
                  cuisine: "Panoramic Bay View • Jacuzzi Terrace • Chef Service",
                  rating: 4.92,
                  reviewsCount: "850 reviews",
                  deliveryTime: "Top Floor Tower",
                  distance: "0.5 km",
                  priceForTwo: "$850 / night",
                  offerBadge: "FREE AIRPORT TRANSFER",
                  imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80",
                  isVegOnly: false,
                  isPromoted: false
                },
                {
                  id: "res3",
                  name: "Botanical Spa & Thermal Chalet",
                  cuisine: "Thermal Mineral Bath • Organic Dining • Sauna",
                  rating: 4.88,
                  reviewsCount: "640 reviews",
                  deliveryTime: "Private Garden View",
                  distance: "1.4 km",
                  priceForTwo: "$450 / night",
                  offerBadge: "FREE SPA MASSAGE",
                  imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80",
                  isVegOnly: false,
                  isPromoted: false
                }
              ]
            }
          ]
        }
      ]
    };
  }

  // 0.0000 CONSTRUCTION / WORKERS / CONTRACTOR / TRADES / WORK / SITE / BLUE COLLAR / JOB MARKETPLACE
  if (
    p.includes('construction') ||
    p.includes('worker') ||
    p.includes('contractor') ||
    p.includes('builder') ||
    p.includes('trade') ||
    p.includes('labour') ||
    p.includes('labor') ||
    p.includes('carpenter') ||
    p.includes('electrician') ||
    p.includes('plumber') ||
    p.includes('mason')
  ) {
    return {
      id: `construction_${timestamp}`,
      title: `BuildCraft • Construction & Skilled Worker Marketplace`,
      description: "Verified worker profiles, trade certifications, daily job site allocations, equipment logs, and instant worker hiring.",
      category: "Construction & Skilled Trades",
      theme: customTheme || { accentColor: "amber", style: "modern" },
      generatedPrompt: prompt,
      metrics: [
        { id: 'm1', label: "Verified Active Workers", value: "1,480 Workers", change: "+42 on site today", trend: "up", subtext: "OSHA & Trade certified", format: "text", sparkline: [1200, 1280, 1340, 1390, 1420, 1480] },
        { id: 'm2', label: "Average Daily Wage", value: 240, change: "+$12.50 MoM", trend: "up", subtext: "Standard 8-hour shift rate", format: "currency", sparkline: [210, 218, 225, 230, 235, 240] },
        { id: 'm3', label: "Job Site Safety Score", value: "99.4%", change: "Zero safety incidents", trend: "up", subtext: "Inspected by Site Engineers", format: "percentage", sparkline: [98, 98.5, 98.8, 99, 99.2, 99.4] },
        { id: 'm4', label: "Active Project Sites", value: "32 Sites", change: "6 new sites this mo", trend: "up", subtext: "Commercial & Residential", format: "number", sparkline: [22, 24, 26, 28, 30, 32] }
      ],
      initialState: {},
      layout: [
        {
          id: 'sec_const_hero',
          gridCols: 1,
          components: [
            {
              id: `const_hero_${timestamp}`,
              type: 'image',
              title: "On-Demand Skilled Construction Workers & Licensed Trade Professionals",
              description: "Hire certified electricians, masons, plumbers, heavy equipment operators & civil site supervisors instantly.",
              url: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=1200&auto=format&fit=crop&q=80",
              aspectRatio: "wide"
            }
          ]
        },
        {
          id: 'sec_const_categories',
          gridCols: 1,
          components: [
            {
              id: `const_cats_${timestamp}`,
              type: 'food_category_grid',
              title: "Browse Workers by Skilled Trade Specialization",
              categories: [
                { id: "c_elec", name: "Master Electricians", icon: "Zap", offerText: "OSHA CERTIFIED", imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&auto=format&fit=crop&q=80" },
                { id: "c_mason", name: "Structural Masons", icon: "Layers", offerText: "VERIFIED EXP", imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&auto=format&fit=crop&q=80" },
                { id: "c_heavy", name: "Crane Operators", icon: "Briefcase", offerText: "LICENSED RIGGER", imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&auto=format&fit=crop&q=80" },
                { id: "c_plumb", name: "Commercial Plumbers", icon: "Compass", offerText: "24/7 ONSITE", imageUrl: "https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=200&auto=format&fit=crop&q=80" },
                { id: "c_carpent", name: "Finish Carpenters", icon: "Star", offerText: "HIGH RATED", imageUrl: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=200&auto=format&fit=crop&q=80" }
              ]
            }
          ]
        },
        {
          id: 'sec_const_workers',
          gridCols: 1,
          components: [
            {
              id: `const_list_${timestamp}`,
              type: 'restaurant_list',
              title: "Top Rated Verified Construction Workers Available For Hire",
              subtitle: "Licensed trade professionals with verified work history, safety badges, and instant availability",
              restaurants: [
                {
                  id: "w1",
                  name: "Marcus Vance — Master Industrial Electrician",
                  cuisine: "12 Yrs Exp • High Voltage Wiring • Commercial Safety Lead",
                  rating: 4.98,
                  reviewsCount: "148 jobs done",
                  deliveryTime: "Available Today",
                  distance: "2.4 km away",
                  priceForTwo: "$48 / hr",
                  offerBadge: "OSHA CERTIFIED • TOP WORKER",
                  imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80",
                  isVegOnly: false,
                  isPromoted: true
                },
                {
                  id: "w2",
                  name: "David Rivera — Heavy Crane & Rigging Operator",
                  cuisine: "8 Yrs Exp • Commercial Tower Crane • Rigging Specialist",
                  rating: 4.92,
                  reviewsCount: "92 jobs done",
                  deliveryTime: "Available Tomorrow",
                  distance: "4.1 km away",
                  priceForTwo: "$55 / hr",
                  offerBadge: "COMMERCIAL LICENSE",
                  imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop&q=80",
                  isVegOnly: false,
                  isPromoted: false
                },
                {
                  id: "w3",
                  name: "Sophia Chen — Civil Site Supervisor & Masonry Lead",
                  cuisine: "10 Yrs Exp • Concrete Pouring • Blueprint & Structural Audit",
                  rating: 4.95,
                  reviewsCount: "210 jobs done",
                  deliveryTime: "Available Today",
                  distance: "1.8 km away",
                  priceForTwo: "$52 / hr",
                  offerBadge: "CIVIL ENG DIPLOMA",
                  imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80",
                  isVegOnly: false,
                  isPromoted: false
                }
              ]
            }
          ]
        }
      ]
    };
  }

  // 0. FOOD DELIVERY / FOODRUSH / RESTAURANT / SWIGGY / DINING / MENU / MEAL / DISHES / BITES / KITCHEN / CAFE
  if (
    p.includes('food') ||
    p.includes('restaurant') ||
    p.includes('delivery') ||
    p.includes('swiggy') ||
    p.includes('foodrush') ||
    p.includes('dining') ||
    p.includes('menu') ||
    p.includes('meal') ||
    p.includes('dish') ||
    p.includes('pizza') ||
    p.includes('burger') ||
    p.includes('biryani') ||
    p.includes('kitchen') ||
    p.includes('cuisine') ||
    p.includes('eat') ||
    p.includes('cafe') ||
    p.includes('order food')
  ) {
    return {
      id: `foodrush_${timestamp}`,
      title: `FoodRush • Gourmet Food & Express Delivery`,
      description: "Order from top-rated local restaurants, track live delivery drivers, claim daily discount coupons, and explore curated cuisines.",
      category: "Food Delivery & Dining",
      theme: customTheme || { accentColor: "amber", style: "modern" },
      generatedPrompt: prompt,
      metrics: [],
      initialState: {},
      layout: [
        {
          id: 'sec_food_hero',
          gridCols: 1,
          components: [
            {
              id: `food_hero_${timestamp}`,
              type: 'image',
              title: "FoodRush Feast - Flat 50% OFF on Top Gourmet Restaurants",
              description: "Use code FOODRUSH50 • Free express delivery on orders over $15 • 2000+ restaurants near you.",
              url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80",
              aspectRatio: "wide"
            }
          ]
        },
        {
          id: 'sec_food_categories',
          gridCols: 1,
          components: [
            {
              id: 'cuisines_grid',
              type: 'food_category_grid',
              title: "What's on your mind? Explore Cuisines",
              categories: [
                { id: "cat_pizza", name: "Pizza", icon: "Zap", offerText: "50% OFF", imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&auto=format&fit=crop&q=80" },
                { id: "cat_burger", name: "Burgers", icon: "Heart", offerText: "FLAT $5 OFF", imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&auto=format&fit=crop&q=80" },
                { id: "cat_biryani", name: "Biryani", icon: "Flame", offerText: "BESTSELLER", imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&auto=format&fit=crop&q=80" },
                { id: "cat_chinese", name: "Chinese", icon: "Utensils", offerText: "BUY 1 GET 1", imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200&auto=format&fit=crop&q=80" },
                { id: "cat_dessert", name: "Desserts", icon: "Coffee", offerText: "SWEET DEALS", imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=200&auto=format&fit=crop&q=80" },
                { id: "cat_healthy", name: "Healthy", icon: "CheckCircle", offerText: "KETO & SALADS", imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&auto=format&fit=crop&q=80" }
              ]
            }
          ]
        },
        {
          id: 'sec_top_restaurants',
          gridCols: 1,
          components: [
            {
              id: 'rest_grid_top',
              type: 'restaurant_list',
              title: "Top Rated Restaurants Near You",
              subtitle: "Fastest delivery times, gourmet menus & verified hygiene standards",
              restaurants: [
                {
                  id: "r1",
                  name: "The Artisan Pizza Project",
                  cuisine: "Italian, Woodfired Pizza, Pasta",
                  rating: 4.9,
                  reviewsCount: "1.2k+",
                  deliveryTime: "20-25 mins",
                  distance: "1.2 km",
                  priceForTwo: "$18",
                  offerBadge: "50% OFF UP TO $10",
                  imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80",
                  isVegOnly: false,
                  isPromoted: true
                },
                {
                  id: "r2",
                  name: "Royal Hyderabadi Biryani House",
                  cuisine: "Hyderabadi, Mughlai, Kebabs",
                  rating: 4.8,
                  reviewsCount: "3.5k+",
                  deliveryTime: "25-30 mins",
                  distance: "2.4 km",
                  priceForTwo: "$22",
                  offerBadge: "FREE EXPRESS DELIVERY",
                  imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80",
                  isVegOnly: false,
                  isPromoted: false
                },
                {
                  id: "r3",
                  name: "Burger Craft & Milkshake Bar",
                  cuisine: "American, Angus Burgers, Fries",
                  rating: 4.7,
                  reviewsCount: "850+",
                  deliveryTime: "15-20 mins",
                  distance: "0.8 km",
                  priceForTwo: "$15",
                  offerBadge: "FLAT 20% OFF",
                  imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80",
                  isVegOnly: false,
                  isPromoted: false
                }
              ]
            }
          ]
        },
        {
          id: 'sec_popular_dishes',
          gridCols: 1,
          components: [
            {
              id: 'bestseller_food_menu',
              type: 'food_menu',
              title: "Popular Menu Bestsellers",
              subtitle: "Most ordered dishes near your location",
              items: [
                {
                  id: "fm1",
                  name: "Smokey Angus Truffle Burger",
                  description: "Double Angus beef patty, aged cheddar, caramelized onions, black truffle aioli on toasted brioche.",
                  price: 14.99,
                  rating: 4.9,
                  imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80",
                  isVeg: false,
                  isBestseller: true,
                  category: "Burgers"
                },
                {
                  id: "fm2",
                  name: "Special Dum Biryani Handi",
                  description: "Authentic slow-cooked basmati rice with aromatic spices, tender meat, served with mint raita & mirchi salan.",
                  price: 16.50,
                  rating: 4.9,
                  imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&auto=format&fit=crop&q=80",
                  isVeg: false,
                  isBestseller: true,
                  category: "Biryani"
                },
                {
                  id: "fm3",
                  name: "Woodfired Neapolitan Margherita Pizza",
                  description: "San Marzano tomato sauce, fresh buffalo mozzarella, virgin olive oil, and sweet basil leaves.",
                  price: 17.99,
                  rating: 4.8,
                  imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=80",
                  isVeg: true,
                  isBestseller: true,
                  category: "Pizza"
                },
                {
                  id: "fm4",
                  name: "Belgian Dark Chocolate Molten Lava Cake",
                  description: "Warm chocolate cake with a rich molten center, served with Madagascan vanilla gelato.",
                  price: 6.99,
                  rating: 4.9,
                  imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&auto=format&fit=crop&q=80",
                  isVeg: true,
                  isBestseller: false,
                  category: "Desserts"
                }
              ]
            }
          ]
        }
      ]
    };
  }

  // 1. REMINDERS / TODO / TASKS / DAILY PLANNER / HABITS
  if (
    p.includes('remind') ||
    p.includes('remaind') ||
    p.includes('todo list') ||
    p.includes('to-do list') ||
    p.includes('checklist') ||
    p.includes('habit tracker')
  ) {
    return {
      id: `reminders_${timestamp}`,
      title: `${capitalizedTitle} • Daily Focus & Habit OS`,
      description: "Organize daily tasks, set time-based reminders, track completion streaks, and manage priorities.",
      category: "Productivity & Planning",
      theme: customTheme || { accentColor: "indigo", style: "modern" },
      generatedPrompt: prompt,
      metrics: [],
      initialState: {},
      layout: [
        {
          id: 'sec_reminders_hero',
          gridCols: 1,
          components: [
            {
              id: `reminder_hero_${timestamp}`,
              type: 'image',
              title: "Productivity & Daily Focus Hub • Up to 80% Habit Completion Rate",
              description: "Stay organized, hit daily targets, and build healthy focus habits step-by-step.",
              url: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&auto=format&fit=crop&q=80",
              aspectRatio: "wide"
            }
          ]
        },
        {
          id: 'sec_reminders_categories',
          gridCols: 1,
          components: [
            {
              id: 'reminders_cat_grid',
              type: 'food_category_grid',
              title: "What's on your mind? Explore Focus Categories",
              categories: [
                { id: "c_work", name: "Work Standup", icon: "Briefcase", offerText: "HIGH PRIORITY", imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200&auto=format&fit=crop&q=80" },
                { id: "c_dev", name: "Code Review", icon: "Code", offerText: "DAILY HABIT", imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&auto=format&fit=crop&q=80" },
                { id: "c_health", name: "Fitness & Gym", icon: "Heart", offerText: "ACTIVE STREAK", imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=200&auto=format&fit=crop&q=80" },
                { id: "c_study", name: "Deep Reading", icon: "FileText", offerText: "30 MINS", imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=200&auto=format&fit=crop&q=80" },
                { id: "c_finance", name: "Budget Review", icon: "DollarSign", offerText: "WEEKLY", imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=200&auto=format&fit=crop&q=80" },
                { id: "c_reflection", name: "Nightly Journal", icon: "Moon", offerText: "REFLECT", imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=200&auto=format&fit=crop&q=80" }
              ]
            }
          ]
        },
        {
          id: 'sec_top_habits',
          gridCols: 1,
          components: [
            {
              id: 'top_habits_grid',
              type: 'restaurant_list',
              title: "Top Rated Recommended Routines & Habit Packs",
              subtitle: "Proven daily focus routines with high completion rates and expert guidance",
              restaurants: [
                {
                  id: "h1",
                  name: "The 5 AM Club Morning Routine",
                  cuisine: "Meditation, Hydration, 20-Min Exercise, Journaling",
                  rating: 4.9,
                  reviewsCount: "4.2k+ members",
                  deliveryTime: "Daily 5:00 AM",
                  distance: "30 mins",
                  priceForTwo: "Free",
                  offerBadge: "TOP POPULAR ROUTINE",
                  imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&auto=format&fit=crop&q=80",
                  isVegOnly: false,
                  isPromoted: true
                },
                {
                  id: "h2",
                  name: "Deep Work 90-Minute Focus Blocks",
                  cuisine: "Zero Distractions, Pomodoro Timer, Task Batching",
                  rating: 4.95,
                  reviewsCount: "2.8k+ members",
                  deliveryTime: "Daily 10:00 AM",
                  distance: "90 mins",
                  priceForTwo: "Pro Tier",
                  offerBadge: "HIGH EFFICIENCY",
                  imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80",
                  isVegOnly: false,
                  isPromoted: false
                },
                {
                  id: "h3",
                  name: "Evening Wind Down & Sleep Reset",
                  cuisine: "Digital Detox, Reading, Breathing Exercises",
                  rating: 4.85,
                  reviewsCount: "1.9k+ members",
                  deliveryTime: "Daily 9:30 PM",
                  distance: "20 mins",
                  priceForTwo: "Free",
                  offerBadge: "SLEEP & RECOVERY",
                  imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&auto=format&fit=crop&q=80",
                  isVegOnly: false,
                  isPromoted: false
                }
              ]
            }
          ]
        },
        {
          id: 'sec_planner_items',
          gridCols: 1,
          components: [
            {
              id: 'planner_items_menu',
              type: 'food_menu',
              title: "Popular Planner Modules & Templates",
              subtitle: "One-click templates to structure your day and track targets",
              items: [
                {
                  id: "pi1",
                  name: "Sprint Task & Eisenhower Matrix Pack",
                  description: "Categorize tasks by urgency and importance to maximize daily output.",
                  price: 9.99,
                  rating: 4.9,
                  imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&auto=format&fit=crop&q=80",
                  isVeg: true,
                  isBestseller: true,
                  category: "Templates"
                },
                {
                  id: "pi2",
                  name: "Habit Streak & Goal Tracker Board",
                  description: "Visual streak counters with weekly analytics and milestone badges.",
                  price: 14.99,
                  rating: 4.9,
                  imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=80",
                  isVeg: true,
                  isBestseller: true,
                  category: "Streaks"
                },
                {
                  id: "pi3",
                  name: "Personal Knowledge & Reading Journal",
                  description: "Log books, summarize key takeaways, and track monthly reading challenges.",
                  price: 12.00,
                  rating: 4.8,
                  imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&auto=format&fit=crop&q=80",
                  isVeg: true,
                  isBestseller: true,
                }
              ]
            }
          ]
        }
      ]
    };
  }

  // 2. CRYPTO / TRADING / FINANCE / PORTFOLIO
  if (p.includes('crypto') || (p.includes('wallet') && (p.includes('token') || p.includes('btc') || p.includes('blockchain') || p.includes('crypto'))) || p.includes('trading') || p.includes('portfolio') || p.includes('investment') || p.includes('stock')) {
    return {
      id: `crypto_${timestamp}`,
      title: `${capitalizedTitle} Command Center`,
      description: "Real-time asset tracking, portfolio performance, trade execution logs, and risk analytics.",
      category: "Finance & Crypto",
      theme: customTheme || { accentColor: "cyan", style: "modern" },
      generatedPrompt: prompt,
      customNavigation: [
        { label: 'Portfolio Overview', icon: 'LayoutGrid', tabId: 'dashboard' },
        { label: 'Trading & Swap', icon: 'TrendingUp', tabId: 'operations' },
        { label: 'Staking & Yields', icon: 'Zap', tabId: 'analytics' },
        { label: 'Wallet Settings', icon: 'Settings', tabId: 'settings' }
      ],
      metrics: [
        { id: 'm1', label: "Total Portfolio Value", value: 142850, change: "+8.4% 24h", trend: "up", subtext: "Across 4 connected wallets", format: "currency", sparkline: [128000, 131000, 129500, 135000, 139000, 142850] },
        { id: 'm2', label: "Unrealized P&L", value: 24600, change: "+21.2% All time", trend: "up", subtext: "Bitcoin & Ethereum heavy", format: "currency", sparkline: [18000, 19200, 20500, 22100, 23400, 24600] },
        { id: 'm3', label: "Staking Yield (APY)", value: "6.8%", change: "+0.3% this mo", trend: "up", subtext: "Solana & Cosmos staking", format: "percentage", sparkline: [6.2, 6.3, 6.5, 6.5, 6.7, 6.8] },
        { id: 'm4', label: "Gas & Network Fees", value: 145, change: "-12.5% vs avg", trend: "up", subtext: "Average $2.10 per tx", format: "currency", sparkline: [210, 195, 180, 165, 155, 145] }
      ],
      initialState: {},
      layout: [
        {
          id: 'sec_crypto_hero',
          gridCols: 1,
          components: [
            {
              id: `crypto_hero_${timestamp}`,
              type: 'image',
              title: "Digital Assets & Crypto Command Hub",
              description: "Real-time market analytics, portfolio tracking, trade executions, and hot wallet health checks.",
              url: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=1200&auto=format&fit=crop&q=80",
              aspectRatio: "wide"
            }
          ]
        },
        {
          id: `sec_crypto_cats_${timestamp}`,
          gridCols: 1,
          components: [
            {
              id: `cat_grid_crypto_${timestamp}`,
              type: 'food_category_grid',
              title: "What's on your mind? Explore Digital Asset Sectors",
              categories: [
                { id: "cc1", name: "Bitcoin & ETH", icon: "DollarSign", offerText: "BLUECHIP", imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&auto=format&fit=crop&q=80" },
                { id: "cc2", name: "DeFi Yields", icon: "Zap", offerText: "12% APY", imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200&auto=format&fit=crop&q=80" },
                { id: "cc3", name: "AI Tokens", icon: "Cpu", offerText: "HOT SECTOR", imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80" },
                { id: "cc4", name: "Layer 1 Chains", icon: "Layers", offerText: "FAST FINALITY", imageUrl: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=200&auto=format&fit=crop&q=80" },
                { id: "cc5", name: "NFT Vaults", icon: "Crown", offerText: "RARE ASSETS", imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=200&auto=format&fit=crop&q=80" },
                { id: "cc6", name: "Stablecoins", icon: "Shield", offerText: "SAFE HAVEN", imageUrl: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=200&auto=format&fit=crop&q=80" }
              ]
            }
          ]
        },
        {
          id: `sec_crypto_top_grid_${timestamp}`,
          gridCols: 1,
          components: [
            {
              id: `top_assets_${timestamp}`,
              type: 'restaurant_list',
              title: "Top Rated Digital Assets & High-Yield Staking Pools",
              subtitle: "Verified on-chain liquidity, security audited smart contracts, and real-time APY tracking",
              restaurants: [
                {
                  id: "ca1",
                  name: "Bitcoin Core Vault (BTC)",
                  cuisine: "1.85 BTC Balance • $114,700 Value",
                  rating: 4.98,
                  reviewsCount: "Market Cap $1.2T",
                  deliveryTime: "Instant Swap",
                  distance: "+4.2% 24h",
                  priceForTwo: "$62,000 / BTC",
                  offerBadge: "TOP INSTITUTIONAL HOLDING",
                  imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
                  isVegOnly: false,
                  isPromoted: true
                },
                {
                  id: "ca2",
                  name: "Ethereum 2.0 Staking Node (ETH)",
                  cuisine: "6.20 ETH Balance • 4.8% Staking APY",
                  rating: 4.92,
                  reviewsCount: "Automated Compounding",
                  deliveryTime: "Liquid Staking",
                  distance: "+6.8% 24h",
                  priceForTwo: "$3,500 / ETH",
                  offerBadge: "HIGH STAKING YIELD",
                  imageUrl: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?w=800&auto=format&fit=crop&q=80",
                  isVegOnly: false,
                  isPromoted: false
                },
                {
                  id: "ca3",
                  name: "Solana High-Speed Liquidity Pool (SOL)",
                  cuisine: "32.5 SOL Balance • Sub-Second Finality",
                  rating: 4.85,
                  reviewsCount: "DeFi Volume $450M",
                  deliveryTime: "0.4s Block Time",
                  distance: "+12.4% 24h",
                  priceForTwo: "$150 / SOL",
                  offerBadge: "FLAT 12.5% APY BOOST",
                  imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=80",
                  isVegOnly: false,
                  isPromoted: false
                }
              ]
            }
          ]
        }
      ]
    };
  }

  // 3. E-COMMERCE / STORE / SHOPPING / PRODUCTS / ORDERS
  if (p.includes('shop') || p.includes('store') || p.includes('ecommerce') || p.includes('product') || p.includes('order') || p.includes('cart')) {
    return {
      id: `ecommerce_${timestamp}`,
      title: `${capitalizedTitle} Storefront & Orders Hub`,
      description: "Live sales analytics, order fulfillment status, product collections, and customer cart insights.",
      category: "E-Commerce & Retail",
      theme: customTheme || { accentColor: "amber", style: "modern" },
      generatedPrompt: prompt,
      customNavigation: [
        { label: 'Storefront', icon: 'ShoppingBag', tabId: 'dashboard' },
        { label: 'Orders & Fulfillment', icon: 'Package', tabId: 'operations' },
        { label: 'Sales Analytics', icon: 'TrendingUp', tabId: 'analytics' },
        { label: 'Store Settings', icon: 'Settings', tabId: 'settings' }
      ],
      metrics: [
        { id: 'm1', label: "Daily Revenue", value: 4280, change: "+14.2% vs yesterday", trend: "up", subtext: "128 total orders placed", format: "currency", sparkline: [3100, 3400, 3800, 3950, 4100, 4280] },
        { id: 'm2', label: "Average Order Value (AOV)", value: 84.50, change: "+$3.20 MoM", trend: "up", subtext: "Higher cross-sell conversion", format: "currency", sparkline: [74, 76, 79, 81, 83, 84.5] },
        { id: 'm3', label: "Cart Abandonment", value: "22.4%", change: "-3.1% improved", trend: "up", subtext: "Target < 25%", format: "percentage", sparkline: [28, 26, 25, 24, 23, 22.4] },
        { id: 'm4', label: "Items Pending Fulfillment", value: "18 Orders", change: "Next batch 3 PM", trend: "neutral", subtext: "Standard 24h shipping SLA", format: "text", sparkline: [24, 22, 20, 19, 18, 18] }
      ],
      initialState: {},
      layout: [
        {
          id: `sec_ecom_hero_${timestamp}`,
          gridCols: 1,
          components: [
            {
              id: `ecom_hero_${timestamp}`,
              type: 'image',
              title: "Summer Tech & Fashion Grand Sale • Flat 50% OFF Top Brands",
              description: "Explore trending urban streetwear, noise-cancelling audio, pro smartwatches, and instant express delivery.",
              url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80",
              aspectRatio: "wide"
            }
          ]
        },
        {
          id: `sec_ecom_cats_${timestamp}`,
          gridCols: 1,
          components: [
            {
              id: `cat_grid_ecom_${timestamp}`,
              type: 'food_category_grid',
              title: "What's on your mind? Explore Store Collections",
              categories: [
                { id: "ec1", name: "Sneakers", icon: "Zap", offerText: "FLAT 40% OFF", imageUrl: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=200&auto=format&fit=crop&q=80" },
                { id: "ec2", name: "Streetwear", icon: "Star", offerText: "NEW ARRIVALS", imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&auto=format&fit=crop&q=80" },
                { id: "ec3", name: "Audio & Tech", icon: "Clock", offerText: "EXPRESS 24H", imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80" },
                { id: "ec4", name: "Smartwatches", icon: "Crown", offerText: "BESTSELLER", imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&auto=format&fit=crop&q=80" },
                { id: "ec5", name: "Eyewear", icon: "Sun", offerText: "BUY 1 GET 1", imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&auto=format&fit=crop&q=80" },
                { id: "ec6", name: "Backpacks", icon: "Layers", offerText: "LIMITED DEALS", imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&auto=format&fit=crop&q=80" }
              ]
            }
          ]
        },
        {
          id: `sec_ecom_top_grid_${timestamp}`,
          gridCols: 1,
          components: [
            {
              id: `top_products_${timestamp}`,
              type: 'restaurant_list',
              title: "Top Rated Featured Products & Premium Brands",
              subtitle: "Verified authentic customer reviews, 1-day express dispatch, and warranty coverage",
              restaurants: [
                {
                  id: "p1",
                  name: "Pro Acoustic Noise-Cancelling Headphones",
                  cuisine: "Hi-Res Audio • 40h Battery • Spatial Sound",
                  rating: 4.9,
                  reviewsCount: "3.4k+ reviews",
                  deliveryTime: "1-Day Express",
                  distance: "Free Shipping",
                  priceForTwo: "$249.00",
                  offerBadge: "50% OFF UP TO $50",
                  imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
                  isVegOnly: false,
                  isPromoted: true
                },
                {
                  id: "p2",
                  name: "Urban Edition Leather Craft Backpack",
                  cuisine: "Full Grain Leather • 16-inch Laptop Sleeve",
                  rating: 4.8,
                  reviewsCount: "1.8k+ reviews",
                  deliveryTime: "2-Day Delivery",
                  distance: "In Stock",
                  priceForTwo: "$129.50",
                  offerBadge: "FREE EXPRESS DISPATCH",
                  imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
                  isVegOnly: false,
                  isPromoted: false
                },
                {
                  id: "p3",
                  name: "Aero Runner Pro Sports Sneaker",
                  cuisine: "Cushioned Sole • Breathable Mesh • Ultralight",
                  rating: 4.85,
                  reviewsCount: "2.1k+ reviews",
                  deliveryTime: "Same-Day Dispatch",
                  distance: "Verified Authentic",
                  priceForTwo: "$110.00",
                  offerBadge: "FLAT 20% OFF",
                  imageUrl: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80",
                  isVegOnly: false,
                  isPromoted: false
                }
              ]
            }
          ]
        },
        {
          id: `sec_ecom_menu_${timestamp}`,
          gridCols: 1,
          components: [
            {
              id: `bestsellers_ecom_${timestamp}`,
              type: 'food_menu',
              title: "Popular Retail Bestsellers",
              subtitle: "Most ordered items with instant 1-click cart addition",
              items: [
                {
                  id: "bp1",
                  name: "Minimalist Sapphire Smart Watch Series X",
                  description: "Continuous heart rate monitoring, OLED display, 7-day battery life, titanium bezel.",
                  price: 189.99,
                  rating: 4.9,
                  imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80",
                  isVeg: true,
                  isBestseller: true,
                  category: "Electronics"
                },
                {
                  id: "bp2",
                  name: "Polarized UV400 Matte Black Sunglasses",
                  description: "Lightweight TR90 frame with anti-glare scratch resistant TAC lenses.",
                  price: 45.00,
                  rating: 4.8,
                  imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&auto=format&fit=crop&q=80",
                  isVeg: true,
                  isBestseller: true,
                  category: "Accessories"
                },
                {
                  id: "bp3",
                  name: "Organic Cotton Vintage Oversized Hoodie",
                  description: "Ultra-soft brushed fleece lining, reinforced stitching, unisex relaxed fit.",
                  price: 68.00,
                  rating: 4.9,
                  imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&auto=format&fit=crop&q=80",
                  isVeg: true,
                  isBestseller: true,
                  category: "Apparel"
                }
              ]
            }
          ]
        }
      ]
    };
  }

  // 4. SOCIAL MEDIA & MARKETING
  if (p.includes('social') || p.includes('media') || p.includes('instagram') || p.includes('youtube') || p.includes('content') || p.includes('tiktok') || p.includes('post') || p.includes('marketing')) {
    return {
      id: `social_${timestamp}`,
      title: `${capitalizedTitle} Creator & Campaign Studio`,
      description: "Cross-platform audience engagement, content scheduling, campaign reach, and follower analytics.",
      category: "Marketing & Media",
      theme: customTheme || { accentColor: "rose", style: "modern" },
      generatedPrompt: prompt,
      customNavigation: [
        { label: 'Creator Studio', icon: 'Video', tabId: 'dashboard' },
        { label: 'Campaign Manager', icon: 'Megaphone', tabId: 'operations' },
        { label: 'Audience Insights', icon: 'Users', tabId: 'analytics' },
        { label: 'Channel Settings', icon: 'Settings', tabId: 'settings' }
      ],
      metrics: [
        { id: 'm1', label: "Total Audience Reach", value: "248.5K", change: "+18.2% this mo", trend: "up", subtext: "Across IG, YouTube, LinkedIn", format: "text", sparkline: [180, 195, 210, 225, 238, 248.5] },
        { id: 'm2', label: "Avg Engagement Rate", value: "4.8%", change: "+0.6% vs benchmark", trend: "up", subtext: "Likes, comments, shares", format: "percentage", sparkline: [3.8, 4.0, 4.2, 4.5, 4.6, 4.8] },
        { id: 'm3', label: "Scheduled Posts", value: "14 Posts", change: "Next: Today 3 PM", trend: "neutral", subtext: "Queued for automated publishing", format: "number", sparkline: [8, 10, 12, 11, 13, 14] },
        { id: 'm4', label: "Ad Campaign ROI", value: "3.4x", change: "+0.5x QoQ", trend: "up", subtext: "$12.4K ad spend generated $42K sales", format: "text", sparkline: [2.6, 2.8, 3.0, 3.1, 3.3, 3.4] }
      ],
      initialState: {},
      layout: [
        {
          id: `sec_social_hero_${timestamp}`,
          gridCols: 1,
          components: [
            {
              id: `social_hero_${timestamp}`,
              type: 'image',
              title: "Creator Studio • Multi-Channel Viral Media & Campaign Control",
              description: "AI automated video editing, cross-platform publishing, real-time audience analytics, and influencer collaboration hub.",
              url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&auto=format&fit=crop&q=80",
              aspectRatio: "wide"
            }
          ]
        },
        {
          id: `sec_social_cats_${timestamp}`,
          gridCols: 1,
          components: [
            {
              id: `cat_grid_social_${timestamp}`,
              type: 'food_category_grid',
              title: "What's on your mind? Explore Media Channels & Formats",
              categories: [
                { id: "sc1", name: "Instagram Reels", icon: "Camera", offerText: "4.8% ENGAGEMENT", imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&auto=format&fit=crop&q=80" },
                { id: "sc2", name: "YouTube 4K", icon: "Video", offerText: "142K VIEWS", imageUrl: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=200&auto=format&fit=crop&q=80" },
                { id: "sc3", name: "TikTok Viral", icon: "Zap", offerText: "TRENDING NOW", imageUrl: "https://images.unsplash.com/photo-1596558450255-7c0b7be9d56a?w=200&auto=format&fit=crop&q=80" },
                { id: "sc4", name: "LinkedIn Pro", icon: "Briefcase", offerText: "B2B LEADS", imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&auto=format&fit=crop&q=80" },
                { id: "sc5", name: "Podcast Audio", icon: "Mic", offerText: "WEEKLY EPISODES", imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=200&auto=format&fit=crop&q=80" },
                { id: "sc6", name: "Ad Campaigns", icon: "DollarSign", offerText: "3.4X ROI", imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&auto=format&fit=crop&q=80" }
              ]
            }
          ]
        },
        {
          id: `sec_social_top_grid_${timestamp}`,
          gridCols: 1,
          components: [
            {
              id: `top_creators_${timestamp}`,
              type: 'restaurant_list',
              title: "Top Rated Verified Creator Collaborations",
              subtitle: "Handpicked brand ambassadors with verified audience demographics and high conversion rates",
              restaurants: [
                {
                  id: "cr1",
                  name: "TechVision Daily by Alex Rivera",
                  cuisine: "485K Subscribers • Consumer Tech & AI",
                  rating: 4.95,
                  reviewsCount: "1.2k campaign reviews",
                  deliveryTime: "48h Turnaround",
                  distance: "3.8% Conversion",
                  priceForTwo: "$1,200 / video",
                  offerBadge: "TOP RATED CREATOR",
                  imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
                  isVegOnly: false,
                  isPromoted: true
                },
                {
                  id: "cr2",
                  name: "Urban Lifestyle & Aesthetics Studio",
                  cuisine: "290K IG Followers • Fashion & Design",
                  rating: 4.88,
                  reviewsCount: "820 reviews",
                  deliveryTime: "24h Reel Dispatch",
                  distance: "5.2% Engagement",
                  priceForTwo: "$850 / post",
                  offerBadge: "HIGH ENGAGEMENT",
                  imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80",
                  isVegOnly: false,
                  isPromoted: false
                },
                {
                  id: "cr3",
                  name: "Productivity & Founder Mindset Podcast",
                  cuisine: "140K Monthly Listeners • B2B SaaS Focus",
                  rating: 4.9,
                  reviewsCount: "450 reviews",
                  deliveryTime: "Weekly Mid-Roll",
                  distance: "C-Level Audience",
                  priceForTwo: "$650 / episode",
                  offerBadge: "FLAT 15% OFF BUNDLES",
                  imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
                  isVegOnly: false,
                  isPromoted: false
                }
              ]
            }
          ]
        },
        {
          id: `sec_social_menu_${timestamp}`,
          gridCols: 1,
          components: [
            {
              id: `bestsellers_social_${timestamp}`,
              type: 'food_menu',
              title: "Popular Creator Packages & Media Assets",
              subtitle: "Ready-to-launch campaign packages for immediate brand sponsorship",
              items: [
                {
                  id: "s_item1",
                  name: "60-Second Viral TikTok & Reel Sponsorship",
                  description: "Full product integration, custom audio overlay, and pinned link in bio.",
                  price: 499.00,
                  rating: 4.9,
                  imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&auto=format&fit=crop&q=80",
                  isVeg: true,
                  isBestseller: true,
                  category: "Shorts"
                },
                {
                  id: "s_item2",
                  name: "Dedicated YouTube Product Unboxing & Review",
                  description: "8 to 10 minute dedicated video feature, description box tracking link, and community tab post.",
                  price: 1450.00,
                  rating: 4.95,
                  imageUrl: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&auto=format&fit=crop&q=80",
                  isVeg: true,
                  isBestseller: true,
                  category: "YouTube"
                },
                {
                  id: "s_item3",
                  name: "Cross-Platform Story Blast & Swipe-Up Promo",
                  description: "5 Story frames across IG & Facebook with direct swipe-up discount codes.",
                  price: 299.00,
                  rating: 4.8,
                  imageUrl: "https://images.unsplash.com/photo-1596558450255-7c0b7be9d56a?w=400&auto=format&fit=crop&q=80",
                  isVeg: true,
                  isBestseller: true,
                  category: "Stories"
                }
              ]
            }
          ]
        }
      ]
    };
  }

  // 5. HOTEL / BOOKING / RESORT / VILLA / REAL ESTATE / STAY / TRAVEL
  if (p.includes('hotel') || p.includes('booking') || p.includes('resort') || p.includes('villa') || p.includes('property') || p.includes('real estate') || p.includes('reservation') || p.includes('room') || p.includes('travel') || p.includes('stay')) {
    return {
      id: `hotel_${timestamp}`,
      title: `Grand Horizon Luxury Hotel & Resort Portal`,
      description: "Book five-star oceanfront villas, luxury penthouses, spa retreats, private dining, and explore handpicked suites.",
      category: "Hotel & Resort Booking",
      theme: customTheme || { accentColor: "amber", style: "modern" },
      generatedPrompt: prompt,
      metrics: [
        { id: 'm1', label: "Available Suites", value: "18 Suites", change: "4 Penthouses left", trend: "up", subtext: "High seasonal demand", format: "text", sparkline: [12, 14, 15, 16, 17, 18] },
        { id: 'm2', label: "Average Nightly Rate", value: 520, change: "+12.4% vs peak", trend: "up", subtext: "Includes breakfast & spa", format: "currency", sparkline: [420, 450, 480, 500, 510, 520] },
        { id: 'm3', label: "Guest Satisfaction", value: "4.95 ★", change: "99.2% positive", trend: "up", subtext: "Based on 3,420 reviews", format: "text", sparkline: [4.8, 4.85, 4.9, 4.92, 4.94, 4.95] },
        { id: 'm4', label: "Resort Occupancy", value: "92.8%", change: "Near full capacity", trend: "up", subtext: "Peak holiday bookings", format: "percentage", sparkline: [82, 85, 88, 90, 91, 92.8] }
      ],
      initialState: {},
      layout: [
        {
          id: 'sec_hotel_hero',
          gridCols: 1,
          components: [
            {
              id: `hotel_hero_${timestamp}`,
              type: 'image',
              title: "Experience Unrivaled Luxury — Oceanfront Villas & Private Infinity Pools",
              description: "Book direct for complimentary spa credits, 24/7 butler service, private helipad transfers, and sunset dining.",
              url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=80",
              aspectRatio: "wide"
            }
          ]
        },
        {
          id: 'sec_hotel_categories',
          gridCols: 1,
          components: [
            {
              id: `hotel_cats_${timestamp}`,
              type: 'food_category_grid',
              title: "Explore Luxury Accommodation Suites & Villas",
              categories: [
                { id: "h1", name: "Oceanfront Villa", icon: "Sun", offerText: "PRIVATE POOL", imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200&auto=format&fit=crop&q=80" },
                { id: "h2", name: "Penthouse Suite", icon: "Crown", offerText: "360 VIEW", imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=200&auto=format&fit=crop&q=80" },
                { id: "h3", name: "Presidential Suite", icon: "Star", offerText: "BUTLER INCLUDED", imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=200&auto=format&fit=crop&q=80" },
                { id: "h4", name: "Wellness Spa Chalet", icon: "Heart", offerText: "ALL INCLUSIVE", imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=200&auto=format&fit=crop&q=80" },
                { id: "h5", name: "Overwater Bungalow", icon: "Compass", offerText: "BALCONY JACUZZI", imageUrl: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=200&auto=format&fit=crop&q=80" }
              ]
            }
          ]
        },
        {
          id: 'sec_hotel_listings',
          gridCols: 1,
          components: [
            {
              id: `hotel_list_${timestamp}`,
              type: 'restaurant_list',
              title: "Top Rated Luxury Suites & Private Residences",
              subtitle: "Handpicked five-star suites with direct beach access, king beds, and VIP guest privileges",
              restaurants: [
                {
                  id: "res1",
                  name: "The Royal Oceanfront Horizon Villa",
                  cuisine: "3 King Bedrooms • Private Infinity Pool • Helipad",
                  rating: 4.98,
                  reviewsCount: "1.2k reviews",
                  deliveryTime: "Direct Beach Access",
                  distance: "0.1 km",
                  priceForTwo: "$680 / night",
                  offerBadge: "FLAT 20% OFF WEEKDAYS",
                  imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
                  isVegOnly: false,
                  isPromoted: true
                },
                {
                  id: "res2",
                  name: "Grand Skylight Penthouse Suite",
                  cuisine: "Panoramic Bay View • Jacuzzi Terrace • Chef Service",
                  rating: 4.92,
                  reviewsCount: "850 reviews",
                  deliveryTime: "Top Floor Tower",
                  distance: "0.5 km",
                  priceForTwo: "$850 / night",
                  offerBadge: "FREE AIRPORT TRANSFER",
                  imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop&q=80",
                  isVegOnly: false,
                  isPromoted: false
                },
                {
                  id: "res3",
                  name: "Botanical Spa & Thermal Chalet",
                  cuisine: "Thermal Mineral Bath • Organic Dining • Sauna",
                  rating: 4.88,
                  reviewsCount: "640 reviews",
                  deliveryTime: "Private Garden View",
                  distance: "1.4 km",
                  priceForTwo: "$450 / night",
                  offerBadge: "FREE SPA MASSAGE",
                  imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80",
                  isVegOnly: false,
                  isPromoted: false
                }
              ]
            }
          ]
        }
      ]
    };
  }

  // 6. HEALTHCARE / PATIENT CLINIC / MEDICAL
  if (p.includes('health') || p.includes('patient') || p.includes('medical') || p.includes('clinic') || p.includes('doctor') || p.includes('hospital') || p.includes('pharma')) {
    return {
      id: `health_${timestamp}`,
      title: `${capitalizedTitle} CareConnect Portal`,
      description: "Patient appointment schedules, online doctor consultations, health vitals monitoring, and medical record ledger.",
      category: "Healthcare",
      theme: customTheme || { accentColor: "sky", style: "modern" },
      generatedPrompt: prompt,
      customNavigation: [
        { label: 'Patient Overview', icon: 'LayoutGrid', tabId: 'dashboard' },
        { label: 'Appointments & Triage', icon: 'Calendar', tabId: 'operations' },
        { label: 'Medical Records', icon: 'Activity', tabId: 'analytics' },
        { label: 'Clinic Settings', icon: 'Settings', tabId: 'settings' }
      ],
      metrics: [
        { id: 'm1', label: "Daily Consultations", value: "34 Patients", change: "+4 vs daily avg", trend: "up", subtext: "28 in-clinic, 6 telehealth", format: "text", sparkline: [26, 28, 30, 29, 32, 34] },
        { id: 'm2', label: "Avg Wait Time", value: "8.5 Mins", change: "-3.2 mins MoM", trend: "up", subtext: "Target < 10 minutes", format: "text", sparkline: [14, 13, 11, 10, 9, 8.5] },
        { id: 'm3', label: "Patient Satisfaction", value: "98.2%", change: "+1.4% YoY", trend: "up", subtext: "Post-consultation feedback", format: "percentage", sparkline: [95, 96, 96.5, 97, 97.8, 98.2] },
        { id: 'm4', label: "Monthly Clinic Revenue", value: 64200, change: "+8.6% MoM", trend: "up", subtext: "Insurance claims & direct copays", format: "currency", sparkline: [52000, 55000, 58000, 60000, 62000, 64200] }
      ],
      initialState: {},
      layout: [
        {
          id: `sec_health_hero_${timestamp}`,
          gridCols: 1,
          components: [
            {
              id: `health_hero_${timestamp}`,
              type: 'image',
              title: "CareConnect Health Portal • 24/7 Telemedicine & Patient Assistant",
              description: "Instant doctor consultations, medical record vault, prescription refilling, and AI health advisory.",
              url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80",
              aspectRatio: "wide"
            }
          ]
        },
        {
          id: `sec_health_specialties_${timestamp}`,
          gridCols: 1,
          components: [
            {
              id: `cat_specialties_${timestamp}`,
              type: 'food_category_grid',
              title: "Explore Medical Specialties & Clinical Departments",
              categories: [
                { id: "mc1", name: "Cardiology", icon: "Heart", offerText: "TOP RATED", imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200&auto=format&fit=crop&q=80" },
                { id: "mc2", name: "Pediatrics", icon: "Smile", offerText: "24/7 CARE", imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=200&auto=format&fit=crop&q=80" },
                { id: "mc3", name: "Dermatology", icon: "Zap", offerText: "EXPRESS", imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=200&auto=format&fit=crop&q=80" },
                { id: "mc4", name: "Neurology", icon: "Activity", offerText: "SPECIALIST", imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=200&auto=format&fit=crop&q=80" },
                { id: "mc5", name: "Orthopedics", icon: "Shield", offerText: "SURGERY", imageUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=200&auto=format&fit=crop&q=80" },
                { id: "mc6", name: "Telehealth AI", icon: "Video", offerText: "INSTANT", imageUrl: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=200&auto=format&fit=crop&q=80" }
              ]
            }
          ]
        },
        {
          id: `sec_health_doctors_${timestamp}`,
          gridCols: 1,
          components: [
            {
              id: `doctors_grid_${timestamp}`,
              type: 'restaurant_list',
              title: "Top Rated Verified Physicians Near You",
              subtitle: "Board-certified medical specialists with verified patient ratings and instant booking",
              restaurants: [
                {
                  id: "doc1",
                  name: "Dr. Sarah Jenkins, MD",
                  cuisine: "Senior Cardiologist • 14 Yrs Exp",
                  rating: 4.9,
                  reviewsCount: "850+ reviews",
                  deliveryTime: "10 min wait",
                  distance: "1.2 km",
                  priceForTwo: "$50 Consult",
                  offerBadge: "AVAILABLE TODAY",
                  imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop&q=80",
                  isVegOnly: true,
                  isPromoted: true
                },
                {
                  id: "doc2",
                  name: "Dr. Alan Mercer, MD",
                  cuisine: "Lead Neurologist • 18 Yrs Exp",
                  rating: 4.8,
                  reviewsCount: "1.2k+ reviews",
                  deliveryTime: "15 min wait",
                  distance: "2.4 km",
                  priceForTwo: "$65 Consult",
                  offerBadge: "TELEHEALTH READY",
                  imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&auto=format&fit=crop&q=80",
                  isVegOnly: true,
                  isPromoted: false
                },
                {
                  id: "doc3",
                  name: "Dr. Elena Rostova, MD",
                  cuisine: "Pediatric Specialist • 10 Yrs Exp",
                  rating: 4.9,
                  reviewsCount: "940+ reviews",
                  deliveryTime: "5 min wait",
                  distance: "0.8 km",
                  priceForTwo: "$40 Consult",
                  offerBadge: "TOP PEDIATRICIAN",
                  imageUrl: "https://images.unsplash.com/photo-1594824813566-88855ce78968?w=800&auto=format&fit=crop&q=80",
                  isVegOnly: true,
                  isPromoted: false
                }
              ]
            }
          ]
        },
        {
          id: `sec_health_prescriptions_${timestamp}`,
          gridCols: 1,
          components: [
            {
              id: `prescriptions_menu_${timestamp}`,
              type: 'food_menu',
              title: "Essential Prescriptions & Health Products",
              subtitle: "Verified medications with one-click home delivery and dosage reminders",
              items: [
                {
                  id: "med1",
                  name: "Amoxicillin 500mg Antibiotic Pack",
                  description: "Broad-spectrum doctor prescribed antibiotic capsules.",
                  price: 14.99,
                  rating: 4.9,
                  imageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&auto=format&fit=crop&q=80",
                  isVeg: true,
                  isBestseller: true,
                  category: "Prescriptions"
                },
                {
                  id: "med2",
                  name: "Vitamin D3 5000 IU Wellness Softgels",
                  description: "High potency daily immune system and bone density booster.",
                  price: 18.50,
                  rating: 4.9,
                  imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80",
                  isVeg: true,
                  isBestseller: true,
                  category: "Supplements"
                },
                {
                  id: "med3",
                  name: "Triple Strength Omega-3 Fish Oil Softgels",
                  description: "Cardiovascular health, joint flexibility, and brain function support.",
                  price: 22.99,
                  rating: 4.8,
                  imageUrl: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&auto=format&fit=crop&q=80",
                  isVeg: false,
                  isBestseller: true,
                  category: "Heart Care"
                }
              ]
            }
          ]
        },
        {
          id: `sec_health_actions_${timestamp}`,
          gridCols: 1,
          components: [
            {
              id: `action_health_${timestamp}`,
              type: 'action_list',
              title: "Patient Care Services & AI Health Tools",
              description: "Instant access to specialist consultations, reminders, and triage assistance",
              actions: [
                { id: "ha1", title: "🩺 Search Specialist Doctors & Book Appointment", description: "Filter 250+ verified cardiologists, neurologists, dermatologists, and pediatricians", icon: "Search", buttonText: "Book Doctor" },
                { id: "ha2", title: "🤖 Consult AI Health Assistant & Symptom Checker", description: "Get instant AI-driven health triage, dosage guides, and personalized wellness recommendations", icon: "Activity", buttonText: "Chat with AI" },
                { id: "ha3", title: "💊 Daily Medicine Reminders & Prescription Refills", description: "Set automated dosage alerts and reorder chronic care medications from partner pharmacies", icon: "Clock", buttonText: "Manage Prescriptions" },
                { id: "ha4", title: "🚨 Emergency Triage & Ambulance Dispatch", description: "One-tap direct connection to 24/7 emergency dispatch and hospital trauma centers", icon: "PhoneCall", buttonText: "Emergency SOS" }
              ]
            }
          ]
        },
        {
          id: `sec_health_chart_${timestamp}`,
          gridCols: 1,
          components: [
            {
              id: 'chart_patients',
              type: 'chart',
              chartType: 'area',
              title: "Weekly Patient Health Trends & Consultation Volume",
              subtitle: "In-clinic appointments vs telehealth calls",
              xAxisKey: "day",
              dataKeys: [
                { key: "inClinic", name: "In-Clinic Visits", color: "#0284c7" },
                { key: "telehealth", name: "Telehealth Calls", color: "#10b981" }
              ],
              data: [
                { day: "Mon", inClinic: 28, telehealth: 8 },
                { day: "Tue", inClinic: 32, telehealth: 10 },
                { day: "Wed", inClinic: 30, telehealth: 7 },
                { day: "Thu", inClinic: 34, telehealth: 9 },
                { day: "Fri", inClinic: 29, telehealth: 12 },
                { day: "Sat", inClinic: 15, telehealth: 5 }
              ]
            }
          ]
        }
      ],
      operationsLayout: [
        {
          id: `sec_health_ops_${timestamp}`,
          gridCols: 1,
          components: [
            {
              id: 'table_appointments',
              type: 'table',
              title: "Today's Patient Consultation Ledger & Appointments",
              description: "Upcoming consultations and check-in statuses",
              searchable: true,
              exportable: true,
              columns: [
                { key: "time", label: "Time", type: "text" },
                { key: "patient", label: "Patient Name", type: "text" },
                { key: "doctor", label: "Attending Doctor", type: "text" },
                { key: "type", label: "Consultation Type", type: "text" },
                { key: "status", label: "Status", type: "badge", badgeColorMap: { "Completed": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", "In Progress": "bg-sky-500/10 text-sky-600 border-sky-500/20", "Scheduled": "bg-amber-500/10 text-amber-600 border-amber-500/20" } }
              ],
              data: [
                { time: "09:00 AM", patient: "Eleanor Vance", doctor: "Dr. Sarah Jenkins", type: "Annual Physical", status: "Completed" },
                { time: "10:30 AM", patient: "Robert Thorne", doctor: "Dr. Alan Mercer", type: "Cardiology Follow-up", status: "In Progress" },
                { time: "11:15 AM", patient: "Maya Lin", doctor: "Dr. Sarah Jenkins", type: "Telehealth Checkup", status: "Scheduled" },
                { time: "02:00 PM", patient: "David Miller", doctor: "Dr. Alan Mercer", type: "Routine Bloodwork", status: "Scheduled" }
              ]
            }
          ]
        }
      ]
    };
  }

  // 7. DEFAULT CLEAN DOMAIN SYNTHESIZER FOR ANY UNMATCHED PROMPT
  // Exclude common command/stop words to build meaningful non-monetary labels!
  const stopWords = new Set([
    'build', 'create', 'design', 'generate', 'make', 'set', 'up', 'setup',
    'show', 'me', 'a', 'an', 'the', 'app', 'application', 'ui', 'dashboard',
    'system', 'for', 'with', 'and', 'to', 'in', 'of', 'on', 'at', 'is', 'it',
    'daily', 'remainder', 'reminder', 'planner'
  ]);

  const rawWords = prompt.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
  const meaningfulWords = rawWords.filter(w => w.length > 2 && !stopWords.has(w));

  const noun1 = meaningfulWords[0] ? meaningfulWords[0].charAt(0).toUpperCase() + meaningfulWords[0].slice(1) : "Activity";
  const noun2 = meaningfulWords[1] ? meaningfulWords[1].charAt(0).toUpperCase() + meaningfulWords[1].slice(1) : "Item";

  return {
    id: `custom_${timestamp}`,
    title: `${capitalizedTitle} Control Center`,
    description: `Tailored management application for "${prompt}". Provides real-time status monitoring, activity tracking, and interactive controls.`,
    category: `${noun1} & ${noun2}`,
    theme: customTheme || { accentColor: "emerald", style: "modern" },
    generatedPrompt: prompt,
    customNavigation: [
      { label: `${noun1} Hub`, icon: 'LayoutGrid', tabId: 'dashboard' },
      { label: `${noun2} Operations`, icon: 'Layers', tabId: 'operations' },
      { label: 'Analytics', icon: 'TrendingUp', tabId: 'analytics' },
      { label: 'Settings', icon: 'Settings', tabId: 'settings' }
    ],
    operationsLayout: [
      {
        id: `sec_custom_alerts_${timestamp}`,
        title: `Active Operations Advisory`,
        gridCols: 1,
        components: [
          {
            id: `alert_ops_${timestamp}`,
            type: 'alert',
            title: 'Critical Sync Protocol Active',
            severity: 'warning',
            message: `Telemetry monitoring active for "${prompt}". All nodes reporting status green.`,
            timestamp: 'Just now',
            actionLabel: 'Verify System'
          }
        ]
      },
      {
        id: `sec_custom_kanban_${timestamp}`,
        title: `${noun1} Active Execution Board`,
        gridCols: 1,
        components: [
          {
            id: `kanban_ops_${timestamp}`,
            type: 'kanban',
            title: `${noun1} Task Dispatch & Routing`,
            columns: [
              { id: 'todo', title: 'Pending Queue', color: '#f59e0b' },
              { id: 'in_progress', title: 'Active Processing', color: '#3b82f6' },
              { id: 'done', title: 'Completed Sync', color: '#10b981' }
            ],
            items: [
              { id: 't1', columnId: 'todo', title: `Optimize ${noun1} Protocol`, priority: 'high', assignee: 'Automation Bot', subtitle: `Calibrate sync loops & rates` },
              { id: 't2', columnId: 'in_progress', title: `Deploy ${noun2} Instance`, priority: 'medium', assignee: 'System Eng', subtitle: `Configuring load parameters` },
              { id: 't3', columnId: 'done', title: `System Core Heartbeat`, priority: 'low', assignee: 'Telemetry Core', subtitle: `Optimal connection established` }
            ]
          }
        ]
      },
      {
        id: `sec_custom_ops_${timestamp}`,
        title: `${noun1} & ${noun2} Operational Ledger`,
        gridCols: 1,
        components: [
          {
            id: `table_ops_${timestamp}`,
            type: 'table',
            title: `${noun1} Operations & Activity Log`,
            searchable: true,
            exportable: true,
            columns: [
              { key: "item", label: `${noun1} Record`, type: "text" },
              { key: "category", label: "Category", type: "text" },
              { key: "progress", label: "Sync Progress", type: "progress" },
              { key: "status", label: "Status", type: "badge", badgeColorMap: { "Active": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", "Pending": "bg-amber-500/10 text-amber-600 border-amber-500/20", "Suspended": "bg-rose-500/10 text-rose-600 border-rose-500/20" } }
            ],
            data: [
              { item: `${noun1} Operational Batch #101`, category: `${noun1}`, progress: 85, status: "Active" },
              { item: `${noun2} Execution Unit`, category: `${noun2}`, progress: 45, status: "Active" },
              { item: `System Telemetry Dispatch`, category: "System", progress: 10, status: "Pending" }
            ]
          }
        ]
      }
    ],
    metrics: [
      { id: 'm1', label: `Active ${noun1} Items`, value: "48 Total", change: "+6 this week", trend: "up", subtext: "Current operational queue", format: "text", sparkline: [32, 36, 40, 42, 45, 48] },
      { id: 'm2', label: `${noun2} Completion Rate`, value: "92.5%", change: "+3.2% vs target", trend: "up", subtext: "High efficiency output", format: "percentage", sparkline: [82, 85, 88, 90, 91, 92.5] },
      { id: 'm3', label: "Daily Active Volume", value: "312 Logs", change: "+14.8% MoM", trend: "up", subtext: "Logged system actions", format: "number", sparkline: [220, 240, 260, 280, 300, 312] },
      { id: 'm4', label: "System Health Score", value: "99.8%", change: "Optimal state", trend: "up", subtext: "Zero active errors", format: "percentage", sparkline: [98, 99, 99.2, 99.5, 99.7, 99.8] }
    ],
    initialState: {},
    layout: [
      {
        id: `sec_custom_hero`,
        gridCols: 1,
        components: [
          {
            id: `custom_hero_${timestamp}`,
            type: 'image',
            title: `${capitalizedTitle} Command Hub`,
            description: `Tailored management workspace for "${prompt}". Provides real-time status monitoring, activity tracking, and interactive controls.`,
            url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&auto=format&fit=crop&q=80",
            aspectRatio: "wide"
          }
        ]
      },
      {
        id: `sec_custom_categories`,
        gridCols: 1,
        components: [
          {
            id: `cat_grid_${timestamp}`,
            type: 'food_category_grid',
            title: `What's on your mind? Explore ${noun1} Categories`,
            categories: [
              { id: "c1", name: `${noun1} Core`, icon: "Zap", offerText: "POPULAR", imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&auto=format&fit=crop&q=80" },
              { id: "c2", name: `${noun2} Prime`, icon: "Star", offerText: "FEATURED", imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&auto=format&fit=crop&q=80" },
              { id: "c3", name: "Express Pack", icon: "Clock", offerText: "20 MINS", imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&auto=format&fit=crop&q=80" },
              { id: "c4", name: "Pro Tier", icon: "Crown", offerText: "FLAT 50% OFF", imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&auto=format&fit=crop&q=80" },
              { id: "c5", name: "Custom Mix", icon: "Layers", offerText: "NEW", imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200&auto=format&fit=crop&q=80" },
              { id: "c6", name: "Trending", icon: "Flame", offerText: "BESTSELLER", imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=200&auto=format&fit=crop&q=80" }
            ]
          }
        ]
      },
      {
        id: `sec_custom_top_grid`,
        gridCols: 1,
        components: [
          {
            id: `top_grid_${timestamp}`,
            type: 'restaurant_list',
            title: `Top Rated ${noun1} Options & Services Near You`,
            subtitle: `Curated selections with verified ratings, fast delivery, and special offers for ${cleanTitle}`,
            restaurants: [
              {
                id: "item1",
                name: `${noun1} Enterprise Hub`,
                cuisine: `Verified ${noun1} Module • Premium Grade`,
                rating: 4.95,
                reviewsCount: "1.4k+ reviews",
                deliveryTime: "Instant Access",
                distance: "100% Uptime",
                priceForTwo: "Included",
                offerBadge: "TOP RATED MODULE",
                imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80",
                isVegOnly: false,
                isPromoted: true
              },
              {
                id: "item2",
                name: `Pro ${noun2} Management Suite`,
                cuisine: `Automated ${noun2} Workflows • 24/7 Sync`,
                rating: 4.88,
                reviewsCount: "2.8k+ reviews",
                deliveryTime: "Active Monitoring",
                distance: "0 Latency",
                priceForTwo: "Pro Tier",
                offerBadge: "HIGH EFFICIENCY",
                imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
                isVegOnly: false,
                isPromoted: false
              },
              {
                id: "item3",
                name: `Smart ${noun1} & ${noun2} Dispatcher`,
                cuisine: `Real-time Telemetry & Security Audit`,
                rating: 4.92,
                reviewsCount: "950+ reviews",
                deliveryTime: "Continuous Protection",
                distance: "Live Node",
                priceForTwo: "Standard Tier",
                offerBadge: "FLAT 20% OFF",
                imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
                isVegOnly: false,
                isPromoted: false
              }
            ]
          }
        ]
      },
      {
        id: `sec_custom_menu`,
        gridCols: 1,
        components: [
          {
            id: `bestsellers_menu_${timestamp}`,
            type: 'food_menu',
            title: `Featured ${noun1} Bundles & Services`,
            subtitle: `Most requested ${noun1.toLowerCase()} packages and interactive modules`,
            items: [
              {
                id: "m_item1",
                name: `Signature ${noun1} Accelerator Pack`,
                description: `Complete ${noun1.toLowerCase()} configuration with verified fast turnaround and top quality.`,
                price: 29.99,
                rating: 4.9,
                imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&auto=format&fit=crop&q=80",
                isVeg: true,
                isBestseller: true,
                category: `${noun1}`
              },
              {
                id: "m_item2",
                name: `Pro ${noun2} Executive Suite`,
                description: `Comprehensive ${noun2.toLowerCase()} management package designed for high performance.`,
                price: 49.50,
                rating: 4.95,
                imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80",
                isVeg: false,
                isBestseller: true,
                category: `${noun2}`
              },
              {
                id: "m_item3",
                name: `Express ${noun1} Telemetry Node`,
                description: `Lightweight and fast monitoring option with continuous uptime and verified security.`,
                price: 19.00,
                rating: 4.8,
                imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&auto=format&fit=crop&q=80",
                isVeg: true,
                isBestseller: true,
                category: "Bundles"
              }
            ]
          }
        ]
      }
    ]
  };
}

/**
 * Helper to get high-quality visual components (Category Grid, Card Grid, Menu) tailored to the prompt's domain.
 */
function getDomainSpecificVisuals(prompt: string, timestamp: number): {
  categoryGrid: any;
  cardGrid: any;
  menuCard: any;
} {
  const p = (prompt || '').toLowerCase();
  
  // 1. Library & Books
  const isLibrary = /\b(library|book|catalog|read|shelf|novel|literature|author)\b/i.test(p);
  
  // 2. Education & Course
  const isEducation = /\b(course|class|learn|academy|school|education|study|tutorial|university|train)\b/i.test(p);
  
  // 3. Healthcare & Clinic
  const isHealth = /\b(health|medicare|patient|doctor|clinic|hospital|medication|triage|vitals|appointment|medical|gym|fitness|workout|yoga)\b/i.test(p);
  
  // 4. Hotel & Booking
  const isHotel = /\b(hotel|stay|resort|travel|booking|villa|room|flight|vacation|holiday)\b/i.test(p);
  
  // 5. Finance & Crypto
  const isFinance = /\b(finance|crypto|trading|bank|wallet|investment|mrr|burn|stock|market|equity)\b/i.test(p);
  
  // 6. Food & Restaurant
  const isFood = /\b(food|restaurant|dining|swiggy|zomato|pizza|burger|meal|delivery|chef|cuisine)\b/i.test(p);

  if (isLibrary) {
    return {
      categoryGrid: {
        id: `cat_grid_${timestamp}`,
        type: 'food_category_grid',
        title: "Explore Book Genres & Archives",
        categories: [
          { id: "lib_c1", name: "Fiction", icon: "BookOpen", offerText: "POPULAR", imageUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&auto=format&fit=crop&q=80" },
          { id: "lib_c2", name: "Science", icon: "Atom", offerText: "TRENDING", imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=200&auto=format&fit=crop&q=80" },
          { id: "lib_c3", name: "History", icon: "Compass", offerText: "NEW ARCHIVE", imageUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=200&auto=format&fit=crop&q=80" },
          { id: "lib_c4", name: "Tech & Code", icon: "Terminal", offerText: "50+ BOOKS", imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200&auto=format&fit=crop&q=80" },
          { id: "lib_c5", name: "Biography", icon: "User", offerText: "FEATURED", imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200&auto=format&fit=crop&q=80" },
          { id: "lib_c6", name: "Philosophy", icon: "Lightbulb", offerText: "CLASSICS", imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200&auto=format&fit=crop&q=80" }
        ]
      },
      cardGrid: {
        id: `top_grid_${timestamp}`,
        type: 'restaurant_list',
        title: "Trending Books & Publications",
        subtitle: "Top rated releases available for instant digital lending or download",
        restaurants: [
          {
            id: "lib_item1",
            name: "The Digital Age Odyssey",
            cuisine: "Sci-Fi & Tech • By Arthur Pendelton",
            rating: 4.95,
            reviewsCount: "1.4k+ borrows",
            deliveryTime: "Instant PDF / ePUB",
            distance: "Available",
            priceForTwo: "Free Checkout",
            offerBadge: "BESTSELLER",
            imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80",
            isVegOnly: false,
            isPromoted: true
          },
          {
            id: "lib_item2",
            name: "Architecture of Modern Web Systems",
            cuisine: "Software Engineering • By Sarah Lin",
            rating: 4.89,
            reviewsCount: "820 borrows",
            deliveryTime: "Instant Access",
            distance: "Available",
            priceForTwo: "Free Checkout",
            offerBadge: "HIGH DEMAND",
            imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&auto=format&fit=crop&q=80",
            isVegOnly: false,
            isPromoted: false
          },
          {
            id: "lib_item3",
            name: "Understanding Quantum Computing",
            cuisine: "Advanced Physics • By Dr. Marc K.",
            rating: 4.92,
            reviewsCount: "340 borrows",
            deliveryTime: "Instant Audio / PDF",
            distance: "Available",
            priceForTwo: "Free Checkout",
            offerBadge: "NEW RELEASE",
            imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80",
            isVegOnly: false,
            isPromoted: false
          }
        ]
      },
      menuCard: {
        id: `bestsellers_menu_${timestamp}`,
        type: 'food_menu',
        title: "Bestselling Audiobooks & Journals",
        subtitle: "Highly requested interactive guides and standard publications",
        items: [
          {
            id: "lib_m_item1",
            name: "UX/UI Design Systems Playbook",
            description: "Complete design systems guide with reusable components, wireframes, and color templates.",
            price: 0.00,
            rating: 4.95,
            imageUrl: "https://images.unsplash.com/photo-1541462608141-2ff586255d14?w=400&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: true,
            category: "Design"
          },
          {
            id: "lib_m_item2",
            name: "Quantum Physics Simplified",
            description: "Master the foundations of quantum mechanics with simple, visual, real-world explanations.",
            price: 0.00,
            rating: 4.9,
            imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: true,
            category: "Physics"
          },
          {
            id: "lib_m_item3",
            name: "Startup Scale & Venture Capital",
            description: "Essential roadmap for fundraising, equity metrics, and team-building from seed to Series A.",
            price: 0.00,
            rating: 4.85,
            imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&auto=format&fit=crop&q=80",
            isVeg: false,
            isBestseller: false,
            category: "Business"
          }
        ]
      }
    };
  } else if (isEducation) {
    return {
      categoryGrid: {
        id: `cat_grid_${timestamp}`,
        type: 'food_category_grid',
        title: "Select Academy Departments & Subjects",
        categories: [
          { id: "edu_c1", name: "Development", icon: "Code", offerText: "BOOTCAMP", imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200&auto=format&fit=crop&q=80" },
          { id: "edu_c2", name: "Design & UI", icon: "Palette", offerText: "MASTERCLASS", imageUrl: "https://images.unsplash.com/photo-1541462608141-2ff586255d14?w=200&auto=format&fit=crop&q=80" },
          { id: "edu_c3", name: "Marketing", icon: "TrendingUp", offerText: "POPULAR", imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&auto=format&fit=crop&q=80" },
          { id: "edu_c4", name: "Business", icon: "Briefcase", offerText: "EXECUTIVE", imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&auto=format&fit=crop&q=80" },
          { id: "edu_c5", name: "Data Science", icon: "LineChart", offerText: "NEW COHORT", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&auto=format&fit=crop&q=80" },
          { id: "edu_c6", name: "Languages", icon: "Globe", offerText: "ALL LEVELS", imageUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=200&auto=format&fit=crop&q=80" }
        ]
      },
      cardGrid: {
        id: `top_grid_${timestamp}`,
        type: 'restaurant_list',
        title: "Featured Professional Bootcamps",
        subtitle: "Earn verified credentials and build portfolios with top industry experts",
        restaurants: [
          {
            id: "edu_item1",
            name: "Full-Stack Web Development Bootcamp",
            cuisine: "React, Node.js & Database Architectures",
            rating: 4.96,
            reviewsCount: "4.8k+ reviews",
            deliveryTime: "Self-Paced / Cohort",
            distance: "12 Weeks",
            priceForTwo: "Enroll Free",
            offerBadge: "TOP SELLING",
            imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80",
            isVegOnly: false,
            isPromoted: true
          },
          {
            id: "edu_item2",
            name: "Product Design & UX Masterclass",
            cuisine: "Figma, Design Systems & Usability Audits",
            rating: 4.88,
            reviewsCount: "2.1k+ reviews",
            deliveryTime: "Self-Paced",
            distance: "6 Weeks",
            priceForTwo: "Enroll Free",
            offerBadge: "HIGH RATED",
            imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
            isVegOnly: false,
            isPromoted: false
          },
          {
            id: "edu_item3",
            name: "AI & Machine Learning Foundations",
            cuisine: "Python, TensorFlow & Predictive Models",
            rating: 4.92,
            reviewsCount: "950+ reviews",
            deliveryTime: "Flexible Schedule",
            distance: "8 Weeks",
            priceForTwo: "Enroll Free",
            offerBadge: "NEW SYLLABUS",
            imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
            isVegOnly: false,
            isPromoted: false
          }
        ]
      },
      menuCard: {
        id: `bestsellers_menu_${timestamp}`,
        type: 'food_menu',
        title: "Bestselling Specialized Mini-Courses",
        subtitle: "Targeted skill paths and live coding sandboxes",
        items: [
          {
            id: "edu_m_item1",
            name: "React 19 & Next.js 15 Masterclass",
            description: "Server Actions, PPR, and Concurrent rendering in React 19.",
            price: 19.99,
            rating: 4.95,
            imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: true,
            category: "React"
          },
          {
            id: "edu_m_item2",
            name: "Data Structures & Algorithms Cheatcode",
            description: "Ace coding interviews with clean patterns for trees, graphs, and dynamic programming.",
            price: 29.50,
            rating: 4.9,
            imageUrl: "https://images.unsplash.com/photo-1516116211223-5c359a36298a?w=400&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: true,
            category: "Interviews"
          },
          {
            id: "edu_m_item3",
            name: "Prompt Engineering for Enterprise Developers",
            description: "Learn advanced system prompts, tool usage, and agentic workflows.",
            price: 15.00,
            rating: 4.85,
            imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=80",
            isVeg: false,
            isBestseller: false,
            category: "Generative AI"
          }
        ]
      }
    };
  } else if (isHealth) {
    return {
      categoryGrid: {
        id: `cat_grid_${timestamp}`,
        type: 'food_category_grid',
        title: "Explore Medical Specialties & Care",
        categories: [
          { id: "med_c1", name: "Cardiology", icon: "Activity", offerText: "HEART CARE", imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=200&auto=format&fit=crop&q=80" },
          { id: "med_c2", name: "Pediatrics", icon: "Smile", offerText: "CHILD CARE", imageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&auto=format&fit=crop&q=80" },
          { id: "med_c3", name: "Neurology", icon: "Brain", offerText: "NEURO CARE", imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=200&auto=format&fit=crop&q=80" },
          { id: "med_c4", name: "Dermatology", icon: "User", offerText: "SKIN CLINIC", imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&auto=format&fit=crop&q=80" },
          { id: "med_c5", name: "General Care", icon: "Heart", offerText: "CHECKUPS", imageUrl: "https://images.unsplash.com/photo-1508847154043-be12a96e8a24?w=200&auto=format&fit=crop&q=80" },
          { id: "med_c6", name: "Therapy", icon: "Coffee", offerText: "MENTAL HEALTH", imageUrl: "https://images.unsplash.com/photo-1527380969291-9b04757f50c6?w=200&auto=format&fit=crop&q=80" }
        ]
      },
      cardGrid: {
        id: `top_grid_${timestamp}`,
        type: 'restaurant_list',
        title: "Verified On-Duty Physicians",
        subtitle: "Instant telehealth scheduling or in-clinic consults",
        restaurants: [
          {
            id: "med_doc1",
            name: "Dr. Sarah Jenkins",
            cuisine: "Cardiologist • 12 Yrs Experience",
            rating: 4.95,
            reviewsCount: "1.2k+ consults",
            deliveryTime: "Available in 10m",
            distance: "Telehealth / Clinic",
            priceForTwo: "Consult Fee $45",
            offerBadge: "AVAILABLE NOW",
            imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop&q=80",
            isVegOnly: false,
            isPromoted: true
          },
          {
            id: "med_doc2",
            name: "Dr. Alan Mercer",
            cuisine: "Neurologist • 15 Yrs Experience",
            rating: 4.89,
            reviewsCount: "940 consults",
            deliveryTime: "Available at 2 PM",
            distance: "Clinic Only",
            priceForTwo: "Consult Fee $60",
            offerBadge: "TOP SPECIALIST",
            imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&auto=format&fit=crop&q=80",
            isVegOnly: false,
            isPromoted: false
          },
          {
            id: "med_doc3",
            name: "Dr. Maya Lin",
            cuisine: "Pediatrician • 8 Yrs Experience",
            rating: 4.92,
            reviewsCount: "680 consults",
            deliveryTime: "Available in 15m",
            distance: "Telehealth Only",
            priceForTwo: "Consult Fee $35",
            offerBadge: "RECOMMENDED",
            imageUrl: "https://images.unsplash.com/photo-1594824813573-246434de83fb?w=800&auto=format&fit=crop&q=80",
            isVegOnly: false,
            isPromoted: false
          }
        ]
      },
      menuCard: {
        id: `bestsellers_menu_${timestamp}`,
        type: 'food_menu',
        title: "Comprehensive Health Care Packages",
        subtitle: "Diagnostic profiles, lab panels, and personalized checks",
        items: [
          {
            id: "med_m1",
            name: "Full Executive Health Audit",
            description: "Includes complete lipid profile, thyroid panel, blood count, and standard ECG diagnostics.",
            price: 99.00,
            rating: 4.9,
            imageUrl: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?w=400&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: true,
            category: "Wellness"
          },
          {
            id: "med_m2",
            name: "Cardiac Assessment & Stress Test",
            description: "Advanced cardiac markers, stress ECG, and consulting with our lead cardiologist.",
            price: 145.00,
            rating: 4.95,
            imageUrl: "https://images.unsplash.com/photo-1607619056574-7b8f30413736?w=400&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: true,
            category: "Specialist"
          },
          {
            id: "med_m3",
            name: "Teledentistry Virtual Consult",
            description: "Real-time HD video dental checkup, advice on pain management, and instant prescription.",
            price: 25.00,
            rating: 4.8,
            imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&auto=format&fit=crop&q=80",
            isVeg: false,
            isBestseller: false,
            category: "Dental"
          }
        ]
      }
    };
  } else if (isHotel) {
    return {
      categoryGrid: {
        id: `cat_grid_${timestamp}`,
        type: 'food_category_grid',
        title: "Select Destinational Retreats",
        categories: [
          { id: "hot_c1", name: "Beach Villas", icon: "Sun", offerText: "30% OFF", imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=200&auto=format&fit=crop&q=80" },
          { id: "hot_c2", name: "Mountain Cabins", icon: "Snowflake", offerText: "COZY STAY", imageUrl: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=200&auto=format&fit=crop&q=80" },
          { id: "hot_c3", name: "City Suites", icon: "Building", offerText: "LUXURY", imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=200&auto=format&fit=crop&q=80" },
          { id: "hot_c4", name: "Eco Lodges", icon: "TreePine", offerText: "NATURE", imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=200&auto=format&fit=crop&q=80" },
          { id: "hot_c5", name: "Resorts", icon: "Compass", offerText: "ALL INCLUSIVE", imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=200&auto=format&fit=crop&q=80" },
          { id: "hot_c6", name: "Boutique stays", icon: "Key", offerText: "UNIQUE", imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&auto=format&fit=crop&q=80" }
        ]
      },
      cardGrid: {
        id: `top_grid_${timestamp}`,
        type: 'restaurant_list',
        title: "Featured Stays & Retreats",
        subtitle: "Top-tier properties with private beach access, custom pools, and luxury dining",
        restaurants: [
          {
            id: "hot_item1",
            name: "Aura Luxury Beach Resort & Spa",
            cuisine: "Maldives • Private Overwater Bungalows",
            rating: 4.98,
            reviewsCount: "1.8k+ ratings",
            deliveryTime: "Private Pool • Wi-Fi",
            distance: "All-Inclusive",
            priceForTwo: "$350 / Night",
            offerBadge: "FLAT 30% OFF",
            imageUrl: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&auto=format&fit=crop&q=80",
            isVegOnly: false,
            isPromoted: true
          },
          {
            id: "hot_item2",
            name: "The Alpine Chalet & Ski Resort",
            cuisine: "Zermatt, Switzerland • Majestic Mountain Views",
            rating: 4.92,
            reviewsCount: "920 ratings",
            deliveryTime: "Ski-in / Ski-out",
            distance: "Hot Tub",
            priceForTwo: "$280 / Night",
            offerBadge: "BESTSELLER",
            imageUrl: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?w=800&auto=format&fit=crop&q=80",
            isVegOnly: false,
            isPromoted: false
          },
          {
            id: "hot_item3",
            name: "Tokyo Skyline Luxury Penthouse",
            cuisine: "Shibuya, Tokyo • High Floor Panoramic Views",
            rating: 4.88,
            reviewsCount: "1.4k+ ratings",
            deliveryTime: "City Center • Luxury Dining",
            distance: "Free Airport Shuttle",
            priceForTwo: "$220 / Night",
            offerBadge: "POPULAR OPTION",
            imageUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=80",
            isVegOnly: false,
            isPromoted: false
          }
        ]
      },
      menuCard: {
        id: `bestsellers_menu_${timestamp}`,
        type: 'food_menu',
        title: "Curated Travel Experiences & Upgrades",
        subtitle: "Bespoke day excursions, guided tours, and dining packages",
        items: [
          {
            id: "hot_m1",
            name: "Maldives Private Snorkeling Tour",
            description: "Guided boat trip to private coral reefs with scuba equipment and a sunset seafood dinner.",
            price: 75.00,
            rating: 4.95,
            imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&auto=format&fit=crop&q=80",
            isVeg: false,
            isBestseller: true,
            category: "Excursion"
          },
          {
            id: "hot_m2",
            name: "VIP Airport Fast-Track & Transfer",
            description: "Dedicated airport concierge escort, fast-track customs clearance, and Mercedes S-Class transfer.",
            price: 120.00,
            rating: 4.9,
            imageUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: true,
            category: "Transfer"
          },
          {
            id: "hot_m3",
            name: "Bespoke Couple's Massage & Spa",
            description: "90 minutes deep-tissue Swedish massage using organic essential oils with complimentary champagne.",
            price: 180.00,
            rating: 4.85,
            imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: false,
            category: "Spa"
          }
        ]
      }
    };
  } else if (isFinance) {
    return {
      categoryGrid: {
        id: `cat_grid_${timestamp}`,
        type: 'food_category_grid',
        title: "Markets & Yield Indices",
        categories: [
          { id: "fin_c1", name: "Crypto Futures", icon: "TrendingUp", offerText: "HIGH VOL", imageUrl: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=200&auto=format&fit=crop&q=80" },
          { id: "fin_c2", name: "Global Stocks", icon: "Globe", offerText: "STABLE", imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=200&auto=format&fit=crop&q=80" },
          { id: "fin_c3", name: "Yield Staking", icon: "Download", offerText: "APR 8.2%", imageUrl: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=200&auto=format&fit=crop&q=80" },
          { id: "fin_c4", name: "DeFi Pools", icon: "Layers", offerText: "LIQUIDITY", imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200&auto=format&fit=crop&q=80" },
          { id: "fin_c5", name: "Forex Indices", icon: "Activity", offerText: "24/7 MARKET", imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&auto=format&fit=crop&q=80" },
          { id: "fin_c6", name: "Commodities", icon: "Flame", offerText: "METALS", imageUrl: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=200&auto=format&fit=crop&q=80" }
        ]
      },
      cardGrid: {
        id: `top_grid_${timestamp}`,
        type: 'restaurant_list',
        title: "Active Asset Pairs & Indices",
        subtitle: "Real-time liquidity, trade volumes, and automated pricing pools",
        restaurants: [
          {
            id: "fin_item1",
            name: "BTC / USD Core Liquidity Pair",
            cuisine: "Volume: $2.4B • 100% Capital Efficiency",
            rating: 4.95,
            reviewsCount: "12k+ transactions",
            deliveryTime: "Low Latency (2ms)",
            distance: "Slippage 0.02%",
            priceForTwo: "Leverage Up to 20x",
            offerBadge: "+5.42% GAIN",
            imageUrl: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&auto=format&fit=crop&q=80",
            isVegOnly: false,
            isPromoted: true
          },
          {
            id: "fin_item2",
            name: "ETH / USDT Yield Staking Pool",
            cuisine: "Automated Rebalancing • Continuous Yield",
            rating: 4.89,
            reviewsCount: "8.4k+ stakers",
            deliveryTime: "Smart Contract V2",
            distance: "Zero lockup",
            priceForTwo: "APR 8.54%",
            offerBadge: "HIGH STABILITY",
            imageUrl: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800&auto=format&fit=crop&q=80",
            isVegOnly: false,
            isPromoted: false
          },
          {
            id: "fin_item3",
            name: "Tech Giants Equity Basket Index",
            cuisine: "Top 10 SaaS & AI companies rebalanced weekly",
            rating: 4.91,
            reviewsCount: "1.1k+ holders",
            deliveryTime: "US Equity Hours",
            distance: "Standard Fees",
            priceForTwo: "Conservative Profile",
            offerBadge: "STEADY GROWTH",
            imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=80",
            isVegOnly: false,
            isPromoted: false
          }
        ]
      },
      menuCard: {
        id: `bestsellers_menu_${timestamp}`,
        type: 'food_menu',
        title: "Premium Investment Products",
        subtitle: "Bespoke digital assets, structured notes, and tokenized index packages",
        items: [
          {
            id: "fin_m1",
            name: "Web3 AI Index Token (WAI)",
            description: "Direct tokenized exposure to top decentralized machine learning protocols and node networks.",
            price: 49.99,
            rating: 4.95,
            imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: true,
            category: "Crypto"
          },
          {
            id: "fin_m2",
            name: "Fixed Yield Stable Vault",
            description: "Invest in AAA short-term tokenized treasury bills with a guaranteed 5.2% annualized return.",
            price: 100.00,
            rating: 4.9,
            imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: true,
            category: "Yield"
          },
          {
            id: "fin_m3",
            name: "Cross-Chain Liquidity Node",
            description: "Stake as an active validator in cross-chain bridge relays to receive transaction fee commissions.",
            price: 75.00,
            rating: 4.85,
            imageUrl: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=400&auto=format&fit=crop&q=80",
            isVeg: false,
            isBestseller: false,
            category: "Staking"
          }
        ]
      }
    };
  } else if (isFood) {
    return {
      categoryGrid: {
        id: `cat_grid_${timestamp}`,
        type: 'food_category_grid',
        title: "What's on your mind? Explore Cuisines",
        categories: [
          { id: "food_c1", name: "Pizza", icon: "Pizza", offerText: "50% OFF", imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&auto=format&fit=crop&q=80" },
          { id: "food_c2", name: "Burgers", icon: "UtensilsCrossed", offerText: "POPULAR", imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&auto=format&fit=crop&q=80" },
          { id: "food_c3", name: "Biryani", icon: "Bowl", offerText: "BESTSELLER", imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&auto=format&fit=crop&q=80" },
          { id: "food_c4", name: "Chinese", icon: "Flame", offerText: "FLAT 20% OFF", imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200&auto=format&fit=crop&q=80" },
          { id: "food_c5", name: "Desserts", icon: "Cake", offerText: "SWEET TREATS", imageUrl: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=200&auto=format&fit=crop&q=80" },
          { id: "food_c6", name: "South Indian", icon: "Coffee", offerText: "HEALTHY", imageUrl: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=200&auto=format&fit=crop&q=80" }
        ]
      },
      cardGrid: {
        id: `top_grid_${timestamp}`,
        type: 'restaurant_list',
        title: "Top Restaurants Near You",
        subtitle: "Vibrant gourmet kitchens with express delivery and exclusive deals",
        restaurants: [
          {
            id: "rest1",
            name: "The Artisan Pizza Project",
            cuisine: "Italian • Woodfired Pizza • Gourmet Pasta",
            rating: 4.9,
            reviewsCount: "1.2k+ reviews",
            deliveryTime: "20-25 mins",
            distance: "1.2 km",
            priceForTwo: "$18 for two",
            offerBadge: "50% OFF UP TO $10",
            imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&auto=format&fit=crop&q=80",
            isVegOnly: false,
            isPromoted: true
          },
          {
            id: "rest2",
            name: "Royal Hyderabadi Biryani",
            cuisine: "Hyderabadi • Mughlai • Authentic Kebabs",
            rating: 4.8,
            reviewsCount: "2.5k+ reviews",
            deliveryTime: "25-30 mins",
            distance: "2.4 km",
            priceForTwo: "$22 for two",
            offerBadge: "FREE EXPRESS DELIVERY",
            imageUrl: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&auto=format&fit=crop&q=80",
            isVegOnly: false,
            isPromoted: false
          },
          {
            id: "rest3",
            name: "Burger Craft & Milkshakes",
            cuisine: "American • Angus Burgers • Craft Shakes",
            rating: 4.7,
            reviewsCount: "950+ reviews",
            deliveryTime: "15-20 mins",
            distance: "0.8 km",
            priceForTwo: "$15 for two",
            offerBadge: "FLAT 20% OFF",
            imageUrl: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&auto=format&fit=crop&q=80",
            isVegOnly: false,
            isPromoted: false
          }
        ]
      },
      menuCard: {
        id: `bestsellers_menu_${timestamp}`,
        type: 'food_menu',
        title: "Bestseller Gourmet Dishes",
        subtitle: "Highly rated signature recipes and chef specials",
        items: [
          {
            id: "food_m1",
            name: "Double Smokehouse Cheeseburger",
            description: "Two prime Angus patties, smoked cheddar, applewood bacon, crisp onions, house bbq sauce, toasted brioche.",
            price: 14.50,
            rating: 4.9,
            imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&auto=format&fit=crop&q=80",
            isVeg: false,
            isBestseller: true,
            category: "Burgers"
          },
          {
            id: "food_m2",
            name: "Authentic Paneer Tikka Masala",
            description: "Grilled cottage cheese cubes simmered in a rich, creamy, spiced tomato gravy with butter naan.",
            price: 16.00,
            rating: 4.95,
            imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: true,
            category: "Curries"
          },
          {
            id: "food_m3",
            name: "Warm Belgian Fudge Waffle",
            description: "Freshly baked waffle topped with hot fudge sauce, premium vanilla bean gelato, and toasted almonds.",
            price: 8.50,
            rating: 4.8,
            imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: false,
            category: "Desserts"
          }
        ]
      }
    };
  } else {
    // 7. General Tech / SaaS / Operations (Default)
    return {
      categoryGrid: {
        id: `cat_grid_${timestamp}`,
        type: 'food_category_grid',
        title: "Explore Operations & Modules",
        categories: [
          { id: "gen_c1", name: "Core Hub", icon: "LayoutGrid", offerText: "ACTIVE", imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=200&auto=format&fit=crop&q=80" },
          { id: "gen_c2", name: "Database", icon: "Database", offerText: "SYNCED", imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&auto=format&fit=crop&q=80" },
          { id: "gen_c3", name: "Security", icon: "Shield", offerText: "VERIFIED", imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200&auto=format&fit=crop&q=80" },
          { id: "gen_c4", name: "Data Logs", icon: "Terminal", offerText: "REAL-TIME", imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200&auto=format&fit=crop&q=80" },
          { id: "gen_c5", name: "API Gateway", icon: "Layers", offerText: "0 LATENCY", imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&auto=format&fit=crop&q=80" },
          { id: "gen_c6", name: "Workspaces", icon: "Folder", offerText: "NEW", imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=200&auto=format&fit=crop&q=80" }
        ]
      },
      cardGrid: {
        id: `top_grid_${timestamp}`,
        type: 'restaurant_list',
        title: "Active System Deployments & Instances",
        subtitle: "High-performance containers, validated integrations, and live nodes",
        restaurants: [
          {
            id: "gen_item1",
            name: "Primary Database Replica #1",
            cuisine: "PostgreSQL Cluster • Automated Backups Active",
            rating: 4.97,
            reviewsCount: "2.4k+ hours uptime",
            deliveryTime: "Uptime 99.99%",
            distance: "0ms latency",
            priceForTwo: "Included",
            offerBadge: "100% HEALTHY",
            imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
            isVegOnly: false,
            isPromoted: true
          },
          {
            id: "gen_item2",
            name: "Secure Web Proxy Gateway",
            cuisine: "TLS 1.3 Encryption • Rate-Limiting Enabled",
            rating: 4.91,
            reviewsCount: "99.9% success rate",
            deliveryTime: "Global Edge Routing",
            distance: "Brotli compression",
            priceForTwo: "Enterprise Tier",
            offerBadge: "SECURE NODE",
            imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
            isVegOnly: false,
            isPromoted: false
          },
          {
            id: "gen_item3",
            name: "Redis Cache Telemetry Node",
            cuisine: "In-memory query optimization, session sync",
            rating: 4.88,
            reviewsCount: "3.2B operations",
            deliveryTime: "Read-heavy load",
            distance: "Optimized clusters",
            priceForTwo: "Standard Tier",
            offerBadge: "OPTIMAL SPEED",
            imageUrl: "https://images.unsplash.com/photo-1562408590-e32931084e23?w=800&auto=format&fit=crop&q=80",
            isVegOnly: false,
            isPromoted: false
          }
        ]
      },
      menuCard: {
        id: `bestsellers_menu_${timestamp}`,
        type: 'food_menu',
        title: "Bestselling Service Bundles",
        subtitle: "Highly requested operations configurations and telemetry nodes",
        items: [
          {
            id: "gen_m1",
            name: "Pro Telemetry Accelerator Node",
            description: "High-throughput log scraper with automated Alertmanager and Prometheus webhooks.",
            price: 29.99,
            rating: 4.95,
            imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: true,
            category: "Monitoring"
          },
          {
            id: "gen_m2",
            name: "Kubernetes Cluster Auto-Scaler",
            description: "Automatically scale pods up or down depending on memory and cpu usage thresholds.",
            price: 49.50,
            rating: 4.9,
            imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=80",
            isVeg: true,
            isBestseller: true,
            category: "Kubernetes"
          },
          {
            id: "gen_m3",
            name: "Global CDN Edge Router (Standard)",
            description: "Deploy edge caching nodes in 42 regions worldwide with auto-renewal Let's Encrypt certificates.",
            price: 19.00,
            rating: 4.85,
            imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&auto=format&fit=crop&q=80",
            isVeg: false,
            isBestseller: false,
            category: "CDN"
          }
        ]
      }
    };
  }
}

export function synthesizeComponentForSectionTitle(secTitle: string): any {
  const timestamp = Date.now();
  const titleLower = (secTitle || '').toLowerCase();
  const cleanTitle = secTitle || 'Details';

  if (
    titleLower.includes('bulletin') || titleLower.includes('safety') ||
    titleLower.includes('alert') || titleLower.includes('warning') ||
    titleLower.includes('notice') || titleLower.includes('protocol') ||
    titleLower.includes('advisory') || titleLower.includes('compliance') ||
    titleLower.includes('sos') || titleLower.includes('emergency') ||
    titleLower.includes('error')
  ) {
    return {
      id: `alert_auto_${timestamp}_${Math.random().toString(36).substr(2, 4)}`,
      type: 'alert',
      title: cleanTitle,
      severity: titleLower.includes('warning') || titleLower.includes('error') || titleLower.includes('critical') || titleLower.includes('sos') ? 'warning' : 'info',
      message: `Active monitoring and protocol established for "${cleanTitle}". Please review the relevant parameters.`,
      timestamp: 'Just now',
      actionLabel: 'Acknowledge'
    };
  }

  if (
    titleLower.includes('work') || titleLower.includes('assignment') ||
    titleLower.includes('task') || titleLower.includes('kanban') ||
    titleLower.includes('board') || titleLower.includes('dispatch') ||
    titleLower.includes('queue') || titleLower.includes('execution') ||
    titleLower.includes('workflow') || titleLower.includes('duty') ||
    titleLower.includes('shift') || titleLower.includes('order') ||
    titleLower.includes('status') || titleLower.includes('project')
  ) {
    return {
      id: `kanban_auto_${timestamp}_${Math.random().toString(36).substr(2, 4)}`,
      type: 'kanban',
      title: cleanTitle,
      columns: [
        { id: 'todo', title: 'Pending / To Do', color: '#f59e0b' },
        { id: 'in_progress', title: 'In Progress', color: '#3b82f6' },
        { id: 'done', title: 'Completed', color: '#10b981' }
      ],
      items: [
        { id: 'k1', columnId: 'todo', title: `Review ${cleanTitle} Requirements`, priority: 'high', assignee: 'System', subtitle: 'Initial setup and verification' },
        { id: 'k2', columnId: 'in_progress', title: `Process ${cleanTitle} Data`, priority: 'medium', assignee: 'System', subtitle: 'Active processing' },
        { id: 'k3', columnId: 'done', title: 'Initial Validation', priority: 'low', assignee: 'System', subtitle: 'Validation passed successfully' }
      ]
    };
  }

  if (
    titleLower.includes('chart') || titleLower.includes('trend') ||
    titleLower.includes('metric') || titleLower.includes('analytics') ||
    titleLower.includes('performance') || titleLower.includes('rate') ||
    titleLower.includes('budget') || titleLower.includes('cost') ||
    titleLower.includes('burn') || titleLower.includes('stats')
  ) {
    return {
      id: `chart_auto_${timestamp}_${Math.random().toString(36).substr(2, 4)}`,
      type: 'chart',
      chartType: 'area',
      title: cleanTitle,
      xAxisKey: 'period',
      dataKeys: [{ key: 'value', name: 'Metric Score', color: '#10b981' }],
      data: [
        { period: 'Q1', value: 68 },
        { period: 'Q2', value: 75 },
        { period: 'Q3', value: 88 },
        { period: 'Q4', value: 94 }
      ]
    };
  }

  if (
    titleLower.includes('table') || titleLower.includes('ledger') ||
    titleLower.includes('log') || titleLower.includes('directory') ||
    titleLower.includes('record') || titleLower.includes('history')
  ) {
    return {
      id: `table_auto_${timestamp}_${Math.random().toString(36).substr(2, 4)}`,
      type: 'table',
      title: cleanTitle,
      searchable: true,
      exportable: true,
      columns: [
        { key: "item", label: "Item / Record", type: "text" },
        { key: "category", label: "Category", type: "text" },
        { key: "progress", label: "Completion", type: "progress" },
        { key: "status", label: "Status", type: "badge", badgeColorMap: { "Active": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", "Pending": "bg-amber-500/10 text-amber-600 border-amber-500/20", "Archived": "bg-slate-500/10 text-slate-600 border-slate-500/20" } }
      ],
      data: [
        { item: `${cleanTitle} Record A`, category: "Primary", progress: 92, status: "Active" },
        { item: `${cleanTitle} Record B`, category: "Secondary", progress: 68, status: "Pending" },
        { item: `${cleanTitle} Record C`, category: "Tertiary", progress: 100, status: "Archived" }
      ]
    };
  }

  // Ultimate fallback: Visually rich media card grid (re-uses restaurant_list) for Tab 1
  return {
    id: `grid_auto_${timestamp}_${Math.random().toString(36).substr(2, 4)}`,
    type: 'restaurant_list',
    title: cleanTitle,
    subtitle: `Explore top highlights for ${cleanTitle}`,
    restaurants: [
      {
        id: 'g1',
        name: `Featured: ${cleanTitle} Alpha`,
        rating: 4.9,
        deliveryTime: 'New',
        cuisine: 'Trending',
        imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=80',
        description: `Experience the finest selection of ${cleanTitle}.`
      },
      {
        id: 'g2',
        name: `${cleanTitle} Beta Series`,
        rating: 4.7,
        deliveryTime: 'Updated',
        cuisine: 'Popular',
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
        description: `Highly rated highlights from the ${cleanTitle} collection.`
      },
      {
        id: 'g3',
        name: `Classic ${cleanTitle}`,
        rating: 4.8,
        deliveryTime: 'Archived',
        cuisine: 'Classic',
        imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&auto=format&fit=crop&q=80',
        description: `The standard reliable overview of ${cleanTitle}.`
      }
    ]
  };
}

/**
 * Universal Visual Enforcer
 * Guarantees a top photography hero banner image, category grids, card grids, and bestseller menus 
 * for every schema while preserving each application's unique features, layouts, and data.
 */
export function ensureRichVisualComponents(
  schema: DynamicUISchema,
  prompt: string
): DynamicUISchema {
  if (!schema) return schema;

  // Normalize layout
  if (schema.layout && !Array.isArray(schema.layout)) {
    if (typeof schema.layout === 'object') {
      schema.layout = [schema.layout as any];
    } else {
      schema.layout = [];
    }
  }

  // Normalize operationsLayout
  if (schema.operationsLayout && !Array.isArray(schema.operationsLayout)) {
    if (typeof schema.operationsLayout === 'object') {
      schema.operationsLayout = [schema.operationsLayout as any];
    } else {
      schema.operationsLayout = [];
    }
  }

  // Normalize analyticsLayout
  if (schema.analyticsLayout && !Array.isArray(schema.analyticsLayout)) {
    if (typeof schema.analyticsLayout === 'object') {
      schema.analyticsLayout = [schema.analyticsLayout as any];
    } else {
      schema.analyticsLayout = [];
    }
  }

  if (!schema.layout || !Array.isArray(schema.layout)) {
    schema.layout = [];
  }

  const validTypes = new Set([
    'chart', 'calculator', 'table', 'form', 'kanban', 'alert', 
    'action_list', 'image', 'restaurant_list', 'food_category_grid', 'food_menu'
  ]);

  const mapType = (type: string): string => {
    if (!type) return 'table';
    if (validTypes.has(type)) return type;

    const t = type.toLowerCase();
    if (t === 'data_table' || t.includes('grid')) return 'table';
    if (t === 'kanban_board' || t.includes('board')) return 'kanban';
    if (t === 'alert_banner' || t.includes('warning') || t.includes('notice')) return 'alert';
    if (t.includes('chart') || t.includes('graph') || t.includes('metric') || t.includes('stat')) return 'chart';
    if (t.includes('list')) return 'action_list';
    if (t.includes('card')) return 'action_list';
    if (t.includes('form') || t.includes('input')) return 'form';
    
    // Ultimate fallback so the black 'Unknown Component Type' box never appears
    return 'table';
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

  if (schema.layout) {
    schema.layout = schema.layout.map(normalizeSection);
  }
  if (schema.operationsLayout) {
    schema.operationsLayout = schema.operationsLayout.map(normalizeSection);
  }
  if (schema.analyticsLayout) {
    schema.analyticsLayout = schema.analyticsLayout.map(normalizeSection);
  }

  const timestamp = Date.now();
  const p = (prompt || schema.generatedPrompt || '').toLowerCase();

  // Flatten components to check what visual types already exist
  const allComponents = schema.layout.flatMap(sec => sec ? (sec.components || []) : []);
  const hasHeroImage = allComponents.some(c => c && c.type === 'image');
  const hasCategoryGrid = allComponents.some(c => c && c.type === 'food_category_grid');
  const hasCardGrid = allComponents.some(c => c && c.type === 'restaurant_list');
  const hasMenu = allComponents.some(c => c && c.type === 'food_menu');

  // Identify domain for Hero Photography Banner Image
  const isHealth = /\b(health|medicare|patient|doctor|clinic|hospital|medication|triage|vitals|medical|gym|fitness|workout|yoga)\b/i.test(p);
  const isFood = /\b(food|restaurant|dining|swiggy|zomato|pizza|burger|meal|delivery)\b/i.test(p);
  const isEcommerce = /\b(shop|store|ecommerce|product|cart|fashion|sneaker)\b/i.test(p);
  const isHotel = /\b(hotel|stay|resort|travel|booking|villa|holiday|vacation)\b/i.test(p);
  const isFinance = /\b(finance|crypto|trading|bank|wallet|burn|investment)\b/i.test(p);
  const isTask = /\b(task|remind|habit|planner|todo)\b/i.test(p);
  const isCivic = /\b(civic|city|urban|gov|traffic|public|authority|car|auto|rental|vehicle)\b/i.test(p);
  const isSafety = /\b(sos|emergency|safety|guardian|shield)\b/i.test(p);
  const isLibrary = /\b(library|book|catalog|read|shelf|novel|literature)\b/i.test(p);

  let heroUrl = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80"; // Tech/SaaS default
  if (isHealth) {
    heroUrl = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80";
  } else if (isFood) {
    heroUrl = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80";
  } else if (isEcommerce) {
    heroUrl = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80";
  } else if (isHotel) {
    heroUrl = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=80";
  } else if (isFinance) {
    heroUrl = "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=1200&auto=format&fit=crop&q=80";
  } else if (isTask) {
    heroUrl = "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&auto=format&fit=crop&q=80";
  } else if (isCivic) {
    heroUrl = "https://images.unsplash.com/photo-1477959858617-67f30ac4ce71?w=1200&auto=format&fit=crop&q=80";
  } else if (isSafety) {
    heroUrl = "https://images.unsplash.com/photo-1508873696983-2df515122519?w=1200&auto=format&fit=crop&q=80";
  } else if (isLibrary) {
    heroUrl = "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&auto=format&fit=crop&q=80";
  }

  let heroTitle = `${schema.title || 'Application'} • Next-Gen Digital Hub`;
  let heroDesc = schema.description || `Interactive workspace and real-time management portal for "${prompt}".`;

  const newSections: any[] = [];

  // 1. Top Hero Photography Banner Image (Always placed FIRST)
  if (hasHeroImage) {
    // Keep existing hero image section at the top
    const heroSec = schema.layout.find(sec => sec && (sec.components || []).some(c => c && c.type === 'image'));
    if (heroSec) {
      newSections.push(heroSec);
    }
  } else {
    newSections.push({
      id: `sec_auto_hero_${timestamp}`,
      gridCols: 1,
      components: [
        {
          id: `auto_hero_${timestamp}`,
          type: 'image',
          title: heroTitle,
          description: heroDesc,
          url: heroUrl,
          aspectRatio: "wide"
        }
      ]
    });
  }

  // Get domain visual templates
  const domainVisuals = getDomainSpecificVisuals(prompt || schema.generatedPrompt || '', timestamp);

  // 2. Category Pill Grid (Always placed SECOND)
  if (hasCategoryGrid) {
    const catSec = schema.layout.find(sec => sec && (sec.components || []).some(c => c && c.type === 'food_category_grid'));
    if (catSec) {
      newSections.push(catSec);
    }
  } else {
    newSections.push({
      id: `sec_auto_categories_${timestamp}`,
      gridCols: 1,
      components: [domainVisuals.categoryGrid]
    });
  }

  // 3. Photography Card Grid (Always placed THIRD)
  if (hasCardGrid) {
    const cardSec = schema.layout.find(sec => sec && (sec.components || []).some(c => c && c.type === 'restaurant_list'));
    if (cardSec) {
      newSections.push(cardSec);
    }
  } else {
    newSections.push({
      id: `sec_auto_cards_${timestamp}`,
      gridCols: 1,
      components: [domainVisuals.cardGrid]
    });
  }

  // 4. Bestseller Item Cards Menu (Always placed FOURTH)
  if (hasMenu) {
    const menuSec = schema.layout.find(sec => sec && (sec.components || []).some(c => c && c.type === 'food_menu'));
    if (menuSec) {
      newSections.push(menuSec);
    }
  } else {
    newSections.push({
      id: `sec_auto_menu_${timestamp}`,
      gridCols: 1,
      components: [domainVisuals.menuCard]
    });
  }

  // 5. Append all other layout sections generated by the LLM
  schema.layout.forEach(sec => {
    if (!sec) return;
    const isSpecialVisualSection = (sec.components || []).some(c => c && (
      c.type === 'image' || 
      c.type === 'food_category_grid' || 
      c.type === 'restaurant_list' || 
      c.type === 'food_menu'
    ));
    // If it's not one of our standardized visual components, append it below them
    if (!isSpecialVisualSection) {
      newSections.push(sec);
    }
  });

  const finalSchema = {
    ...schema,
    layout: newSections
  };

  // 6. Clean up empty generated tables (like those showing 0 records)
  const removeEmptyTables = (layoutArray: any[]) => {
    if (!Array.isArray(layoutArray)) return layoutArray;
    return layoutArray.map(sec => {
      if (sec && sec.components) {
        sec.components = sec.components.filter((comp: any) => {
          if (comp && comp.type === 'table') {
            // Remove tables that have no data to avoid "0 records" empty states
            const hasData = Array.isArray(comp.data) && comp.data.length > 0;
            return hasData;
          }
          return true;
        });
      }
      return sec;
    }).filter(sec => sec && sec.components && sec.components.length > 0);
  };

  finalSchema.layout = removeEmptyTables(finalSchema.layout);
  if (finalSchema.operationsLayout) finalSchema.operationsLayout = removeEmptyTables(finalSchema.operationsLayout);
  if (finalSchema.analyticsLayout) finalSchema.analyticsLayout = removeEmptyTables(finalSchema.analyticsLayout);

  return finalSchema;
}
