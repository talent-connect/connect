import { Injectable } from "@nestjs/common";
import { SfApiRepository } from "./sf-api.repository";

@Injectable()
class SfApiContactRecordService {
  constructor(private readonly repository: SfApiRepository) {}
}