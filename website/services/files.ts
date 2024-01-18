import { post, _delete } from "~/api";


export async function uploadFile (files: FormData) {
    return await post("/upload", files);
};

export async function deleteFile (id: number) {
    return await _delete(`/upload/files/${id}`);
};