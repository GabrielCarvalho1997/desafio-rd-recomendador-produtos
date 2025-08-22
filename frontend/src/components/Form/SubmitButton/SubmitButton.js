import React from 'react';

function SubmitButton({ text }) {
  return (
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-rd-primary-dark to-rd-primary-medium hover:from-rd-primary-medium hover:to-rd-primary-light text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rd-primary-medium focus:ring-opacity-50"
    >
      {text}
    </button>
  );
}

export default SubmitButton;
