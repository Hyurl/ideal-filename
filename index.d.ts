declare const idealFilename: idealFilename;
declare interface idealFilename {
    (filename: string, extname: string): Promise<string>;
    idealFilename: idealFilename;
    default: idealFilename;
}

export = idealFilename;