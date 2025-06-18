import React from 'react';
import { QuickActions } from './QuickActions';
import { RecentOrdersTable } from './RecentOrdersTable';
import { PerformanceOverview } from './PerformanceOverview';

export const MainContent: React.FC = () => {
  return (
    <main className="flex flex-col items-start flex-[1_0_0] max-w-[960px] max-md:order-1 max-md:max-w-full">
      <header className="flex flex-wrap gap-y-3 justify-between content-start items-start self-stretch p-4 max-md:flex-col max-md:gap-4 max-md:items-start">
        <h1 className="self-stretch text-3xl font-bold leading-10 min-w-72 text-neutral-900 max-md:text-3xl max-md:leading-9 max-sm:text-2xl max-sm:leading-8">
          Welcome back, Sophia!
        </h1>
        <div className="relative h-[60px] w-[60px] max-sm:w-12 max-sm:h-12">
          <div className="absolute top-0 left-0 shrink-0 bg-yellow-50 rounded-2xl h-[60px] w-[60px] max-sm:w-12 max-sm:h-12" />
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: `<svg id="118:346" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="notification-icon" style="width: 32px; height: 32px; flex-shrink: 0; aspect-ratio: 1/1; position: absolute; left: 14px; top: 14px"> <path d="M11.5267 27.3333C11.8147 28.2959 12.4056 29.1399 13.2114 29.7399C14.0173 30.3399 14.9953 30.664 16 30.664C17.0047 30.664 17.9827 30.3399 18.7886 29.7399C19.5944 29.1399 20.1853 28.2959 20.4733 27.3333H11.5267ZM4 26H28V22L25.3333 18V11.3333C25.3333 10.1077 25.0919 8.89399 24.6229 7.76162C24.1538 6.62925 23.4663 5.60035 22.5997 4.73367C21.733 3.86699 20.7041 3.1795 19.5717 2.71046C18.4393 2.24141 17.2257 2 16 2C14.7743 2 13.5607 2.24141 12.4283 2.71046C11.2959 3.1795 10.267 3.86699 9.40034 4.73367C8.53366 5.60035 7.84617 6.62925 7.37712 7.76162C6.90808 8.89399 6.66667 10.1077 6.66667 11.3333V18L4 22V26Z" fill="#68B985"></path> </svg>`
              }}
            />
          </div>
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: `<svg id="118:349" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" class="notification-dot" style="width: 8px; height: 8px; flex-shrink: 0; aspect-ratio: 1/1; fill: #ED4646; position: absolute; left: 32px; top: 14px"> <circle cx="4" cy="4" r="4" transform="matrix(-1 0 0 1 8 0)" fill="#ED4646"></circle> </svg>`
              }}
            />
          </div>
        </div>
      </header>
      <QuickActions />
      <RecentOrdersTable />
      <PerformanceOverview />
    </main>
  );
};
