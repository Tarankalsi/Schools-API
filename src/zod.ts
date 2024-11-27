import zod from "zod";

export const schoolSchema = zod.object({
    name : zod.string().min(1),
    address : zod.string().min(1),
    latitude : zod.number(),
    longitude : zod.number()
})

export const listSchoolsSchema = zod.object({
    latitude : zod.number(),
    longitude : zod.number()
});