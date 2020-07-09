import * as fs from "fs";

// interface IComponentExampleData {
//     title: string;
// }

// interface IComponentJSONObject {
//     [key: string]: IComponentExampleData;
// }

const getFileFileAsString = (): string => {
    const content: Buffer = fs.readFileSync("data/flatfile.csv"); // this should be passed in as an argument
    // return JSON.parse(content.toString());
    return content.toString();
};

const generateEntries = (keystrArr: string[], rowData: string[]) {
    return Object.fromEntries();
};

const componentExamplesObj = {};

try {
    const filestring: string = getFileFileAsString();
    const keyNameStr: string = filestring.split("\r\n", 1).join("");
    const keyNames: string[] = keyNameStr.split(",").filter(x => x.length > 0);
    console.log(keyNames);
    if (keyNames) {
        const rowData: string[] = filestring.split("\r\n").slice(1);
        console.log("rowData");
        console.log(rowData);
        if (rowData) {
            generateEntries(keyNames, rowData);
        }
    }
} catch (err) {
    console.error(err);
}

try {
    fs.mkdirSync("./seedGen/", { recursive: true });

    console.log("Writing out /seedGen/seedObj.json");

    fs.writeFile("./seedGen/seedObj.json", JSON.stringify(componentExamplesObj), (err: Error) => {
        if (err) { throw err; }
    });
} catch (err) {
    console.error(err);
}