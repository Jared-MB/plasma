import { ZodType, type z } from "zod";
import { GET, PATCH, POST } from "./http";
import type { HttpMutationOptions, HttpOptions, HttpResult, Interceptors, Prettify, Route } from "./types";
import { buildUrl } from "./utils/build-url";

type RouteDefs = Record<string, Route>;

type InferAdapterReturnType<A extends (...args: any) => any, R> = "data" extends keyof ReturnType<A>
    ? Prettify<Omit<ReturnType<A>, "data"> & { data: R }>
    : ReturnType<A>;

// OVERLOAD 1: With Adapter
export function createHttpClient<Routes extends RouteDefs, TAdapter extends (data: any) => any>(config: {
    serverUrl: string | undefined;
    routes: Routes;
    adapter: TAdapter;
    interceptors?: Interceptors;
}): {
    GET: <U extends keyof Routes>(
        alias: U,
        ...args: undefined extends Routes[U]["params"]
            ? [options?: Omit<HttpOptions, "serverUrl">]
            : [options: Omit<HttpOptions, "serverUrl"> & { params: z.infer<NonNullable<Routes[U]["params"]>> }]
    ) => Promise<HttpResult<InferAdapterReturnType<TAdapter, Routes[U]["returns"]>>>;

    POST: <U extends keyof Routes>(
        alias: U,
        body: Routes[U]["apiPayload"] extends z.ZodTypeAny ? z.infer<Routes[U]["apiPayload"]> : unknown,
        options?: Omit<HttpMutationOptions<Routes[U]["apiPayload"]>, "serverUrl"> & { params?: Routes[U]["params"] },
    ) => Promise<HttpResult<InferAdapterReturnType<TAdapter, Routes[U]["returns"]>>>;

    PATCH: <U extends keyof Routes>(
        alias: U,
        body: Routes[U]["apiPayload"] extends z.ZodTypeAny ? z.infer<Routes[U]["apiPayload"]> : unknown,
        options?: Omit<HttpMutationOptions<Routes[U]["apiPayload"]>, "serverUrl"> & { params?: Routes[U]["params"] },
    ) => Promise<HttpResult<InferAdapterReturnType<TAdapter, Routes[U]["returns"]>>>;
};

// OVERLOAD 2: Without Adapter
export function createHttpClient<Routes extends RouteDefs>(config: {
    serverUrl: string | undefined;
    routes: Routes;
    adapter?: undefined;
    interceptors?: Interceptors;
}): {
    GET: <U extends keyof Routes>(
        alias: U,
        ...args: undefined extends Routes[U]["params"]
            ? [options?: Omit<HttpOptions, "serverUrl">]
            : [options: Omit<HttpOptions, "serverUrl"> & { params: z.infer<NonNullable<Routes[U]["params"]>> }]
    ) => Promise<HttpResult<Routes[U]["returns"]>>;

    POST: <U extends keyof Routes>(
        alias: U,
        body: Routes[U]["apiPayload"] extends z.ZodTypeAny ? z.infer<Routes[U]["apiPayload"]> : unknown,
        options?: Omit<HttpMutationOptions<Routes[U]["apiPayload"]>, "serverUrl"> & { params?: Routes[U]["params"] },
    ) => Promise<HttpResult<Routes[U]["returns"]>>;

    PATCH: <U extends keyof Routes>(
        alias: U,
        body: Routes[U]["apiPayload"] extends z.ZodTypeAny ? z.infer<Routes[U]["apiPayload"]> : unknown,
        options?: Omit<HttpMutationOptions<Routes[U]["apiPayload"]>, "serverUrl"> & { params?: Routes[U]["params"] },
    ) => Promise<HttpResult<Routes[U]["returns"]>>;
};

// IMPLEMENTATION
export function createHttpClient({ serverUrl, routes, adapter, interceptors }: any) {
    const getParsedURL = (alias: string, params: Record<string, any> = {}) => {
        if (routes[alias].params instanceof ZodType) {
            const parsedParams = routes[alias].params.parse(params);
            return buildUrl(routes[alias].url, parsedParams);
        }

        return buildUrl(routes[alias].url, params);
    };

    const get = async (alias: string, ...args: any[]) => {
        const options = args[0];
        return GET(getParsedURL(alias, options?.params), { ...options, serverUrl, adapter, interceptors });
    };

    const post = async (alias: string, body: any, options: any) => {
        return POST(getParsedURL(alias, options?.params), body, {
            ...options,
            serverUrl,
            adapter,
            interceptors,
            apiPayload: routes[alias]?.apiPayload,
        });
    };

    const patch = async (alias: string, body: any, options: any) => {
        return PATCH(getParsedURL(alias, options?.params), body, {
            ...options,
            serverUrl,
            adapter,
            interceptors,
            apiPayload: routes[alias]?.apiPayload,
        });
    };

    return { GET: get, POST: post, PATCH: patch } as any;
}
