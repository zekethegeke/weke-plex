import dedent from 'ts-dedent';
import { WekePageRef, WekeUrlRef } from 'lib/ref';

// type WekeFormat like WekeGroup?
export type WekeSpanParam = string | number | WekePageRef | WekeUrlRef;
export type WekeBlockParam = WekeSpanParam | string[];

function assertExhaustiveness(x: never): never {
    throw new Error('exhaustive check fails for: ' + x);
}

export function renderParam(param: WekeBlockParam): string {
    if (typeof param === 'string') {
        return param;
    } else if (typeof param === 'number') {
        return param.toString();
    } else if (Array.isArray(param)) {
        return param.join('\n');
    } else
        switch (param.weke) {
            case 'PAGEREF':
                return `[[${param.path}]]`;
            case 'URLREF':
                return `[[${param.url}]]`;
            default:
                assertExhaustiveness(param);
        }
}

// raw assumes the literals should be left alone
export const span = (
    literals: TemplateStringsArray | string,
    ...params: WekeSpanParam[]
): string => {
    let result = '';

    params.forEach((param, index) => {
        result += literals[index];
        result += renderParam(param);
    });

    // add the last literal
    result += literals[literals.length - 1];
    return result;
};

// block will dedent the multi-line literals
export const block = (
    literals: TemplateStringsArray | string,
    ...params: WekeBlockParam[]
): string => {
    const rendered = params.map((param) => renderParam(param));
    return dedent(literals, ...rendered);
};

export const h3 = (
    literals: TemplateStringsArray | string,
    ...params: WekeSpanParam[]
): string => {
    return '=== ' + span(literals, ...params) + ' ===';
};

export const uml = (
    literals: TemplateStringsArray | string,
    ...params: WekeBlockParam[]
): string => {
    return (
        '{{plantUML}}\n@startuml\n' +
        block(literals, ...params) +
        '\n@enduml\n{{/plantUML}}'
    );
};

// block will dedent the multi-line literals
export const group = (
    literals: TemplateStringsArray | string,
    ...params: WekeBlockParam[]
): string => {
    const rendered = params.map((param) => renderParam(param));
    return '(((' + dedent(literals, ...rendered) + '\n)))';
};
