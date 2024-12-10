import { BookType } from "./bookTypes";

export type FavoriteItemType = {
    id: number;
    book: BookType;
};

export type FavoriteItemNormalizeType = {
    id: number;
    book: number;
};

export type FavoriteType = {
    id: number;
    favoritesItems: FavoriteItemType[];
};

export type FavoriteNormalizeType = {
    id: number;
    favoritesItems: FavoriteItemNormalizeType[];
};

export interface IFavoriteState {
    favorites: FavoriteNormalizeType | null;
    normalizeFavorites: number[];
    loading: boolean;
    error: string | null;
}
