import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type TArrowButtonProp = {
	isOpen: boolean;
	onOpen: (isOpen: boolean) => void;
	dataset?: string;
};

export const ArrowButton = (props: TArrowButtonProp) => {
	let { isOpen } = props;
	const { onOpen } = props;
	const { dataset } = props;
	const onClickHandler: OnClick = () => {
		isOpen ? (isOpen = false) : (isOpen = true);

		onOpen(isOpen);
	};

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			onClick={onClickHandler}
			data-target={dataset}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={`
				${styles.container}
				${isOpen ? styles.container_open : ''}
			`}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={`
					${styles.arrow}
					${isOpen ? styles.arrow_open : ''}
				`}
			/>
		</div>
	);
};
