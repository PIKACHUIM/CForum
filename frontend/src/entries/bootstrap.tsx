import '@/styles/globals.css';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { createRoot } from 'react-dom/client';
import * as React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { initTheme } from '@/lib/theme';

// 二次元粉色主题 token
const animeTheme = {
	token: {
		colorPrimary: '#e879a0',
		colorPrimaryHover: '#f472b6',
		colorPrimaryActive: '#db2777',
		colorLink: '#e879a0',
		colorLinkHover: '#f472b6',
		borderRadius: 12,
		borderRadiusLG: 16,
		borderRadiusSM: 8,
		fontFamily: "'Noto Sans SC', 'ZCOOL KuaiLe', sans-serif",
		colorBgContainer: 'rgba(255,249,251,0.95)',
		colorBorder: '#f9a8d4',
		colorBorderSecondary: '#fce7f3',
		boxShadow: '0 4px 20px rgba(232,121,160,0.12)',
		boxShadowSecondary: '0 2px 12px rgba(201,184,232,0.15)',
	},
	components: {
		Button: {
			borderRadius: 20,
			borderRadiusLG: 24,
			borderRadiusSM: 16,
		},
		Input: {
			borderRadius: 12,
			activeShadow: '0 0 0 3px rgba(255,183,197,0.4)',
		},
		Select: {
			borderRadius: 12,
		},
		Card: {
			borderRadius: 16,
		},
	},
};

export function mount(nodeId: string, element: React.ReactNode) {
	initTheme();
	const el = document.getElementById(nodeId);
	if (!el) throw new Error(`Missing root element #${nodeId}`);
	createRoot(el).render(
		<React.StrictMode>
			<ConfigProvider locale={zhCN} theme={animeTheme}>
				{element}
			</ConfigProvider>
		</React.StrictMode>
	);
}
