import { signJwtAccessToken } from '@/lib/jwt';
import prisma from '@/lib/prisma';
import * as bcrypt from 'bcrypt';

interface RequestBody {
    username: string,
    password: string
}

export async function POST(requset:Request){
    const body:RequestBody = await requset.json();

    const user = await prisma.users.findFirst({
        where:{
            email: body.username,
        }
    })

    if (user && (await bcrypt.compare(body.password, user.password))) {
        const {password, ...userWithoutPass} = user;
        const accessToken = signJwtAccessToken(userWithoutPass);
        const result = {
            ...userWithoutPass,
            accessToken
        }
        return new Response(JSON.stringify(result));
    } else return new Response(JSON.stringify(null));
}