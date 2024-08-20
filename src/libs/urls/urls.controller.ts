import { Body, Controller, Post } from "@nestjs/common";
import { UrlsService } from "./urls.service";
import {
  FilterUrlPayload,
  FilterUrlPayloadSchema,
} from "./dto/filter-url-query.dto";
import { ZodValidationPipe } from "../pipes/zod.pipe";

@Controller("urls")
export class UrlsController {
  constructor(private readonly filterUrlsService: UrlsService) {}

  @Post("/filter")
  async filterUrls(
    @Body(new ZodValidationPipe(FilterUrlPayloadSchema))
    body: FilterUrlPayload,
  ) {
    return this.filterUrlsService.filterUrls(body);
  }
}
