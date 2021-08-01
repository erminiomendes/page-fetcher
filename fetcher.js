const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const args = process.argv.slice(2);

const url = args[0]; // url of website to save
const localFilePath = args[1]; // file to save to

// fs.writeFile will write content returned by request into localFilePath
const write = (localFilePath, content) => {
  fs.writeFile(localFilePath, content, err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Downloaded and saved ${content.length} bytes to ${localFilePath}`);
    process.exit();
  });

};


request(url, (error, response, content) => {
  fs.access(localFilePath, fs.F_OK, (err) => { // if file already exists
    if (err) {
      write(localFilePath, content);
      return;
    }
  });
});
