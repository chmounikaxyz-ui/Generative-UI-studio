import React from 'react';
import { MetricItem, ThemeConfig } from '../types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { motion } from 'motion/react';
import { getThemeStyles } from '../utils/themeUtils';
import { DynamicIcon } from './DynamicIcon';

interface MetricsBarProps {
  metrics: MetricItem[];
  theme?: ThemeConfig;
  device?: 'desktop' | 'tablet' | 'mobile';
}

export const MetricsBar: React.FC<MetricsBarProps> = ({ metrics, theme, device }) => {
  const styles = getThemeStyles(theme);
  const safeMetrics = metrics || [];

  const formatValue = (metric: MetricItem) => {
    if (typeof metric.value === 'number') {
      if (metric.format === 'currency') {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0
        }).format(metric.value);
      }
      if (metric.format === 'percentage') {
        return `${metric.value}%`;
      }
      return metric.value.toLocaleString();
    }
    return metric.value;
  };

  const getGridCols = () => {
    if (device === 'mobile') return 'grid-cols-1 gap-3';
    if (device === 'tablet') return 'grid-cols-2 gap-4';

    const count = safeMetrics.length;
    if (count === 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-1 sm:grid-cols-2 gap-4';
    if (count === 3) return 'grid-cols-1 sm:grid-cols-3 gap-4';
    return `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ${styles.densityGapClass}`;
  };

  return (
    <div className={`grid ${getGridCols()} my-5`}>
      {safeMetrics.map((metric, idx) => (
        <motion.div
          key={metric.id || idx}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.05, ease: "easeOut" }}
          className={`${styles.cardBgClass} border ${styles.cardBorderClass} ${styles.cardRadiusClass} ${styles.densityPaddingClass} ${styles.cardShadowClass} hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group relative overflow-hidden`}
        >
          {/* Subtle Accent Glow Top Bar */}
          <div 
            className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ backgroundColor: styles.primaryColorHex }}
          />

          <div>
            <div className="flex items-start justify-between gap-2 w-full">
              <span className={`text-[11px] font-bold uppercase tracking-wider ${styles.textSecondaryClass} flex-1 min-w-0 leading-tight`}>
                {metric.label}
              </span>

              <div className="flex items-center gap-1.5 shrink-0">
                {metric.change && (
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold tracking-tight ${
                      metric.trend === 'up'
                        ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 dark:text-emerald-400'
                        : metric.trend === 'down'
                        ? 'bg-rose-500/10 text-rose-600 border border-rose-500/20 dark:text-rose-400'
                        : 'bg-zinc-500/10 text-zinc-600 border border-zinc-500/20 dark:text-zinc-400'
                    }`}
                  >
                    {metric.trend === 'up' && <TrendingUp className="w-3 h-3" />}
                    {metric.trend === 'down' && <TrendingDown className="w-3 h-3" />}
                    {metric.trend === 'neutral' && <Minus className="w-3 h-3" />}
                    <span>{metric.change.replace(/^[~_\s]+/g, '')}</span>
                  </span>
                )}

                {metric.icon && (
                  <div className={`p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 border ${styles.cardBorderClass} shrink-0 transition-transform group-hover:scale-110 duration-200`}>
                    <DynamicIcon name={metric.icon} className={`w-3.5 h-3.5 ${styles.accentTextClass}`} />
                  </div>
                )}
              </div>
            </div>

            <div className={`text-2xl sm:text-3xl font-black mt-2.5 tracking-tight leading-none ${styles.textPrimaryClass}`}>
              {formatValue(metric)}
            </div>
          </div>

          <div className={`mt-4 pt-3 border-t ${styles.dividerBorderClass} flex items-center justify-between text-[11px] font-medium ${styles.textSecondaryClass}`}>
            <span className="truncate">{metric.subtext || 'Live metric'}</span>

            {/* Micro Sparkline Visual */}
            {metric.sparkline && metric.sparkline.length > 1 ? (
              <div className="flex items-end gap-1 h-4 shrink-0">
                {metric.sparkline.map((val, sIdx) => {
                  const min = Math.min(...metric.sparkline!);
                  const max = Math.max(...metric.sparkline!);
                  const heightPct = max === min ? 50 : Math.max(15, ((val - min) / (max - min)) * 100);
                  return (
                    <div
                      key={sIdx}
                      className="w-1 rounded-full transition-all duration-500 group-hover:opacity-90"
                      style={{ 
                        height: `${heightPct}%`, 
                        backgroundColor: styles.primaryColorHex,
                        transitionDelay: `${sIdx * 30}ms`
                      }}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Updated</span>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
