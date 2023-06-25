import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";

interface RequestBody {
    id: number;
    name: string;
    year: number;
    status: boolean;
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
        const fiscalYear = await prisma.fiscalYears.update({
            where: { id: body.id },
            data: {
                name: body.name,
                year: parseInt(body.year as unknown as string),
                status: (body.status) ? true : false
            }
        });
        return new Response(JSON.stringify(fiscalYear));
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
    if (!session) {
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        const fiscalYear = await prisma.fiscalYears.delete({
            where: { id: parseInt(params.id as unknown as string) },
        });
        return new Response(JSON.stringify(fiscalYear));
    }catch(error) {
        return new Response(JSON.stringify({
            error: error
        }),{
            status: 400,
        });
    }
    
}