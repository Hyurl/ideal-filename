var fs = require("fs");
var path = require("path");
var startsWith = require("lodash/startsWith");
var endsWith = require("lodash/endsWith");

/** 
 * Gets the ideal filename according to the given one.
 * @param {string} filename The original filename.
 * @param {string} [extname] Sets a specified extension name.
 * @param {(err: Error, filename: stirng) => void} [callback]
 * @return {Promise<string> | void}
 */
function idealFilename(filename, extname, callback) {
    if (typeof extname == "function") {
        callback = extname;
        extname = "";
    }

    if (callback) {
        fs.exists(filename, function (exists) {
            if (!exists) {
                callback(null, filename.replace(/\\|\//g, path.sep));
            } else {
                extname = extname || path.extname(filename);

                var dir = path.dirname(filename),
                    basename = path.basename(filename, extname),
                    lastNum = 0;

                dir = dir == "." ? "" : dir + path.sep;

                fs.readdir(dir, function (err, files) {
                    if (err) {
                        callback(err, "");
                    } else {
                        for (var file of files) {
                            var start = basename + " (",
                                end = ")" + extname;

                            if (startsWith(file, start) && endsWith(file, end)) {
                                var num = file.slice(start.length, -end.length);

                                if (!isNaN(num)) {
                                    num = parseInt(num);

                                    if (num > lastNum)
                                        lastNum = num;
                                }
                            }
                        }

                        filename = `${dir}${basename} (${lastNum + 1})${extname}`;
                        callback(null, filename.replace(/\\|\//g, path.sep));
                    }
                });
            }
        });
    } else {
        return new Promise(function (resolve, reject) {
            idealFilename(filename, extname, function (err, filename) {
                err ? reject(err) : resolve(filename);
            });
        });
    }
}

module.exports = idealFilename;

idealFilename.idealFilename = idealFilename;
idealFilename.default = idealFilename;