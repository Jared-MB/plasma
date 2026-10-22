import type { z } from "zod";

export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

export type Route = {
    url: `/${string}`;
    /**
     * Data schema to be send from Client (UI) to Server Function
     *
     * Mostly used in `.validator()` server functions
     */
    clientInput?: z.ZodType;
    /**
     * Request body schema to be send from Server Function to an External API
     */
    apiPayload?: z.ZodType;
    params?: z.ZodType;
    returns?: unknown;
};

export interface ServerRoutes {
    [key: string]: Route;
}

export interface Interceptors {
    request?: ((options: HttpRequest, context: HttpRequest) => Promise<HttpRequest> | HttpRequest)[];
    response?: ((options: Response, context: HttpRequest) => Promise<Response> | Response)[];
}

export type RequestInterceptor = NonNullable<Interceptors["request"]>[number];
export type ResponseInterceptor = NonNullable<Interceptors["response"]>[number];

export interface HttpRequest {
    url: string;
    method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
    headers: Headers;
    body?: BodyInit | null;
}

export type HttpAdapter<T = any> = (data: any) => T;

export type HttpResult<T> = readonly [Error, null] | readonly [null, T];

export interface HttpOptions {
    auth?: boolean;
    serverUrl?: string;
    interceptors?: Interceptors;
}

export interface HttpMutationOptions<ApiPayload extends z.ZodType | undefined> extends HttpOptions {
    bodyType?: "json" | "form-data";
    apiPayload?: ApiPayload;
}
