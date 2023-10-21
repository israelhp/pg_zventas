import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const Slider = () => {
  return (
    <div className="w-full">
      <Carousel showArrows={true} showThumbs={false} className="w-full">
        <div>
          <img
            src="https://wallpapercave.com/wp/wp5750666.jpg"
            alt="Imagen 1"
            className="w-full h-80 object-cover"
          />
        </div>
        <div>
          <img
            src="https://vaughanautoservice.ca/wp-content/uploads/2022/06/Vaughan-Air-Conditioning-1024x341.jpg"
            alt="Imagen 2"
            className="w-full h-80 object-cover"
          />
        </div>
      </Carousel>
    </div>
  )
}

export default Slider
