import React, { useState } from "react";
import './SingleCard.css'

function SingleCard({disabled, item ,choiceHandeler, flipped}) {
    let [fORb , setfORb] = useState(false)
     //handelers
    //  const hakdelClick = ()=>{
    //     setfORb(prevFORb => !prevFORb);
    //  }
     const handeler = () =>{
        if (!disabled) {
            choiceHandeler(item)
        }
     }
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        {/* {fORb ?<img className="front" src={item.src} alt='front card'></img> : <img className="back" src="/img/cover.png" srcSet="back card" onClick={handeler}></img>} */}
        <img className="front" src={item.src} alt="card front" />
        <img className="back" src="/img/cover.png" onClick={handeler} alt="cover" />
      </div>
    </div>
  );
}

export default SingleCard;
