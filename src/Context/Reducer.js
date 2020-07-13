export const Reducer = (state, action) => {
    switch(action.type) {
        case 'add':
            return [
                ...state,
                action.data,
            ]

        case 'remove': 
            return state.filter(note => {
                return note.id !== action.payload
            })

        default:
            return state
    }
}