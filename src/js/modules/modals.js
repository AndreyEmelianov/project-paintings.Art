const modals = () => {
	let isBtnPressed = false;

	function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
		const trigger = document.querySelectorAll(triggerSelector),
			modal = document.querySelector(modalSelector),
			close = document.querySelector(closeSelector),
			windowsModal = document.querySelectorAll('[data-modal]'),
			scroll = calcScroll();

		trigger.forEach((triggerItem) => {
			triggerItem.addEventListener('click', (e) => {
				if (e.target) {
					e.preventDefault();
				}

				isBtnPressed = true;

				if (destroy) {
					triggerItem.remove();
				}

				windowsModal.forEach((windModal) => {
					windModal.style.display = 'none';
					windModal.classList.add('animated', 'fadeIn');
				});

				modal.style.display = 'block';
				document.body.style.overflow = 'hidden';
				document.body.style.marginRight = `${scroll}px`;
			});
		});

		close.addEventListener('click', () => {
			windowsModal.forEach((windModal) => {
				windModal.style.display = 'none';
			});

			modal.style.display = 'none';
			document.body.style.overflow = '';
			document.body.style.marginRight = `0px`;
		});

		modal.addEventListener('click', (e) => {
			if (e.target === modal) {
				windowsModal.forEach((windModal) => {
					windModal.style.display = 'none';
				});

				modal.style.display = 'none';
				document.body.style.overflow = '';
				document.body.style.marginRight = `0px`;
			}
		});
	}

	function showModalByTime(selector, time) {
		setTimeout(() => {
			let display;

			document.querySelectorAll('[data-modal]').forEach((modalItem) => {
				if (getComputedStyle(modalItem).display !== 'none') {
					display = 'block';
				}
			});

			if (!display) {
				document.querySelector(selector).style.display = 'block';
				document.body.style.overflow = 'hidden';

				let scroll = calcScroll();
				document.body.style.marginRight = `${scroll}px`;
			}
		}, time);
	}

	function calcScroll() {
		let div = document.createElement('div');

		div.style.width = '50px';
		div.style.height = '50px';
		div.style.overflowY = 'scroll';
		div.style.visibility = 'hidden';

		document.body.appendChild(div);

		let scrollWidth = div.offsetWidth - div.clientWidth;
		div.remove();

		return scrollWidth;
	}

	function openModalByScroll(selector) {
		window.addEventListener('scroll', () => {
			let scrollHeight = Math.max(
				document.documentElement.scrollHeight,
				document.body.scrollHeight
			);

			if (
				!isBtnPressed &&
				window.pageYOffset + document.documentElement.clientHeight >= scrollHeight
			) {
				document.querySelector(selector).click();
			}
		});
	}

	bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
	bindModal(
		'.button-consultation',
		'.popup-consultation',
		'.popup-consultation .popup-close'
	);
	bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);

	openModalByScroll('.fixed-gift');

	showModalByTime('.popup-consultation', 60000);
};

export default modals;
