import path from "path";
import * as fs from "fs";
import {parse} from "csv-parse"
import { getProductId, updateProductDescription } from "./database/database";
import { exit } from "process";


import { createBucketClient } from '@cosmicjs/sdk';


let COSMIC_BUCKET_SLUG="my-project-production-74aeaa30-2cfc-11f0-9ca8-cf720a88b3b0"
let COSMIC_READ_KEY="3FJzEHvtNMEworphl5XnNGzdzw6evjPTsiyp5SPhG3ctKNaPF8"
let COSMIC_WRITE_KEY="n6Z1cZnunQdzZGWPidXTc3n7iRTAqWTTpVlTqKVxnJ0qOMZbTM"

const cosmic = createBucketClient({
  bucketSlug: COSMIC_BUCKET_SLUG,
  readKey: COSMIC_READ_KEY,
});




let res2 = await cosmic.objects
  .find({
    type: 'categories',
  })
  .sort('created_at asc')
  .limit(10);
 



  console.log(res2.objects);
  console.log(res2.total);









// console.log("Nu körs programmet")
// type ProductData = {
//     ProductName: string,
//     Description:string,
//     Color:string
// };
// // STEG 1 läs en rad i taget - få ProductData objekt och 
// // skriv ut på console (TERMINALEN)

// const csvFilePath = 'fake_products_unique.csv';
// const headers = ['ProductName', 'Description', 'Color'];
// const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });


// parse(fileContent, {
//     delimiter: ',',
//     columns: headers,
//   }, async (error, result: ProductData[]) => {
//     for(const product of result){
//         // kolla finns i databasen?
//         if(product.ProductName === "ProductName"){
//             continue
//         }
//         const prodId = await getProductId(product.ProductName)
//         if(prodId === undefined){
//             console.log(`Produkten ${product.ProductName} finns inte i vår databas`)
//             continue;
//         }
//         // om så - uppdatera
//         const produktensId = prodId.id
//         updateProductDescription(produktensId,product.Description, product.Color) 
//     }
//     //console.log(result[1].ProductName)
//     exit();
//     }
// );



// // Steg 2 Fråga om id från databas  med denna title - updatera Databas

