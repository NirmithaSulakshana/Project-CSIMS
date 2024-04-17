import * as Yup from 'yup';

export const addnewitemvalidation = Yup.object({
 itemName: Yup.string()
    .required('*Item name is required')
    .min(2, '*Item name must be at least 2 characters')
    .max(50, '*Item name must not exceed 50 characters'),
 botonicalName: Yup.string()
    .required('*Botonical name is required')
    .min(2, '*Botonical name must be at least 2 characters')
    .max(50, '*Botonical name must not exceed 50 characters'),
 unitPrice: Yup.number()
    .required('*Unit price is required')
    .positive('*Unit price must be a positive number')
    .min(0.01, '*Unit price must be at least $0.01')
    .max(9999.99, '*Unit price must not exceed $9999.99'),
 barcodeNumber: Yup.string()
    .required('*Barcode number is required')
    .matches(/^[0-9]{13}$/, '*Barcode number must be a valid EAN-13 format')
});
