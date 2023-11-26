"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

const useWavesurfer = (containerRef: any, options: any) => {
  const [wavesurfer, setWavesurfer] = useState<any>(null);

  // Initialize wavesurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      ...options,
      container: containerRef.current,
    });

    setWavesurfer(ws);

    return () => {
      ws.destroy();
    };
  }, [options, containerRef]);

  return wavesurfer;
};

const WaveTrack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const findName = searchParams.get("audio");

  const optionMemo = useMemo(() => {
    return {
      waveColor: "rgb(200, 0, 200)",
      progressColor: "rgb(100, 0, 100)",
      url: `/api?audio=${findName}`,
    };
  }, []);

  // const option = {
  //   waveColor: "rgb(200, 0, 200)",
  //   progressColor: "rgb(100, 0, 100)",
  //   url: `/api?audio=${findName}`,
  // };
  const wavesurfer = useWavesurfer(containerRef, optionMemo);

  // useEffect(() => {
  //   const ws = WaveSurfer.create({
  //     container: containerRef.current!,
  //     waveColor: "rgb(200, 0, 200)",
  //     progressColor: "rgb(100, 0, 100)",
  //     url: `/api?audio=${findName}`,
  //   });

  //   return () => {
  //     ws.destroy();
  //   };
  // }, []);

  return <div ref={containerRef}>WaveTrack</div>;
};

export default WaveTrack;
