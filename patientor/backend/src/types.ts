import z from "zod";

export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

// Defining validation schemas
export const DiagnosisEntrySchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});

export type DiagnosisEntry = z.infer<typeof DiagnosisEntrySchema>;

export const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

export type BaseEntry = z.infer<typeof BaseEntrySchema>;

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

// Using unions to validate enum/number values
export const HealthCheckEntrySchema = z.object({
  ...BaseEntrySchema.shape, // extending with another schema
  type: z.literal("HealthCheck"),
  healthCheckRating: z.union([
    z.literal(HealthCheckRating.Healthy),
    z.literal(HealthCheckRating.LowRisk),
    z.literal(HealthCheckRating.HighRisk),
    z.literal(HealthCheckRating.CriticalRisk),
  ]),
});

export type HealthCheckEntry = z.infer<typeof HealthCheckEntrySchema>;

export const HospitalEntrySchema = z.object({
  ...BaseEntrySchema.shape, // extending with another schema
  type: z.literal("Hospital"),
  discharge: z
    .object({
      date: z.iso.date(),
      criteria: z.string(),
    })
    .optional(),
});

export type HospitalEntry = z.infer<typeof HospitalEntrySchema>;

export const OccupationalHealthcareEntrySchema = z.object({
  ...BaseEntrySchema.shape, // extending with another schema
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.iso.date(),
      endDate: z.iso.date(),
    })
    .optional(),
});

export type OccupationalHealthcareEntry = z.infer<
  typeof OccupationalHealthcareEntrySchema
>;

// Creating a new object/type using discriminated unions (the same as A | B)
export const EntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
]);
export type Entry = z.infer<typeof EntrySchema>;

// Creating a schema without `id`
export const NewEntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema.omit({ id: true }),
  HospitalEntrySchema.omit({ id: true }),
  OccupationalHealthcareEntrySchema.omit({ id: true }),
]);
export type NewEntry = z.infer<typeof NewEntrySchema>;

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

export type NewPatient = z.infer<typeof NewPatientSchema>;

export interface Patient extends NewPatient {
  id: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
