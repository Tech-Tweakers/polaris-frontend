import * as React from "react";
export interface IPrintContextProps {
    handlePrint: () => void;
}
export declare const PrintContextConsumer: React.Consumer<IPrintContextProps> | (() => null);
export interface ITriggerProps<T> {
    onClick: () => void;
    ref: (v: T) => void;
}
type Font = {
    family: string;
    source: string;
    weight?: string;
    style?: string;
};
type PropertyFunction<T> = () => T;
export interface IReactToPrintProps {
    bodyClass?: string;
    children?: React.ReactNode;
    content: () => React.ReactInstance | null;
    copyStyles?: boolean;
    documentTitle?: string;
    fonts?: Font[];
    onAfterPrint?: () => void;
    onBeforeGetContent?: () => void | Promise<any>;
    onBeforePrint?: () => void | Promise<any>;
    onPrintError?: (errorLocation: "onBeforeGetContent" | "onBeforePrint" | "print", error: Error) => void;
    pageStyle?: string | PropertyFunction<string>;
    print?: (target: HTMLIFrameElement) => Promise<any>;
    removeAfterPrint?: boolean;
    suppressErrors?: boolean;
    trigger?: <T>() => React.ReactElement<ITriggerProps<T>>;
    nonce?: string;
}
export default class ReactToPrint extends React.Component<IReactToPrintProps> {
    private numResourcesToLoad;
    private resourcesLoaded;
    private resourcesErrored;
    static defaultProps: {
        copyStyles: boolean;
        pageStyle: string;
        removeAfterPrint: boolean;
        suppressErrors: boolean;
    };
    startPrint: (target: HTMLIFrameElement) => void;
    triggerPrint: (target: HTMLIFrameElement) => void;
    handleClick: () => void;
    handlePrint: () => void;
    handleRemoveIframe: (force?: boolean) => void;
    logMessages: (messages: unknown[], level?: 'error' | 'warning' | 'debug') => void;
    render(): React.JSX.Element | null;
}
type UseReactToPrintHookReturn = () => void;
export declare const useReactToPrint: (props: IReactToPrintProps) => UseReactToPrintHookReturn;
export {};
