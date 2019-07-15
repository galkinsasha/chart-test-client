import {UPDATE_CHART_DATA} from './types'

export const  updateData = (newData) => dispatch => {
    // Діспачим редюсер
    dispatch({
        type:UPDATE_CHART_DATA,
        payload:newData
    })

}