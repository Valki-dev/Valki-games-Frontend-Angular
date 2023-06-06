export interface Sale {
    userId: string;
    productId: number;
    saleDate: Date;
    orderNumber: string;
    amount: number;
    price: number;
    downloadCode: string;
    products: {
        id: number;
        name: string;
        developer: string;
        publisher: string;
        releaseDate: Date;
        gender: string;
        description: string;
        stock: number;
        price: number;
        available: number;
        onOffer: number;
        isNew: number;
        URL: string;
    }
}
