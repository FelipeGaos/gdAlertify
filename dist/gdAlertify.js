(function () {
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

        notificationContainer.className = `gd-notification-container ${position}`;

        const notificationElement = document.createElement('div');
        notificationElement.className = `gd-notification gd-notification-${type}`;
        notificationElement.textContent = message;

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
