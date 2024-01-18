export async function get (path: string, opts: object = {}): Promise<any> {
    const { data }: any = await useFetch(useStrapiUrl() + path, opts);
    return (data._rawValue) as JSON;
};

export async function post (path: string, data: object): Promise<any> {
    try {
        return await $fetch(useStrapiUrl() + path, {
            method: "POST",
            body: data
        });
    } catch (err) {
        throw err;
    };
};

export async function put (path: string, data: object): Promise<any> {
    const response = await $fetch(useStrapiUrl() + path, {
        method: "PUT",
        body: data
    }) as any;
    return response;
};

export async function _delete (path: string, data?: object) {
    const response = await $fetch(useStrapiUrl() + path, {
        method: "DELETE",
        body: data
    }) as any;
    return response;
};