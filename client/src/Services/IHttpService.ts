import {ApiResponse} from "../Models/ApiResponse";

export interface IHttpService {
    get<T>(path: string): Promise<ApiResponse<T>>,
}
