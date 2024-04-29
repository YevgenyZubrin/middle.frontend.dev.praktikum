// eslint-disable-next-line import/no-extraneous-dependencies
import Handlebars from 'handlebars'

interface Transform {
  (src: unknown, id: string): { code: string } | undefined
}

export default function handlebars(): { name: string; transform: Transform } {
  const fileRegexp = /\.hbs$|\. handlebars$/

  return {
    name: 'vite-plugin-handlebars-precompile',
    transform(src, id) {
      if (!fileRegexp.test(id)) {
        return undefined
      }
      const code = `
      import Handlebars from 'handlebars/runtime'
      
      export default Handlebars.template(${Handlebars.precompile(src)})
      `
      return { code }
    },
  }
}
