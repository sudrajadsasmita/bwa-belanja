export type ActionResult = {
  error?: Record<string, string[]> | string | null; // Laravel-style
  message?: string; // Opsional untuk pesan umum
};
