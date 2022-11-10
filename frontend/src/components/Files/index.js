import React from 'react';

import './index.css';

const FileInput = ({ files, onRemove }) => {
  const fileNames = Object.keys(files);

  return (
    <div className="files">
      {fileNames.length === 0 && 'No files selected'}
      {fileNames.map((fileName) => (
        <div className="file" key={fileName}>
          {fileName}
          <button className="file__remove" onClick={() => onRemove(fileName)}>
            x
          </button>
        </div>
      ))}
    </div>
  );
};

export default FileInput;
