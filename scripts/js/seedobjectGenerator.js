"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
// interface IComponentExampleData {
//     title: string;
// }
// interface IComponentJSONObject {
//     [key: string]: IComponentExampleData;
// }
const getFileFileAsString = () => {
    const content = fs.readFileSync("data/flatfile.csv"); // this should be passed in as an argument
    // return JSON.parse(content.toString());
    return content.toString();
};
const componentExamplesObj = {};
try {
    const filestring = getFileFileAsString();
    const keyNameStr = filestring.split("\r\n", 1).join("");
    const keyNames = keyNameStr.split(",").filter(x => x.length > 0);
    console.log(keyNames);
    if (keyNames) {
        const rowData = filestring.split("\r\n").slice(1);
        console.log("rowData");
        console.log(rowData);
    }
}
catch (err) {
    console.error(err);
}
try {
    fs.mkdirSync("./seedGen/", { recursive: true });
    console.log("Writing out /seedGen/seedObj.json");
    fs.writeFile("./seedGen/seedObj.json", JSON.stringify(componentExamplesObj), (err) => {
        if (err) {
            throw err;
        }
    });
}
catch (err) {
    console.error(err);
}
