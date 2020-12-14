const boxen = require('boxen');
const chalk = require('chalk');

module.exports = (markdownString) => {
  const rules = [
    {
      // Heading
      regex: /#+(.*)/g,
      replace(_, text) {
        return `\n${chalk.bold(text.trim())}\n`;
      }
    },
    {
      // Bold
      regex: /\*\*(.*?)\*\*/g,
      replace(_, text) {
        return chalk.bold(text.trim());
      }
    },
    {
      // Italic
      regex: /_(.*?)_/g,
      replace(_, text) {
        return chalk.italic(text.trim());
      }
    },
    // Code block
    {
      regex: /```([\s\S]*?)```/g,
      replace(_, text) {
        return `\n${boxen(text, { padding: 1 })}\n`;
      }
    },
    {
      // Preformatted
      regex: /`(.*?)`/g,
      replace(_, text) {
        return chalk.bgWhite.black(text);
      }
    },
    {
      // Unordered list
      regex: /\n\-(.*)/g,
      replace(_, text) {
        return `\n\t•${text}`;
      }
    }
  ];

  let cliString = markdownString;

  for (const rule of rules) {
    cliString = cliString.replace(rule.regex, rule.replace);
  }

  return cliString;
};
