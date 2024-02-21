import ItemCategory from "../Components/Item/ItemCategory";
import new_collections from "../Components/Assets/new_collections";
export default function NewCollection() {
  const totalProduct = new_collections.reduce((acc) => {
    return acc + 1;
  }, 0);
  return (
    <>
      <div className="cloth-category">
        <h5 className="showing">
          <span>Showing </span> 1 -{totalProduct} of the products new collection
        </h5>
        <h2>NEW COLLECTIONS</h2>
        <div className="cloth-item-cetegory">
          {new_collections.map((item, index) => {
            return <ItemCategory key={index} id={item.id} name={item.name} image={item.image} rating={item.rating} new_price={item.new_price} old_price={item.old_price} />;
          })}
        </div>
      </div>
    </>
  );
}
