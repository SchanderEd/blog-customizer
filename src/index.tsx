import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { OptionType, defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

type TArticleParams = {
	fontSizeOption: OptionType;
	fontFamilyOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
};

const App = () => {
	const [styleParams, setParams] = useState<TArticleParams>({
		fontSizeOption: defaultArticleState.fontSizeOption,
		fontFamilyOption: defaultArticleState.fontFamilyOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
	});

	const changeStyles = (articleParams: TArticleParams) => {
		setParams({
			fontSizeOption: articleParams.fontSizeOption,
			fontFamilyOption: articleParams.fontFamilyOption,
			fontColor: articleParams.fontColor,
			backgroundColor: articleParams.backgroundColor,
			contentWidth: articleParams.contentWidth,
		});
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': styleParams.fontFamilyOption.value,
					'--font-size': styleParams.fontSizeOption.value,
					'--font-color': styleParams.fontColor.value,
					'--container-width': styleParams.contentWidth.value,
					'--bg-color': styleParams.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				fontFamilyOption={styleParams.fontFamilyOption}
				fontSizeOption={styleParams.fontSizeOption}
				fontColor={styleParams.fontColor}
				backgroundColor={styleParams.backgroundColor}
				contentWidth={styleParams.contentWidth}
				onSave={changeStyles}
				onReset={changeStyles}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
