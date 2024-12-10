import { IUserRating, PartialUserType } from "./authTypes";

type Author = {
    id: number;
    text: string;
};

type BookGenre = { id: number };

export type GenresType = {
    id: number;
    name: string;
};

export type CommentsType = {
    id: number;
    text: string;
    dateOfCreate: Date;
    user: PartialUserType;
    bookId?: number;
};

export type CoverType = {
    id: number;
    paperback_price: number;
    paperback_amount: number;
    hardcover_price: number;
    hardcover_amount: number;
};

export type BookType = {
    id: number;
    name: string;
    img: string;
    description: string;
    quantity?: number;
    isBestseller?: boolean;
    isNew?: boolean;
    author: Author;
    bookGenres?: BookGenre[] | [];
    comments: CommentsType[] | [];
    rates?: IUserRating | null;
    totalRate?: number | null;
    cover: CoverType;
    isFav?: boolean;
};

export interface RatingBook extends IUserRating {
    book: BookType;
}

export interface IBookProps {
    img: string;
    id: number;
    name: string;
    author: string;
    price: number | undefined;
    isInCart: boolean;
    isInFavorites: boolean;
    isBestseller: boolean;
    isNew: boolean;
}

export interface IBookInCartProps {
    id: number;
    price: number;
    quantity: number;
    book?: BookType;
}

type MetaType = {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    itemCount: number;
    page: number;
    pageCount: number;
};

export interface ICatalogFromServer {
    data: BookType[] | null;
    meta: MetaType | null;
}

export interface ICatalog {
    data: number[] | null;
    meta: MetaType | null;
}

export interface ICatalogState {
    books: number[] | null;
    meta: MetaType | null;
    error: string | null;
    loading: boolean;
}

export interface ICatalogProps {
    id: number;
    booksInCart: number[];
    booksInFavorites: number[];
    books: Record<number, BookType>;
}

export interface IBookState {
    books: Record<number, BookType>;
    error: string | null;
    loading: boolean;
}

export interface IBookItemState {
    book: BookType | null;
    error: string | null;
    loading: boolean;
}

export interface INavigateProps {
    hasPrevPage: boolean | undefined;
    handlePagePrev: () => void;
    page: number | undefined;
    colPages: number | undefined;
    hasNextPage: boolean | undefined;
    handlePageNext: () => void;
}
