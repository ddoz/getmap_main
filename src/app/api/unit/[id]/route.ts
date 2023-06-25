import prisma from "@/lib/prisma";
import tokenCheck from "@/lib/tokenCheck";
import { getServerSession } from "next-auth/next";

interface RequestBody {
    id: number;
    unitName: string;
}

export async function PUT(request:Request, {params}:{params:{id:number}}) {
    const session = await getServerSession();
    // const session = await getSession();
    if (!session) {
        // Redirect to sign in page if session is not found
        return new Response('Unauthorized', { status: 401 });
    }

    const body:RequestBody = await request.json();
    try {
        const unit = await prisma.units.update({
            where: { id: body.id },
            data: {
              unitName: body.unitName,
            },
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

export async function DELETE(request:Request, {params}:{params:{id:number}}) {
    const session = await getServerSession();
    // const session = await getSession();
    if (!session) {
        // Redirect to sign in page if session is not found
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        const unit = await prisma.units.delete({
            where: { id: parseInt(params.id as unknown as string) },
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