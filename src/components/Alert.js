import React, {useContext} from 'react'
import { alertContext } from '../AlertContext/alertContext'

export const Alert = () => {

    const {alert, hide} = useContext(alertContext)

    if (!alert.visible) {
        return null
    }

    return (
        <div className={`alert alert-${alert.type || 'warning'}`}>
            <div className='valign-wrapper'>
                <strong>{alert.text}</strong>
            </div>
            <div className='valign-wrapper'>
                <i
                className="material-icons white-text cursor"
                onClick={hide}
                >
                close
                </i>
            </div>
        </div>
    )
}
