import { defineConfig } from "vite"
import { resolve } from 'path'
import vitePugPlugin from 'vite-plugin-pug-transformer';
import {viteStaticCopy} from "vite-plugin-static-copy";


export default defineConfig({
    plugins: [
        vitePugPlugin(),
        viteStaticCopy({
            targets: [
                {
                    src: resolve(__dirname, './pages') + '/[!.]*',
                    dest: './pages/',
                }
            ]
        })
    ],
    target: 'es2015',
    assetsInlineLimit: 0,
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            },
        },
    },
})
