import { request } from 'umi'

export interface catType {
    breeds?: [];
    height: number;
    id: string;
    url: string;
    width: number;
}

export async function getCatLists(options?: { [key: string]: any }) {
    const data = await request<catType[]>('https://api.thecatapi.com/v1/images/search', {
        method: 'GET',
        ...(options || {}),
    });
    return { data }
}

export async function getNotices(options?: { [key: string]: any }) {
    return request<API.NoticeIconList>('/api/notices', {
        method: 'GET',
        ...(options || {}),
    });
}