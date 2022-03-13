import { getDistance } from "geolib";

export default function getTimelineDistance(timeline) {
  const history = JSON.parse(timeline);
  let distance = 0;

  for (let i = 0; i < history.length - 1; i++) {
    const result = getDistance(history[i], history[i + 1]);
    distance += result;
  }

  return distance;
}
