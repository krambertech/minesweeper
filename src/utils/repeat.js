import { List } from 'immutable';

export default function repeat(n, value) {
    const array = [];

    while (n--) {
        array.push(value);
    }

    return new List(array);
}
