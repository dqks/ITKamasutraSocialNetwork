import {ResultCodes} from "./result-codes";

export type ResponseType<D = {}, R = ResultCodes> = {
    data: D
    resultCode: R
    messages: string[]
}