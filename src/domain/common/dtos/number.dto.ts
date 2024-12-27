import { z } from "zod";

export const numberSchema = z.preprocess((val) => Number(val), z.number().positive().min(1));

export const numbersSchema = z.preprocess(
	(val) => (typeof val === "string" ? val.split(",").map(Number) : []),
	z.array(z.number().positive().min(1))
);
