import {IHttpService} from "../IHttpService";
import {ApiResponse} from "../../Models/ApiResponse";
import {Res} from "../../Models/Res";
import HttpService from "../HttpService";
import {GetTopicsRequest} from "../../Models/GetTopicsRequest";
import Consts from '../../Consts/Consts';

class DuckApi {
    _client: IHttpService;

    constructor() {
        this._client = new HttpService(Consts.baseUrl);
    }

    async getTopics({q, pageNumber, pageSize}: GetTopicsRequest): Promise<ApiResponse<Res>> {
        return this._client.get<Res>(`GetTopics?q=${q}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
    }

}

export default new DuckApi()


