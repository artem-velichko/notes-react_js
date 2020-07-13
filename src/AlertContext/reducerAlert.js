export const reducerAlert = (state, action) => {
    switch(action.type) {
        case 'show-alert':
            return {
                ...action.payload,
                visible: true
            }

        case 'hide-alert':
            return {
                ...state,
                visible: false
            }

        default: 
            return state
    }
}