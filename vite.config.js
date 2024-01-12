import { defineConfig } from "vite"
import vitePugPlugin from 'vite-plugin-pug-transformer';

// const options = { pretty: true } // FIXME: pug pretty is deprecated!
// const locals = { name: "My Pug" }

export default defineConfig({
    plugins: [vitePugPlugin()],
})
