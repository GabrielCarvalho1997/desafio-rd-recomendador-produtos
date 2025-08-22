import React, { useEffect, useState } from 'react';

function Checkbox({ children, checked, onChange, className = '', ...props }) {
  const [isChecked, setIsChecked] = useState(checked || false);

  useEffect(() => {
    setIsChecked(checked || false);
  }, [checked]);

  const handleChange = (e) => {
    const newChecked = e.target.checked;
    setIsChecked(newChecked);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <label className="flex items-center cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={handleChange}
          {...props}
        />
        <div className={`w-5 h-5 border-2 rounded-md transition-all duration-200 ${
          isChecked
            ? 'bg-rd-primary-medium border-rd-primary-medium'
            : 'border-rd-support-gray-300 group-hover:border-rd-primary-medium'
        }`}>
          {isChecked && (
            <svg
              className="w-3 h-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
      <span className="ml-3 text-sm">{children}</span>
    </label>
  );
}

export default Checkbox;
