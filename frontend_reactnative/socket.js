import {io} from 'socket.io-client'
import {ORIGIN} from './config'
const socket = io(ORIGIN);
export default socket;