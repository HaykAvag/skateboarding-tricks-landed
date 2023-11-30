import { z } from "zod";

// Create tricks landed Zod schema and derive a type from it.
const tricksLandedSchema = z.record(z.record(z.array(z.boolean())));
export type TricksLanded = z.infer<typeof tricksLandedSchema>;

/**
 * @returns Parsed data from localStorage or undefined
 */
export const getParsedData = async () => {
    const oldData = localStorage.getItem("tricksLanded");
    if (!oldData) return;

    let parsedData: z.infer<typeof tricksLandedSchema>;

    try {
        // Validate data from localStorage with Zod.
        parsedData = await tricksLandedSchema.parseAsync(JSON.parse(oldData));
        return parsedData;
    } catch {
        // Clear local storage if data is invalid.
        localStorage.clear();
    }
};
