import { z } from "zod";

export const pilotPurchaseQuantity = 4;
export const pilotTransferQuantity = 3;
const email = z.string().trim().pipe(z.email().max(254));
export const pilotAccountsSchema = z.object({ buyerEmail: email, recipientEmail: email }).refine(
  ({ buyerEmail, recipientEmail }) => buyerEmail.toLowerCase() !== recipientEmail.toLowerCase(),
  { path: ["recipientEmail"], message: "Use a different test account for the recipient." },
);
export const transferPilotSchema = z.object({
  ...pilotAccountsSchema.shape, id: z.uuid(),
});

const safeReference = z.string().trim().regex(/^[A-Za-z0-9][A-Za-z0-9 _-]{0,79}$/, "Enter a safe order or transfer reference.");
const count = z.number().int().nonnegative();
export const pilotProofSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("purchase"), orderReference: safeReference, issued: count }),
  z.object({ kind: z.literal("send-transfer"), transferReference: safeReference, pending: count, retained: count }),
  z.object({ kind: z.literal("accept-transfer"), accepted: count }),
]);
export const pilotInputSchema = z.object({
  orderReference: safeReference.optional(), transferReference: safeReference.optional(),
});

export type PilotAccounts = z.infer<typeof pilotAccountsSchema>;
export type PilotProof = z.infer<typeof pilotProofSchema>;

export const pilotStages = [
  { role: "organizer-builder", job: "setup", title: "Prepare the Event and ticket setup" },
  { role: "customer-tester", job: "purchase", title: "Buy four tickets and verify the order" },
  { role: "customer-tester", job: "send-transfer", title: "Send three tickets and verify one remains" },
  { role: "customer-tester", job: "accept-transfer", title: "Accept and verify three tickets" },
] as const;
