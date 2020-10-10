export class WekePageRef {
    readonly weke = 'PAGEREF';
    constructor(readonly path: string) {}
}

export class WekeUrlRef {
    readonly weke = 'URLREF';
    constructor(readonly url: string) {}
}
