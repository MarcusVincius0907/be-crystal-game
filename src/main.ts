import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cors from "cors";
import { IoAdapter } from "@nestjs/platform-socket.io";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.useWebSocketAdapter(new IoAdapter(app));

  app.enableCors({
    origin: "*", // Allow the frontend to connect
    methods: ["GET", "POST"], // You can adjust methods if needed
    credetials: true,
  });

  await app.listen(3000);
}
bootstrap();
