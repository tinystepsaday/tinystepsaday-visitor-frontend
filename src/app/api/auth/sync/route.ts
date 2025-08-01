import { NextRequest, NextResponse } from 'next/server';
import { setServerAuthTokens, clearServerAuthTokens } from '@/lib/auth/server';

export async function POST(request: NextRequest) {
  try {
    const { accessToken, refreshToken } = await request.json();

    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        { success: false, message: 'Missing tokens' },
        { status: 400 }
      );
    }

    // Set tokens in HTTP-only cookies
    await setServerAuthTokens(accessToken, refreshToken);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error syncing auth tokens:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to sync tokens' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    // Clear tokens from HTTP-only cookies
    await clearServerAuthTokens();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error clearing auth tokens:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to clear tokens' },
      { status: 500 }
    );
  }
} 