import { useCallback, useEffect, useRef } from "react";


// const useMouseEvent = (events = []) => {
const useMouseEvent = () => {
    const refComponent = useRef(null);
    let eventList = [];

    const ref = useCallback((node) => {
        if(node) node = refComponent.current = node;
    }, []);

    useEffect(() => {
        return () => {
            clearEvents();
        }
    }, []);

    const clearEvents = useCallback(() => {
        // console.log('clearEvents:: events: ', eventList);

        for(let i = 0; i < eventList.length; i++) {
            removeEventListener(eventList[i].type, eventList[i].handler, eventList[i].elem);            
        }
    }, []);

    const addEventListeners = useCallback((events, elem = refComponent?.current) => {
        // console.log('addEventListeners:: events: ', events);
        if(elem && events) {
            for(let i = 0; i < events.length; i++){
                addEventListener(events[i].type, events[i].handler, elem);
            }
        }
    }, []);

    const addEventListener = useCallback((type, handler, elem = refComponent?.current) =>  {
        if(elem && type && handler) {
            elem.addEventListener(type, handler);
            eventList.push({elem, type, handler});
        }
    }, []);

    const removeEventListener = useCallback((type, handler, elem = refComponent?.current) => {
        if(elem && type && handler) {
            elem.removeEventListener(type, handler);
        }
    }, []);

  return { ref, addEventListeners };
};

export default useMouseEvent;
