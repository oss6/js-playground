module.exports = (jsString) => {
  let mdString = [];
  let inCodeContext = false;

  for (const line of jsString.split('\n')) {
    const trimmedLine = line.trim();

    if (trimmedLine === '') {
      continue;
    }

    if (trimmedLine.startsWith('//')) {
      if (inCodeContext) {
        mdString.push('```');
        inCodeContext = false;
      }

      mdString.push(trimmedLine.replace(/\/\/(.*)/g, '$1'));
    } else {
      if (!inCodeContext) {
        mdString.push('```');
        inCodeContext = true;
      }

      mdString.push(line);
    }
  }

  if (inCodeContext) {
    mdString.push('```');
  }

  return mdString.join('\n');
};
