
import NearbyLandmarksClient from "./NearbyLandmarksClient";
import { getNearbyLandmarks } from "@/lib/data";

export default async function NearbyLandmarks() {
  const nearBy = await getNearbyLandmarks();
  
  return (
    <NearbyLandmarksClient landmarks={nearBy} />
  );
}

