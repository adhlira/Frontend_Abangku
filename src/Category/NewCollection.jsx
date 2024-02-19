import Item from "../Components/Item/Item";
import new_collect from "../Components/Assets/new_collections";
export default function NewCollection() {
  return (
    <>
      <div className="cloth-container">
        <h2>NEW COLLECTIONS</h2>
        <div className="cloth-item">
          {new_collect.map((item, index) => {
            return <Item key={index} id={item.id} name={item.name.substring(0,40)} image={item.image} rating={item.rating} new_price={item.new_price} old_price={item.old_price} />;
          })}
        </div>
      </div>
    </>
  );
}
