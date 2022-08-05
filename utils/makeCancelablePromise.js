const makeCancelablePromise = ((promise, cancelChain = null, name='') => {
    let hasCanceled_ = false;

    console.log('makeCancelabelPromise: ', 'name: ', name);
    console.log('makeCancelabelPromise: ', 'ncancelChainame: ', cancelChain);

    const wrappedPromise = () => new Promise((resolve, reject) => {
        promise().then(res => {

            console.log("wrappedPromise.then hasCanceled: ", hasCanceled_, name);
            hasCanceled_ ? reject(new Error('canceled')) : resolve(res)
        },
        error => {
            // hasCanceled_ ? reject(error) :
            hasCanceled_ && console.log('promise canceld', name);
            reject(error);
        })
    });

    return {
        hasCanceled_,
        promise: wrappedPromise,
        cancel: () => {
            console.log('cancel promise: ', name);
            console.log('cancelChain? ::', !!cancelChain);
            hasCanceled_ = true;
            cancelChain && cancelChain();
        }
    };

});

export default makeCancelablePromise;