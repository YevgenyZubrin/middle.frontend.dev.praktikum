import { mainUrl } from '../core/HTTPTransport'

const getImageUrl = (path: string): string => (path ? `${mainUrl}/resources${path}` : '')

export default getImageUrl
