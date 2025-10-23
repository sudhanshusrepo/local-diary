import { useState, useCallback } from 'react';

type GeolocationStatus = 'idle' | 'pending' | 'success' | 'error';

interface GeolocationState {
  status: GeolocationStatus;
  position: GeolocationPosition | null;
  error: GeolocationPositionError | null;
  errorMessage: string;
}

const getErrorMessage = (error: GeolocationPositionError): string => {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            return "Location access denied. We'll show general results, but you can enable location in your browser settings for local results.";
        case error.POSITION_UNAVAILABLE:
            return "Location information is unavailable. Showing general results. You can try again or check your device's settings.";
        case error.TIMEOUT:
            return "The request to get your location timed out. Showing general results for now.";
        default:
            return "Could not retrieve location. Showing general results.";
    }
}

export const useGeolocation = (options?: PositionOptions) => {
  const [state, setState] = useState<GeolocationState>({
    status: 'idle',
    position: null,
    error: null,
    errorMessage: '',
  });

  const getPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setState({
        status: 'error',
        position: null,
        error: null,
        errorMessage: 'Geolocation is not supported by your browser.',
      });
      return;
    }

    setState(prevState => ({ ...prevState, status: 'pending', errorMessage: 'Checking location...' }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          status: 'success',
          position: position,
          error: null,
          errorMessage: 'Showing results near you.',
        });
      },
      (error) => {
        setState({
          status: 'error',
          position: null,
          error: error,
          errorMessage: getErrorMessage(error),
        });
      },
      options
    );
  }, [options]);

  return { ...state, getPosition };
};
