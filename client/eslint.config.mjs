import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // This is where you add custom rules or override inherited ones
    rules: {
      // 1. Disable 'react/no-unescaped-entities'
      // This is the error for apostrophes (') and quotes (") inside JSX text.
      // While fixing them with &apos; or &quot; is best practice,
      // you can turn this off if you prefer direct characters and accept the warning.
      "react/no-unescaped-entities": "off",

      // 2. Disable '@typescript-eslint/no-unused-vars'
      // This flags variables/imports that are defined but never used.
      // Setting to 'warn' is a good compromise, so it doesn't break the build.
      "@typescript-eslint/no-unused-vars": "off", // or "warn"

      // 3. Disable '@typescript-eslint/no-explicit-any'
      // This flags the use of the 'any' type in TypeScript.
      // It's generally good to avoid 'any', but if you need to bypass it for now:
      "@typescript-eslint/no-explicit-any": "off", // or "warn"

      // You can add more rules here as needed:
      // "no-console": "warn", // Example: show console.log as a warning
    }
  }
];

export default eslintConfig;
