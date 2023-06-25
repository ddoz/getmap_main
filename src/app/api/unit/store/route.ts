import prisma from "@/lib/prisma";
import tokenCheck from "@/lib/tokenCheck";
import { getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from 'next';

interface RequestBody {
    unitName: string;
}

export async function POST(request:Request) {
    const session = await getServerSession();
    // const session = await getSession();
    if (!session) {
        // Redirect to sign in page if session is not found
        return new Response('Unauthorized', { status: 401 });
    }

    const body:RequestBody = await request.json();

    try {
        const unit = await prisma.units.create({
            data: {
                unitName: body.unitName,
            }
        });
        return new Response(JSON.stringify(unit));
    }catch(error) {
        return new Response(JSON.stringify({
            error: error
        }),{
            status: 400,
        });
    }
    
}