// Preferences.js

import React, { useState } from 'react';
import Checkbox from '../../shared/Checkbox';

function Preferences({
  preferences,
  selectedPreferences = [],
  onPreferenceChange,
}) {
  const [currentPreferences, setCurrentPreferences] = useState(selectedPreferences)

  const handlePreferenceChange = (preference) => {
    const updatedPreferences = currentPreferences.includes(preference)
      ? currentPreferences.filter((pref) => pref !== preference)
      : [...currentPreferences, preference];

    setCurrentPreferences(updatedPreferences);
    onPreferenceChange(updatedPreferences);
  };

  return (
    <div className="bg-rd-support-white rounded-lg p-6 border border-rd-support-gray-200 shadow-sm">
      <div className="flex items-center mb-4">
        <div className="w-2 h-6 bg-rd-primary-medium rounded-full mr-3"></div>
        <h3 className="text-xl font-semibold text-rd-primary-dark">
          Preferências
        </h3>
      </div>
      <p className="text-rd-support-gray-600 mb-4 text-sm">
        Selecione as áreas de interesse para seu negócio
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {preferences.map((preference, index) => (
          <div key={index} className="flex items-center">
            <Checkbox
              value={preference}
              checked={currentPreferences.includes(preference)}
              onChange={() => handlePreferenceChange(preference)}
              className="text-rd-primary-medium"
            >
              <span className="text-rd-support-gray-700 font-medium">
                {preference}
              </span>
            </Checkbox>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Preferences;
