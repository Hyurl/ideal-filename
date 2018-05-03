const fs = require("fs");
const path = require("path");
const startsWith = require("lodash/startsWith");
const endsWith = require("lodash/endsWith");

/** 
 * Gets the ideal filename according to the given one.
 * @param {string} filename The original filename.
 * @param {string} extname Sets a specified extension name.
 * @return {Promise<string>}
 */
function idealFilename(filename, extname = "") {
    return new Promise((resolve, reject) => {
        fs.exists(filename, exists => {
            if (!exists) {
                resolve(filename.replace(/\\|\//g, path.sep));
            } else {
                extname = extname || path.extname(filename);

                let dir = path.dirname(filename),
                    basename = path.basename(filename, extname),
                    lastNum = 0;

                dir = dir == "." ? "" : dir + path.sep;

                fs.readdir(dir, (err, files) => {
                    if (err) {
                        reject(err);
                    } else {
                        for (let file of files) {
                            let start = basename + " (",
                                end = ")" + extname;

                            if (startsWith(file, start) && endsWith(file, end)) {
                                let num = file.slice(start.length, -end.length);

                                if (!isNaN(num)) {
                                    num = parseInt(num);

                                    if (num > lastNum)
                                        lastNum = num;
                                }
                            }
                        }

                        filename = `${dir}${basename} (${lastNum + 1})${extname}`;
                        resolve(filename.replace(/\\|\//g, path.sep));
                    }
                });
            }
        });
    });
}

module.exports = idealFilename;

idealFilename.idealFilename = idealFilename;
idealFilename.default = idealFilename;