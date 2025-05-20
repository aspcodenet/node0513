import path from "path";
import * as fs from "fs";
import {parse} from "csv-parse"
import { getCategoryIdFromDatabase, getProductId, insertCategory, updateCategory, updateProductDescription } from "./database/database";
import { exit } from "process";

// SKriva ett program som kan köra "lite då och då" - natten k 03:00 ALT så körs dem hela tiden
// hämta alla categorier från Cosmic -> och spara i MySQL categories

// hämta alla products från Cosmic -> och spara i MySQL products

// let response = await fetch("https://api.cosmicjs.com/v3/buckets/myshop-production/objects?pretty=true&query=%7B%22type%22:%22products%22%7D&limit=10&skip=0&read_key=HBkAGdMLUy8fucWd6E6aZariQXM3UHTXUHiceVunJg04h0D5Ro&depth=1&props=slug,title,metadata,type,")
// let data = await response.json()

// console.log(data.objects[0])

import { createBucketClient } from '@cosmicjs/sdk';


let COSMIC_BUCKET_SLUG="my-project-production-74aeaa30-2cfc-11f0-9ca8-cf720a88b3b0"
let COSMIC_READ_KEY="3FJzEHvtNMEworphl5XnNGzdzw6evjPTsiyp5SPhG3ctKNaPF8"
//let COSMIC_WRITE_KEY="n6Z1cZnunQdzZGWPidXTc3n7iRTAqWTTpVlTqKVxnJ0qOMZbTM"

const cosmic = createBucketClient({
  bucketSlug: COSMIC_BUCKET_SLUG,
  readKey: COSMIC_READ_KEY,
});





let response = await cosmic.objects.find({
                                        type: 'categories',
                                    })
                                      .sort('created_at asc')
                                      .limit(100);

for(const pimCatgory of response.objects){
  console.log(pimCatgory);
  // inte MYSQL UPSERT  utan
  const categoryIdInDatabase = await getCategoryIdFromDatabase(pimCatgory.id)
  console.log(categoryIdInDatabase)
  if(categoryIdInDatabase === undefined)  {
    // INSERT
    await  insertCategory(pimCatgory.title,pimCatgory.metadata.description, pimCatgory.id, pimCatgory.metadata.active)
    
  }else{
    // UPDATE category .... WHERE id=categoryIdInDatabase
    await  updateCategory(  categoryIdInDatabase.id, pimCatgory.title,pimCatgory.metadata.description,pimCatgory.metadata.active)
  }



  // kolla oim den finns i databasen - om så gör update
  // SELECT * from Categry where pimid='681e484108956c95e3c7192b'  // annars gör en insert

}

//   console.log(res2.total);

exit();








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

