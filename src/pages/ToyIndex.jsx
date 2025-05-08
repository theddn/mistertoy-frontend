import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Loader } from '../cmps/Loader'
import { ToyList } from '../cmps/ToyList'
import { showErrorMsg } from '../services/event-bus.service'

import { loadToys } from '../store/actions/toy.actions'
import { toyService } from '../services/toy.service'

export function ToyIndex() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
    const isLoading = useSelector(
        (storeState) => storeState.toyModule.flag.isLoading,
    )
    const [pageIdx] = useState(0)
    useEffect(() => {
        Promise.all([toyService.getToyLabels(), loadToys(pageIdx)]).catch(
            (err) => {
                console.log('err:', err)
                showErrorMsg('Cannot load toys')
            },
        )
    }, [filterBy, pageIdx])

    return (
        <section className="toy-index">
            <div style={{ marginBlockStart: '0.5em', textAlign: 'center' }}>
                <button style={{ marginInline: 0 }}>
                    <Link to="/toy/edit">Add Toy</Link>
                </button>
            </div>

            {isLoading && <Loader />}
            {!isLoading && <ToyList toys={toys} />}
        </section>
    )
}
