import React from 'react';

interface QuickAction {
  id: string;
  label: string;
  variant: 'primary' | 'secondary';
}

const quickActions: QuickAction[] = [
  { id: 'view-orders', label: 'View Orders', variant: 'primary' },
  { id: 'manage-menu', label: 'Manage Menu', variant: 'secondary' }
];

export const QuickActions: React.FC = () => {
  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold text-neutral-900 mb-6 max-sm:text-xl">
        Quick Actions
      </h2>
      <div className="flex flex-wrap gap-4">
        {quickActions.map((action) => (
          <button
            key={action.id}
            className={`
              inline-flex items-center justify-center
              px-6 py-2.5
              min-w-[140px]
              rounded-full
              transition-all duration-200 ease-in-out
              font-medium text-sm
              ${
                action.variant === 'primary'
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-sm'
                  : 'bg-transparent border-2 border-amber-300 text-amber-500 hover:bg-yellow-50'
              }
            `}
          >
            {action.label}
          </button>
        ))}
      </div>
    </section>
  );
};
