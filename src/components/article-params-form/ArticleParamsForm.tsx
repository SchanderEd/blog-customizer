import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import { Select } from '../select';
import {
	OptionType,
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

type TArticleParamsForm = {
	fontSizeOption: OptionType;
	fontFamilyOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
	onSave?: (articleParams: TArticleParamsForm) => void;
	onReset?: (articleParams: TArticleParamsForm) => void;
};

export const ArticleParamsForm = (props: TArticleParamsForm) => {
	const [isOpen, setOpen] = useState(false);

	const { onSave, onReset } = props;

	const [articleParams, setOption] = useState<TArticleParamsForm>({
		fontFamilyOption: props.fontFamilyOption,
		fontSizeOption: props.fontSizeOption,
		fontColor: props.fontColor,
		backgroundColor: props.backgroundColor,
		contentWidth: props.contentWidth,
	});

	const containerRef = useRef<HTMLElement | null>(null);

	const changeOption = (option: OptionType) => {
		switch (option.optionType) {
			case 'fontFamily':
				setOption({
					...articleParams,
					fontFamilyOption: option,
				});
				break;
			case 'fontColor':
				setOption({
					...articleParams,
					fontColor: option,
				});
				break;
			case 'bgColor':
				setOption({
					...articleParams,
					backgroundColor: option,
				});
				break;
			case 'width':
				setOption({
					...articleParams,
					contentWidth: option,
				});
				break;
			case 'fontSize':
				setOption({
					...articleParams,
					fontSizeOption: option,
				});
				break;
		}
	};

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

	const saveParams = () => {
		document.addEventListener('submit', (evt) => {
			evt.preventDefault();
		});
		onSave ? onSave(articleParams) : null;
	};

	const resetStyle = () => {
		setOption({
			fontColor: defaultArticleState.fontColor,
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontSizeOption: defaultArticleState.fontSizeOption,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
		});
		onReset ? onReset(defaultArticleState) : null;
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
					<Text as={'span'} size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={articleParams.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={changeOption}
					/>
					<RadioGroup
						name='font-size-group'
						options={fontSizeOptions}
						selected={articleParams.fontSizeOption}
						title='Размер шрифта'
						onChange={changeOption}
					/>
					<Select
						selected={articleParams.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={changeOption}
					/>
					<Separator />
					<Select
						selected={articleParams.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={changeOption}
					/>
					<Select
						selected={articleParams.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={changeOption}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetStyle} />
						<Button title='Применить' type='submit' onClick={saveParams} />
					</div>
				</form>
			</aside>
		</>
	);
};
