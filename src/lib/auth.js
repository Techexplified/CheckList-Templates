
/**
 * Trello Power-Up authentication configuration
 */

export const APP_KEY =
  import.meta.env.VITE_TRELLO_APP_KEY;

export const APP_NAME =
  "Reusable Checklist Library";

/**
 * Get Trello REST API client.
 */
export function getRestApi(t) {
  if (!t || typeof t.getRestApi !== "function") {
    throw new Error(
      "Trello REST API client is unavailable."
    );
  }

  return t.getRestApi();
}

/**
 * Get the current Trello authorization token.
 */
export async function getToken(t) {
  const api = await getRestApi(t);
  return await api.getToken();
}

/**
 * Check whether the user is authorized.
 */
export async function isAuthorized(t) {
  const api = await getRestApi(t);
  return await api.isAuthorized();
}

/**
 * Start Trello authorization.
 */
export async function authorize(t) {
  if (!APP_KEY) {
    throw new Error(
      "VITE_TRELLO_APP_KEY is not configured. " +
      "Check your .env file and Vercel environment variables."
    );
  }

  const api = await getRestApi(t);

  return api.authorize({
    expiration: "never",
    scope: "read,write"
  });
}

/**
 * Clear the saved authorization token.
 */
export async function clearToken(t) {
  try {
    const api = await getRestApi(t);
    await api.clearToken();
  } catch (error) {
    console.error(
      "[Checklist Library] Failed to clear authorization token:",
      error
    );

    throw error;
  }
}
