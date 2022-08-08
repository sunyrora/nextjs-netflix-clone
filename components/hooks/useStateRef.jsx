const { useState, useRef, useEffect, useCallback } = require("react");

function useStateRef(initialValue) {
    const [state, _setState] = useState(initialValue);
    const ref = useRef(initialValue);

  useEffect(() => {
    ref.current = state;
  }, [state]);

    const setState = useCallback((value) => {
        ref.current = value;
        _setState(value);
    }, []);
    

  return [state, setState, ref];
}

export default useStateRef;