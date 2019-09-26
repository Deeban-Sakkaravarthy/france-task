const { FuseBox, WebIndexPlugin, CSSPlugin,SassPlugin } = require("fuse-box");

const targDir= 'dev';
const { watch, task } = require("fuse-box/sparky");

task("default", async () => {
    await watch("img/**/*.(jpg|png|gif)", { base: "./src" })
      .dest("dev")
      .exec();
});

const fuse = FuseBox.init({
    homeDir : "src",
    target : 'browser@es6',
    output : `${targDir}/$name.js`,
    allowSyntheticDefaultImports: true,
    plugins : [
        WebIndexPlugin({
            template:'src/SubscriptionPlansPage.html',
            useTypescriptCompiler: true
        }),
        [
            SassPlugin(),CSSPlugin()
        ]
    ]
});

fuse.dev(); // launch http server
fuse.bundle("app").shim({
        jquery: {
            source: "node_modules/jquery/dist/jquery.js",
            exports: "$"
        }
    }).instructions(" > index.js").hmr({reload:true}).watch();
fuse.run();