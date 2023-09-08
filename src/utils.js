const readEnvironmentVariable = (name, _default) => {
    const variable = process.env[name];
    if (variable == null || variable.length === 0) {
        if (!_default) throw new Error(`Variable ${name} was not specified, but is required to launch`);
        return String(_default);
    }
    return variable;
};
module.exports = readEnvironmentVariable;
