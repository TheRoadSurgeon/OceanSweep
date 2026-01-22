import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';

const handler = NextAuth(authConfig);

// Handle both GET and POST requests
export { handler as GET, handler as POST };
