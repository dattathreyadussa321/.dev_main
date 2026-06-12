export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center pt-20" role="status" aria-label="Loading page">
      <div className="relative size-12">
        <div className="absolute inset-0 rounded-full border-2 border-border" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary" />
      </div>
    </div>
  );
}
