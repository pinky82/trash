import { NextResponse } from 'next/server';

const TENCENT_MAPS_KEY = 'LBABZ-OKPKQ-MZI5Y-BW6ZS-VIIMV-CFFLP';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');
  const region = searchParams.get('region') || '上海';

  if (!keyword) {
    return NextResponse.json({ error: '关键词不能为空' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://apis.map.qq.com/ws/place/v1/suggestion/?region=${region}&keyword=${keyword}&key=${TENCENT_MAPS_KEY}`
    );
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('地图搜索失败:', error);
    return NextResponse.json({ error: '搜索失败' }, { status: 500 });
  }
} 