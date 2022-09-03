import "./die.css";

export default function Die(props){
    const dieClass = props.isHeld ? "die is-held" : "die";
    
    return (
        <div className={dieClass} onClick={()=>props.handleClick(props.id)}>
            <span className="value" >
                {props.value}
            </span>
        </div>
        )            
}