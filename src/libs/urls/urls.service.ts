import { Injectable } from "@nestjs/common";
import { FilterUrlPayload } from "./dto/filter-url-query.dto";
import { HttpClient } from "../http-client/http-client.service";
import { SortValue } from "./constant";

@Injectable()
export class UrlsService {
  constructor(private readonly httpClient: HttpClient) {}

  async filterValidUrl(
    data: FilterUrlPayload["data"],
  ): Promise<FilterUrlPayload["data"]> {
    const result: FilterUrlPayload["data"] = [];
    // Chunking input urls for parallel requests to avoid overflow memory
    // Chunk size can be increase to higher number for better performance
    const chunk = 10;
    for (let i = 0; i < data.length; i += chunk) {
      const urls = data.slice(i, i + chunk);
      const promises = urls.map((item) => {
        return this.httpClient.isValidUrl(item.url);
      });
      const responses = await Promise.all(promises);
      responses.forEach((isValid, index) => {
        if (isValid) {
          result.push(urls[index]);
        }
      });
    }
    return result;
  }

  async filterUrls(
    payload: FilterUrlPayload,
  ): Promise<FilterUrlPayload["data"]> {
    const { filter, sort } = payload;
    const filteredData = payload.data
      .filter((item) => {
        return filter?.priority ? item.priority === filter.priority : true;
      })
      .sort((a, b) => {
        return sort.priority === SortValue.asc
          ? a.priority - b.priority
          : b.priority - a.priority;
      });
    const result = await this.filterValidUrl(filteredData);

    return result;
  }
}
