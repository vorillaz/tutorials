import EventEmitter from 'events';

export default class Log {
  private static instance: Log;
  private constructor() {}
  private messages: string[] = [];

  private emitter = new EventEmitter();

  public getMessages(): string[] {
    return this.messages;
  }

  public subscribe(callback: (message: string) => void): void {
    this.emitter.on('message', callback);
  }

  public unsubscribe(callback: (message: string) => void): void {
    this.emitter.off('message', callback);
  }

  public addMessage(message: string): void {
    this.messages.push(message);
    this.emitter.emit('message', message);
  }

  static getInstance(): Log {
    if (!Log.instance) {
      Log.instance = new Log();
    }
    return Log.instance;
  }
}
