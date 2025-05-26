import {HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    let authReq = req;
    const encodedBody = encodeBody(req.body!);

    authReq = req.clone({
        body: encodedBody,
        setHeaders: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    return next(authReq);
};

function encodeBody(params: Record<string, any>): string | null {
    if(params) {
        const encodeBoard = (board: any) => board.reduce((result: any, row: any, i: number) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '');

        return Object.keys(params)
            .map(key => + '=' + `%5B${encodeBoard(params[key])}%5D`)
            .join('&');
    }
    
    return null;
}
    
