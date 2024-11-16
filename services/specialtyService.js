import Specialty from '../models/specialty.js';

class SpecialtyService {
    async getAllSpecialties() {
        return await Specialty.findAll();
    }

    async createSpecialty(name) {
        return await Specialty.create({ name });
    }
}

export default new SpecialtyService();
