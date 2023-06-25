import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export async function fetcher(url: RequestInfo | URL, options: RequestInit | undefined) {
  const session = await getSession();
  const router = useRouter();

  const response = await fetch(url, options);

  if (response.status === 401 && session) {
    // Redirect to sign in page if response is 401 (Unauthorized)
    router.push('/signin');
    return;
  }

  return response;
}
