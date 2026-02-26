// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')
const prettierPlugin = require('eslint-plugin-prettier')

module.exports = defineConfig([
	expoConfig,
	{
		plugins: {
			prettier: prettierPlugin,
		},

		rules: {
			'prettier/prettier': 'error',

			'react/react-in-jsx-scope': 'off', // React 17+
			'react/display-name': 'off', // tránh lỗi forwardRef
			'react/prop-types': 'off', // dùng TypeScript

			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
			],
			'@typescript-eslint/no-explicit-any': 'warn',
		},
	},

	{
		ignores: [
			'dist/*',
			'node_modules/*',
			'ios/*',
			'android/*',
			'bin/*',
			'build/*',
			'expo-env.d.ts',
			'bun.lock',
			'.expo/*',
		],
	},
])
