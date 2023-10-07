import * as Yup from 'yup';

export const loginSchema = Yup.object({
    email: Yup.string().email().required('Please enter your email'),
    password: Yup.string().required("Please enter your password")
})

export const signUpSchema = Yup.object({
    name: Yup.string().min(4).max(16).required("Please enter your name."),
    username: Yup.string().min(4).max(16).required("Please enter your username."),
    email: Yup.string().email().required("Please enter your email."),
    password: Yup.string().min(4).max(36).required("Please enter your password."),
});

export const postSchema = Yup.object().shape({
    title: Yup.string().min(4).max(100).required("Please enter your title."),
    description: Yup.string().min(4).max(600)
});

export const updateSchema = Yup.object().shape({
    name: Yup.string().min(4).max(16),
    username: Yup.string().min(4).max(16),
    email: Yup.string().min(4).max(36),
    password: Yup.string().min(4).max(36),
});

export const nameUpdateSchema = Yup.object({
    name: Yup.string().min(4).max(16).required("Please enter your name."),
});

export const usernameUpdateSchema = Yup.object({
    username: Yup.string().min(4).max(16).required("Please enter your username."),
});

export const emailUpdateSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email."),
});

export const passwordUpdateSchema = Yup.object({
    password: Yup.string().min(4).max(36).required("Please enter your password."),
});