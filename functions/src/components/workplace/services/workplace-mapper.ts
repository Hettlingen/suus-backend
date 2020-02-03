export const mapTermsOfUseFromDbToString = (termsOfUseFromDb: any) => {
    return termsOfUseFromDb.data().content;
}