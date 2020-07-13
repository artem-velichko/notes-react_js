import React, {useState, useEffect, useReducer, useContext} from 'react'
import { Notes } from './Notes'
import { Context } from '../Context/Context'
import { Reducer } from '../Context/Reducer'
import { alertContext } from '../AlertContext/alertContext'

export const CreateNote = () => {

  const { show } = useContext(alertContext)

  const [state, dispatch] = useReducer(Reducer, JSON.parse(localStorage.getItem('items')))
  
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(state))
  }, [state])

  const [call, setCall] = useState(false)
  const [coverPerson, setCoverPerson] = useState(false)
  const [stateFile, setStateFile] = useState(coverPerson)
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [personName, setPersonName] = useState('')
  const [personPhone, setPersonPhone] = useState('')
  const [photo, setPhoto] = useState('')
  
  const values = {
    title, message, personName, personPhone, photo
  }
  
  let cls = ['btn', 'disabled']

  let data = {
    id: Date.now(),
  }
  
  if (call && coverPerson) {
    cls.pop()
  } else if (coverPerson && stateFile && !call) {
    cls.push('disabled')
  }
  
  const loadFile = event => {
    setPhoto(URL.createObjectURL(event.target.files[0]))
  };
  
  const handleSubmit = event => {
    event.preventDefault()

    if (title.trim() && message.trim()) {
      show('Заметка успешно создана', 'success')

      let payload = Object.fromEntries(Object.entries(values).filter(([key, value]) => {
        if (value)  {
          return [key, value]
        }
      })
      )
      
      let keys = Object.keys(payload)
      let values2 = Object.values(payload)
      
      for (let i = 0; i < keys.length && values2.length; i++) {
        data[keys[i]] = values2[i]
      }
      
        dispatch({type: 'add', data})
  
        setTitle('')
        setMessage('')
        setPersonName('')
        setPersonPhone('')
        setPhoto('')
    } else {
      show('Введите название и текст заметки. Без них заметка не будет создана!')
    }
  }

   return (
    <Context.Provider value={{
      dispatch
     }}>
       <>
          <h2 style={{marginTop: 25, marginBottom: 25}}>Твои ежедневные заметки</h2>
          <div className="row marg">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s12">
                <i className="material-icons prefix">create</i>
                <input 
                id="title" 
                type="text" 
                value={title}
                onChange={event => setTitle(event.target.value)} />
                <label htmlFor="title">Название заметки</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                <i className="material-icons prefix">mode_edit</i>
                <textarea 
                id="icon_prefix2" 
                className="materialize-textarea"
                value={message}
                onChange={event => setMessage(event.target.value)}></textarea>
                <label htmlFor="icon_prefix2">Текст заметки</label>
                </div>
              </div>
              <div className='row'>
                <div className="input-field col s12">
                <label>
                  <input
                  type="checkbox"
                  checked={call}
                  onChange={() => {
                      setCall(!call)
                      !call ? setStateFile(false) : setStateFile(true)
                  }}
                  />
                  <span>Установить напоминание для звонка персоне</span>
                </label>
                </div>  
              </div>
              <div className='row'>
                <div className='input-field col s6'>
                <input 
                id="name_person" 
                type="text" 
                disabled={!call} 
                value={personName}
                onChange={event => setPersonName(event.target.value)} />
                <label htmlFor="name_person">
                    Имя персоны
                </label>
                </div>
                <div className='input-field col s6'>
                <input 
                id="phone" 
                type="tel" 
                disabled={!call} 
                value={personPhone}
                onChange={event => setPersonPhone(event.target.value)}/>
                <label htmlFor="phone">
                    Телефон персоны
                </label>
                </div>
              </div>
              <div className="switch">
                <label>
                <h6>Установить изображение персоны</h6>
                Нет
                <input 
                type="checkbox" 
                checked={coverPerson}
                disabled={!call}
                onChange={() => setCoverPerson(!coverPerson)}
                />
                <span className="lever"></span>
                Да
                </label>
              </div>
              <div className="file-field input-field">
                <div className={cls.join(' ')}>
                <span>Выбрать изображение</span>
                <input 
                type="file" 
                accept="image/*" 
                onChange={loadFile}
                disabled={stateFile}
                />
                </div>
                <div className="file-path-wrapper">
                <input 
                className="file-path validate" 
                type="text" 
                placeholder='Фото' 
                disabled={stateFile}
                value={photo}
                readOnly
                />
                </div>
              </div>
              <button className='btn' onClick={handleSubmit}>Создать заметку</button>
            </form>
          </div>
          <Notes notes={state} />
       </>
     </Context.Provider>
    )
}