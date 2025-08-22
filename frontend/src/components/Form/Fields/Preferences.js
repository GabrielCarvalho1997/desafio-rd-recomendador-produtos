// Preferences.js

import React, { useEffect, useState } from 'react';
import Checkbox from '../../shared/Checkbox';

function Preferences({
  preferences,
  selectedPreferences = [],
  onPreferenceChange,
  error,
}) {
  const [currentPreferences, setCurrentPreferences] = useState(selectedPreferences);

  // Sincronizar com as props quando mudarem
  useEffect(() => {
    setCurrentPreferences(selectedPreferences);
  }, [selectedPreferences]);

  const handlePreferenceChange = (preference) => {
    const updatedPreferences = currentPreferences.includes(preference)
      ? currentPreferences.filter((pref) => pref !== preference)
      : [...currentPreferences, preference];

    setCurrentPreferences(updatedPreferences);
    onPreferenceChange(updatedPreferences);
  };

  return (
    <div className="bg-rd-support-white rounded-lg p-4 sm:p-6 border border-rd-support-gray-200 shadow-sm">
      <div className="flex items-center mb-3 sm:mb-4">
        <div className="w-2 h-5 sm:h-6 bg-rd-primary-medium rounded-full mr-2 sm:mr-3"></div>
        <h3 className="text-lg sm:text-xl font-semibold text-rd-primary-dark">
          Preferências
        </h3>
      </div>
      <p className="text-rd-support-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">
        Selecione as áreas de interesse para seu negócio
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {preferences.map((preference, index) => (
          <div key={index} className="flex items-center">
            <Checkbox
              value={preference}
              checked={currentPreferences.includes(preference)}
              onChange={() => handlePreferenceChange(preference)}
              className="text-rd-primary-medium"
            >
              <span className="text-rd-support-gray-700 font-medium text-sm">
                {preference}
              </span>
            </Checkbox>
          </div>
        ))}
      </div>

      {error && (
        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}

export default Preferences;
