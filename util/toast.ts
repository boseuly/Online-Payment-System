import { toast, type ToastOptions } from "react-toastify";

const defaultOptions: ToastOptions = {
    autoClose: 2500,
};

export const notify = {
    success: (message: string, options?: ToastOptions) =>
        toast.success(message, { ...defaultOptions, ...options }),

    error: (message: string, options?: ToastOptions) =>
        toast.error(message, { ...defaultOptions, ...options }),

    info: (message: string, options?: ToastOptions) =>
        toast.info(message, { ...defaultOptions, ...options }),

    warn: (message: string, options?: ToastOptions) =>
        toast.warn(message, { ...defaultOptions, ...options }),

    // 필요하면 promise 토스트도 래핑 가능
    promise: toast.promise,
};
