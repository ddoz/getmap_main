import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from 'next';
import { Asset } from "next/font/google";

interface RequestBody {
    page: number;
    pageSize: number;
    search: string;
}

export async function POST(request: Request) {
    const session = await getServerSession();
    // const session = await getSession();
    if (!session) {
        // Redirect to sign in page if session is not found
        return new Response('Unauthorized', { status: 401 });
    }
    // return new Response(JSON.stringify(request));
    const body:RequestBody = await request.json();

    // Menghitung offset berdasarkan halaman dan ukuran halaman
    const offset = (parseInt(body.page as unknown as string) - 1) * parseInt(body.pageSize as unknown as string);

    const units = await prisma.units.findMany({
        take: parseInt(body.pageSize as unknown as string),
        skip: offset,
        where: {
        unitName: {
            contains: body.search as unknown as string,
        },
        },
    });
    if (!units) {
        return new Response(JSON.stringify([]));
    }
    return new Response(JSON.stringify(units));
}