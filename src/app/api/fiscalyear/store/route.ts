import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";

interface RequestBody {
    name: string;
    year: number;
    status: number;
}

export async function POST(request: Request) {
    const session = await getServerSession();
    // const session = await getSession();
    if (!session) {
        // Redirect to sign in page if session is not found
        return new Response('Unauthorized', { status: 401 });
    }

    const body: RequestBody = await request.json();
    try {
        const fiscalYear = await prisma.fiscalYears.create({
            data: {
                name: body.name,
                year: parseInt(body.year as unknown as string),
                status: (body.status) ? true : false
            }
        });
        return new Response(JSON.stringify(fiscalYear));
    } catch (error) {
        return new Response(JSON.stringify({
            error: error
        }), {
            status: 400,
        });
    }

}