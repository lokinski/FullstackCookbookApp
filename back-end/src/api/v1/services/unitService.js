const Unit = require('../../../models/Unit');
const sanitize = require('mongo-sanitize');

const createUnit = async (unitData) => {
    unitData = sanitize(unitData);

    const newUnit = new Unit({
        name: unitData.name,
        shortcut: unitData.shortcut
    });

    try {
        const unit = await newUnit.save();

        return unit;
    } catch(err) {
        throw err;
    }
};

const getAllUnits = async () => {
    try {
        const allUnits = await Unit.find({});

        return allUnits;
    } catch(err) {
        throw err;
    }
};

const getUnit = async (id) => {
    const unit = await Unit.findById(sanitize(id));

    if (!unit) {
        throw new Error('Could not find a unit with that ID');
    }

    return unit;
};

const updateUnit = async (id, data) => {
    const unit = await Unit.findById(sanitize(id));

    if (!unit) {
        throw new Error('Could not find a unit with that ID');
    }

    try {
        Object.assign(unit, sanitize(data));
        const updatedUnit = await unit.save();

        return updatedUnit;
    } catch(err) {
        throw err;
    }
};

const removeUnit = async (id) => {
    const unit = await Unit.findById(sanitize(id));

    if (!unit) {
        throw new Error('Could not find a unit with that ID');
    }

    try {
        await unit.remove();

        return unit;
    } catch(err) {
        throw err;
    }
};

module.exports = {
    createUnit, getAllUnits, getUnit, updateUnit, removeUnit
};