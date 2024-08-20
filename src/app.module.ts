import { Module } from "@nestjs/common";
import { UrlsModule } from "./libs/urls/urls.module";

@Module({
  imports: [UrlsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
