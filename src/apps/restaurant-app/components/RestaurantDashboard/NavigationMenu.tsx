import React from 'react';

interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  isActive?: boolean;
}

interface NavigationMenuProps {
  items: NavigationItem[];
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({ items }) => {
  return (
    <nav className="flex flex-col gap-2 items-start self-stretch max-sm:overflow-x-auto max-sm:flex-row max-sm:gap-1">
      {items.map((item) => (
        <div
          key={item.id}
          className={`flex gap-3 items-center self-stretch px-3 py-2 max-sm:justify-center max-sm:min-w-20 ${
            item.isActive ? 'bg-yellow-500 rounded-lg' : ''
          }`}
        >
          <div className="flex flex-col items-start">
            <div className="w-6 flex-[1_0_0]">
              <div dangerouslySetInnerHTML={{ __html: item.icon }} />
            </div>
          </div>
          <span className={`self-stretch text-sm font-medium leading-5 max-sm:text-xs ${
            item.isActive ? 'text-white' : 'text-neutral-900'
          }`}>
            {item.label}
          </span>
        </div>
      ))}
    </nav>
  );
};
