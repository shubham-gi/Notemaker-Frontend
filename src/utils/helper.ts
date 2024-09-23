export const validateEmail = (email: string) => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return validRegex.test(email)
}
export const getInitials=(name: string)=> {
    let initials="";
    const words=name.split(" ");
    for(let i=0;i<Math.min(2,words.length);i++){
        initials+=words[i][0].toUpperCase();
    }
    return initials.toUpperCase();
}
export const getFirstName=(name: string)=> {
    return name.split(" ")[0];
}
