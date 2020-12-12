#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

function dashedToTitle(str) {
  const nonCapitalisedTitle = str.split('-').join(' ');
  return nonCapitalisedTitle[0].toUpperCase() + nonCapitalisedTitle.slice(1);
}

async function run() {
  // Get all topics
  // --------------
  // TODO: filter out other dirs
  const directories = fs.readdirSync(__dirname);
  const topics = [];

  for (const directory of directories) {
    if (directory === 'streams') {
      topics.push({
        title: dashedToTitle(directory),
        directory,
        readme: fs.readFileSync(path.join(__dirname, directory, 'readme.md'), 'utf-8')
      });
    }
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
  console.log(chosenTopic.readme);

  // Get chapters for chosen topic
  // -----------------------------
  const chapters = fs.readdirSync(path.join(__dirname, chosenTopic.directory, 'chapters'))
    .filter(f => f.endsWith('.js'))
    .map(c => {
      return {
        title: c.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join(' ').slice(0, -3),
        script: path.join(__dirname, chosenTopic.directory, 'chapters', c)
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
    console.log(sectionCode);
  }
}

run();
