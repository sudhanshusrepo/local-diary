
import React from 'react';

interface ToggleProps {
  label: string;
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({ label, enabled, setEnabled }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <span className="text-sm font-medium text-slate-300">{label}</span>
      <button
        type="button"
        onClick={() => setEnabled(!enabled)}
        className={`${
          enabled ? 'bg-gradient-primary' : 'bg-slate-600'
        } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-brand-dark`}
      >
        <span
          className={`${
            enabled ? 'translate-x-5' : 'translate-x-0'
          } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        />
      </button>
    </div>
  );
};
