import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;
    
    return NextResponse.json({
      success: true,
      data: {
        allCookies: allCookies.map(c => ({ name: c.name, value: c.value ? '***' : null })),
        accessToken: accessToken ? '***' : null,
        refreshToken: refreshToken ? '***' : null,
        hasAccessToken: !!accessToken,
        hasRefreshToken: !!refreshToken,
        cookieCount: allCookies.length
      }
    });
  } catch (error) {
    console.error('Debug route error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to get debug info'
    }, { status: 500 });
  }
} 