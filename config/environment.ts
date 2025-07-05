import { join, resolve } from "node:path";
import { getFiles } from "./utils";

const __dirname = import.meta.dir;

export const SOURCES = await getFiles([
	resolve(__dirname, "../src/**/*.{js,jsx,ts,tsx,mdx}"),
]);

export const STATICS = resolve(
	__dirname,
	`../${process?.env?.IARES_UI_STATICS || ""}`,
) as string;

export const SERVEDIR = resolve(__dirname, "../dist");
export const PROTOCOL = process?.env?.PROTOCOL || "http";
export const PORT = process?.env?.PORT ? +process.env.PORT : 3000;
export const HOST = process?.env?.HOST || "localhost";

export const TLS_KEY = process.env.TLS_KEY;
export const TLS_CERT = process.env.TLS_CERT;
export const CERT_PATH = join(__dirname, "..", process.env.CERT_PATH ?? "");
export const KEYPEM = join(CERT_PATH, TLS_KEY ?? "");
export const CERTPEM = join(CERT_PATH, TLS_CERT ?? "");

export const TLS = {
	keyfile: KEYPEM,
	certfile: CERTPEM,
};

export const TLS_OPTIONS = PROTOCOL === "https" && TLS;
