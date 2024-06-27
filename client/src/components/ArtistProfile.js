import React from 'react';
import { useParams } from 'react-router-dom';
import { useArtistDetails } from '../hooks/artists';
import CustomSkeleton from './CustomSkeleton';
import ArtistInfo from './ArtistInfo';
import ArtistTourList from './ArtistTourList';

const ArtistProfile = () => {
  const { spotify_uri } = useParams();
  
  const artistData = useArtistDetails(spotify_uri);

  if (!artistData) return <CustomSkeleton />
  else return (
  <>
  { (spotify_uri === "4lianjyuR1tqf6oUX8kjrZ") ? <video controls={true} autoPlay={true} src={"https://catboy.it/franco.mp4"}></video> : null }
  <ArtistInfo artist={artistData}></ArtistInfo>
  <ArtistTourList artist_id={artistData._id}></ArtistTourList>
  </>
  );
};

export default ArtistProfile;

