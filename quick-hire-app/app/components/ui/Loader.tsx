export default function Loader() {
  return (
    <div
      className="flex min-h-[120px] items-center justify-center"
      role="status"
      aria-label="Loading"
    >
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-current border-t-transparent"
        style={{ color: 'var(--color-primary)' }}
      />
    </div>
  );
}
