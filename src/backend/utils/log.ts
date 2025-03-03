export enum LoggerOrigin {
    SERVER = 'Server',
}

export class Logger {
    #origin: LoggerOrigin;
    #location?: string;

    constructor(origin: LoggerOrigin, location?: string) {
        this.#origin = origin;
        this.#location = location;
    }

    private formatMessage(scope: string, message: string[], location?: string): string {
        location = location ?? this.#location;
        return `[${scope}] [${this.#origin}${location ? ` : ${location}` : ""}]  >> ${message}`;
    }

    location(location: string) {
        return {
            log: (...message: string[]) => {return console.log(this.formatMessage("Log", message, location));},
            info: (...message: string[]) => {return console.info(this.formatMessage("Info", message, location));},
            warn: (...message: string[]) => {return console.warn(this.formatMessage("Warning", message, location));},
            error: (...message: string[]) => {return console.error(this.formatMessage("Error", message, location));},
        }
    }

    log(...message: string[]) {
        return console.log(this.formatMessage("Log", message));
    }

    info(...message: string[]): void {
        return console.info(this.formatMessage("Info", message));
    }

    warn(...message: string[]): void {
        return console.warn(this.formatMessage("Warning", message));
    }

    error(...message: string[]): void {
        return console.error(this.formatMessage("Error", message));
    }
}