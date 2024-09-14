import { useSelector } from "react-redux"
import SeatLayout from "../components/SeatLayout"

const Booking = () => {
  const movie = useSelector(state => state.movie.currentMovie)
  return (
    <div><SeatLayout movie={movie}/></div>
  )
}

export default Booking