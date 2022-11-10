import { useEffect, useState } from 'react';

const parseFile = (file) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => resolve(fileReader.result.trim());
    fileReader.onerror = reject;

    fileReader.readAsText(file);
  });

const useParseEmails = (files) => {
  const [parsedFiles, setParsedFiles] = useState({});
  const isParsing = Object.values(parsedFiles).some((emails) => emails === undefined);

  useEffect(() => {
    const newFiles = Object.values(files).filter(({ name }) => !parsedFiles[name]);

    newFiles.forEach(async (file) => {
      const content = await parseFile(file);
      const emails = content.split('\n');
      setParsedFiles((prevState) => ({ ...prevState, [file.name]: emails }));
    });

    const removedFileNames = Object.keys(parsedFiles).filter((name) => !files[name]);
    setParsedFiles((prevState) => {
      const newParsedFiles = removedFileNames.reduce(
        (newState, removedFileName) => {
          delete newState[removedFileName];
          return newState;
        },
        { ...prevState }
      );
      return newParsedFiles;
    });
    // Should update parsedFiles only when files change
    // eslint-disable-next-line
  }, [files]);

  return [parsedFiles, isParsing];
};

export default useParseEmails;
