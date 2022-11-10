import React, { useState } from 'react';

import { FileInput, Files } from './components';
import { useParseEmails } from './hooks';

function App() {
  const [files, setFiles] = useState({});
  const [parsedEmails] = useParseEmails(files);

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

  return (
    <div className="app">
      <FileInput onFiles={handleFiles} />
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
