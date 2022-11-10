import React from 'react';

import './index.css';

const ApiFeedback = ({ apiState }) => {
  let feedback = null;

  if (apiState.loading) {
    feedback = 'Processing the request';
  }

  if (apiState.error === 'send_failure') {
    const failedEmails = (
      <ul>
        {apiState.response.emails.map((email) => (
          <li key={email}>{email}</li>
        ))}
      </ul>
    );
    feedback = <>Failed to send to: {failedEmails}</>;
  } else if (apiState.error) {
    feedback = apiState.error;
  }

  if (!apiState.error && apiState.response) {
    feedback = 'Emails sent successfully!';
  }

  return feedback ? <div className="api-feedback">{feedback}</div> : null;
};

export default ApiFeedback;
