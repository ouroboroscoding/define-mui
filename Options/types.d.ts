export type CallbackType = (data: string[][]) => void;
export type FetchType = () => Promise<Record<string, any>[]>;
export type FieldsType = (data: Record<string, any>) => string[];
