import { useEffect, useRef, useState } from "react";

function useAccelerometer() {
  const [ permissionGranted, setPermissionGranted ] = useState(false);

  const rotation = useRef({
    x: 0,
    y: 0,
    z: 0,
  });

  useEffect(() => {

    const handleMotionEvent = (event) => {
      rotation.x.current = event.accelerationIncludingGravity.x;
      rotation.y.current = event.accelerationIncludingGravity.y;
      rotation.z.current = event.accelerationIncludingGravity.z;
    }
    
    if (typeof DeviceMotionEvent?.requestPermission === "function") {
      DeviceMotionEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === "granted") {
            setPermissionGranted(true);
            window.addEventListener("devicemotion", handleMotionEvent);
          }
        })
        .catch(console.error);
    } else {
      setPermissionGranted(true);
      window.addEventListener("devicemotion", handleMotionEvent);
    }

    return () => {
      window.removeEventListener("devicemotion", handleMotionEvent);
    };
  }, []);

  return { permissionGranted, rotation };
}

export default useAccelerometer;
