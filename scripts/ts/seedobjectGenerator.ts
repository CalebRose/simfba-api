import * as fs from "fs";
import * as path from "path";

// To do: change the execution flow of this script so that if the model needs to be generated, then the seed isn't generated on the same run.

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
            return xEntries;
        }
        else
            return [];
    });
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
        const inferColumnType = (i: number) => {
            console.log("infer column type of column:");
            console.log(keyNames[i].replace(" ", "_"));
            for (let x in tableDataObj) {
                // if parseInt is a number(i.e., a value instead of NaN) and typeof is a number, use DataTypes.INTEGER. Otherwise default to DataTypes.STRING
                const val = tableDataObj[x][keyNames[i]];
                return parseInt(val) && typeof val === "number" ? "INTEGER" : "VARCHAR(255)" ;
            }

        };

        interface IColumn {
            colname: String;
            coltype: String;
        };

        const columnsObj: IColumn[] = keyNames.map((x: string, i: number) => {
            const coltype = inferColumnType(i);
            return {
                colname: x.replace(" ", "_"),
                coltype
            };
        });

        const modelObj = Object.fromEntries(columnsObj.map((x: IColumn) => [x.colname, x.coltype]));

        modelObj["createdAt"] = "VARCHAR(255)";
        modelObj["updatedAt"] = "VARCHAR(255)";

        const removedExtFilename = pathNameObj.filename.slice(0,1).toUpperCase() + pathNameObj.filename.slice(1, pathNameObj.filename.lastIndexOf("."));
        const finalModelName = removedExtFilename.lastIndexOf("s") === removedExtFilename.length - 1 ? removedExtFilename.slice(0, removedExtFilename.length - 1) : removedExtFilename ;

        const modelFileTemplate = `
        module.exports = function(sequelize, DataTypes) {
        var ${finalModelName} = sequelize.define("${finalModelName}", ${JSON.stringify(modelObj)}); return ${finalModelName};}
        `;

        try {
            const filename = pathNameObj.filename.slice(0, pathNameObj.filename.lastIndexOf(".")) + ".js";
            console.log("Writing out model file:", filename);

            fs.writeFile("./models/" + filename, modelFileTemplate, (err) => {
                if (err) {
                    throw err;
                }
            });
        }
        catch (err) {
            console.error(err);
        }

    };
    const modelFiles = fs.readdirSync("models/").filter((filename: string) => !(filename === "index.js")).filter((filen: string) => {
        const dirFilename = filen.slice(0, filen.lastIndexOf("."));
        const dataFileName = pathNameObj.filename.slice(0, filen.lastIndexOf("."));
        return dirFilename === dataFileName; // to do: account for pluralization and capitalization
    });
    if (modelFiles.length === 0) { // there should be just 1 if it exists, so if it doesnt exist, create it
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
                createModelIfNeeded(pathNameObj, keyNames, objArr); // if model doesn't exist, generate it from keynames. If this branch executes, don't create seedfile, just create model. Otherwise create model.
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
