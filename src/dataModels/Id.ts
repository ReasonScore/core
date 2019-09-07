/**
 * How a child claim affects a parent claim
 */
export interface Id extends String {
    _IdBrand: string; // To prevent type errors
}

export function ID(n: string): Id{
    return n as any;
}