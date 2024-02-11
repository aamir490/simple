const loginValidate = (values) => {
    const errors = {};

    // Validation email
    if (!values.email) {
        errors.email = 'Please enter your username, phone or email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) && !/^\d{10}$/i.test(values.email) && !/^[a-zA-Z0-9_]{3,30}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    // Validation password
    if (!values.password) {
        errors.password = 'Please enter your password';
    }

    return errors;
};
const forgetValidate = (values) => {
    const errors = {};

    // Validation email
    if (!values.email) {
        errors.email = 'Please enter your username, phone or email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) && !/^\d{10}$/i.test(values.email) && !/^[a-zA-Z0-9_]{3,30}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    return errors;
};
export default forgetValidate;

export const passUpdateValidate = (values) => {
    const errors = {};
   
    // Validation password
    if (!values.password) {
        errors.password = 'Please enter your password';
    } else if (values.password.length < 6) {
        errors.password = 'Password must be 6 characters or more';

    }

    return errors;
};

export const ragisterValidate = (values) => {
    const errors = {};

    // Validation email
    if (!values.email) {
        errors.email = 'Please enter your phone or email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) && !/^\d{10}$/i.test(values.email)) { errors.email = 'Please enter your a valid phone or email' }


    // Validation email
    if (!values.fullname) {
        errors.fullname = 'Please enter your first and last name';
    } else if (!/^[a-zA-Z'-]+\s[a-zA-Z'-]+$/i.test(values.fullname)) {
        errors.fullname = 'Please enter your a valid first and last name';
    }


    // Validation password
    if (!values.password) {
        errors.password = 'Please enter your password';
    } else if (values.password.length < 6) {
        errors.password = 'Password must be 6 characters or more';

    }

    return errors;
};

export const registerMoreInfoValidate = (values) => {
    const errors = {};

   
    if (!values.designation ) {
        errors.designation = 'Please enter your designation';
    }
    if (!values.currentStatus) {
        errors.currentStatus = 'Please enter your currentStatus';
    }
    if (!values.skills) {
        errors.skills = 'Please enter your skills';
    }
    if (!values.locationUser) {
        errors.locationUser = 'Please enter your location';
    }
    
    return errors;
};
export const registerLocation = (values) => {
    const errors = {};

    if (!values.country) {
        errors.country = 'Please enter your country';
    }
    if(!values.city){

        errors.city = 'Please enter your city';
    }
    
    return errors;
};
export const registerskills = (values) => {
    const errors = {};

    if (!values.skillsOption) {
        errors.skillsOption = 'Please enter your Skills';
    }
    
    return errors;
};
