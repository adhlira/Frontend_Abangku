import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { CreateStars } from "../../helper/Rating";
import {Scrollbar} from "../../helper/Scrollbar";

const Item = (props) => {
  const { id, image, name, new_price, old_price, rating } = props;
  return (
    <div className="item-category" onClick={Scrollbar}>
      <Link to={`detail/${id}`} className="link-item">
        <img src={image} alt={name} />
        <p>{name}</p>
        <div className="rating">{rating && CreateStars(rating)}</div>
        <div className="item-prices">
          <div className="item-price-new">${new_price}</div>
          <div className="item-price-old">${old_price}</div>
        </div>
      </Link>
    </div>
  );
};

Item.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rating: PropTypes.number,
  new_price: PropTypes.number.isRequired,
  old_price: PropTypes.number.isRequired,
};

export default Item;
