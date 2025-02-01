export type DefaultResponseType = {
    error: boolean,
    message?:string,
    validation?:Array<{key: string, message: string}>
    response: any | null,
    redirect?: string | null
}

