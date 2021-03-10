// const product_data = [
//     {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
//     {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
//     {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
//     {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
//     {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
//     {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
// ];

import React, { useState } from "react";
import './FilterableProductTable.css';

function FilterableProductTable(props) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  function handleFilterTextUpdate(event) {
    const filterText = event.target.value;
    setFilterText(filterText);
  }

  function handleInStockOnlyUpdate() {
    setInStockOnly(!inStockOnly);
  }

  const productData = props.productData;

  return (
    <div>
      <SearchBar filterText={filterText} 
                 inStockOnly={inStockOnly} 
                 onFilterTextChange={handleFilterTextUpdate} 
                 onInStockOnlyChange={handleInStockOnlyUpdate} />
      <ProductTable productData={productData} 
                    inStockOnly={inStockOnly} 
                    filterText={filterText} />
    </div>
  );
}

function SearchBar(props) {
  const filterText = props.filterText;
  const inStockOnly = props.inStockOnly;
  const onFilterTextChange = props.onFilterTextChange;
  const onInStockOnlyChange = props.onInStockOnlyChange;

  return (
    <div>
      <input value={filterText} onChange={onFilterTextChange} placeholder="Search..."/>
      <div>
        <input type="checkbox" checked={inStockOnly} onChange={onInStockOnlyChange} />
        <label>Only show products in stock</label>
      </div>
    </div>
  );
}

function ProductTable(props) {
  const productData = props.productData;
  const inStockOnly = props.inStockOnly;
  const filterText = props.filterText;
  const categories = props.productData.map(product => product.category);
  const uniqueCategories = [...new Set(categories)];

  return (
    <table class="productTable">
      <tr>
        <th>Name</th>
        <th>Price</th>
      </tr>
      {
        uniqueCategories.map(category => {
          const categoryRow = <ProductCategoryRow category={category} key={category} />;
          const productRows = productData
            .filter(product => (inStockOnly) ? product.stocked : true)
            .filter(product => product.category === category)
            .filter(product => product.name.toLowerCase().includes(filterText.toLowerCase()))
            .map(product => <ProductRow name={product.name} 
                                        price={product.price} 
                                        stocked={product.stocked} 
                                        key={product.name} />);

          return (productRows.length > 0) ? <>{categoryRow} {productRows}</> : null;
        })
      }
    </table>
  );
}

function ProductCategoryRow(props) {
  const category = props.category;
  return <tr class="category">{category}</tr>;
}

function ProductRow(props) {
  const name = props.name;
  const price = props.price;
  const stocked = props.stocked;
  const nameTD = stocked ? <td>{name}</td> : <td class="outOfStock">{name}</td>;

  return (
    <tr>
      {nameTD}
      <td>{price}</td>
    </tr>
  );
}

export default FilterableProductTable;
