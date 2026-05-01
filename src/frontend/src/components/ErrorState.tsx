import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  fullScreen?: boolean;
}

export function ErrorState({
  title = "Something went wrong",
  message = "Unable to load content. Please try again.",
  onRetry,
  fullScreen,
}: ErrorStateProps) {
  const content = (
    <div
      data-ocid="error_state"
      className="flex flex-col items-center gap-4 text-center px-4 py-12"
    >
      <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
        <AlertCircle className="w-7 h-7 text-destructive" />
      </div>
      <div>
        <h3 className="text-base font-semibold text-foreground font-display">
          {title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground font-body max-w-xs">
          {message}
        </p>
      </div>
      {onRetry && (
        <Button
          data-ocid="error_state.retry_button"
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="mt-1"
        >
          Try Again
        </Button>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        {content}
      </div>
    );
  }

  return content;
}
