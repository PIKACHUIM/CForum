import * as React from 'react';
import { getLocale, setLocale, getTranslations, type Locale, type Translations } from '@/lib/i18n';

export function useI18n(): { locale: Locale; t: Translations; setLocale: (l: Locale) => void } {
	const [locale, setLocaleState] = React.useState<Locale>(() => getLocale());

	React.useEffect(() => {
		function onLocaleChange(e: Event) {
			const next = (e as CustomEvent<Locale>).detail;
			setLocaleState(next);
		}
		window.addEventListener('locale-change', onLocaleChange as EventListener);
		return () => window.removeEventListener('locale-change', onLocaleChange as EventListener);
	}, []);

	const translations = React.useMemo(() => getTranslations(locale), [locale]);

	function handleSetLocale(l: Locale) {
		setLocale(l);
	}

	return { locale, t: translations, setLocale: handleSetLocale };
}
