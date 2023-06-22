export class Helper {
    static toCurrency(value) {
        try {
            return Number(Number(value).toFixed(1)).toLocaleString();
        } catch (err) {
            return 0;
        }
    }

    static toNumber(value) {
        try {
            let returnValue =
                value === "" ? 0 : value.toString().replaceAll(",", "");

            return returnValue;
        } catch (err) {
            return 0;
        }
    }

    static addItemCache = (cacheName, data) => {
        // if (localStorage.getItem(cacheName) === null) {
        localStorage.setItem(cacheName, JSON.stringify(data));
        // }
    };

    static getItemCache = (cacheName) => {
        return JSON.parse(localStorage.getItem(cacheName));
    };

    static getArrOfObjectDifference = (a, b, keyReference) => {
        if (a === null) {
            return;
        }
        if (b === null) {
            return;
        }

        const isSame = (a, b) => a.name === b.name;

        // Get items that only occur in thtypee left array,
        // using the compareFunction to determine equality.
        const onlyInLeft = (left, right, compareFunction) =>
            left.filter(
                (leftValue) =>
                    !right.some((rightValue) =>
                        compareFunction(leftValue, rightValue)
                    )
            );

        const onlyInA = onlyInLeft(a, b, isSame);
        const onlyInB = onlyInLeft(b, a, isSame);

        const result = [...onlyInA, ...onlyInB];

        return result;
    };

    static copyArray = (value) => {
        let temp = [...value];
        return temp;
    };

    static isEmptyObject(value) {
        return Object.keys(value).length === 0 && value.constructor === Object;
    }
}
export default Helper;
