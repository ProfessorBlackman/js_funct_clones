class PromiseClone {
    constructor(exec_func) {
        this.promiseChain = [];
        this.handleError = () => {};

        this.onResolve = this.onResolve.bind(this);
        this.onReject = this.onReject.bind(this);

        exec_func(this.onResolve, this.onReject);
    }

    then(handleSuccess) {
        this.promiseChain.push(handleSuccess);
        return this;
    }

    catch(handleError){
        this.handleError = handleError;
        return this;
    }

    onResolve(value) {
        let storedValue = value;

        try{
            this.promiseChain.forEach((nextFunction) => {
                storedValue = nextFunction(storedValue);
            });
        } catch (error) {
            this.promiseChain = [];
            this.onReject(error);
        }
    }

    onReject(error){
        this.handleError(error);
    }
}