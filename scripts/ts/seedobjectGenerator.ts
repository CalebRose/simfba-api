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

const generateEntries = (keystrArr: string[], rowData: string[]) => {
    const splitRows: string[][] = rowData.map((x: string) => x.split(",").filter(x => x.length > 0));
    const entriesArray = splitRows.map((x: string[]) => {
        if (x.length === keystrArr.length) {
            return x.map((y: string, i: number) => [keystrArr[i].replace(" ", "_"), (parseInt(y) ? parseInt(y) : y)]);
        } else return [];
    });
    
    return entriesArray;
};

const componentExamplesObj = {};

try {
    const filestring: string = getFileFileAsString();
    const keyNameStr: string = filestring.split("\r\n", 1).join("");
    const keyNames: string[] = keyNameStr.split(",").filter(x => x.length > 0);
    if (keyNames) {
        const rowData: string[] = filestring.split("\r\n").slice(1);
        if (rowData) {
            const entries = generateEntries(keyNames, rowData).filter(x => x.length > 0);
            const objArr = entries.map(x => Object.fromEntries(x));
            // console.log(objArr);
            try {
                fs.mkdirSync("./seedGen/", { recursive: true });
            
                console.log("Writing out /seedGen/seedObj.json");
            
                fs.writeFile("./seedGen/seedObj.json", JSON.stringify(objArr), (err: Error) => {
                    if (err) { throw err; }
                });
            } catch (err) {
                console.error(err);
            }
        }
    }
} catch (err) {
    console.error(err);
}
