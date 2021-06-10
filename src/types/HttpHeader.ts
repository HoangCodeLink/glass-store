import ContentType from "../constants/contentType";

export interface HttpHeader {
    Accept?: ContentType,
    'Content-Type'?: ContentType,
    Authorization?: string
}