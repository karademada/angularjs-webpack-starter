// Extra variables that live on Global that will be replaced by Webpack's DefinePlugin
declare const ENV: string;
declare const HMR: boolean;
declare const PRODUCTION: boolean;
declare const DEVELOPMENT: boolean;

interface GlobalEnvironment {
    ENV: string;
    HMR: boolean;
    PRODUCTION: boolean;
    DEVELOPMENT: boolean;
}

interface WebpackModule {
    hot: {
        data?: any,
        idle: any,
        accept(dependencies?: string | string[], callback?: (updatedDependencies?: any) => void): void;
        decline(dependencies?: string | string[]): void;
        dispose(callback?: (data?: any) => void): void;
        addDisposeHandler(callback?: (data?: any) => void): void;
        removeDisposeHandler(callback?: (data?: any) => void): void;
        check(autoApply?: any, callback?: (err?: Error, outdatedModules?: any[]) => void): void;
        apply(options?: any, callback?: (err?: Error, outdatedModules?: any[]) => void): void;
        status(callback?: (status?: string) => void): void | string;
        removeStatusHandler(callback?: (status?: string) => void): void;
    };
}
interface WebpackRequire {
    context(file: string, flag?: boolean, exp?: RegExp): any;
}

interface ErrorStackTraceLimit {
    stackTraceLimit: number;
}

// Extend typings
interface NodeRequire extends WebpackRequire {}
interface ErrorConstructor extends ErrorStackTraceLimit {}
interface NodeModule extends WebpackModule {}
interface Global extends GlobalEnvironment  {}
