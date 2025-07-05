import "dotenv/config";
import { build, context } from "esbuild";
import type { ServeOptions, BuildOptions } from "esbuild";

import {
	ToCopy,
	AliasResolver,
	onRebuild,
	resolveEnvironment,
	type BuildHandlerParams,
} from "./config/plugins";

import {
	KEYPEM,
	CERTPEM,
	PROTOCOL,
	SERVEDIR,
	HOST,
	PORT,
	SOURCES,
} from "./config/environment";

const isProductionMode = process?.env?.NODE_ENV === "production";

const config: BuildOptions = {
	bundle: true,
	write: true,
	keepNames: true,
	define: {
		"process.env.ENVIRONMENT": JSON.stringify(process.env.NODE_ENV),
		"process.env.PORT": JSON.stringify(PORT),
		"process.env.HOST": JSON.stringify(HOST),
		"process.env.PROTOCOL": JSON.stringify(PROTOCOL),
	},
	entryPoints: [...SOURCES],
	outdir: "./dist/src",
	tsconfig: "./tsconfig.json",
	supported: { "dynamic-import": true },
	platform: "browser",
	format: "esm",
	external: [
		"http",
		"canvas",
		"global-jsdom",
		"global-jsdom/register",
		"bun:test",
	],
	treeShaking: isProductionMode,
	sourcemap: isProductionMode ? true : "both",
	minify: isProductionMode,
	target: isProductionMode ? ["ES2022"] : ["ESNEXT"],
	plugins: [
		AliasResolver,
		resolveEnvironment({
			environment: process.env.NODE_ENV,
		}),
		ToCopy({
			sources: [{ origin: "./static", destiny: "./dist" }],
		}),
		/*
     * Copy static dependencies to dist
     * ToCopy({
      sources: [
        {
          origin: resolve(__dirname, STATICS),
          destiny: resolve(__dirname, "./dist/assets/libs/iares-ui"),
        },
      ],
    }),*/
		onRebuild((buildParams: BuildHandlerParams) => {
			const { buildVersion } = buildParams;

			if (!isProductionMode) {
				const serverMessage = `DEV Server: ${PROTOCOL}://${HOST}:${PORT}`;
				const buildMessage = `Build: ${buildVersion}`;
				console.log(serverMessage);
				console.log(buildMessage);
				return;
			}
			console.log("-----------------");
			console.log("[ 😎 Build done! ]");
			console.log("-----------------");
			console.log("");
		}),
	],
	loader: {
		".js": "js",
		".jsx": "jsx",
		".ts": "ts",
		".tsx": "tsx",
		".png": "dataurl",
		".jpg": "file",
		".jpeg": "file",
		".svg": "text",
	},
};

try {
	if (isProductionMode) {
		await build(config);
		process.exit(0);
	}

	const serveOptions: ServeOptions = {
		port: PORT,
		host: HOST,
		servedir: SERVEDIR,
	};

	if (PROTOCOL === "https" && KEYPEM && CERTPEM) {
		serveOptions.keyfile = KEYPEM;
		serveOptions.certfile = CERTPEM;
	}

	const ctx = await context(config);
	await ctx.serve(serveOptions);
	await ctx.watch();
} catch (error) {
	console.log(error);
	process.exit(1);
}
