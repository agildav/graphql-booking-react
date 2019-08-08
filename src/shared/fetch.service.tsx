/** FetchService comunicates with the GraphQL server */
export default class FetchService {
  private static SERVER_URL: string = process.env.REACT_APP_API_BASE_URL
    ? process.env.REACT_APP_API_BASE_URL
    : "";

  /** fetchServer sends a POST request to the server at the given endpoint (if any) with the given request body */
  static async fetchServer(reqBody: Object, endpoint?: string): Promise<any> {
    let url: string;
    if (endpoint) {
      url = FetchService.SERVER_URL + endpoint;
    } else {
      url = FetchService.SERVER_URL;
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (res.status !== 200 && res.status !== 201) {
        throw new Error(`failed, got response status ${res.status.toString()}`);
      }

      const data: any = await res.json();

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
