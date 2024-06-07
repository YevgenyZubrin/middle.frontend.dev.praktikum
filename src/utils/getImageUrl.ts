import { mainUrl } from '../core/HTTPTransport'

const getImageUrl = (path: string | null): string => (path ? `${mainUrl}/resources${path}` : '')

export default getImageUrl
