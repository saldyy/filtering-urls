import zod from "zod";
import { SortValue } from "../constant";

export const FilterUrlPayloadSchema = zod.object({
  filter: zod
    .object({
      priority: zod.number().optional(),
    })
    .optional(),
  sort: zod
    .object({
      priority: zod.enum([SortValue.asc, SortValue.desc]).optional(),
    })
    .default({ priority: SortValue.asc }),
  data: zod.array(
    zod.object({
      priority: zod.number(),
      url: zod.string(),
    }),
  ),
});

export type FilterUrlPayload = zod.infer<typeof FilterUrlPayloadSchema>;
