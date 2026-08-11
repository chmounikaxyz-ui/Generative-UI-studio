import React from 'react';
import { FoodCategoryGridComponentData, ThemeConfig } from '../types';
import { getThemeStyles } from '../utils/themeUtils';
import { DynamicIcon } from './DynamicIcon';

interface FoodCategoryGridProps {
  component: FoodCategoryGridComponentData;
  theme?: ThemeConfig;
}

export const FoodCategoryGrid: React.FC<FoodCategoryGridProps> = ({ component, theme }) => {
  const styles = getThemeStyles(theme);

  const categoryCount = component.categories?.length || 4;
  const gridColsClass = categoryCount <= 4 
    ? 'grid-cols-2 sm:grid-cols-4' 
    : categoryCount === 5 
    ? 'grid-cols-2 sm:grid-cols-5' 
    : categoryCount === 6 
    ? 'grid-cols-3 sm:grid-cols-6'
    : 'grid-cols-3 sm:grid-cols-6 lg:grid-cols-8';

  return (
    <div className="space-y-3">
      {component.title && (
        <h3 className={`text-base font-bold tracking-tight ${styles.textPrimaryClass}`}>
          {component.title}
        </h3>
      )}

      {/* Horizontal / Grid Scrollable Category Chips */}
      <div className={`grid ${gridColsClass} gap-3`}>
        {component.categories?.map((cat) => (
          <div
            key={cat.id}
            className={`${styles.cardBgClass} border ${styles.cardBorderClass} p-3 rounded-2xl ${styles.cardShadowClass} hover:-translate-y-1 hover:border-amber-500/80 hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center group cursor-pointer space-y-2`}
          >
            {cat.imageUrl ? (
              <div className="w-14 h-14 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-xs group-hover:scale-105 transition-transform">
                <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover rounded-full bg-white dark:bg-zinc-900" />
              </div>
            ) : (
              <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-xs group-hover:scale-105 transition-transform flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <DynamicIcon name={cat.icon || 'Utensils'} className="w-6 h-6" />
                </div>
              </div>
            )}

            <span className={`text-xs font-extrabold ${styles.textPrimaryClass} group-hover:text-amber-600 transition-colors`}>
              {cat.name}
            </span>

            {cat.offerText && (
              <span className="text-[9px] font-extrabold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200/40 uppercase tracking-wider">
                {cat.offerText}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
