import React, { useEffect } from 'react';

const ElfsightGoogleReviews = () => {
  useEffect(() => {
    // Check if the script is already loaded to avoid duplication
    if (!document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]')) {
      // Load the Elfsight script
      const script = document.createElement('script');
      script.src = 'https://static.elfsight.com/platform/platform.js';
      script.async = true;
      script.id = 'elfsight-google-reviews-script';
      document.body.appendChild(script);
    }

    // No need for cleanup as removing the script could break other instances
    // Also, in a SPA like Next.js, we want the script to persist between route changes
  }, []);

  return (
    <div className="elfsight-reviews-container w-full mx-auto">
      <div className="elfsight-app-449186da-eed7-4ba3-8d73-a044822d1df0" data-elfsight-app-lazy></div>
    </div>
  );
};

export default ElfsightGoogleReviews;
