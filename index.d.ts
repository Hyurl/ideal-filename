declare const idealFilename: idealFilename;
declare interface idealFilename {
    (filename: string, extname?: string): Promise<string>;
    (filename: string, callback: (err: Error, filename: string) => void): void;
    (filename: string, extname: string, callback: (err: Error, filename: string) => void): void;
    idealFilename: idealFilename;
    default: idealFilename;
}

export = idealFilename;