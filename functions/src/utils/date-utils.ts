export class DateUtils {

    /**
     * Converts a date to an sql date
     *
     * @param content string
     */
    public static toSqlDatetime(inputDate: Date): string {
        const isoDate = new Date(inputDate.toISOString());
        return isoDate.toJSON().slice(0, 19).replace('T', ' ');
    }
}
