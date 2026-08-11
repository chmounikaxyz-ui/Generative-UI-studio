import React, { useState } from 'react';
import { KanbanComponentData, KanbanItem, ThemeConfig } from '../types';
import { Plus, MoreHorizontal, User } from 'lucide-react';
import { getThemeStyles } from '../utils/themeUtils';

interface KanbanCardProps {
  component: KanbanComponentData;
  theme?: ThemeConfig;
  device?: 'desktop' | 'tablet' | 'mobile';
}

const DEFAULT_KANBAN_COLUMNS = [
  { id: 'todo', title: 'To Do', color: '#f59e0b' },
  { id: 'in_progress', title: 'In Progress', color: '#3b82f6' },
  { id: 'done', title: 'Completed', color: '#10b981' }
];

const DEFAULT_KANBAN_ITEMS: KanbanItem[] = [
  { id: 'k1', columnId: 'todo', title: 'Design System Audit & Micro-Interactions', priority: 'high', assignee: 'Alex R.', subtitle: 'Review color tokens & glassmorphic depth' },
  { id: 'k2', columnId: 'in_progress', title: 'API Integration & Real-time Metrics', priority: 'medium', assignee: 'Sarah K.', subtitle: 'Connect live analytics pipeline' },
  { id: 'k3', columnId: 'done', title: 'Setup Initial Dashboard Layout', priority: 'low', assignee: 'Jordan M.', subtitle: 'Configured base theme & responsiveness' }
];

export const KanbanCard: React.FC<KanbanCardProps> = ({ component, theme, device }) => {
  const initialCols = ((component.columns && component.columns.length > 0) ? component.columns : DEFAULT_KANBAN_COLUMNS).map((col: any) => ({
    ...col,
    id: col.id || col.title || ''
  }));
  let initialItems = (component.items && component.items.length > 0) 
    ? component.items 
    : (component as any).cards || (component as any).tasks || [];

  if (initialItems.length === 0) {
    const title = (component.title || '').toLowerCase();
    const isTransit = title.includes('train') || title.includes('station') || title.includes('departure') || title.includes('alert') || title.includes('track') || title.includes('maintenance') || title.includes('transit');
    const isAcademic = title.includes('student') || title.includes('grade') || title.includes('academic') || title.includes('task') || title.includes('assignment') || title.includes('grading') || title.includes('class');

    const firstColId = initialCols[0]?.id || 'todo';
    const secondColId = initialCols[1]?.id || 'in_progress';
    const thirdColId = initialCols[2]?.id || 'done';

    if (isTransit) {
      initialItems = [
        { id: 't1', columnId: firstColId, title: 'Inspect Platform 3 Signals', priority: 'high', assignee: 'Track Team A', subtitle: 'Fault reported in relay housing' },
        { id: 't2', columnId: secondColId, title: 'Mainline Signal Calibration', priority: 'medium', assignee: 'Signal Control', subtitle: 'Routine quarterly calibration' },
        { id: 't3', columnId: thirdColId, title: 'Overhead Line Maintenance', priority: 'high', assignee: 'Electrical Crew', subtitle: 'Replaced contact wire near Platform 2' }
      ];
    } else if (isAcademic) {
      initialItems = [
        { id: 'a1', columnId: firstColId, title: 'Grade Midterm Essays', priority: 'high', assignee: 'Prof. Harrison', subtitle: 'Evaluate 42 literature reviews' },
        { id: 'a2', columnId: secondColId, title: 'Develop Quiz Syllabus', priority: 'medium', assignee: 'TA Jordan', subtitle: 'Draft 15 multiple-choice questions' },
        { id: 'a3', columnId: thirdColId, title: 'Publish Semester Roster', priority: 'low', assignee: 'Registrar', subtitle: 'Sync canvas enrollments' }
      ];
    } else {
      initialItems = [
        { id: 'g1', columnId: firstColId, title: 'Analyze Operational Logs', priority: 'medium', assignee: 'Support Lead', subtitle: 'Review system metrics & logs' },
        { id: 'g2', columnId: secondColId, title: 'Resolve Dependency Conflict', priority: 'high', assignee: 'Dev Team', subtitle: 'Update server packages & bundle size' },
        { id: 'g3', columnId: thirdColId, title: 'Deploy Sandbox Environment', priority: 'low', assignee: 'DevOps', subtitle: 'Created container clusters' }
      ];
    }
  }

  const [columns] = useState(initialCols);
  const [items, setItems] = useState<KanbanItem[]>(initialItems);
  const styles = getThemeStyles(theme);

  const moveItem = (itemId: string, newColumnId: string) => {
    setItems(prev =>
      prev.map(item => (item.id === itemId ? { ...item, columnId: newColumnId } : item))
    );
  };

  return (
    <div className={`${styles.cardBgClass} border ${styles.cardBorderClass} ${styles.cardRadiusClass} ${styles.densityPaddingClass} ${styles.cardShadowClass} space-y-4 transition-all`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-sm font-semibold ${styles.textPrimaryClass}`}>{component.title}</h3>
          <p className={`text-xs ${styles.textSecondaryClass}`}>Interactive Kanban Workflow Board</p>
        </div>
      </div>

      <div className={`grid ${device === 'mobile' ? 'grid-cols-1 gap-4' : 'grid-cols-1 md:grid-cols-3 gap-5'}`}>
        {columns.map(col => {
          const colItems = items.filter(i => 
            i.columnId === col.id || 
            (i as any).column === col.id || 
            String(i.columnId || '').toLowerCase() === String(col.title || '').toLowerCase() ||
            String((i as any).column || '').toLowerCase() === String(col.title || '').toLowerCase()
          );
          return (
            <div
              key={col.id}
              className={`${styles.subCardBgClass} border ${styles.subCardBorderClass} rounded-xl p-4 flex flex-col space-y-3 min-h-[260px] transition-colors duration-200`}
            >
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: col.color || '#18181b' }} />
                  <span className={`text-xs font-bold ${styles.textPrimaryClass}`}>{col.title}</span>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 ${styles.inputBgClass} border ${styles.inputBorderClass} ${styles.textSecondaryClass} rounded-full`}>
                  {colItems.length}
                </span>
              </div>

              <div className="space-y-2.5 flex-1">
                {colItems.map(item => (
                  <div
                    key={item.id}
                    className={`${styles.cardBgClass} border ${styles.cardBorderClass} rounded-xl p-3.5 shadow-xs hover:shadow-sm hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-200 space-y-2.5 cursor-grab active:cursor-grabbing`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className={`text-xs font-bold tracking-tight leading-snug ${styles.textPrimaryClass}`}>{item.title}</h4>
                      {item.priority && (
                        <span className={`text-[9px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider border ${
                          item.priority === 'high'
                            ? 'bg-rose-500/10 text-rose-600 border-rose-500/25 dark:text-rose-400'
                            : item.priority === 'medium'
                            ? 'bg-amber-500/10 text-amber-600 border-amber-500/25 dark:text-amber-400'
                            : 'bg-zinc-500/10 text-zinc-600 border-zinc-500/25 dark:text-zinc-400'
                        }`}>
                          {item.priority}
                        </span>
                      )}
                    </div>

                    {item.subtitle && (
                      <p className={`text-[11px] leading-relaxed ${styles.textSecondaryClass}`}>{item.subtitle}</p>
                    )}

                    <div className={`flex items-center justify-between pt-2.5 border-t ${styles.dividerBorderClass} text-[11px] ${styles.textSecondaryClass}`}>
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 opacity-70" />
                        <span className="font-medium">{item.assignee || 'Unassigned'}</span>
                      </div>

                      <select
                        value={item.columnId}
                        onChange={e => moveItem(item.id, e.target.value)}
                        className={`${styles.inputBgClass} border ${styles.inputBorderClass} ${styles.inputTextClass} ${styles.inputFocusClass} text-[10px] rounded-lg px-2 py-0.5 cursor-pointer focus:outline-none font-semibold transition-all`}
                      >
                        {columns.map(c => (
                          <option key={c.id} value={c.id}>
                            → {c.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
