export interface ResponseWithoutPayload {
  status: ResponseHeader;
}

export interface ResponseWithPayload<T> {
  status: ResponseHeader;
  payload: T;
}

export interface ResponseHeader {
  http_status: number;
  code: string;
  message: string;
}
