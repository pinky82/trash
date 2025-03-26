import { request } from "@/utils/request";
const TENCENT_MAPS_KEY = 'LBABZ-OKPKQ-MZI5Y-BW6ZS-VIIMV-CFFLP';

export const mapService = {
    search: (keyword: string, region="上海") => fetch(`/api/map/search?keyword=${encodeURIComponent(keyword)}&region=${encodeURIComponent(region)}`).then(res => res.json()),
}

