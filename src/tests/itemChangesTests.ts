import { itemChanges } from "../utils/hasItemChanged"

export function itemChangesTests() {
    test('Items Changes', async () => {
        const result = itemChanges(
            {
                a: "a",
                b: "not B",
                newProp: "New data",
            },
            {
                a: "a",
                b: "b",
            },
        )

        expect(result?.partialNewItem).toEqual({
            b: "not B",
            newProp: "New data",
        });

        expect(result?.partialOldItem).toEqual({
            b: "b",
        });
    });
}
