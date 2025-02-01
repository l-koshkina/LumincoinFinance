import config from "../../config/config";

export class CommonUtils {
    static getTypeHtml(type: string) {
        let typeHtml = null;
        switch (type) {
            case config.categoryTypes.income:
                typeHtml = '<span class="text-success">доход</span>'
                break;
            case config.categoryTypes.expense:
                typeHtml = '<span class="text-danger">расход</span>'
                break;
            default:
                typeHtml = '<span class="text-dark">неизвестно</span>'
        }

        return typeHtml;
    }
}