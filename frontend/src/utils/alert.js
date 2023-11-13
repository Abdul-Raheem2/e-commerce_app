
export default function newAlert(alert){
    return (message,type)=>{
        alert.show(message,{type});
    }
}