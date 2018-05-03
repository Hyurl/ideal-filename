const idealFilename = require("../");
const assert = require("assert");
const path = require("path");

idealFilename(__dirname + "/test.txt").then(filename => {
    assert.equal(filename, __dirname + path.sep + "test (2).txt");
}).then(() => {
    return idealFilename("test.txt").then(filename => {
        assert.equal(filename, "test.txt");
    });
}).then(() => {
    return idealFilename(__dirname + "/test.txt.bak", ".txt.bak").then(filename => {
        assert.equal(filename, __dirname + path.sep + "test (1).txt.bak");
    });
}).then(() => {
    return idealFilename(__dirname + "/test1.txt").then(filename => {
        assert.equal(filename, __dirname + path.sep + "test1.txt");
    });
}).then(() => {
    return idealFilename("./test/test.txt").then(filename => {
        assert.equal(filename, `.${path.sep}test${path.sep}test (2).txt`);
    });
}).then(() => {
    console.log("All tests passed!");
});