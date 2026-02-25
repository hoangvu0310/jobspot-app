module.exports = {
	semi: false,
	trailingComma: 'all',
	singleQuote: true,
	printWidth: 100,
	tabWidth: 2,
	useTabs: true,
	bracketSpacing: true,
	arrowParens: 'always',
	endOfLine: 'lf',
	plugins: ['prettier-plugin-tailwindcss'],
	tailwindConfig: './tailwind.config.js',
	tailwindStylesheet: './src/global.css',
}
