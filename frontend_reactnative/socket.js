import {io} from 'socket.io-client'
import {ORIGIN} from './config'
const socket = io.connect(ORIGIN);
export default socket;