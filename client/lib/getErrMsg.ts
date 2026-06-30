export function getErrorMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'data' in error) {
    const apiError = error as {
      data?: {
        message?: string;
      };
    };

    if (apiError.data?.message) {
      return apiError.data.message;
    }
  }

  return 'Something went wrong.';
}