import { toyService } from '../../services/toy.service'
import {
    SET_FILTER_BY,
    SET_IS_LOADING,
    SET_SORT_BY,
    SET_TOYS,

} from '../reducers/toy.reducer'
import { store } from '../store'

export function loadToys() {
    const { filterBy, sortBy } = store.getState().toyModule
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return toyService.query(filterBy, sortBy)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('toy action -> Cannot load toys')
            throw err
        })
        .finally(() => {
            setTimeout(() => {
                store.dispatch({ type: SET_IS_LOADING, isLoading: false })
            }, 350)
        })
}


export function setFilter(filterBy = toyService.getDefaultFilter()) {
    store.dispatch({ type: SET_FILTER_BY, filterBy: filterBy })
}

export function setSort(sortBy = toyService.getDefaultSort()) {
    store.dispatch({ type: SET_SORT_BY, sortBy: sortBy })
}
