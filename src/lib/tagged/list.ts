/**
 *
 * @param items collection of items to render in a list
 * @param renderT
 */
export function list1<T>(items: T[], renderT: (value: T) => string): string {
    const result: string[] = [];
    items.forEach((item) => {
        result.push(renderT(item));
    });
    return result.join('\n');
}

/**
 *
 * @param items
 * @param renderT
 * @param renderU
 */
export function list2<T, U>(
    items: T[],
    renderT: (value: T) => [string, U[]],
    renderU: (value: U) => string
): string {
    const resultT: string[] = [];
    items.forEach((itemT) => {
        const [line, itemsU] = renderT(itemT);
        resultT.push(line);
        const resultU = list1(itemsU, renderU);
        if (resultU.length) {
            resultT.push(resultU);
        }
    });
    return resultT.join('\n');
}

/**
 *
 * @param items
 * @param renderT
 * @param renderU
 * @param renderV
 */
export function list3<T, U, V>(
    items: T[],
    renderT: (value: T) => [string, U[]],
    renderU: (value: U) => [string, V[]],
    renderV: (value: V) => string
): string {
    const resultT: string[] = [];
    items.forEach((itemT) => {
        const [line, itemsU] = renderT(itemT);
        resultT.push(line);
        const resultU = list2(itemsU, renderU, renderV);
        if (resultU.length) {
            resultT.push(resultU);
        }
    });
    return resultT.join('\n');
}
