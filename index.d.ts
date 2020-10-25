declare namespace SecLiteral {
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
