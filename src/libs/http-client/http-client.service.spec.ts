import { Test, TestingModule } from "@nestjs/testing";
import { HttpClient } from "./http-client.service";
import { createMock } from "@golevelup/ts-jest";
import axios from "axios";

describe("UrlsService", () => {
  let httpClient: HttpClient;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [HttpClient],
    })
      .useMocker(createMock)
      .compile();

    httpClient = app.get<HttpClient>(HttpClient);
  });

  it("should be defined", () => {
    expect(HttpClient).toBeDefined();
  });

  describe("checkValidUrl", () => {
    it("should return true if url is valid", async () => {
      axios.get = jest.fn().mockResolvedValueOnce({ status: 200 });
      await expect(httpClient.isValidUrl("https://valid.com")).resolves.toEqual(
        true,
      );
    });

    it("should return false if url is invalid", async () => {
      axios.get = jest.fn().mockResolvedValueOnce({ status: 300 });
      await expect(
        httpClient.isValidUrl("https://invalid.com"),
      ).resolves.toEqual(false);
    });
  });
});
