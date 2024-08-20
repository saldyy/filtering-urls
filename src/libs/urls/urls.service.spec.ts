import { Test, TestingModule } from "@nestjs/testing";
import { UrlsService } from "./urls.service";
import { createMock } from "@golevelup/ts-jest";
import { HttpClient } from "../http-client/http-client.service";
import { SortValue } from "./constant";

describe("UrlsService", () => {
  let urlService: UrlsService;
  let httpClient: HttpClient;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [UrlsService],
    })
      .useMocker(createMock)
      .compile();

    urlService = app.get<UrlsService>(UrlsService);
    httpClient = app.get<HttpClient>(HttpClient);
  });

  it("should be defined", () => {
    expect(urlService).toBeDefined();
  });

  describe("filterValidUrl", () => {
    it("should return list of reachable url object", async () => {
      const mockInput = [
        {
          url: "https://does-not-work.perfume.new",
          priority: 1,
        },
        {
          url: "https://gitlab.com",
          priority: 4,
        },
      ];
      jest
        .spyOn(httpClient, "isValidUrl")
        .mockResolvedValueOnce(false)
        .mockResolvedValueOnce(true);
      await expect(urlService.filterValidUrl(mockInput)).resolves.toEqual([
        {
          url: "https://gitlab.com",
          priority: 4,
        },
      ]);
      expect(httpClient.isValidUrl).toHaveBeenCalledTimes(2);
    });
  });

  describe("filterUrls", () => {
    it("should return list of reachable url object with correct order", async () => {
      const mockInputData = [
        {
          url: "https://does-not-work.perfume.new",
          priority: 1,
        },
        {
          url: "https://gitlab.com",
          priority: 4,
        },
        {
          url: "https://github.com",
          priority: 3,
        },
        {
          url: "https://bitbucket.com",
          priority: 2,
        },
      ];
      const mockInput = {
        sort: {
          priority: SortValue.asc,
        },
        data: mockInputData,
      };
      jest
        .spyOn(httpClient, "isValidUrl")
        .mockResolvedValueOnce(false)
        .mockResolvedValueOnce(true)
        .mockResolvedValueOnce(true)
        .mockResolvedValueOnce(true);
      await expect(urlService.filterUrls(mockInput)).resolves.toEqual([
        {
          url: "https://bitbucket.com",
          priority: 2,
        },
        {
          url: "https://github.com",
          priority: 3,
        },
        {
          url: "https://gitlab.com",
          priority: 4,
        },
      ]);
      expect(httpClient.isValidUrl).toHaveBeenCalledTimes(4);
    });
  });
});
