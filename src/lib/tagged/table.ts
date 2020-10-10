type CellData<T, K extends keyof T> = {
    value: T[K];
    row: T;
    col: K;
    rowIndex: number;
    colIndex: number;
};

type ColumnInfo<T, K extends keyof T> = {
    key: K;
    headOf: (col: K, colIndex: number) => string;
    cellOf: (data: CellData<T, K>) => string;
};

type TableInfo<T, K extends keyof T> = {
    rows: T[];
    columns: ColumnInfo<T, K>[];
};

export function tableByColumns<T, K extends keyof T>(
    info: TableInfo<T, K>
): string {
    let result = '';
    //  render header based on T own properties
    if (info.rows.length) {
        info.columns.forEach((column, keyIndex) => {
            result += '|= ' + column.headOf(column.key, keyIndex);
        });
        result += '\n';

        info.rows.forEach((row, rowIndex) => {
            info.columns.forEach((column, colIndex) => {
                const cell: CellData<T, K> = {
                    value: row[column.key],
                    row,
                    col: column.key,
                    rowIndex,
                    colIndex,
                };
                result += '| ' + column.cellOf(cell);
            });
            result += '\n';
        });
    }
    return result;
}

export function tableByMap<
    T,
    U extends { [key: string]: string },
    K extends keyof U
>(items: T[], rowOf: (value: T, index: number, array: T[]) => U): string {
    if (items.length > 0) {
        const rows = items.map((it, index, array) => rowOf(it, index, array));
        const keys: K[] = Object.keys(rows[0]) as K[];
        const headOf = (key: K) => key.toString();
        const cellOf = (data: CellData<U, K>) => data.value;

        const columns: ColumnInfo<U, K>[] = keys.map((key) => {
            return { key, headOf, cellOf };
        });
        return tableByColumns({ rows, columns });
    }
    return '';
}

export function tableOf<T, K extends keyof T>(rows: T[], cols?: K[]): string {
    if (rows.length > 0) {
        const keys: K[] = cols ? cols : (Object.keys(rows[0]) as K[]);
        const headOf = (key: K) => key.toString();
        const cellOf = (data: CellData<T, K>) => '' + data.value;

        const columns: ColumnInfo<T, K>[] = keys.map((key) => {
            return { key, headOf, cellOf };
        });
        return tableByColumns({ rows, columns });
    }
    return '';
}
