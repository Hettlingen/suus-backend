export class StringUtils {

    /**
     * Checks if the string is not empty
     *
     * @param content string
     */
    public static isStringNotEmpty(content: string): boolean {
        if(content !== null && content != undefined && content !== '') {
            return true;
        }
        return false;
    }

    /**
     * Trims the string and rmoves all accents/diacritics of characters
     * @param text string
     */
    public static stripAccents(text: string): string {
        let textTrimmed = text.trim();
        return textTrimmed.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
}
