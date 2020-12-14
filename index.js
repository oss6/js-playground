#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const mdToCli = require('./core/md-to-cli');
const jsToMd = require('./core/js-to-md');

function dashedToTitle(str) {
  const nonCapitalisedTitle = str.split('-').join(' ');
  return nonCapitalisedTitle[0].toUpperCase() + nonCapitalisedTitle.slice(1);
}

async function run() {
  // Get all topics
  // --------------
  const directories = fs.readdirSync(path.join(__dirname, 'topics'));
  const topics = [];

  for (const directory of directories) {
    topics.push({
      title: dashedToTitle(directory),
      directory,
      directoryPath: path.join(__dirname, 'topics', directory),
      readme: fs.readFileSync(path.join(__dirname, 'topics', directory, 'readme.md'), 'utf-8')
    });
  }

  const topicAnswer = await inquirer.prompt([
    {
      type: 'list',
      name: 'topic',
      message: 'What topic do you want to explore?',
      choices: topics.map(t => t.title)
    }
  ]);

  const chosenTopic = topics.find(t => t.title === topicAnswer.topic);

  console.log(`\n${chalk.bold(chosenTopic.title)}\n`);
  console.log(mdToCli(chosenTopic.readme));

  // Get chapters for chosen topic
  // -----------------------------
  const chapters = fs.readdirSync(path.join(chosenTopic.directoryPath, 'chapters'))
    .filter(f => f.endsWith('.js'))
    .map(c => {
      return {
        title: c.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join(' ').slice(0, -3),
        script: path.join(chosenTopic.directoryPath, 'chapters', c)
      };
    });

  const chapterAnswer = await inquirer.prompt([
    {
      type: 'list',
      name: 'chapter',
      message: 'What chapter you want to check?',
      choices: chapters.map(c => c.title)
    }
  ]);

  const chosenChapter = chapters.find(c => c.title === chapterAnswer.chapter);

  const chapterSections = require(chosenChapter.script);

  for (const section of chapterSections) {
    const sectionBody = section.toString();
    const sectionCode = sectionBody.slice(sectionBody.indexOf('{') + 1, sectionBody.lastIndexOf('}'));

    section();
    console.log(mdToCli(jsToMd(sectionCode)));
  }
}

run();
