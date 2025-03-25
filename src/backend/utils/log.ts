export enum LoggerOrigin {
    SERVER = 'Server',
    DB = 'Database',
}

export class Logger {
    #origin: LoggerOrigin;
    #location?: string;

    constructor(origin: LoggerOrigin, location?: string) {
        this.#origin = origin;
        this.#location = location;
    }

    private formatMessage(scope: string, message: unknown[], location?: string): string {
        location = location ?? this.#location;
        return `[${scope}] [${this.#origin}${location ? ` : ${location}` : ""}]  >> ${message}`;
    }

    location(location: string) {
        return {
            log: (...message: unknown[]) => {return console.log(this.formatMessage("Log", message, location));},
            info: (...message: unknown[]) => {return console.info(this.formatMessage("Info", message, location));},
            warn: (...message: unknown[]) => {return console.warn(this.formatMessage("Warning", message, location));},
            error: (...message: unknown[]) => {return console.error(this.formatMessage("Error", message, location));},
        }
    }

    log(...message: unknown[]) {
        return console.log(this.formatMessage("Log", message));
    }

    info(...message: unknown[]): void {
        return console.info(this.formatMessage("Info", message));
    }

    warn(...message: unknown[]): void {
        return console.warn(this.formatMessage("Warning", message));
    }

    error(...message: unknown[]): void {
        return console.error(this.formatMessage("Error", message));
    }
}