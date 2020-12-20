import {Topic} from "./Topic";

export interface Res {
    pageNumber: number
    totalPages: number
    totalResults: number
    results: Topic[]
}
