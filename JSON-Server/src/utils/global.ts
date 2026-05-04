export interface productType {
    p_name: string;
    p_price: number;
    p_stock: number;
    p_image: string;
    p_category: string;
    p_description: string;
}

export interface productFetchType extends productType {
    id: string;
}