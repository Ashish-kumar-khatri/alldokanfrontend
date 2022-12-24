import Joi from 'joi-browser';

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{6,20}$/

export const emailSchema = Joi.string()
                                .required()
                                .email()

export const passwordSchema = Joi.string()
                                .regex(passwordPattern).error(new Error('password must contain at least one upper case,one lower case and special character'))
                                .required()

export const nameSchema = Joi.string()
                            .required()
                            .min(3)
                            .required()

const now = Date.now();
const cutoffDate = new Date(now - (1000 * 60 * 60 * 24 * 365 * 18)); // go back by 18 years
            

export const dateSchema = Joi.date()
                            .max(cutoffDate).error(new Error('you must be at least 18 years old'))
                            .required()

export const phoneSchema = Joi.string()
                                .min(10)
                                .max(10)
                                .required()

export const genderSchema = Joi.string()
                                .required()