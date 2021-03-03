export class Objects {
    static getMethodName() {
        var err = new Error();
        return /at \w+\.(\w+)/.exec(err.stack.split('\n')[2])[1] // we want the 2nd method in the call stack
    }

    static getClassName() {
        var err = new Error();
        return /at (\w+)/.exec(err.stack.split('\n')[2])[1];
    }

    static getServiceName(service : string)
    {
        return service.toLowerCase().split("service")[0];
    }
}