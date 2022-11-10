import React, { useEffect, useState } from 'react';

import { FileInput, Files, ApiFeedback } from './components';
import { useParseEmails, useSendEmails } from './hooks';

function App() {
  const [files, setFiles] = useState({});
  const [parsedEmails, isParsing] = useParseEmails(files);
  const [sendEmails, apiState, resetApiState] = useSendEmails();

  const haveSelectedFiles = Object.keys(files).length > 0;

  useEffect(() => {
    if (!apiState.response || apiState.error) {
      return;
    }
    setFiles({});
  }, [apiState.response, apiState.error]);

  useEffect(() => {
    if (!haveSelectedFiles) {
      return;
    }
    resetApiState();
  }, [haveSelectedFiles, resetApiState, files]);

  const handleFiles = (selectedFiles) => {
    const newFiles = selectedFiles.reduce(
      (res, file) => {
        res[file.name] = file;
        return res;
      },
      { ...files }
    );

    setFiles(newFiles);
  };

  const handleRemove = (fileName) => {
    const newFiles = { ...files };
    delete newFiles[fileName];
    setFiles(newFiles);
  };

  const handleSendEmails = async () => {
    const uniqueEmailSet = new Set(Object.values(parsedEmails).flat());
    const uniqueEmails = Array.from(uniqueEmailSet);
    await sendEmails(uniqueEmails);
  };

  return (
    <div className="app">
      <FileInput onFiles={handleFiles} />
      <ApiFeedback apiState={apiState} />
      <div className="app__actions">
        <button disabled={!haveSelectedFiles && !isParsing} onClick={handleSendEmails}>
          Send emails
        </button>
      </div>
      <Files files={files} onRemove={handleRemove}>
        {(fileName) => {
          const suffix = parsedEmails[fileName] ? parsedEmails[fileName].length : 'Parsing';
          return `${fileName} - ${suffix}`;
        }}
      </Files>
    </div>
  );
}

export default App;
