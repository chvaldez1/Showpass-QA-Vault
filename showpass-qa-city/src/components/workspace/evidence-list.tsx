export function EvidenceList({ label, entries }: { label: string; entries: readonly string[] }) {
  if (!entries.length) return null;

  return (
    <div className="space-y-1">
      <h4 className="font-medium">{label}</h4>
      <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
        {entries.map((entry, index) => <li key={index}>{entry}</li>)}
      </ul>
    </div>
  );
}
