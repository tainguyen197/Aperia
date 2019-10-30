export function formatDate(miliseconds){
    const dateObj = new Date(miliseconds);
    let date = dateObj.getDate();
    let month = dateObj.getMonth() + 1;
    let year = dateObj.getFullYear();
    if(date<10){
        date = "0" + date
    }
    if(month < 10){
        month = "0" + month;
    }

    return year + "-" + month + "-" + date;
}