
// Options
export type labelOptions = 'above' | 'none' | 'placeholder';
export type typeOptions = 'create' | 'search' | 'update';
export type variantOptions = 'filled' | 'outlined' | 'standard';

// Callbacks
export type onEnterCallback = () => void;
export type onSubmitCallback = (values: Record<string, any>) => boolean;
