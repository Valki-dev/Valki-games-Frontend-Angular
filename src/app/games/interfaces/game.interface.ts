export interface Game {
    id: number,
    name: string,
    developer: string,
    publisher: string,
    releaseDate: string,
    gender: string,
    description: string,
    stock: number,
    price: number,
    available: boolean,
    onOffer: boolean,
    isNew: boolean,
    URL: string,
    trailerURL: string
}