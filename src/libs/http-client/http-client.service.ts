import axios from "axios";
import { Injectable } from "@nestjs/common";

@Injectable()
export class HttpClient {
  async isValidUrl(url: string): Promise<boolean> {
    try {
      const response = await axios.get(url, {
        maxRedirects: 0,
        timeout: 5000,
      });

      return response.status >= 200 && response.status < 300;
    } catch (error) {
      return false;
    }
  }
}
