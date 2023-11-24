import MainSlider from "@/components/main/mainSlider";
import { Container } from "@mui/material";
import { sendRequest } from "@/utils/api";

const HomePage = async () => {
  const chill = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: {
      category: "CHILL",
      limit: 10,
    },
  });

  const workout = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: {
      category: "WORKOUT",
      limit: 10,
    },
  });

  const party = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: {
      category: "PARTY",
      limit: 10,
    },
  });

  return (
    <Container>
      <MainSlider data={chill?.data ?? []} title="Top Chill" />
      <MainSlider data={workout?.data ?? []} title="Top Workout" />
      <MainSlider data={party?.data ?? []} title="Top Party" />
    </Container>
  );
};

export default HomePage;
