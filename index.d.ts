declare namespace SecLiteral {

    // @see https://github.com/estree/estree/blob/master/es5.md#literal
    interface Literal {
        type: string;
        value: string;
        raw?: string;
    }

    interface LiteralDefaultAnalysis {
        hasHexadecimalSequence: null | boolean;
        hasUnicodeSequence: null | boolean;
        isBase64: boolean;
    }
}
