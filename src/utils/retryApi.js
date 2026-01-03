export async function retryApiCall(apiFn, retries = 3, delay = 500) {
  let attempt = 0;
  while (attempt < retries) {
    try {
      return await apiFn();
    } catch (err) {
      attempt++;
      if (attempt >= retries) throw err;
      // wait before retrying
      await new Promise((res) => setTimeout(res, delay));
    }
  }
}
