import path from "path";
import * as fs from "fs";
import {parse} from "csv-parse"

console.log("Nu körs programmet")
type ProductData = {
    ProductName: string,
    Description:string,
    Color:string
};
// STEG 1 läs en rad i taget - få ProductData objekt och 
// skriv ut på console (TERMINALEN)

const csvFilePath = 'fake_products_unique.csv';
const headers = ['ProductName', 'Description', 'Color'];
const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });


parse(fileContent, {
    delimiter: ',',
    columns: headers,
  }, async (error, result: ProductData[]) => {
    console.log(result[0])
    }
);



// Steg 2 Fråga om id från databas  med denna title - updatera Databas

