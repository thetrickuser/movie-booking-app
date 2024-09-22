import { useSelector } from "react-redux"
import SeatLayout from "../components/SeatLayout"

const Booking = () => {
  const movie = useSelector(state => state.booking.movie)
  return (
    <div><SeatLayout movie={movie}/></div>
  )
}

export default Booking