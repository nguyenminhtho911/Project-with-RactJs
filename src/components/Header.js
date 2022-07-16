import React, { useState } from "react";
import Modal from "./Modal";
import SearchForm from "./SearchForm";
import FilterForm from "./FilterForm";
import ProductForm from "./ProductForm";
import { Link } from "react-router-dom";

const Header = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);

  return (
    <header>
      <nav>
        <p>
          <Link to="/">Home</Link>
        </p>
        <p onClick={() => setOpenProduct(true)}>Tạo Sản Phẩm</p>
        <p onClick={() => setOpenSearch(true)}>Tìm kiếm</p>
        <p onClick={() => setOpenFilter(true)}>Lọc</p>
      </nav>

      {/* -------- Search --------- */}
      {openSearch && (
        <Modal titleTxt="Tìm kiếm" setOpen={setOpenSearch}>
          <SearchForm />
        </Modal>
      )}

      {/* -------- Filter --------- */}
      {openFilter && (
        <Modal titleTxt="Lọc" setOpen={setOpenFilter}>
          <FilterForm />
        </Modal>
      )}

      {/* -------- Product --------- */}
      {openProduct && (
        <Modal titleTxt="Tạo sản phẩm" setOpen={setOpenProduct}>
          <ProductForm btnTxt="Thêm" />
        </Modal>
      )}
    </header>
  );
};

export default Header;
