import { get, put } from "~/api";
import { IWebsiteConfig, IWebsiteLayout } from "~/interface-types";

/**
 * @todo (maybe) make it dynamic
 */
const CURRENT_USER = 1;



export async function fetchConfig (): Promise<IWebsiteConfig> {
    const { data } = await get("/website-configs/" + CURRENT_USER); // @todo
    return data.attributes;
};

export async function saveConfig (config: IWebsiteConfig) {
    await put("/website-configs/" + CURRENT_USER, { data: config })
};

export async function fetchLayout (): Promise<IWebsiteLayout> {
    const { data } = await get("/website-configs/" + CURRENT_USER, { query: { fields: ["theme"] } });
    return data.attributes;
};