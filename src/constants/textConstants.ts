export const DEFAULT_PASSWORD_STARS = '*************';

export const AppPages = {
  base: '/',
  login: '/sign-in',
  registration: '/sign-up',
  profile: '/profile',
  cart: '/cart',
  bookId: '/:id',
  favorite: '/favorite',
  files: '/files',
  getBookIdUrl(id: string | number) {
    return this.bookId.replace(':id', `${id}`);
  },
} as const;

export const ApiPath = {
  files: '/files',
  user: {
    me: '/user/me',
    userPass: '/user/pass',
    cart: {
      allItems: 'user/cart',
      item: 'user/cart/item',
      getItemWithIdUrl(id: string | number) {
        const newUrl = this.item + `/${id}`;
        return newUrl;
      },
    },
    favorites: {
      allFavorites: 'user/favorites',
      item: 'user/favorites/item',
      getItemWithIdUrl(id: string | number) {
        const newUrl = this.item + `/${id}`;
        return newUrl;
      },
    },
  },
  booksImg: '/uploads/books/',
  avatarImg: '/uploads/avatars/',
  genres: '/genres',
  login: '/auth/sign-in',
  registration: '/auth/sign-up',
  refreshToken: '/auth/refresh-token',
  bookComment: `books/:bookId/comment`,
  getBookCommentWithIdUrl(id: string | number) {
    return this.bookComment.replace(':bookId', `${id}`);
  },
  bookRating: `books/:bookId/rating`,
  getBookRatingWithIdUrl(id: string | number) {
    return this.bookRating.replace(':bookId', `${id}`);
  },
} as const;
