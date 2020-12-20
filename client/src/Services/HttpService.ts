import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {IHttpService} from './IHttpService';
import {ApiResponse} from "../Models/ApiResponse";

export default class BaseHttpService implements IHttpService {
    private _service: AxiosInstance;
    private _headers: any;

    constructor(baseUrl: string) {
        this._service = axios.create({baseURL: baseUrl});
        this._service.interceptors.response.use(this.handleSuccess, this.handleError);
        this._headers = {};
    }

    async get<T>(path: string): Promise<ApiResponse<T>> {
        const response = await this.sendRequest<T>('GET', path);
        return response as ApiResponse<T>;
    }

    private handleSuccess = (response: AxiosResponse<any>) => {
        return response.data;
    }

    /* Do not propogate exception. Instaed create a standard api response object,
        with exception status code in the response status property  */
    private handleError = (error: any) => {

        const errorResponse: ApiResponse<null> = {
            statusCode: error.response?.data?.statusCode || 500,
            errorMessage: error.response?.data?.errorMessage || 'error',
            data: null
        };

        return Promise.resolve(errorResponse);
    }

    private async sendRequest<T>(method: 'GET' | 'POST', path: string, payload?: object): Promise<any> {
        return await this._service.request<ApiResponse<T>>({
            method: method,
            url: path,
            responseType: 'json',
            data: payload,
            headers: this._headers
        });
    }
}
