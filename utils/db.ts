import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'drive_trans',
    namedPlaceholders: true,
    decimalNumbers: true,
});
