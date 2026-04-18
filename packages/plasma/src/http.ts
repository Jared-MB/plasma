import { serialize } from "object-to-formdata";
import type { z } from "zod";
import type { HttpAdapter, HttpMutationOptions, HttpOptions, HttpRequest, RequestInterceptor } from "./types";
import { getHeaders } from "./utils/get-headers";
import { handleResponse } from "./utils/handle-response";

interface HttpOptionsWithAdapter<T> extends HttpOptions {
    adapter?: HttpAdapter<T>;
}

async function executeRequest<T, Adapter>(
    method: "GET" | "POST",
    url: `/${string}`,
    options: any,
    body?: BodyInit | null,
) {
    const headers = getHeaders({
        bodyType: options?.bodyType ?? "json",
    });

    if (!options.serverUrl) {
        throw new Error(`Server URL is not defined for **${method}** request on **${url}**`);
    }

    const server = `${options.serverUrl}${url}`;

    let request: HttpRequest = {
        url: server,
        method,
        headers,
        body,
    };

    if (options?.interceptors?.request) {
        for (const interceptor of options.interceptors.request as RequestInterceptor[]) {
            request = await interceptor(request, request);
        }
    }

    if ((options?.auth ?? true) && !request.headers.get("Authorization")) {
        throw new Error(
            `**${method}** request on **${url}** was set as authenticated but no **Authorization** header was found`,
        );
    }

    if (options?.auth === false) {
        request.headers.delete("Authorization");
    }

    const fetchPromise = fetch(request.url, {
        method: request.method,
        headers: request.headers,
        body: request.body,
    });

    return handleResponse<T, Adapter>(fetchPromise, {
        adapter: options.adapter,
        responseInterceptors: options.interceptors?.response,
        context: request,
    });
}

export async function GET<T, Adapter>(url: `/${string}`, options: Omit<HttpOptionsWithAdapter<Adapter>, "bodyType">) {
    return executeRequest<T, Adapter>("GET", url, options);
}

interface HttpMutationOptionsWithAdapter<T, ApiPayload extends z.ZodType | undefined>
    extends HttpMutationOptions<ApiPayload> {
    adapter?: HttpAdapter<T>;
}

export async function POST<T, Adapter = void, ApiPayload extends z.ZodType | undefined = undefined>(
    url: `/${string}`,
    body: ApiPayload extends z.ZodTypeAny ? z.infer<ApiPayload> : unknown,
    options: HttpMutationOptionsWithAdapter<Adapter, ApiPayload> = {},
) {
    const bodyType = options?.bodyType ?? "json";

    let requestBody: any = body;
    const parsedData = options?.apiPayload?.safeParse(body);

    if (parsedData !== undefined && !parsedData?.success) {
        return [parsedData?.error, null] as const;
    }

    if (parsedData?.success) {
        requestBody = parsedData.data;
    }

    const serializedBody = bodyType === "json" ? JSON.stringify(requestBody) : serialize(requestBody);

    return executeRequest<T, Adapter>("POST", url, options, serializedBody);
}

export const PATCH = POST;
