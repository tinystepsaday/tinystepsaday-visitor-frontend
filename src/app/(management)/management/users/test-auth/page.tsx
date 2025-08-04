import { getCurrentUser } from '@/lib/auth/serverActions';

export default async function TestAuthPage() {
  try {
    // Test the server action
    const user = await getCurrentUser();
    
    if (!user) {
      return (
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Authentication Test</h1>
          <p className="text-red-600">No user found - not authenticated</p>
        </div>
      );
    }

    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Authentication Test</h1>
        <div className="bg-green-100 p-4 rounded">
          <p className="text-green-800">✅ User authenticated successfully!</p>
          <p className="text-sm text-green-700 mt-2">
            Email: {user.email}<br/>
            Role: {user.role}<br/>
            Name: {user.firstName} {user.lastName}
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Test auth page error:', error);
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Authentication Test</h1>
        <div className="bg-red-100 p-4 rounded">
          <p className="text-red-800">❌ Authentication error occurred</p>
          <p className="text-sm text-red-700 mt-2">
            Error: {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </div>
      </div>
    );
  }
} 