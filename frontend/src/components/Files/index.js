import React from 'react';

import './index.css';

const Files = ({ files, onRemove, children }) => {
  const fileNames = Object.keys(files);

  return (
    <ul className="files">
      {fileNames.length === 0 && 'No files selected'}
      {fileNames.map((fileName) => (
        <li className="file" key={fileName}>
          {children ? children(fileName) : fileName}
          <button className="file__remove" onClick={() => onRemove(fileName)}>
            x
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Files;
