import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next"],
    skipLibCheck: true,
    noEmit: true,
    typescript: {
      ignoreBuildErrors: true,
    },
    compilerOptions: {
      ignoreErrors: true,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "react/no-unknown-property": "off",
    },
  }),
];

export default eslintConfig;
