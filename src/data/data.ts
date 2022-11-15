import client from "../util/client";

export interface Products {
    buy: Product[]
    sell: Product[]
}

export interface Product {
    name: string
    price: number
}

export interface EventData {
    name: string
    description: string
    image: string
}

export interface RankingEntry {
    rank: string
    name: string
    tokens: number
}

export class Data {
    public static async getProducts(): Promise<Products> {
        const response = await client.get("/productData.json");
        return response.data;
    }
}