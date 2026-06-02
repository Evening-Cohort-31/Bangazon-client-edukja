import { RatingCard } from './card'
import RatingForm from './form'

import { SaveRating } from "./detail.js"

type Rating = {
  id: number,
  rating: number
}

interface RatingsContainerProps {
  ratings: Rating[],
  saveRating: SaveRating
}

export function RatingsContainer({ ratings, saveRating }: RatingsContainerProps): React.JSX.Element {
  return (
    <div className="tile is-parent is-12 is-vertical container">
      <RatingForm saveRating={saveRating} />
      {
        ratings?.map((rating) => <RatingCard key={rating.id} rating={rating} />)
      }
    </div>
  )
}
