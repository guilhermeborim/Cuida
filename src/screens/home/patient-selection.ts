export function selectHomePatient<T extends { id: string }>(
  patients: readonly T[],
  selectedId: string | null,
): T | null {
  const selected = patients.find((patient) => patient.id === selectedId);
  return selected ?? (patients.length === 1 ? patients[0] : null);
}
