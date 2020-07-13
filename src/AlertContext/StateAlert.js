import React, {useReducer} from 'react'
import { alertContext } from './alertContext'
import { reducerAlert } from './reducerAlert'

export const StateAlert = ({children}) => {

    const [state, dispatch] = useReducer(reducerAlert, {visible: false})

    const show = (text, type = 'warning') => {
        dispatch({
            type: 'show-alert',
            payload: {type, text}
        })
        setTimeout(() => hide(), 3000)
    }

    const hide = () => {
        dispatch({ type: 'hide-alert' })
    }

    return (
        <alertContext.Provider value={{
            show, hide, alert: state
        }}>
            {children}
        </alertContext.Provider>
    )
}
