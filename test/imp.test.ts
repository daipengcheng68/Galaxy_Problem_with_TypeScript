import { MerchantGalaxy } from "../src/improve";

describe("galaxy improve", function () {
    test("should check the getInfo function", () => {
        expect(MerchantGalaxy.getUnitOfGalaxy(['glob', 'is', 'I'])).toStrictEqual({ glob: 'I' });
    });

    test("should check the transfer from roman to integer", () => {
        expect(MerchantGalaxy.romanToInt(["glob", "glob"])).toBe(2);
    });


    test("should check the checkQuestions function", () => {
        expect(MerchantGalaxy.checkQuestions(["how", "much", "is", "glob", "?"])).toStrictEqual("glob is 1");
    });
});
