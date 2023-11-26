"use client";

import WaveTrack from "@/components/track/waveTrack";

const DetailTrackPage = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <WaveTrack />
    </div>
  );
};

export default DetailTrackPage;
