import data_product from "../Assets/data";
import Item from "../Item/Item";


export default function Popular() {
  return (
    <>
      <div className="cloth-container">
        <h2>POPULAR IN WOMAN</h2>
        <div className="cloth-item">
            {data_product.map((item, index)=>{
                return <Item key={index} id={item.id} name={item.name} image={item.image} rating={item.rating}
              new_price = {item.new_price} old_price={item.old_price}  />
            })}
        </div>
      </div>
    </>
  );
}
