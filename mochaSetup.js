// eslint-disable-next-line import/no-extraneous-dependencies
import { JSDOM } from 'jsdom'

// jsdom
const jsdom = new JSDOM(`<body></body>`, { url: 'http://localhost:5173' })
global.window = jsdom.window
global.document = jsdom.window.document
global.Node = jsdom.window.Node
global.MouseEvent = jsdom.window.MouseEvent
