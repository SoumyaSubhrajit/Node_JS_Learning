const fs = require('fs');
const http = require('http');
// const path = require('path');
const url = require('url');




//////////////////////////////////////////////////////////
/////////  MAKING SERVER ///////////

// Here I create a Server...
const server = http.createServer((req, res) => {
  const pathReq = req.url;
  if (pathReq === '/' || pathReq === '/overview') {
    res.end('Welcome to the OVERVIEW page')
  } else {
    res.writeHead(404);
    res.end("<h1>Page Not Found!!</h1>");
  }
})
// It will return me as a server objects....
// console.log(server);
// Here my server is working in the local system..
server.listen(8000, '127.0.0.1', () => {
  console.log("Server is listing!");
})









//////////////////////////////////////////////
//////  SYNC AND ASYC ///////////////////////

// Sync way of doing...
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// const textOut = `Soumya is a good boy!! ${textIn} \n Text Added in ${Date.now()}`
// // file will carated and add the text..
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log("File is created!!");


// Asyc Way of doing....

// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   if (err) {
//     return console.log("Error!🎇");
//   } else {
//     console.log(data1);
//   }
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//       console.log(data3);
//       fs.writeFile('./txt/myFinal.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
//         console.log('File has been created!!');
//       })
//     })
//   })
// })
// console.log("Reading File...");








