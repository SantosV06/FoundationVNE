export interface TurnstileVerification {
  success: boolean;
  hostname?: string;
}





export function assertTurnstileVerification(
  verification: TurnstileVerification,
  expectedHostname: string,
): void {
  const normalizeHostname = (value: string) =>
    value.trim().toLowerCase().replace(/\.$/, "");
  const expected = normalizeHostname(expectedHostname);
  const actual = normalizeHostname(verification.hostname ?? "");

  if (!verification.success || !expected || !actual || actual !== expected) {
    throw new Error(
      "La verificación de seguridad ha fallado. Inténtalo nuevamente.",
    );
  }
}
