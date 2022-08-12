import {StringUtils} from '../../src/utils/string-utils';

describe("Test StringUtils", () => {
    beforeAll(async () => {
        // initialisierung
    })
    afterAll(async () => {
        // aufräumen
    })

    describe("StringUtils.isStringNotEmpty", () => {
        test("check empty string", () => {
            let result = StringUtils.isStringNotEmpty('');
            expect(result).toBe(false);
        });

        test("check string with content", () => {
            let result = StringUtils.isStringNotEmpty('Blabla');
            expect(result).toBe(true);
        });
    })

    describe("StringUtils.stripAccents", () => {
        test("check string with accents", () => {
            let result = StringUtils.stripAccents('Voilà');
            expect(result).toBe('Voila');
        });

        test("check string with spaces", () => {
            let result = StringUtils.stripAccents(' Voilà ');
            expect(result).toBe('Voila');
        });

        test("check empty string", () => {
            let result = StringUtils.stripAccents('');
            expect(result).toBe('');
        });
    })
})
