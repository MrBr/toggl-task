import { useCallback, useState } from 'react';

const initialState = { loading: false, error: undefined, response: null };

const useSendEmails = () => {
  const [apiState, setApiState] = useState(initialState);

  const resetApiState = useCallback(() => setApiState(initialState), [setApiState]);

  const sendEmails = useCallback(
    async (emails) => {
      setApiState((prevState) => ({ ...prevState, loading: true }));

      let response = null;
      let error;

      try {
        const responseDescriptor = await fetch('http://localhost:3003/api/send', {
          body: JSON.stringify({ emails }),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const rawResponse = await responseDescriptor.text();
        response = rawResponse ? JSON.parse(rawResponse) : '{}';
        error = response?.error;
      } catch (e) {
        error = 'Failed to send emails';
      }

      setApiState((prevState) => ({ ...prevState, loading: false, response, error }));
    },
    [setApiState]
  );

  return [sendEmails, apiState, resetApiState];
};

export default useSendEmails;
