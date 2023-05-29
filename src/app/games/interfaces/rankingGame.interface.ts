export interface RankingGame {
    productId:    number;
    totalVentas:  number;
    id:           number;
    name:         string;
    developer:    string;
    publisher:    string;
    releaseDate:  Date;
    gender:       string;
    description:  string;
    stock:        number;
    price:        number;
    onOfferPrice: number | null;
    available:    number;
    onOffer:      number;
    isNew:        number;
    URL:          string;
}
