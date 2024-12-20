import React, { useState } from 'react';
import Slider from 'react-slick';

const VideoCarousel = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = useState(videos[0].videoUrl);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
  };

  const handleThumbnailClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  return (
    <div>
      <h2>Video Carousel</h2>
      <Slider {...settings}>
        {videos.map((video) => (
          <div key={video.id} onClick={() => handleThumbnailClick(video.videoUrl)}>
            <img src={video.thumbnailUrl} alt="Video Thumbnail" />
          </div>
        ))}
      </Slider>
      <div style={{ marginTop: '20px' }}>
        <video width="600" controls>
          <source src={selectedVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoCarousel;
