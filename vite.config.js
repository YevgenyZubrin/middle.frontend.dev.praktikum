import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";
import { 
  profileFields, 
  changePasswordFields, 
  authorizationFields, 
  registrationFields 
} from './src/public/constants'

export default defineConfig({
  plugins: [
    handlebars({
      context: {
        first_name: "Mark",
        second_name: "Zukerberg",
        display_name: "MarZuk",
        login: "markZukerberg",
        email: "test@test.test",
        phone: "+77777777777",
        password: "12345678",
        confirmPassword: "12345678",
        changeAvatar: 'Поменять аватарку',
        profileFields,
        changePasswordFields,
        authorizationFields,
        registrationFields
      },
      partialDirectory: [resolve(__dirname, "src/partials")],
    }),
  ],
  build: {
    outDir: resolve(__dirname, "build"),
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        404: resolve(__dirname, 'src/pages/404/index.html'),
        500: resolve(__dirname, 'src/pages/500/index.html'),
        changePassword: resolve(__dirname, 'src/pages/changePassword/index.html'),
        changeProfile: resolve(__dirname, 'src/pages/changeProfile/index.html'),
        chats: resolve(__dirname, 'src/pages/chats/index.html'),
        modalDefault: resolve(__dirname, 'src/pages/modalDefault/index.html'),
        modalIfImageLoaded: resolve(__dirname, 'src/pages/modalIfImageLoaded/index.html'),
        modalImageNotChoosen: resolve(__dirname, 'src/pages/modalImageNotChoosen/index.html'),
        modalLoadingError: resolve(__dirname, 'src/pages/modalLoadingError/index.html'),
        profile: resolve(__dirname, 'src/pages/profile/index.html'),
        signin: resolve(__dirname, 'src/pages/signin/index.html'),
        signup: resolve(__dirname, 'src/pages/signup/index.html'),
      }
    }
  },
});
