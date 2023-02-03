module.exports = class Validator {
    constructor({ name, age }) {
        this.type = name.type;
        this.minLength = name.min;
        this.maxLength = name.max;
        this.ageType = age.type;
        this.minAge = age.min;
        this.maxAge = age.max;
    }

    validate(obj) {
        let errors = [];
        for (let key in obj) {

            if (key === 'name') {
                let objName = {
                    field: '',
                    error: ''
                };
                if (typeof (obj[key]) === this.type) {
                    objName.field = key;
                    if (obj[key].length < this.minLength) {
                        objName.error = `too short, expect ${this.minLength}, got ${obj[key].length}`;
                        errors.push(objName)
                    } else if (obj[key].length > this.maxLength) {
                        objName.error = `too large, expect ${this.maxLength}, got ${obj[key].length}`;
                        errors.push(objName)
                    };
                    if (this.minLength <= obj[key].length && obj[key].length <= this.maxLength) {
                        errors.push(objName)
                    }
                } else if (typeof (obj[key]) !== this.type) {
                    objName.field = 'name';
                    objName.error = `wrong type, expect ${this.type}`;
                    errors.push(objName)
                };
            } else if (key === 'age') {
                let objAge = {
                    field: '',
                    error: ''
                };
                if (typeof (obj[key]) === this.ageType) {
                    objAge.field = key;
                    if (obj[key] < this.minAge) {
                        objAge.error = `too small, exect ${this.minAge}, got ${obj[key]}`;
                        errors.push(objAge)
                    } else if (obj[key] > this.maxAge) {
                        objAge.error = `too big, expect ${this.maxAge}, got ${obj[key]}`;
                        errors.push(objAge)
                    }
                    if (this.minAge <= obj[key] && obj[key] <= this.maxAge) {
                        errors.push(objAge)
                    }

                } else if (typeof (age) !== this.ageType) {
                    objAge.field = 'age';
                    objAge.error = `wrong type, expected ${this.ageType}`;
                    errors.push(objAge)
                }

            }

        }
        return errors;
    }
}

