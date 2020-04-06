module.exports = (date) => {
    monName = new Array ("janeiro", "fevereiro", "março", "abril", "Maio", "junho", "agosto", "outubro", "novembro", "dezembro");
    let month = monName[date.getMonth()];
    return ' dia ' + date.getDate() + ' de ' +  month;
}

