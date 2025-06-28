import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoData = {
    title: "Meet Our Rural Culinary Artists",
    description: "Watch the passionate stories of traditional cooks who preserve authentic regional recipes passed down through generations.",
    thumbnailImage: "https://images.pexels.com/photos/8629141/pexels-photo-8629141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    highlights: [
      "Traditional cooking methods",
      "Family recipes passed down generations", 
      "Fresh local ingredients",
      "Authentic regional flavors"
    ]
  };

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  return (
    <section className="py-16 lg:py-24 bg-background-50">
      <div className="content-max-width viewport-padding">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4">
            {videoData.title}
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            {videoData.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video Player */}
          <div className="relative">
            <div className="relative aspect-video rounded-cultural overflow-hidden cultural-shadow-moderate">
              {!isPlaying ? (
                <>
                  <Image
                    src={videoData.thumbnailImage}
                    alt="Rural cook preparing traditional dishes"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-text-primary/30 flex items-center justify-center">
                    <Button
                      variant="primary"
                      onClick={handlePlayVideo}
                      className="w-20 h-20 rounded-full cultural-hover-scale"
                    >
                      <Icon name="Play" size={32} color="white" />
                    </Button>
                  </div>
                </>
              ) : (
                <iframe
                  src={videoData.videoUrl}
                  title="Rural Culinary Artists Video"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              {videoData.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Check" size={16} color="white" />
                  </div>
                  <p className="text-text-primary font-medium">{highlight}</p>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <Button
                variant="primary"
                iconName="Users"
                iconPosition="left"
                size="lg"
                onClick={() => window.location.href = '/product-catalog-browse'}
                className="cultural-hover-scale"
              >
                Meet Our Caterers
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;