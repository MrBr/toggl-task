import React, { useState } from 'react';

import { FileInput, Files } from './components';

function App() {
  const [files, setFiles] = useState({});

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
      <Files files={files} onRemove={handleRemove} />
    </div>
  );
}

export default App;
