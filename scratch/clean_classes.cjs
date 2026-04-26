const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8');
const cleaned = content.replace(/className="([^"]*)"/g, (match, classes) => {
  const uniqueClasses = [...new Set(classes.split(/\s+/))].join(' ');
  return `className="${uniqueClasses}"`;
});
fs.writeFileSync('src/App.tsx', cleaned);
