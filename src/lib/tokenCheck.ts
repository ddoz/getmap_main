import { verifyJwt } from "./jwt";

const tokenCheck = (request:Request) => {
    const accessToken = request.headers.get("authorization")
    console.log(accessToken);
    if(!accessToken || !verifyJwt(accessToken)) {
        return false;
    }
    return true;
}

export default tokenCheck;