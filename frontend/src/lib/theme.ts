export type Theme = 'light' | 'dark';
export type ColorTheme = 'pink-cute' | 'blue-tech' | 'glass' | 'dark-tech';

export const COLOR_THEMES: { value: ColorTheme; icon: string }[] = [
	{ value: 'pink-cute', icon: '🌸' },
	{ value: 'blue-tech', icon: '💎' },
	{ value: 'glass', icon: '🪟' },
	{ value: 'dark-tech', icon: '🖤' },
];

const THEME_KEY = 'theme';
const COLOR_THEME_KEY = 'color-theme';

function isTheme(value: unknown): value is Theme {
	return value === 'light' || value === 'dark';
}

function isColorTheme(value: unknown): value is ColorTheme {
	return value === 'pink-cute' || value === 'blue-tech' || value === 'glass' || value === 'dark-tech';
}

export function getTheme(): Theme {
	try {
		const stored = localStorage.getItem(THEME_KEY);
		if (isTheme(stored)) return stored;
	} catch {}
	return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function getColorTheme(): ColorTheme {
	try {
		const stored = localStorage.getItem(COLOR_THEME_KEY);
		if (isColorTheme(stored)) return stored;
	} catch {}
	return 'glass';
}

export function applyTheme(theme: Theme) {
	document.documentElement.classList.toggle('dark', theme === 'dark');
	document.documentElement.style.colorScheme = theme;
	try {
		localStorage.setItem(THEME_KEY, theme);
	} catch {}
	window.dispatchEvent(new CustomEvent('theme-change', { detail: theme }));
}

export function applyColorTheme(colorTheme: ColorTheme) {
	// 移除所有主题类
	document.documentElement.classList.remove('theme-pink-cute', 'theme-blue-tech', 'theme-glass', 'theme-dark-tech');
	// 添加新主题类
	document.documentElement.classList.add(`theme-${colorTheme}`);
	try {
		localStorage.setItem(COLOR_THEME_KEY, colorTheme);
	} catch {}

	// dark-tech 主题强制暗色模式
	if (colorTheme === 'dark-tech') {
		applyTheme('dark');
	}

	window.dispatchEvent(new CustomEvent('color-theme-change', { detail: colorTheme }));
}

export function toggleTheme() {
	applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
}

export function setColorTheme(colorTheme: ColorTheme) {
	applyColorTheme(colorTheme);
}

export function initTheme() {
	const w = window as any;
	if (w.__theme_inited) return;
	w.__theme_inited = true;
	applyTheme(getTheme());
	applyColorTheme(getColorTheme());
}
