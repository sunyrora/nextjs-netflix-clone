const makeCancelablePromise = (({
    promise, 
    cancelChain = null, 
    clearCallback = null,
    name=''
}) => {
    let hasCanceled_ = false;
    let cancelChain_ = cancelChain;

    // console.log('makeCancelabelPromise: ', 'name: ', name);
    // console.log('makeCancelabelPromise: ', 'cancelChain_: ', cancelChain_);

    const wrappedPromise = () => new Promise((resolve, reject) => {
        promise().then(res => {

            // console.log("wrappedPromise.then hasCanceled: ", hasCanceled_, name);
            if(hasCanceled_) {
                reject(new Error('canceled'));
                clearCallback && clearCallback();
            } else {
                resolve(res);
            }
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
        setCancelChain: (cancel) => cancelChain_ = cancel,
        cancel: () => {
            // console.log('cancel promise: ', name);
            // console.log('cancelChain? ::', !!cancelChain_);
            hasCanceled_ = true;
            cancelChain_ && cancelChain_();
        }
    };

});

export default makeCancelablePromise;