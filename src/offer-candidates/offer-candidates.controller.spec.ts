import { Test, TestingModule } from "@nestjs/testing";
import { OfferCandidatesController } from "./offer-candidates.controller";
import { OfferCandidatesService } from "./offer-candidates.service";

describe("OfferCandidatesController", () => {
  let controller: OfferCandidatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfferCandidatesController],
      providers: [OfferCandidatesService],
    }).compile();

    controller = module.get<OfferCandidatesController>(
      OfferCandidatesController,
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
