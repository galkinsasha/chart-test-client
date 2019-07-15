import {UPDATE_CHART_DATA} from './../actions/types'
import _ from 'lodash'
//--------- Helper functions
const buildBarData = (state, {value}) => {
    let { barData } = state
    const v = Math.floor(value / 10)
    const matched = _.find(barData, o => o.key === v)
    if(matched){
        const index = _.findIndex(barData, o=>o.key === matched.key)
        barData[index] = {key:matched.key, value:matched.value+1}
    }else{
        barData.push({
            'key': v,
            'value': 1
        });
    }

    barData.sort(function(a, b) {
        return (a.key*1)- (b.key*1);
    });
    return barData
}



//---------- Reducers
export default (state = {lineData:[], barData:[]}, {type, payload}) => {
    switch (type) {
        case UPDATE_CHART_DATA:
            let {lineData} = state
            lineData.push(payload)
            return { ...state, lineData:lineData, barData:buildBarData(state, payload), error:null };
        default:
            return state;
    }
};