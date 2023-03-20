const getRandomInteger = (min, max) => {
    if (min < 0) {
        return 'Минимальное значение не должно быть меньше 0';
    }
    if (max === min || min > max) {
        return 'Максимальное значение должно быть больше минимального';
    }
    return Math.floor(Math.random() * (max + 1 - min) + min);
};


const getRandomFloat = (min, max, round) => {
    if (min < 0) {
        return 'Минимальное значение не должно быть меньше 0';
    }
    if (max === min || min > max) {
        return 'Максимальное значение должно быть больше минимального';
    }
    return (Math.random() * (max - min) + min).toFixed(round);
};

