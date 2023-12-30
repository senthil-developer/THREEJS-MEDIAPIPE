
import { FilesetResolver } from "@mediapipe/tasks-vision";
import { FaceLandmarker, FaceLandmarkerOptions } from "@mediapipe/tasks-vision";
import { predict } from "./predict";

export const setup = async (
  faceLandmarker: FaceLandmarker,
  video: HTMLVideoElement,
  predictCallback: (blendshapes: any[], rotation: Euler) => void
) => {
  const filesetResolver = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm");
  faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, options);

  navigator.mediaDevices.getUserMedia({
    video: { width: 1280, height: 720 },
    audio: false,
  }).then(function (stream) {
    video.srcObject = stream;
    video.addEventListener("loadeddata", () => predict(video, -1, faceLandmarker, predictCallback));
  });
};
