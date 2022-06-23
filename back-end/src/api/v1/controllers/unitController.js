const unitService = require('../services/unitService');
const error = require('../../../utils/errorFormatter');
const unitUpdateValidator = require('../../../validators/unitUpdateValidator');
const unitCreateValidator = require('../../../validators/unitCreateValidator');

const postCreateUnit = async (req, res) => {
    const data = req.body;
    const validation = unitCreateValidator(data);

    if (validation.error) {
        return res.status(400).json(error(validation.error));
    }

    try {
        const createdUnit = await unitService.createUnit(data);

        return res.status(200).json(createdUnit);
    } catch(err) {
        return res.status(404).json(error(err));
    }
};

const getAllUnits = async (_, res) => {
    try {
        const units = await unitService.getAllUnits();

        return res.status(200).json(units);
    } catch(err) {
        return res.status(404).json(error(err));
    }
};

const getSpecificUnit = async (req, res) => {
    const unitId = req.params.id;

    try {
        const unit = await unitService.getUnit(unitId);

        return res.status(200).json(unit);
    } catch(err) {
        return res.status(404).json(error(err));
    }
};

const patchSpecificUnit = async (req, res) => {
    const unitId = req.params.id;
    const data = req.body;
    const validation = unitUpdateValidator(data);

    if (validation.error) {
        return res.status(400).json(error(validation.error));
    }

    try {
        const unit = await unitService.updateUnit(unitId, data);

        return res.status(200).json(unit);
    } catch(err) {
        return res.status(404).json(error(err));
    }
};

const deleteSpecificUnit = async (req, res) => {
    const unitId = req.params.id;

    try {
        const unit = await unitService.removeUnit(unitId);

        return res.status(200).json(unit);
    } catch(err) {
        return res.status(404).json(error(err));
    }
};

module.exports = {
    postCreateUnit, getAllUnits, getSpecificUnit, patchSpecificUnit, deleteSpecificUnit
};