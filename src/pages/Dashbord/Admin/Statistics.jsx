import React from 'react';
import StatisticsPage from './Statistics/StatisticsPage';
import TotalUsersCard from './Statistics/TotalUsersCard';
import PendingPaymentsCard from './Statistics/PendingPaymentsCard';
import DeliveredOrdersCard from './Statistics/DeliveredOrdersCard';

const Statistics = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#05070a]">
      <StatisticsPage />
    </div>
  );
};

export default Statistics;
