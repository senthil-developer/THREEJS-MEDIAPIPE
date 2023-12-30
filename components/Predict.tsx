
import { FaceLandmarkerResult } from "@mediapipe/tasks-vision";

export const predict = (video: HTMLVideoElement, lastVideoTime: number, faceLandmarker: FaceLandmarker, predictCallback: () => void) => {
  let nowInMs = Date.now();
  if (lastVideoTime !== video.currentTime) {
    lastVideoTime = video.currentTime;
    const faceLandmarkerResult = faceLandmarker.detectForVideo(video, nowInMs);

    if (faceLandmarkerResult.faceBlendshapes && faceLandmarkerResult.faceBlendshapes.length > 0 && faceLandmarkerResult.faceBlendshapes[0].categories) {
      const blendshapes = faceLandmarkerResult.faceBlendshapes[0].categories;

      const matrix = new Matrix4().fromArray(faceLandmarkerResult.facialTransformationMatrixes![0].data);
      const rotation = new Euler().setFromRotationMatrix(matrix);

      predictCallback(blendshapes, rotation);
    }
  }

  window.requestAnimationFrame(() => predict(video, lastVideoTime, faceLandmarker, predictCallback));
};
