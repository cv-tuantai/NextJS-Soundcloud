"use client";
import { useWavesurfer } from "@/utils/customHook";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { WaveSurferOptions } from "wavesurfer.js";
import "./wave.scss";
import { Pause, PlayArrow } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

const WaveTrack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState<string>("0:00");
  const [duration, setDuration] = useState<string>("0:00");
  const searchParams = useSearchParams();
  const findName = searchParams.get("audio");

  const optionMemo = useMemo((): Omit<WaveSurferOptions, "container"> => {
    // Create a canvas gradient
    let gradient, progressGradient;
    if (typeof window !== "undefined") {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;

      // Define the waveform gradient
      gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
      gradient.addColorStop(0, "#656666"); // Top color
      gradient.addColorStop((canvas.height * 0.7) / canvas.height, "#656666"); // Top color
      gradient.addColorStop(
        (canvas.height * 0.7 + 1) / canvas.height,
        "#ffffff",
      ); // White line
      gradient.addColorStop(
        (canvas.height * 0.7 + 2) / canvas.height,
        "#ffffff",
      ); // White line
      gradient.addColorStop(
        (canvas.height * 0.7 + 3) / canvas.height,
        "#B1B1B1",
      ); // Bottom color
      gradient.addColorStop(1, "#B1B1B1"); // Bottom color

      // Define the progress gradient
      progressGradient = ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height * 1.35,
      );
      progressGradient.addColorStop(0, "#EE772F"); // Top color
      progressGradient.addColorStop(
        (canvas.height * 0.7) / canvas.height,
        "#EB4926",
      ); // Top color
      progressGradient.addColorStop(
        (canvas.height * 0.7 + 1) / canvas.height,
        "#ffffff",
      ); // White line
      progressGradient.addColorStop(
        (canvas.height * 0.7 + 2) / canvas.height,
        "#ffffff",
      ); // White line
      progressGradient.addColorStop(
        (canvas.height * 0.7 + 3) / canvas.height,
        "#F6B094",
      ); // Bottom color
      progressGradient.addColorStop(1, "#F6B094"); // Bottom color
    }

    return {
      url: `/api?audio=${findName}`,
      barWidth: 3,
      height: 100,
      waveColor: gradient,
      progressColor: progressGradient,
    };
  }, []);

  const wavesurfer = useWavesurfer(containerRef, optionMemo);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (!wavesurfer) return;

    setIsPlaying(false);

    const hover = hoverRef.current!;
    const waveform = containerRef.current!;
    //@ts-ignore
    waveform.addEventListener(
      "pointermove",
      (e) => (hover.style.width = `${e.offsetX}px`),
    );

    const subscriptions = [
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("pause", () => setIsPlaying(false)),
      wavesurfer.on("decode", (duration) => setDuration(formatTime(duration))),
      wavesurfer.on("timeupdate", (currentTime) =>
        setTime(formatTime(currentTime)),
      ),
      wavesurfer.on("interaction", () => {
        wavesurfer.play();
      }),
    ];

    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [wavesurfer]);

  // On play button click
  const onPlayClick = useCallback(() => {
    if (wavesurfer) {
      wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
    }
  }, [wavesurfer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.round(seconds) % 60;
    const paddedSeconds = `0${secondsRemainder}`.slice(-2);
    return `${minutes}:${paddedSeconds}`;
  };

  const arrComments = [
    {
      id: 1,
      avatar: "http://localhost:8000/images/chill1.png",
      moment: 10,
      user: "username 1",
      content: "just a comment1",
    },
    {
      id: 2,
      avatar: "http://localhost:8000/images/chill1.png",
      moment: 30,
      user: "username 2",
      content: "just a comment3",
    },
    {
      id: 3,
      avatar: "http://localhost:8000/images/chill1.png",
      moment: 50,
      user: "username 3",
      content: "just a comment3",
    },
  ];

  const calLeft = (moment: number) => {
    const duration = 199;
    const percent = (moment / duration) * 100;
    return `${percent}%`;
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <div
        style={{
          display: "flex",
          padding: 20,
          gap: 15,
          height: 400,
          background:
            "linear-gradient(135deg, rgb(106, 112, 67) 0%, rgb(11, 15, 20) 100%)",
        }}
      >
        <div
          className="left"
          style={{
            width: "75%",
            padding: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex" }}>
            <div
              onClick={() => onPlayClick()}
              style={{
                height: 50,
                width: 50,
                background: "#f50",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              {isPlaying ? <Pause /> : <PlayArrow />}
            </div>
            <div style={{ marginLeft: 20 }}>
              <div
                style={{
                  padding: "0 5px",
                  background: "#333",
                  fontSize: 30,
                  width: "fit-content",
                  color: "white",
                }}
              >
                IT Song
              </div>
              <div
                style={{
                  padding: "0 5px",
                  marginTop: 10,
                  background: "#333",
                  fontSize: 20,
                  width: "fit-content",
                  color: "white",
                }}
              >
                Eric
              </div>
            </div>
          </div>
          <div ref={containerRef} className="waveFormContainer">
            <div className="time">{time}</div>
            <div className="duration">{duration}</div>
            <div className="hoverWave" ref={hoverRef}></div>
            {/* <div
              className="overlay"
              style={{
                position: "absolute",
                height: "30px",
                width: "100%",
                bottom: "0",
                // background: "#ccc"
                backdropFilter: "brightness(0.5)",
              }}
            ></div> */}
            <div className="comment" style={{ position: "relative" }}>
              {arrComments.map((item) => {
                return (
                  <Tooltip title={item.content} arrow>
                    <img
                      onPointerMove={() => {
                        const hover = hoverRef.current!;
                        hover.style.width = calLeft(item.moment);
                      }}
                      key={item.id}
                      src="http://localhost:8000/images/chill1.png"
                      alt="123"
                      style={{
                        height: 20,
                        width: 20,
                        position: "absolute",
                        top: 71,
                        zIndex: 20,
                        left: calLeft(item.moment),
                      }}
                    />
                  </Tooltip>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className="right"
          style={{
            width: "25%",
            padding: 15,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#ccc",
              height: 250,
              width: 250,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default WaveTrack;
