import debug from 'gulp-debug'
import imagemin, {mozjpeg, svgo} from 'gulp-imagemin'
import imageminPngquant from 'imagemin-pngquant';

export const copyImages = () => {
    return app.gulp.src(app.path.src.img)
        .pipe(debug({title: 'unicorn:'}))
        .pipe(
            app.plugins.ifPlugin(
                app.isBuild,
                imagemin([
                    mozjpeg({ quality: 80 }),
                    imageminPngquant({ quality: [0.8, 0.9] }),
                    svgo(),
                ], {
                    verbose: true
                })
            )
        )
        .pipe(app.gulp.dest(app.path.build.img))
}

export const copyImagesStyle = () => {
    return app.gulp.src(app.path.src.imgStyle)
        .pipe(
            app.plugins.ifPlugin(
                app.isBuild,
                imagemin([
                    mozjpeg({ quality: 80 }),
                    imageminPngquant({ quality: [0.8, 0.9] }),
                    svgo(),
                ])
            )
        )
        .pipe(app.gulp.dest(app.path.build.imgStyle))
}
