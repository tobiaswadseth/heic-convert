const fs = require('fs');
const convert = require('heic-convert');

fs.rmdir('./output', { recursive: true }, (err) => {
  if (err) return console.error(err);
  console.log("removed");
  fs.mkdir('./output', (err) => {
    if (err) return console.error(err);

    fs.readdir('./input/', async (err, file) => {

      if (err) return console.error(err);
    
      let files = file.filter(f => f.toLowerCase().split(".").pop() === 'heic');
      if (files <= 0) {
        return console.error('Could not find any files!');
      }
    
      console.info(`Found ${files.length} files!`);
    
      let index = 1;
    
      files.forEach(async (file) => {
    
        fs.readFile(`./input/${file}`, (err, buffer) => {
          if (err) return console.error(err);
          convert({
            buffer,
            format: 'PNG'
          }).then(out => {
            fs.writeFile(`./output/${file.split('.')[0]}.png`, out, (err) => {
              if (err) {
                console.info(`(${index}/${files.length}) ${file} could not be saved!`)
              } else {
                console.info(`(${index}/${files.length}) ${file} has been converted to a PNG!`);
              }
              index++;
            });
          });
        });
      });
    });
  });
});