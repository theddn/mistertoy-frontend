// Toy List
import { ToyPreview } from './ToyPreview'

export function ToyList({ toys }) {
    const elLis = toys.map((toy) => (
        <li key={toy._id}>
            <ToyPreview toy={toy} />
        </li>
    ))

    console.log('elLis:', elLis)
    return (
        <section className="toy-list container">
            <ul>{elLis}</ul>
        </section>
    )
}
