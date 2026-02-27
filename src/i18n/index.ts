import i18next, { changeLanguage } from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '@/i18n/locales/en'
import vi from '@/i18n/locales/vi'
import { getItem, setItem, SettingKeys } from '@/common/storage'

export enum LanguageOptions {
	en = 'en',
	vi = 'vi',
}

export const changeAppLanguage = async (lang: LanguageOptions) => {
	await changeLanguage(lang)
	setItem({ key: SettingKeys.LANGUAGE, value: lang as string })
}

// eslint-disable-next-line import/no-named-as-default-member
i18next
	.use(initReactI18next)
	.init({
		compatibilityJSON: 'v4',
		lng: getItem(SettingKeys.LANGUAGE) || LanguageOptions.vi,
		fallbackLng: LanguageOptions.vi,
		resources: {
			en: { translation: en },
			vi: { translation: vi },
		},
		interpolation: {
			escapeValue: false,
		},
		react: {
			useSuspense: false,
		},
	})
	.then((_) => console.log('Init i18n successfully with language:', i18next.language))

export default i18next
