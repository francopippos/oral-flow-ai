import { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const ScarcityCounter = () => {
  const { t } = useTranslation();
  // Simulate remaining spots (you could make this dynamic later)
  const [spotsRemaining] = useState(7);
  const totalSpots = 30;
  const progress = ((totalSpots - spotsRemaining) / totalSpots) * 100;

  return (
    <div className="bg-gradient-to-r from-destructive/10 to-orange-500/10 border border-destructive/20 rounded-2xl p-6 max-w-md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-2xl font-bold text-destructive">{spotsRemaining}</div>
          <div className="text-sm text-muted-foreground font-medium">{t('hero.spotsRemaining')}</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-foreground">{t('hero.exclusiveBeta')}</div>
          <div className="text-xs text-muted-foreground">{t('hero.inviteOnly')}</div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-muted rounded-full h-2 mb-2">
        <div 
          className="bg-gradient-to-r from-destructive to-orange-500 h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="text-xs text-muted-foreground text-center">
        {totalSpots - spotsRemaining}/{totalSpots} early adopters joined
      </div>
    </div>
  );
};

export default ScarcityCounter;