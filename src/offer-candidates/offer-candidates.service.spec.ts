import { Test, TestingModule } from "@nestjs/testing";
import { OfferCandidatesService } from "./offer-candidates.service";

describe("OfferCandidatesService", () => {
  let service: OfferCandidatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfferCandidatesService],
    }).compile();

    service = module.get<OfferCandidatesService>(OfferCandidatesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
