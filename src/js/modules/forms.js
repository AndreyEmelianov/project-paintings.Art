import checkNumberInputs from './checkNumberInputs';

const forms = () => {
	const formes = document.querySelectorAll('form'),
		inputs = document.querySelectorAll('input');

	// checkNumberInputs('input[name="user_phone"]');

	const message = {
		loading: 'Загрузка...',
		success: 'Спасибо! Мы скоро с вами свяжемся',
		failure: 'Что-то пошло не так...',
		spinner: 'assets/img/spinner.gif',
		ok: 'assets/img/ok.png',
		fail: 'assets/img/fail.png',
	};

	const path = {
		designer: 'assets/server.php',
		question: 'assets/question.php',
	};

	const postData = async (url, data) => {
		let res = await fetch(url, {
			method: 'POST',
			body: data,
		});

		return await res.text();
	};

	const clearInputs = () => {
		inputs.forEach((input) => {
			input.value = '';
		});
	};

	formes.forEach((form) => {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			form.parentNode.appendChild(statusMessage);

			form.classList.add('animated', 'fadeOutUp');
			setTimeout(() => {
				form.style.display = 'none';
			}, 400);

			let statusImg = document.createElement('img');
			statusImg.setAttribute('src', message.spinner);
			statusImg.classList.add('animated', 'fadeInUp');
			statusMessage.appendChild(statusImg);

			let textMessage = document.createElement('div');
			textMessage.textContent = message.loading;
			statusMessage.appendChild(textMessage);

			const formData = new FormData(form);
			if (form.getAttribute('data-calc') === 'end') {
				for (let key in state) {
					formData.append(key, state[key]);
				}
			}

			postData('assets/server.php', formData)
				.then((res) => {
					statusMessage.textContent = message.success;
				})
				.catch(() => {
					statusMessage.textContent = message.failure;
				})
				.finally(() => {
					clearInputs();
					setTimeout(() => {
						statusMessage.remove();
					}, 5000);
				});
		});
	});
};

export default forms;
