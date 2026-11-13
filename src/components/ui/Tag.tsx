export function Tag({ children }: { children: string }) {
  return (
    <li className="rounded-md border border-border bg-background px-2.5 py-1 text-sm text-muted">
      {children}
    </li>
  );
}

export function TagList({ items, label }: { items: string[]; label: string }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </ul>
  );
}
