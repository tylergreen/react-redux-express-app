export default function timerMiddleware(store){
    return next => action => {
        if (action.type === 'START_TIMER') {
            action.interval = setInterval(() => store.dispatch({type: 'TICK',
                                                                currentTime: Date.now() }),
                                          1000)
          
    } else if (action.type === 'STOP_TIMER') {
        clearInterval(store.getState().timer.interval);
    }
    else if (action.type === 'RESUME_TIMER') {
        action.interval = setInterval(() => store.dispatch({type: 'TICK',
                                                            currentTime: Date.now() }),
                                      1000)
    }
    next(action)
    }
}
