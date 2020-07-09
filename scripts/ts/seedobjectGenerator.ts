import * as fs from "fs";
import * as path from "path";

const currentDate = new Date(Date.now());
const currentMonth = (currentDate.getMonth() + 1).toString();
const currentMonthdDate = currentDate.getUTCDate().toString();
const currentDateString = "" + currentDate.getFullYear() + (currentMonth.length === 1 ? "0" + currentMonth : currentMonth) + (currentMonthdDate.length === 1 ? "0" + currentMonthdDate : currentMonthdDate) + currentDate.getUTCHours() + currentDate.getMinutes() + currentDate.getUTCSeconds();
const getFileAsString = (filePathStr) => {
    const content = fs.readFileSync(filePathStr);
    return content.toString();
};

const generateEntries = (keystrArr, rowData) => {
    const splitRows = rowData.map((x) => x.split(",").filter(x => x.length > 0));
    const entriesArray = splitRows.map((x) => {
        if (x.length === keystrArr.length) {
            const xEntries = x.map((y, i) => [keystrArr[i].replace(" ", "_"), (parseInt(y) ? parseInt(y) : y)]);
            xEntries.push(["createdAt", currentDateString]);
            xEntries.push(["updatedAt", currentDateString]);
            return xEntries;
        }
        else
            return [];
    });
    // console.log(entriesArray);
    return entriesArray;
};
const getFilePaths = (dir) => {
    const filePaths = [];
    fs.readdirSync(dir).forEach((f) => {
        const newFilePath = path.join(dir, f);
        if (fs.statSync(newFilePath).isFile()) {
            filePaths.push({ fullpath: newFilePath, filename: f });
        }
    });
    return filePaths;
};
const allFilePaths = getFilePaths("./data/");
allFilePaths.forEach((pathNameObj) => {
    try {
        const filestring = getFileAsString(pathNameObj.fullpath);
        const keyNameStr = filestring.split("\r\n", 1).join("");
        const keyNames = keyNameStr.split(",").filter(x => x.length > 0);
        if (keyNames) {
            const rowData = filestring.split("\r\n").slice(1);
            if (rowData) {
                const entries = generateEntries(keyNames, rowData).filter(x => x.length > 0);
                const objArr = entries.map(x => Object.fromEntries(x));
                console.log(objArr);
                try {
                    fs.mkdirSync("./seeders/", { recursive: true });
                    const filename = currentDateString + "-" + pathNameObj.filename + ".js";
                    console.log("Writing out seed file:", filename);

                    const fileTemplate = `
                        'use strict';

                        module.exports = {
                            up: (queryInterface, Sequelize) => {
                                return queryInterface.bulkInsert("${pathNameObj.filename.slice(0, pathNameObj.filename.lastIndexOf("."))}", ${JSON.stringify(objArr)}, {});
                            }
                        };

                    `;

                    fs.writeFile("./seeders/" + filename, fileTemplate, (err) => {
                        if (err) {
                            throw err;
                        }
                    });
                }
                catch (err) {
                    console.error(err);
                }
            }
        }
    }
    catch (err) {
        console.error(err);
    }
});
