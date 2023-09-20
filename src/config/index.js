import {io} from 'socket.io-client';
import Config from 'react-native-config';
const socketApiURL = Config.API_SOCKET;

export const backendURLPartner = Config.API_URL_PARTNER;
export const backendApiURL = Config.API_URL;
export const backendApiURLUSER = Config.API_URL_USER;
// export const backendApiURL = 'https://api-driver-dev.hayuq.com/api/v1';
export const socketDriver = io.connect(socketApiURL + '/driver', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 3000,
  reconnectionAttempts: 5,
});
export const GOOGLE_API_KEY = Config.GOOGLE_API_KEY;
export const portSocketChat = io.connect(socketApiURL + `/chat`, {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 3000,
  reconnectionAttempts: 5,
});

const portOrder = backendApiURL + '/order';
const portPerfomance = backendApiURL + '/performance';

// const portAuth = backendApiURL + '/auth';
// const portSocket = io.connect(Config.API_SOCKET + `/driver`);

export default {
  portOrder,
  portPerfomance,
};
