import type { productFetchType, productType } from "../utils/global";

const API_BASE_URL = "http://localhost:8000";
const productURL = `${API_BASE_URL}/products/`;

export const addProduct = async (body: productType) => {
    const res = await fetch(productURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    return res.ok;
}

export const fetchAllProducts = async () => {
    const res = await fetch(productURL);
    if (!res.ok) {
        throw new Error(`Failed to fetch products. Status: ${res.status}`);
    }
    const allProductData = await res.json();

    return allProductData;
}

export const deleteProduct = async (id: string) => {

    const res = await fetch(productURL + id, {
        method: "DELETE"
    });

    return res.ok;
}

export const fetchSingleProduct = async (id: string) => {
    const res = await fetch(productURL + id, { method: "GET" });
    if (!res.ok) {
        throw new Error(`Failed to fetch product ${id}. Status: ${res.status}`);
    }

    const singleProduct = await res.json();

    return singleProduct;

}

export const updateProduct = async (body: productFetchType) => {
    const res = await fetch(productURL + body.id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    return res.ok;
}