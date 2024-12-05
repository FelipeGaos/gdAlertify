(function () {

    const SuccessIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"></path></svg>
    `;

    const WarningIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height="20" width="20"><path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"></path></svg>
    `;

    const InfoIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd"></path></svg>
    `;

    const ErrorIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
    `;

    const CloseIcon = `
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M2.96967 2.96967C3.26256 2.67678 3.73744 2.67678 4.03033 2.96967L8 6.939L11.9697 2.96967C12.2626 2.67678 12.7374 2.67678 13.0303 2.96967C13.3232 3.26256 13.3232 3.73744 13.0303 4.03033L9.061 8L13.0303 11.9697C13.2966 12.2359 13.3208 12.6526 13.1029 12.9462L13.0303 13.0303C12.7374 13.3232 12.2626 13.3232 11.9697 13.0303L8 9.061L4.03033 13.0303C3.73744 13.3232 3.26256 13.3232 2.96967 13.0303C2.67678 12.7374 2.67678 12.2626 2.96967 11.9697L6.939 8L2.96967 4.03033C2.7034 3.76406 2.6792 3.3474 2.89705 3.05379L2.96967 2.96967Z"></path></svg>
    `;

    const gdAlertifyConfig = {
        backdropColor: 'rgba(0, 0, 0, 0.5)',
        modalColor: '#fff',
        modalTextColor: '#000',
        defaultButtonClass: 'gd-button',
        confirmButtonClass: 'gd-button gd-button-danger',
        cancelButtonClass: 'gd-button gd-button-default',
        defaultConfirmText: 'Confirm',
        defaultCancelText: 'Cancel',
        defaultOkText: 'OK',
        canCloseOutside: true,
        theme: 'light',
        defaultNotificationPosition: 'top-right',
        loaderDefaults: {
            title: 'Loading...',
            type: 'default', // 'default', 'spinner', 'pulse'
            color: '#ffffff', // Color por defecto para el loader
            spinnerColor: '#00aaff'
        }
    };

    const notificationContainer = document.createElement('div');
    notificationContainer.className = 'gd-notification-container';
    document.body.appendChild(notificationContainer);

    const createModal = (config = {}) => {
        const defaultConfig = {
            type: 'alert',
            title: 'Alert',
            message: 'This is a message.',
            buttons: null,
            onConfirm: null,
            canCloseOutside: gdAlertifyConfig.canCloseOutside,
            alertType: 'default'
        };

        const { type, title, message, buttons, onConfirm, canCloseOutside, alertType, duration } = { ...defaultConfig, ...config };

        const backdrop = document.createElement('div');
        backdrop.className = 'gd-modal-backdrop';
        backdrop.style.backgroundColor = gdAlertifyConfig.backdropColor;

        const modalElement = document.createElement('div');
        modalElement.className = `gd-modal gd-modal-enter ${gdAlertifyConfig.theme}`;

        const modalContent = `
            <div class="gd-modal-header gd-alert-${alertType}">
                <span>${title}</span>
                ${canCloseOutside ? '<button class="gd-close-btn">&times;</button>' : ''}
            </div>
            <div class="gd-modal-body">${message}</div>
            <div class="gd-modal-footer"></div>
        `;
        modalElement.innerHTML = modalContent;

        const footer = modalElement.querySelector('.gd-modal-footer');

        const defaultButtons = type === 'confirm'
            ? [
                {
                    text: gdAlertifyConfig.defaultCancelText,
                    class: gdAlertifyConfig.cancelButtonClass,
                    onClick: closeModal
                },
                {
                    text: gdAlertifyConfig.defaultConfirmText,
                    class: gdAlertifyConfig.confirmButtonClass,
                    onClick: () => { onConfirm && onConfirm(); closeModal(); }
                }
            ]
            : [
                {
                    text: gdAlertifyConfig.defaultOkText,
                    class: gdAlertifyConfig.defaultButtonClass,
                    onClick: closeModal
                }
            ];

        (buttons || defaultButtons).forEach(button => {
            const btn = document.createElement('button');
            btn.className = button.class || gdAlertifyConfig.defaultButtonClass;
            btn.textContent = button.text || 'OK';
            btn.addEventListener('click', button.onClick || closeModal);
            footer.appendChild(btn);
        });

        document.body.appendChild(backdrop);
        document.body.appendChild(modalElement);
        modalElement.classList.add('gd-modal-enter');

        function closeModal() {
            backdrop.classList.add('gd-modal-backdrop-exit');
            modalElement.classList.remove('gd-modal-enter');
            modalElement.classList.add('gd-modal-exit');

            modalElement.addEventListener('animationend', () => {
                document.body.removeChild(modalElement);
                document.body.removeChild(backdrop);
            }, { once: true });
        }

        if (canCloseOutside) {
            backdrop.addEventListener('click', closeModal);
            modalElement.querySelector('.gd-close-btn')?.addEventListener('click', closeModal);
            modalElement.addEventListener('click', (event) => {
                if (event.target === modalElement) {
                    closeModal();
                }
            });
        }

        if (duration) {
            setTimeout(closeModal, duration);
        }
    };

    const gdAlertify = (config = {}) => {
        createModal(config);
    };

    gdAlertify.alert = (message, title = 'Alert', options = {}) => {
        createModal({
            type: 'alert',
            title,
            message,
            alertType: 'default',
            ...options
        });
    };

    gdAlertify.confirm = (config) => {
        function closeModal() {
            const modalElement = document.querySelector('.gd-modal');
            if (modalElement) {
                modalElement.classList.remove('gd-modal-enter');
                modalElement.classList.add('gd-modal-exit');
                modalElement.addEventListener('animationend', () => {
                    document.body.removeChild(modalElement);
                    const backdrop = document.querySelector('.gd-modal-backdrop');
                    if (backdrop) {
                        document.body.removeChild(backdrop);
                    }
                }, { once: true });
            }
        }

        const defaultConfig = {
            type: 'confirm',
            title: 'Confirm',
            message: 'Are you sure?',
            onConfirm: null,
            buttonColor: 'primary',
            buttons: [
                {
                    text: config.cancelButtonText || gdAlertifyConfig.defaultCancelText,
                    class: gdAlertifyConfig.cancelButtonClass,
                    onClick: closeModal
                },
                {
                    text: config.confirmButtonText || gdAlertifyConfig.defaultConfirmText,
                    class: `gd-button gd-button-${config.buttonColor || 'success'}`,
                    onClick: () => { config.onConfirm && config.onConfirm(); closeModal(); }
                }
            ]
        };
        createModal({ ...defaultConfig, ...config });
    };

    const cleanNotificationContainer = () => {
        if (notificationContainer.children.length === 0) {
            document.body.removeChild(notificationContainer);
        }
    };

    gdAlertify.notify = (message, type = 'info', duration = 3000, position = gdAlertifyConfig.defaultNotificationPosition) => {
        if (!document.body.contains(notificationContainer)) {
            document.body.appendChild(notificationContainer);
        }

        notificationContainer.className = `gd-notification-container toaster-container ${position}`;

        const notificationElement = document.createElement('div');
        notificationElement.className = `gd-notification gd-notification-${type}`;
        notificationElement.innerHTML = SuccessIcon + message;
        notificationElement.setAttribute('data-gd-toaster', '');
        notificationElement.setAttribute('data-theme', 'light');
        notificationElement.setAttribute('data-styled', 'true');
        notificationElement.setAttribute('data-type', type);

        notificationContainer.appendChild(notificationElement);

        setTimeout(() => {
            notificationElement.classList.add('fade-out');
            notificationElement.addEventListener('animationend', () => {
                notificationContainer.removeChild(notificationElement);
                cleanNotificationContainer();
            });

            notificationElement.addEventListener('transitionend', () => {
                if (notificationElement.parentNode) {
                    notificationElement.parentNode.removeChild(notificationElement);
                }
            });
        }, duration);
    };

    gdAlertify.showLoader = (config = {}) => {
        const { title, color, spinnerColor } = {
            ...gdAlertifyConfig.loaderDefaults,
            ...config
        };

        // Comprobar si ya existe un loader
        const existingLoader = document.querySelector('.gd-loader');
        if (existingLoader) {
            // Si existe, simplemente actualiza el texto del loader
            existingLoader.querySelector('span').textContent = title;
            return; // Salir de la función
        }

        // Crear el backdrop si no existe
        const backdrop = document.createElement('div');
        backdrop.className = 'gd-modal-backdrop';
        backdrop.style.backgroundColor = gdAlertifyConfig.backdropColor;
        document.body.appendChild(backdrop);

        // Crear el elemento del loader
        const loaderElement = document.createElement('div');
        loaderElement.className = 'gd-loader';

        // Agregar el spinner
        const spinner = document.createElement('div');
        spinner.className = 'gd-loader-spinner';
        spinner.style.borderTopColor = spinnerColor || gdAlertifyConfig.loaderDefaults.spinnerColor;

        loaderElement.appendChild(spinner);

        // Agregar el texto del loader
        const titleElement = document.createElement('span');
        titleElement.textContent = title;
        titleElement.style.color = color;
        loaderElement.appendChild(titleElement);

        document.body.appendChild(loaderElement);
    };

    gdAlertify.hideLoader = () => {
        const loaderElement = document.querySelector('.gd-loader');
        const backdrop = document.querySelector('.gd-modal-backdrop');

        // Solo proceder si existe el loader
        if (loaderElement) {
            loaderElement.classList.add('fade-out');
            if (backdrop) {
                backdrop.classList.add('fade-out');
            }

            document.body.removeChild(loaderElement);
            document.body.removeChild(backdrop);
        }
    };

    gdAlertify.showLoader2 = (config = {}) => {
        const { title, color, spinnerColor } = {
            ...gdAlertifyConfig.loaderDefaults,
            ...config
        };

        // Comprobar si ya existe un loader
        const existingLoader = document.querySelector('.gd-loader');
        if (existingLoader) {
            // Si existe, simplemente actualiza el texto del loader
            existingLoader.querySelector('span').textContent = title;
            return; // Salir de la función
        }

        // Crear el backdrop si no existe
        const backdrop = document.createElement('div');
        backdrop.className = 'gd-modal-backdrop';
        backdrop.style.backgroundColor = gdAlertifyConfig.backdropColor;
        document.body.appendChild(backdrop);

        // Crear el contenedor del loader
        const loaderElement = document.createElement('div');
        loaderElement.className = 'gd-loader-2';

        loaderElement.innerHTML = '<span><svg width="40" height="40" version="1.1" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="15"></svg></span>';

        document.body.appendChild(loaderElement);

        // Agregar el texto del loader
        const titleElement = document.createElement('div');
        titleElement.textContent = title;
        titleElement.style.color = color;
        loaderElement.appendChild(titleElement);

        document.body.appendChild(loaderElement);
    }

    gdAlertify.hideLoader2 = () => {
        var body = document.body;
        var loader = document.getElementById("loader");

        if (loader) {
            // Eliminar el loader y la clase de body
            body.classList.remove("loader");
            loader.remove();
        }
    }

    gdAlertify.alertSuccess = (message, options = {}) => {
        gdAlertify.alert(message, 'Success', { ...options, alertType: 'success' });
    };

    gdAlertify.alertError = (message, options = {}) => {
        gdAlertify.alert(message, 'Error', { ...options, alertType: 'error' });
    };

    gdAlertify.alertInfo = (message, options = {}) => {
        gdAlertify.alert(message, 'Info', { ...options, alertType: 'info' });
    };

    gdAlertify.alertWarning = (message, options = {}) => {
        gdAlertify.alert(message, 'Warning', { ...options, alertType: 'warning' });
    };

    gdAlertify.notiSuccess = (message) => {
        gdAlertify.notify(message, 'success');
    };

    gdAlertify.notiError = (message) => {
        gdAlertify.notify(message, 'error');
    };

    gdAlertify.notiInfo = (message) => {
        gdAlertify.notify(message, 'info');
    };

    gdAlertify.notiWarning = (message) => {
        gdAlertify.notify(message, 'warning');
    };

    gdAlertify.setTheme = (theme) => {
        gdAlertifyConfig.theme = theme;
    };

    window.gdAlertifyConfig = (newConfig) => {
        Object.assign(gdAlertifyConfig, newConfig);
    };

    window.gdAlertify = gdAlertify;
})();
