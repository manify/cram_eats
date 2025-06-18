import React from 'react';

interface UserProfileProps {
  name: string;
  role: string;
  avatarUrl: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ name, role, avatarUrl }) => {
  return (
    <div className="flex gap-3 items-start self-stretch">
      <img
        src={avatarUrl}
        alt={`${name} profile`}
        className="w-10 h-10 rounded-3xl"
      />
      <div className="flex flex-col items-start">
        <h2 className="self-stretch text-base font-medium leading-6 text-neutral-900">
          {name}
        </h2>
        <p className="self-stretch text-sm leading-5 text-yellow-500 w-[97px]">
          {role}
        </p>
      </div>
    </div>
  );
};
