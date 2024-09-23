/* 지역 조회 */
export interface IRegionCommon {
  regionId: string;
  regionName: string;
}

export interface IRegion {
  regions: IRegionItem[];
}

export interface IRegionItem extends IRegionCommon {
  cities: IRegionCommon[];
}

/* 장르 조회 */
export interface IGenreCommon {
  genreId: number;
  genreName: string;
}

export interface IGenre {
  genreList: IGenreCommon[];
}

/* 브랜드 조회 */
export interface IBrandCommon {
  brandId: number;
  brandName: string;
}

export interface IBrand {
  brandList: IBrandCommon[];
}
