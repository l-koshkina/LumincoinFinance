export class UrlUtils {
    static getUrlParam(param: string) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
}