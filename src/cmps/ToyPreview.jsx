import { useState } from 'react'
import { Link } from 'react-router-dom'

export function ToyPreview({ toy }) {
    const [isImgLoading, setImgLoading] = useState(true)

    function handleImageLoad() {
        setImgLoading(false)
    }
    return (
        <Link to={`/toy/${toy._id}`}>
            <article className="toy-preview">
                <h1 className="toy-name">{toy.name}</h1>
                {isImgLoading && <div className="skeleton-loader"></div>}
                <div className="img-container">
                    <img
                        src={`https://robohash.org/${toy.name}?set=set4`}
                        alt={toy.name}
                        onLoad={handleImageLoad}
                        style={{ display: isImgLoading ? 'none' : 'block' }}
                    />
                </div>
                <h1>Price: ${toy.price}</h1>
            </article>
        </Link>
    )
}
