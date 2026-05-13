import dynamic from 'next/dynamic'
const Rating = dynamic(() => import('react-simple-star-rating').then(m => m.Rating), { ssr: false })

export function RatingCard({ rating }) {
  return (
    <div className="tile is-child">
      <article className="media box is-align-items-center">
        <figure className="media-left">
          <Rating initialValue={rating.score} readonly={true} />
        </figure>
        <div className="media-content">
          <div className="content">
            <p>
              {rating.review}
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}
