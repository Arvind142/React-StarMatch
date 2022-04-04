// display stars
const StarDisplay = ({ stars }) => (
    utils.range(1, stars).map(starId => <div key={starId} className="star" />)
)


// Math science
const utils = {
    // create an array of numbers between min and max (edges included)
    range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i)
}
export default StarDisplay;