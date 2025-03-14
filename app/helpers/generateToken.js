
export const generateToken = () =>{
    var rand = function() {
        return Math.random().toString(36).slice(2); // remove `0.`
    };
    
    var token = function() {
        return rand() + rand(); // to make it longer
    };
    
    return token();
}