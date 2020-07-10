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
            // xEntries.push(["createdAt", currentDateString]);
            // xEntries.push(["updatedAt", currentDateString]);
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

const createModelIfNeeded = (pathNameObj, keyNames: string[], tableDataObj: {}) => {
    const createModel = () => {
        console.log("generating model for " + pathNameObj.filename + " from keyNames");
        console.log("keyNames", keyNames);
        // console.log("tableData first row", tableDataObj[0]);
        // console.log("tableData first row, first two items:");
        // console.log("Id:", tableDataObj[0].Id);
        // console.log("Typeof Id:", typeof tableDataObj[0].Id);
        // console.log("First_Name:", tableDataObj[0].First_Name);
        // console.log("Typeof First_Name:", typeof tableDataObj[0].First_Name);
        // console.log(tableDataObj[0].entries);

        // the general idea is to iterate over the keynames and create the entries for the model object. The type will be determined by iterating down the rows for that column until a datum is encountered, at which time type is inferred
        // if it is never encountered, it should default to something, probably string or boolean
        const modelObj = Object.fromEntries(keyNames.map((colName: string) => {
            const dataType: "string" | "number" = undefined;
            return [colName.replace(" ", "_"), dataType];
        }));

        console.log(modelObj);

    };
    const modelFiles = fs.readdirSync("models/").filter((filename: string) => !(filename === "index.js")).filter((filen: string) => {
        const dirFilename = filen.slice(0, filen.lastIndexOf("."));
        const dataFileName = pathNameObj.filename.slice(0, filen.lastIndexOf("."));
        return dirFilename === dataFileName; // to do: account for pluralization and capitalization
    });
    if (modelFiles.length === 1) { // there should be just 1 if it exists, so if it doesnt exist, create it
        createModel();
    }
}

const allFilePaths = getFilePaths("./data/");
allFilePaths.forEach((pathNameObj) => {
    try {
        const filestring = getFileAsString(pathNameObj.fullpath);
        const keyNameStr = filestring.split("\r\n", 1).join("");
        const keyNames: string[] = keyNameStr.split(",").filter((x: string) => x.length > 0);
        if (keyNames) {
            const rowData = filestring.split("\r\n").slice(1);
            if (rowData) {
                const entries = generateEntries(keyNames, rowData).filter(x => x.length > 0);
                const objArr = entries.map(x => Object.fromEntries(x));
                createModelIfNeeded(pathNameObj, keyNames, objArr); // if model doesn't exist, generate it from keynames
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
