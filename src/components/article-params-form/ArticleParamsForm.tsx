import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import { Select } from '../select';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from '../text';

export const ArticleParamsForm = () => {
	const [isOpen, setOpen] = useState(false);

	const containerRef = useRef<HTMLElement | null>(null);

	const handleClose = (evt: Event) => {
		containerRef.current?.contains(evt.target as HTMLElement) ||
		(evt.target as HTMLElement).dataset.target === 'article-openButton' ||
		(evt.target as HTMLElement).dataset.select === 'select-item'
			? null
			: setOpen(false);
	};

	const handleOpenChange = (isOpen: boolean) => {
		setOpen(isOpen);

		isOpen
			? document.addEventListener('click', handleClose)
			: document.removeEventListener('click', handleClose);
	};

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onOpen={handleOpenChange}
				dataset='article-openButton'
			/>
			<aside
				className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
				ref={containerRef}>
				<form className={styles.form}>
					<Text as={'span'} size={31} weight={800} dynamicLite uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={defaultArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						name='Шрифты'
						options={fontSizeOptions}
						selected={defaultArticleState.fontSizeOption}
						title='Размер шрифта'
					/>
					<Select
						selected={defaultArticleState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={defaultArticleState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={defaultArticleState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
