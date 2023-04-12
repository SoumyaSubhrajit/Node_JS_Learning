const fs = require('fs');
const http = require('http');
const { parse } = require('path');
const { json } = require('stream/consumers');
// const path = require('path');
const url = require('url');




//////////////////////////////////////////////////////////
/////////  MAKING SERVER ///////////

// const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
// const dataObj = JSON.parse(data);


// // Here I create a Server...
// const server = http.createServer((req, res) => {
//   const pathReq = req.url;
//   if (pathReq === '/' || pathReq === '/overview') {
//     res.end('Welcome to the OVERVIEW page')
//   }
//   else if (pathReq === '/product') {
//     res.end('Welcom to the PRODUCT page!')
//   }
//   else if (pathReq === '/api') {
//     res.writeHead(200, {
//       'content-type': 'application/json'
//     })
//     res.end(data);
//   }
//   else {
//     res.writeHead(404);
//     res.end("<h1>Page Not Found!!</h1>");
//   }
// })
// // It will return me as a server objects....
// // console.log(server);
// // Here my server is working in the local system..
// server.listen(8000, '127.0.0.1', () => {
//   console.log("Server is listing!");
// })

const replaceTemplate = function (temp, product) {
  // I changed here dynamiclly..
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  // this is the exception case if the check if it is organic or not.
  if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic ');

  return output;

}


// Passing the page into the Js file format so that I can Ireate through this variable and chage the elements....
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
// This is my json file.
const dataObj = JSON.parse(data);
// console.log(dataObj);

const server = http.createServer((req, res) => {

  const { query, pathname } = url.parse(req.url, true);
  // query is the {id: 0} , pathname = /product..


  //Overview
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Conent-type': 'type/html',
    })

    // Itrating inside the json data to get the data.
    const cardHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join(' ');

    const output = tempOverview.replace('{%PRODUCT_CARD%}', cardHtml)


    res.end(output)
  }

  // Product
  else if (pathname === '/product') {
    res.writeHead(200, {
      'Conent-type': 'type/html',
    })

    const product = dataObj[query.id];
    const ouput = replaceTemplate(tempProduct, product);
    res.end(ouput);

  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json'
    })
    res.end(data);
  }
  else {
    res.writeHead(404, {
      'Conent-type': 'type/html',
      'message': 'Try again after some time'
    })
    res.end('<h1>Page Not Found!!</h1>')
  }
})

server.listen(8080, '127.0.0.1', () => {
  console.log("Server listening!!");
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








