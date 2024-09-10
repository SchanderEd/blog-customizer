import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import { Select } from '../select';
import {
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from '../text';

type TArticleParamsForm = {
	fontSize: OptionType;
	fontFamily: OptionType;
	fontColor: OptionType;
	bgColor: OptionType;
	contentWidth: OptionType;
};

export const ArticleParamsForm = (props: TArticleParamsForm) => {
	const [isOpen, setOpen] = useState(true); // Не забыть поставить false

	const [articleParams, setOption] = useState<TArticleParamsForm>({
		fontFamily: props.fontFamily,
		fontSize: props.fontSize,
		fontColor: props.fontColor,
		bgColor: props.bgColor,
		contentWidth: props.contentWidth,
	});

	const containerRef = useRef<HTMLElement | null>(null);

	const changeFontSize = (option: OptionType) => {
		setOption({
			...articleParams,
			fontSize: option,
		});
	};

	const changeFontFamily = (option: OptionType) => {
		setOption({
			...articleParams,
			fontFamily: option,
		});
	};

	const changeColorFonts = (option: OptionType) => {
		setOption({
			...articleParams,
			fontColor: option,
		});
	};

	const changeBgColor = (option: OptionType) => {
		setOption({
			...articleParams,
			bgColor: option,
		});
	};

	const changeWidth = (option: OptionType) => {
		setOption({
			...articleParams,
			contentWidth: option,
		});
	};

	const handleClose = (evt: Event) => {
		containerRef.current?.contains(evt.target as HTMLElement) ||
		(evt.target as HTMLElement).dataset.target === 'article-openButton' ||
		(evt.target as HTMLElement).dataset.select === 'select-item'
			? null
			: 'test'; //setOpen(false); нужно потом расскоментировать
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
						selected={articleParams.fontFamily}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={changeFontFamily}
					/>
					<RadioGroup
						name='font-size-group'
						options={fontSizeOptions}
						selected={articleParams.fontSize}
						title='Размер шрифта'
						onChange={changeFontSize}
					/>
					<Select
						selected={articleParams.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={changeColorFonts}
					/>
					<Separator />
					<Select
						selected={articleParams.bgColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={changeBgColor}
					/>
					<Select
						selected={articleParams.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={changeWidth}
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
