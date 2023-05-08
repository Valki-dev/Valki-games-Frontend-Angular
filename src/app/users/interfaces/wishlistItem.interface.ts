export interface WishlistItem {
    userId: string;
    productId: number;
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