const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | undefined>;
}

export async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, ...fetchOptions } = options;

  let url = `${API_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) searchParams.append(key, String(value));
    });
    const qs = searchParams.toString();
    if (qs) url += `?${qs}`;
  }

  const token = typeof window !== "undefined" ? localStorage.getItem("villa-auth") : null;
  let authHeaders: Record<string, string> = {};
  if (token) {
    try {
      const parsed = JSON.parse(token);
      if (parsed.state?.token) {
        authHeaders["Authorization"] = `Bearer ${parsed.state.token}`;
      }
    } catch {
      // ignore
    }
  }

  const res = await fetch(url, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
      ...(fetchOptions.headers as Record<string, string>),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    if (res.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("villa-auth");
      window.location.href = "/login";
    }
    throw new Error(data.message || "Terjadi kesalahan");
  }

  return data;
}

export function getAuthHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("villa-auth");
  if (!token) return {};
  try {
    const parsed = JSON.parse(token);
    if (parsed.state?.token) {
      return { Authorization: `Bearer ${parsed.state.token}` };
    }
  } catch {
    // ignore
  }
  return {};
}
