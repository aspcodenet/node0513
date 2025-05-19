import { RowDataPacket } from "mysql2";
import { connection } from "./connection";

export interface ProductId extends RowDataPacket {
    id: number;
}

export interface CategoryId extends RowDataPacket {
    id: number;
}


export async function getCategoryIdFromDatabase(pimid:string) : Promise<CategoryId|undefined>{
    const conn = await connection;
    
    const [rows] = await conn.query<CategoryId[]>("SELECT id from category where pimid=?", [pimid])
    if (rows.length == 0){
        return undefined
    }
    return rows[0]
}


export async function insertCategory(title:string, description:string, pimid:string){
    // vi hjar ju skapat en koklumn i Products spom heter description2
    // också en som heter color2
    const conn = await connection;
    await conn.execute("INSERT INTO category(description,name,pimid) VALUES(?,?,?)",[description,title,pimid])

}


export async function updateCategory(id:number, title:string, description:string){
    // vi hjar ju skapat en koklumn i Products spom heter description2
    // också en som heter color2
    const conn = await connection;
    await conn.execute("UPDATE category SET description=?, name=? WHERE id=?",[description,title,id])

}



export async function getProductId(name:string) : Promise<ProductId|undefined>{
   // SELECT id * FROM Products WHERE title=productName
    const conn = await connection;
    
    const [rows] = await conn.query<ProductId[]>("SELECT id from Products where title=?", [name])
    if (rows.length == 0){
        return undefined
    }
    return rows[0]
}

export async function updateProductDescription(id:number, description:string, color:string){
    // vi hjar ju skapat en koklumn i Products spom heter description2
    // också en som heter color2
    const conn = await connection;
    await conn.execute("UPDATE Products SET description2=?, color2=? WHERE id=?",[description,color,id])

}