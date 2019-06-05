import { CampagneModule } from './campagne.module';

describe('CampagneModule', () => {
    let campagneModule: CampagneModule;

    beforeEach(() => {
        campagneModule = new CampagneModule();
    });

    it('should create an instance', () => {
        expect(campagneModule).toBeTruthy();
    });
});
