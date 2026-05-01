interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({
  size = "md",
  label,
  fullScreen,
}: LoadingSpinnerProps) {
  const sizeMap = { sm: "w-5 h-5", md: "w-8 h-8", lg: "w-12 h-12" };

  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`${sizeMap[size]} border-2 border-primary/30 border-t-primary rounded-full animate-spin`}
        role="status"
        aria-label={label ?? "Loading"}
      />
      {label && (
        <p className="text-sm text-muted-foreground font-body">{label}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div
        data-ocid="loading_state"
        className="min-h-screen flex items-center justify-center bg-background"
      >
        {spinner}
      </div>
    );
  }

  return (
    <div
      data-ocid="loading_state"
      className="flex items-center justify-center py-12"
    >
      {spinner}
    </div>
  );
}
