import Joi from 'joi-browser';

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{6,20}$/

export const emailSchema = Joi.string()
                                .required()
                                .email()


export const passwordSchema = Joi.string()
                                .regex(passwordPattern).error(new Error('password must contain at least one upper case,one lower case and special character'))
                                .required()

// export const repeatPasswordSchema = Joi.string()
//                                         .valid(Joi.ref('password'))
//                                 .required()
                                
                
export const nameSchema = Joi.string()
                            .required()
                            .min(3)
                            .required()


export const dateSchema = Joi.date()
                            .required()


export const phoneSchema = Joi.number()
                                .min(10)
                                .max(10)
                                .required()


export const genderSchema = Joi.string()
                                .required()