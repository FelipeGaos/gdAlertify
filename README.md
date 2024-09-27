# gdAlertify

## Descripción

`gdAlertify` es una biblioteca que permite gestionar alertas, notificaciones y confirmaciones de manera sencilla y elegante en tus aplicaciones web.

---

## Instalación

Para instalar `gdAlertify`, puedes incluir el js y el css en tu archivo proyecto:

```html
<script src="https://cdn.jsdelivr.net/gh/FelipeGaos/gdAlertify@v1.0.0/dist/gdAlertify.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/FelipeGaos/gdAlertify@v1.0.0/dist/gdAlertify.min.css">
```
---

## Funciones

### 1. Alertas

**Función:** `gdAlertify.alert(message, title, options)`

| Parámetro | Tipo    | Descripción                                               |
|-----------|---------|-----------------------------------------------------------|
| `message` | string  | El mensaje que se mostrará en la alerta.                  |
| `title`   | string  | (Opcional) El título de la alerta. Por defecto es `'Alert'`. |
| `options` | object  | (Opcional) Configuración adicional para personalizar la alerta. |
| `options.alertType` | string  | Tipo de alerta (por ejemplo, `'success'`, `'error'`, `'info'`, `'warning'`). |

**Funciones de Atajo para Alertas:**

| Función                        | Descripción                            |
|--------------------------------|----------------------------------------|
| `gdAlertify.alertSuccess(message, options)` | Muestra una alerta de éxito.       |
| `gdAlertify.alertError(message, options)`   | Muestra una alerta de error.       |
| `gdAlertify.alertInfo(message, options)`    | Muestra una alerta de información.  |
| `gdAlertify.alertWarning(message, options)`  | Muestra una alerta de advertencia.  |

---

### 2. Notificaciones

**Función:** `gdAlertify.notify(message, type, duration, position)`

| Parámetro | Tipo    | Descripción                                               |
|-----------|---------|-----------------------------------------------------------|
| `message` | string  | El mensaje de la notificación.                            |
| `type`    | string  | (Opcional) Tipo de notificación (por defecto `'info'`). Puede ser `'success'`, `'error'`, `'info'`, o `'warning'`. |
| `duration`| number  | (Opcional) Tiempo en milisegundos que la notificación permanecerá visible (por defecto `3000` ms). |
| `position`| string  | (Opcional) Posición de la notificación en la pantalla (por defecto es `gdAlertifyConfig.notificationPosition`). |

**Funciones de Atajo para Notificaciones:**

| Función                        | Descripción                            |
|--------------------------------|----------------------------------------|
| `gdAlertify.notiSuccess(message)` | Notificación de éxito.               |
| `gdAlertify.notiError(message)`   | Notificación de error.               |
| `gdAlertify.notiInfo(message)`    | Notificación de información.          |
| `gdAlertify.notiWarning(message)`  | Notificación de advertencia.          |

---

### 3. Confirmaciones

**Función:** `gdAlertify.confirm(config)`

| Parámetro            | Tipo    | Descripción                                               |
|----------------------|---------|-----------------------------------------------------------|
| `config`             | object  | Configuración del modal de confirmación.                 |
| `config.title`       | string  | (Opcional) Título del modal. Por defecto es `'Confirm'`. |
| `config.message`     | string  | El mensaje que se mostrará.                               |
| `config.onConfirm`   | function| Función que se ejecutará si el usuario confirma.         |
| `config.cancelButtonText` | string | (Opcional) Texto del botón de cancelar. Por defecto es `gdAlertifyConfig.defaultCancelText`. |
| `config.confirmButtonText` | string | (Opcional) Texto del botón de confirmar. Por defecto es `gdAlertifyConfig.defaultConfirmText`. |
| `config.buttonColor`  | string  | (Opcional) Color del botón de confirmar (por defecto es `'success'`). |

---

### 3. Loaders

**Función:** `gdAlertify.showLoader(config)`

| Parámetro            | Tipo    | Descripción                                               |
|----------------------|---------|-----------------------------------------------------------|
| `config`             | object  | Configuración del modal de confirmación.                  |
| `config.title`       | string  | Texto para el loader.                                     |
| `config.type`     | string  | Tipo (Actualmente tenemos 1 `spinner`).                      |
| `config.color`   | string| Color en HEX para el texto.                                     |

---

### 5. Configuración Global

**Función:** `window.gdAlertifyConfig(newConfig)`

| Parámetro                     | Tipo    | Descripción                                               |
|-------------------------------|---------|-----------------------------------------------------------|
| `newConfig`                   | object  | Objeto con las propiedades que se desean modificar o agregar a la configuración global. |

**Propiedades de Configuración:**

| Propiedad                     | Tipo    | Descripción                                               |
|-------------------------------|---------|-----------------------------------------------------------|
| `backdropColor`               | string  | Color de fondo del modal.                                |
| `modalColor`                  | string  | Color de fondo del modal.                                |
| `modalTextColor`              | string  | Color del texto en el modal.                             |
| `defaultButtonClass`          | string  | Clase por defecto para los botones.                      |
| `confirmButtonClass`          | string  | Clase del botón de confirmar.                             |
| `cancelButtonClass`           | string  | Clase del botón de cancelar.                              |
| `defaultConfirmText`          | string  | Texto por defecto del botón de confirmar.                |
| `defaultCancelText`           | string  | Texto por defecto del botón de cancelar.                 |
| `defaultOkText`               | string  | Texto por defecto del botón de alerta.                   |
| `canCloseOutside`             | boolean | Permite cerrar el modal haciendo clic fuera de él.      |
| `theme`                       | string  | Tema por defecto de la alerta/modal.                     |
| `defaultNotificationPosition`         | string  | Posición por defecto de las notificaciones (por ejemplo, `'top-right'`). |
| `loaderDefaults`         | object  | Configuración del loader. |
| `loaderDefaults.title`         | string  | Texto para el loader. |
| `loaderDefaults.type`         | string  | Tipo (Actualmente tenemos 1 `spinner`). |
| `loaderDefaults.color`         | string  | Color en HEX para el texto. |
| `loaderDefaults.spinnerColor`         | string  | Color en HEX para el spinner. |

---

### 5. Cambiar el Tema

**Función:** `gdAlertify.setTheme(theme)`

| Parámetro | Tipo   | Descripción                                           |
|-----------|--------|-------------------------------------------------------|
| `theme`   | string | El nombre del nuevo tema a aplicar.                  |

---

### Ejemplo de Uso

```javascript
// Cambiar configuración global
gdAlertifyConfig({
    backdropColor: 'rgba(0, 0, 0, 0.7)',
    notificationPosition: 'bottom-left',
});

// Usar alertas
gdAlertify.alert('Este es un mensaje de alerta', 'Título de Alerta', { alertType: 'info' });
gdAlertify.alertSuccess('Operación realizada con éxito');

// Usar notificaciones
gdAlertify.notify('Este es un mensaje de notificación', 'info', 5000);
gdAlertify.notiError('Error al procesar la solicitud');

// Usar confirmaciones
gdAlertify.confirm({
    title: 'Confirmar acción',
    message: '¿Está seguro de que desea continuar?',
    onConfirm: () => { console.log('Acción confirmada'); },
}); 

//Usar loader
gdAlertify.showLoader({
    title: 'Cargando, por favor espera...',
    type: 'spinner',
    color: '#fff' // Color rojo para el loader
});

gdAlertify.hideLoader()
```
---

## Autor

**Gaos Developers**  
Felipe Gaos

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
