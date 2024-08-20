import { Module } from "@nestjs/common";
import { UrlsController } from "./urls.controller";
import { UrlsService } from "./urls.service";
import { HttpClientModule } from "../http-client/http-client.module";

@Module({
  imports: [HttpClientModule],
  controllers: [UrlsController],
  providers: [UrlsService],
  exports: [],
})
export class UrlsModule {}
