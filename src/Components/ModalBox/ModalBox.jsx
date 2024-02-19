import { useState } from "react";

 export default function SizeAlertModal() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

   return (
     <div>
       <button className="toggle-button" onClick={toggleModal}>
         Toggle
       </button>
       <div className={`modal ${showModal ? "" : "off"}`}>
         <h2>Modal Window</h2>
         <div className="content">
           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis deserunt corrupti, ut fugit magni qui quasi nisi amet repellendus non fuga omnis a sed impedit explicabo accusantium nihil doloremque consequuntur.
         </div>
         <div className="actions">
           <button className="toggle-button" onClick={toggleModal}>
             OK
           </button>
         </div>
       </div>
     </div>
   );
 }
