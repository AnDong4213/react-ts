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

export async function getDogLists(num?: number) {
    const data = await request<any>('https://api.thecatapi.com/v1/images/search', {
        method: 'GET',
        params: {
            limit: num
        }
    });
    console.log(data)
    return { data }
    // return Promise.reject(new Error('接口出错'))
}

export async function getNotices(options?: { [key: string]: any }) {
    return request<API.NoticeIconList>('/api/notices', {
        method: 'GET',
        ...(options || {}),
    });
}