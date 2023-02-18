export { default as OptionsBase } from './Base';
export { default as OptionsCustom } from './Custom';
export { default as OptionsFetch } from './Fetch';
export { default as OptionsHash } from './Hash';
export type dynamicOptionStruct = {
    node: string;
    trigger: string;
    options: Record<string, any>;
};
