import axios from 'axios'
import { serverUrl } from '../url'

export default axios.create({
   baseURL: serverUrl,
})
