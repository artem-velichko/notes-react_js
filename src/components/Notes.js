import React from 'react'
import { Note } from './Note'

export const Notes = ({notes}) => {
    return (
        <div className='row'>
            {notes.map(note => {
                return <Note key={note.id} note={note} />
            })}
        </div>
    )
}