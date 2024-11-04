export class QueryKeys {
    // 영화
    static MOVIES = ['MOVIES'];
    static MAIN_MOVIE = 'MAIN_MOVIE';
    static DETAIL_MOVIE = 'DETAIL_MOVIE';
    static SEARCH_MOVIE = 'SEARCH_MOVIE';
    static TAB_MOVIE = 'TAB_MOVIE';
    static BEST_MOVIE = 'BEST_MOVIE';
    static FAVORITE_MOVIE = 'FAVORITE_MOVIE';
    static DETAIL_MOVIE_INFO = 'DETAIL_MOVIE_INFO';
    static MOVIE_RATING_LIST = 'MOVIE_RATING_LIST';
    
    // 티비
    static TV = ['TV'];
    static MAIN_TV = 'MAIN_TV';
    static DETAIL_TV = 'DETAIL_TV';
    static SEARCH_TV = 'SEARCH_TV';
    static TAB_TV = 'TAB_TV';
    static BEST_TV = 'BEST_TV';
    static FAVORITE_TV = 'FAVORITE_TV';
    static DETAIL_TV_INFO = 'DETAIL_TV_INFO';
    static DETAIL_TV_VIDEO = 'DETAIL_TV_VIDEO';
    static TV_RATING_LIST = 'TV_RATING_LIST';

    // 영화 메인 쿼리
    static MAIN_MOVIE_QUERY = [...this.MOVIES, this.MAIN_MOVIE];
    static CATEGORY_MOVIE_ITEMS = [...this.MAIN_MOVIE_QUERY, this.TAB_MOVIE];
    static BEST_MOVIE_QUERY = [...this.MAIN_MOVIE_QUERY, this.BEST_MOVIE];
    static FAVORITE_MOVIE_QUERY = [...this.MAIN_MOVIE_QUERY, this.FAVORITE_MOVIE];

    // 상세 쿼리
    static DETAIL_MOVIE = [...this.MOVIES, this.DETAIL_MOVIE];
    static DETAIL_MOVIE_QUERY = [...this.DETAIL_MOVIE, this.DETAIL_MOVIE_INFO];
    static RATING_LIST_QUERY = [...this.DETAIL_MOVIE, this.MOVIE_RATING_LIST];

    // 검색 쿼리
    static SEARCH_MOVIE_QUERY = [...this.MOVIES, this.SEARCH_MOVIE];

    // // TV 메인 쿼리
    static MAIN_TV_QUERY = [...this.TV, this.MAIN_TV];
    static CATEGORY_TV_ITEMS = [...this.MAIN_TV_QUERY, this.TAB_TV];
    static BEST_TV_QUERY = [...this.MAIN_TV_QUERY, this.BEST_TV];
    static FAVORITE_TV_QUERY = [...this.MAIN_TV_QUERY, this.FAVORITE_TV];

    // // 상세 쿼리
    static DETAIL_TV = [...this.TV, this.DETAIL_TV];
    static DETAIL_TV_QUERY = [...this.DETAIL_TV, this.DETAIL_TV_INFO];
    static TV_VIDEO_QUERY = [...this.DETAIL_TV, this.DETAIL_TV_VIDEO];
    static TV_RATING_LIST_QUERY = [...this.DETAIL_TV, this.TV_RATING_LIST];

    // // 검색 쿼리
    static SEARCH_TV_QUERY = [...this.TV, this.SEARCH_TV];
}

