export interface ErrorType {
  param: string;
  msg: string;
}

export interface ExtractedErrorsType {
  [key: string]: string[];
}

export interface QueryKey {
  $or: any[];
  $and: any[];
}
