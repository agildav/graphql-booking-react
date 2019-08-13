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

  /** fetchServer sends a POST request to the server with the given request body and token (if needed) */
  static async fetchServer(
    reqBody: Object,
    token?: string
  ): Promise<IResponse> {
    let headers = {
      "Content-Type": "application/json",
      Authorization: ""
    };

    try {
      if (token) {
        if (token.length < 1) {
          throw new Error("token received is invalid");
        } else {
          headers.Authorization = "Bearer " + token;
        }
      } else {
        delete headers.Authorization;
      }

      const res = await fetch(FetchService.SERVER_URL, {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers
      });

      const response: IResponse = await res.json();

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
