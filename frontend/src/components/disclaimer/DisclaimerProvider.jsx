import React, { createContext, useContext } from 'react';
import useDisclaimer from '../../hooks/useDisclaimer';
import DisclaimerModal from './DisclaimerModal';

const DisclaimerContext = createContext(null);

export function useDisclaimerContext() {
  return useContext(DisclaimerContext);
}

export default function DisclaimerProvider({ children }) {
  const disclaimer = useDisclaimer();

  return (
    <DisclaimerContext.Provider value={disclaimer}>
      <div
        aria-hidden={disclaimer.showDisclaimer}
        className={disclaimer.showDisclaimer ? 'pointer-events-none select-none' : ''}
      >
        {children}
      </div>

      {disclaimer.showDisclaimer && (
        <DisclaimerModal onAgree={disclaimer.agree} onDecline={disclaimer.decline} />
      )}
    </DisclaimerContext.Provider>
  );
}
