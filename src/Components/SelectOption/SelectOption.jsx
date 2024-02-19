
export default function SelectOption() {
  return (
    <>
      <select id="ProductOption" className="select-option">
        <option value="volvo" className="option-menu">Newest Product</option>
        <option value="saab" className="option-menu">Most Expensive</option>
        <option value="opel" className="option-menu">Cheapest</option>
        <option value="audi" className="option-menu">Alphabets A-Z</option>
        <option value="audi" className="option-menu">Alphabets Z-A</option>
      </select>
    </>
  );
}
