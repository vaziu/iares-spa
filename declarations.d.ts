// declarations.d.ts
declare module "env" {
	export const environment: "development" | "production";
}

declare module "global-jsdom" {
	import type { ConstructorOptions } from "jsdom";

	function globalJsdom(html?: string, options?: ConstructorOptions): () => void;

	export = globalJsdom;
}

declare namespace NodeJS {
	interface ProcessEnv {
		SERVEDIR: string;
		PROTOCOL: "http" | "https";
		HOST: string;
		PORT: string;
		BUILD_VERSION: string;
		IARES_UI_STATICS: string;
		TLS_KEY: string;
		TLS_CERT: string;
		CERT_PATH: string;
		ENVIRONMENT: string;
	}
}

declare global {
	interface EventSourceEventMap<T> {
		message: MessageEvent<T>;
	}
}

declare module "*.mdx" {
	let MDXComponent: (props: any) => JSX.Element;
	export default MDXComponent;
}
