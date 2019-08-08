/** Response type from GraphQL */
interface IResponse {
  errors?: [];
  data?: any;
}

/** FetchService comunicates with the GraphQL server */
export default class FetchService {
  private static SERVER_URL: string = process.env.REACT_APP_API_BASE_URL
    ? process.env.REACT_APP_API_BASE_URL
    : "";

  /** fetchServer sends a POST request to the server with the given request body */
  static async fetchServer(reqBody: Object): Promise<IResponse> {
    try {
      const res = await fetch(FetchService.SERVER_URL, {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (res.status !== 200 && res.status !== 201) {
        throw new Error(`failed, got response status ${res.status.toString()}`);
      }

      const response: IResponse = await res.json();

      return response;
    } catch (error) {
      throw error;
    }
  }
}
