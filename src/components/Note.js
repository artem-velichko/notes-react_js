import React, { useContext } from 'react'
import { Context } from '../Context/Context'

export const Note = ({note}) => {

    const { dispatch } = useContext(Context)

    return (
    <div className="card col s4">
        <div className='card-image waves-effect waves-block waves-light'>
             <img className="activator" src="https://images.unsplash.com/photo-1522199670076-2852f80289c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80" alt='from unsplash' />
        </div>
        <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">{note.title}<i className="material-icons right">more_vert</i></span>
        </div>
        <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">{note.title}<i className="material-icons right">close</i></span>
            <div>
                <div>
                    <div className='note'>
                        Заметка
                        <p>{note.message}</p>
                    </div>
                    {note.personName || note.personPhone || note.photo 
                    ? 
                    <div className='data-person'>
                            Данные персоны
                        { note.photo 
                        ? 
                        <div style={{paddingTop: 15}}><img id='output' className='cover-user' src={note.photo} alt={note.personName} /></div> 
                        : 
                        null } 

                        { note.personName 
                        ? 
                        <div className='person-name'>
                            <h5>
                                {note.personName}
                            </h5>
                        </div> 
                        : 
                        null }

                        { note.personPhone 
                        ? 
                        <p className='person-phone'>{note.personPhone}</p> 
                        : 
                        null }

                    </div>
                    : 
                    null }

                    <hr className='hr' />
                </div>
                <div className='container-del-note' onClick={() => dispatch({ type: 'remove', payload: note.id })}>
                    <i
                    className="material-icons red-text cursor"
                    >
                    delete_forever
                    </i>
                    <span style={{paddingLeft: '7px'}}>Удалить заметку</span>
              </div>
            </div> 
        </div>
    </div>
    )
}