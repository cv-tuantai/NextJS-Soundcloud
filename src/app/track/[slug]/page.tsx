"use client";

import WaveTrack from "@/components/track/waveTrack";
import { Container } from "@mui/material";

const DetailTrackPage = ({ params }: { params: { slug: string } }) => {
  return (
    <Container>
      <div>
        <WaveTrack />
      </div>
    </Container>
  );
};

export default DetailTrackPage;
