import { message } from 'antd';

type Func = (...args: any) => any;

class Service {
  initialValue: any;
  run: Func;
  handleError: Func | null = function(err: any) {
    if (typeof err === 'string') {
      message.error(err);
    } else {
      throw err;
    }
  };
  onStart: Func | null = null;
  onEnd: Func | null = null;

  constructor(func: any) {
    this.run = func;
  }

  public setErrorHandler(func: Func) {
    this.handleError = func;
    return this;
  }

  public setStart(func: Func | null) {
    this.onStart = func;
    return this;
  }

  public setEnd(func: Func | null) {
    this.onEnd = func;
    return this;
  }

  public setInitialValues(values: any) {
    this.initialValue = values;
    return this;
  }

  private async end() {
    if (typeof this.onEnd === 'function') {
      await this.onEnd();
    }
  }

  private async start() {
    if (typeof this.onStart === 'function') {
      await this.onStart();
    }
  }

  private async handel(err: any) {
    if (typeof this.handleError === 'function') {
      await this.handleError(err);
    }
  }

  public make() {
    return async (...args: any) => {
      try {
        await this.start();
        const result = await this.run(...args);
        await this.end();
        return result;
      } catch (err) {
        await this.handel(err);
        await this.end();
        return this.initialValue;
      }
    };
  }
}

/**
 * 創建服務
 * @param func 方法體
 */
export const createService = (func: any) => {
  return new Service(func);
};
