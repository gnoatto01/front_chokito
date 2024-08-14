import { NextRequest, NextResponse } from "next/server";




export async function middleware(req: NextRequest) {

    const tokenDeAcesso = req.cookies.get('naturalbit.token')?.value;

    try {
        if (tokenDeAcesso) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    } catch (error) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: [
        '/app/:path*',
    ]
}