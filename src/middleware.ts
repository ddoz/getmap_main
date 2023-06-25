export { default } from 'next-auth/middleware';

export const config = {
    matcher: [
        "/",
        "/Unit/:path*",
        "/TahunAnggaran/:path*",
    ]
};