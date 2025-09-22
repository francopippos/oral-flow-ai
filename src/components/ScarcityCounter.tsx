import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const ScarcityCounter = () => {
  const { t } = useTranslation();
  const [remainingSpots, setRemainingSpots] = useState(7); // Start with 7 spots left

  // Optional: Add some dynamic behavior to make it feel more real
  useEffect(() => {
    // Simulate occasional spot updates (very rarely)
    const interval = setInterval(() => {
      if (Math.random() < 0.01 && remainingSpots > 1) { // 1% chance every 30 seconds
        setRemainingSpots(prev => prev - 1);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [remainingSpots]);

  const progressPercentage = ((30 - remainingSpots) / 30) * 100;

  return (
    <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-red-700 font-semibold text-sm uppercase tracking-wide">
            {t('scarcity.urgentNotice')}
          </span>
        </div>
        <div className="text-red-600 font-bold text-lg">
          {remainingSpots}/30 {t('scarcity.spotsLeft')}
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-red-600 font-medium">{t('scarcity.reservedSpots')}</span>
          <span className="text-sm text-red-600 font-bold">{progressPercentage.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-red-100 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <p className="text-red-700 text-sm font-medium">
        {t('scarcity.warningMessage')}
      </p>
    </div>
  );
};

export default ScarcityCounter;