export async function fetchHTML(url: RequestInfo): Promise<string | null> {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.text();
      } else {
        console.error('Failed to fetch HTML:', response.status, response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error fetching HTML:', error);
      return null;
    }
}
