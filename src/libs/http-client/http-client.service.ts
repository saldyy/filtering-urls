import axios from "axios";
import { Injectable } from "@nestjs/common";

@Injectable()
export class HttpClient {
  async isValidUrl(url: string): Promise<boolean> {
    try {
      await axios.get(url, {
        maxRedirects: 0,
        timeout: 5000,
        validateStatus(status) {
          return status >= 200 && status < 300;
        },
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}
